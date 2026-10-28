import * as T from '../atlas/assets/three.module.js';
const V=(x,y,z)=>new T.Vector3(x,y,z);
const matte=(color)=>new T.MeshStandardMaterial({color,roughness:.95,metalness:0});
export function himachalLandscape(){
 const root=new T.Group(),wood=matte(0x65504a),dark=matte(0x302f3a);
 const mesh=(geo,mat,p)=>{const m=new T.Mesh(geo,mat);m.position.copy(p);root.add(m);return m;};
 // Three complete terrain rings surround the viewer; no flat backdrop plane.
 for(let layer=0;layer<3;layer++){
  const radius=34+layer*9,segments=96,positions=[],colors=[],colour=new T.Color([0x393242,0x51455e,0x796b81][layer]);
  const summit=a=>5+layer*2+Math.abs(Math.sin(a*11+layer))*5+Math.abs(Math.sin(a*23+layer*1.7))*3;
  for(let i=0;i<segments;i++){
   const a=i/segments*Math.PI*2,b=(i+1)/segments*Math.PI*2,r1=radius+Math.sin(a*7)*2,r2=radius+Math.sin(b*7)*2;
   const p=V(Math.cos(a)*r1,summit(a),Math.sin(a)*r1),q=V(Math.cos(b)*r2,summit(b),Math.sin(b)*r2);
   positions.push(p.x,-2.72,p.z,...p.toArray(),...q.toArray(),p.x,-2.72,p.z,...q.toArray(),q.x,-2.72,q.z);
   for(let n=0;n<6;n++)colors.push(colour.r,colour.g,colour.b);
   if(layer===2&&p.y>11){const tangent=V(-Math.sin(a),0,Math.cos(a)),near=p.clone().multiply(V(.998,1,.998)),left=near.clone().addScaledVector(tangent,-.8).add(V(0,-2.5,0)),right=near.clone().addScaledVector(tangent,1.1).add(V(0,-2,0));const snow=new T.BufferGeometry().setFromPoints([near,left,right]);snow.setIndex([0,1,2]);snow.computeVertexNormals();root.add(new T.Mesh(snow,new T.MeshBasicMaterial({color:0xc6bacd,side:T.DoubleSide,transparent:true,opacity:.65})));}
  }
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setAttribute('color',new T.Float32BufferAttribute(colors,3));geo.computeVertexNormals();root.add(new T.Mesh(geo,new T.MeshBasicMaterial({vertexColors:true,side:T.DoubleSide})));
 }
 const ground=mesh(new T.CircleGeometry(59,96),matte(0x29252f),V(0,-2.73,0));ground.rotation.x=-Math.PI/2;
 // A weathered timber telephone pole with sagging wires.
 mesh(new T.CylinderGeometry(.085,.14,5.5,12),wood,V(-.7,0,3.35));
 mesh(new T.BoxGeometry(1.35,.12,.14),wood,V(-.7,2.45,3.35));
 for(const x of [-1.23,-.87,-.51,-.17]){
  mesh(new T.CylinderGeometry(.065,.055,.15,10),matte(0x9b9395),V(x,2.6,3.35));
  const curve=new T.CatmullRomCurve3([V(x-9,3.1,.6),V(x-4,2.2,1.9),V(x,2.64,3.35),V(x+5,2.05,2.6),V(x+10,2.8,1.6)]);
  root.add(new T.Line(new T.BufferGeometry().setFromPoints(curve.getPoints(55)),new T.LineBasicMaterial({color:0x82727e,transparent:true,opacity:.3})));
 }
 for(let i=0;i<20;i++){
  const a=i*2.39996,p=V(-.75+Math.cos(a)*(.5+i%4*.25),-2.65,3.6+Math.sin(a)*.6);
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
