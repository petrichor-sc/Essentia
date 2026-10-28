import * as T from '../atlas/assets/three.module.js';
const V=(x,y,z)=>new T.Vector3(x,y,z);
const matte=(color)=>new T.MeshStandardMaterial({color,roughness:.95,metalness:0});
export function himachalLandscape(){
 const root=new T.Group(),wood=matte(0x65504a),dark=matte(0x302f3a);
 const mesh=(geo,mat,p)=>{const m=new T.Mesh(geo,mat);m.position.copy(p);root.add(m);return m;};
 // Layered ridgelines are landscape-inspired, not a geographic reconstruction.
 for(let layer=0;layer<3;layer++){
  const positions=[],colors=[],base=-3.05,z=-7-layer*3;
  const color=new T.Color([0x383047,0x51445e,0x72647e][layer]);
  for(let i=0;i<25;i++){
   const x=-18+i*1.5,y=base+1.4+layer*.6+Math.abs(Math.sin(i*1.73+layer*2))*(2+layer*.6);
   const nextY=base+1.4+layer*.6+Math.abs(Math.sin((i+1)*1.73+layer*2))*(2+layer*.6);
   positions.push(x,base,z,x,y,z,x+1.5,nextY,z,x,base,z,x+1.5,nextY,z,x+1.5,base,z);
   for(let n=0;n<6;n++)colors.push(color.r,color.g,color.b);
   if(layer===2&&y>1.2){const snow=new T.BufferGeometry().setFromPoints([V(x,y,z+.02),V(x-.24,y-.6,z+.02),V(x+.45,y-.5,z+.02)]);snow.setIndex([0,1,2]);snow.computeVertexNormals();root.add(new T.Mesh(snow,new T.MeshBasicMaterial({color:0xccc0ce,transparent:true,opacity:.55,side:T.DoubleSide})));}
  }
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setAttribute('color',new T.Float32BufferAttribute(colors,3));geo.computeVertexNormals();root.add(new T.Mesh(geo,new T.MeshBasicMaterial({vertexColors:true,side:T.DoubleSide,transparent:true,opacity:.6-layer*.08})));
 }
 const ground=mesh(new T.CircleGeometry(8,48),matte(0x29252f),V(0,-2.72,-.3));ground.rotation.x=-Math.PI/2;
 // A weathered timber telephone pole with sagging wires.
 mesh(new T.CylinderGeometry(.085,.14,5.5,12),wood,V(2.55,0,-.25));
 mesh(new T.BoxGeometry(1.35,.12,.14),wood,V(2.55,2.45,-.25));
 for(const x of [2.02,2.38,2.74,3.08]){
  mesh(new T.CylinderGeometry(.065,.055,.15,10),matte(0x9b9395),V(x,2.6,-.25));
  const curve=new T.CatmullRomCurve3([V(x-9,3.1,-3),V(x-4,2.2,-1.7),V(x,2.64,-.25),V(x+5,2.05,-1),V(x+10,2.8,-2)]);
  root.add(new T.Line(new T.BufferGeometry().setFromPoints(curve.getPoints(55)),new T.LineBasicMaterial({color:0x82727e,transparent:true,opacity:.3})));
 }
 for(let i=0;i<20;i++){
  const a=i*2.39996,p=V(2.5+Math.cos(a)*(.5+i%4*.25),-2.65,Math.sin(a)*.6);
  const rock=mesh(new T.DodecahedronGeometry(.12+i%3*.05,0),dark,p);rock.scale.set(1.5,.6,1);
 }
 return root;
}
export function rigBreathingBust(scene,software=false){
 scene.updateWorldMatrix(true,true);let update=()=>{};let scan;
 scene.traverse(o=>{if(o.isMesh&&!scan)scan=o;});if(!scan)return {update};
 const geo=scan.geometry.clone(),count=geo.attributes.position.count,indices=new Uint16Array(count*4),weights=new Float32Array(count*4);
 for(let i=0;i<count;i++){
  const y=geo.attributes.position.getY(i),head=T.MathUtils.smoothstep(y,-.2,1),chest=T.MathUtils.smoothstep(y,-3.9,-1.8)*(1-head);
  indices.set([0,1,2,0],i*4);weights.set([1-chest-head,chest,head,0],i*4);
 }
 geo.setAttribute('skinIndex',new T.Uint16BufferAttribute(indices,4));geo.setAttribute('skinWeight',new T.Float32BufferAttribute(weights,4));
 const skin=new T.SkinnedMesh(geo,scan.material),base=new T.Bone(),chest=new T.Bone(),head=new T.Bone();base.name='BreathRoot';chest.name='ChestExpansion';head.name='HeadSupport';chest.position.set(0,-1.5,-.3);head.position.set(0,1.8,0);base.add(chest);chest.add(head);skin.add(base);skin.position.copy(scan.position);skin.quaternion.copy(scan.quaternion);skin.scale.copy(scan.scale);scan.parent.add(skin);skin.bind(new T.Skeleton([base,chest,head]));scan.parent.remove(scan);
 let proxy;const source=geo.attributes.position.array.slice();if(software){skin.visible=false;proxy=new T.Mesh(geo.clone(),scan.material);proxy.position.copy(skin.position);proxy.quaternion.copy(skin.quaternion);proxy.scale.copy(skin.scale);skin.parent.add(proxy);}
 update=amount=>{
  chest.scale.set(1+amount*.025,1+amount*.012,1+amount*.05);chest.rotation.x=-amount*.012;head.rotation.x=amount*.009;
  skin.updateMatrixWorld(true);
  if(proxy){skin.skeleton.update();const p=proxy.geometry.attributes.position,v=new T.Vector3();for(let i=0;i<count;i++){v.fromArray(source,i*3);skin.applyBoneTransform(i,v);p.setXYZ(i,v.x,v.y,v.z);}p.needsUpdate=true;proxy.geometry.computeVertexNormals();proxy.geometry.computeBoundingSphere();}
 };
 return {update,skin};
}
