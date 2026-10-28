import * as T from '../atlas/assets/three.module.js';
import {jasmineShrub} from './jasmine.js?v=long-hair-r12';
import {cloneRiggedModel,fitStreetHuman} from './street.js?v=long-hair-r12';
import {humanRig} from './human.js?v=long-hair-r12';
import {styleWorkshopVisitor} from './character.js?v=long-hair-r12';
const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z);
const smooth=(a,b,t)=>T.MathUtils.smoothstep(t,a,b);

export function jasmineMemory(){
 const root=new T.Group(),childRoot=new T.Group(),materials=new Map();let rig=null,proxies=[];
 const mat=c=>new T.MeshStandardMaterial({color:c,roughness:.9});
 function mesh(geometry,material,position){const m=new T.Mesh(geometry,material);m.position.copy(position);root.add(m);return m;}
 const earth=mesh(new T.CylinderGeometry(2.05,1.95,.10,64),mat(0xb3a280),V(0,-.06,0));
 const backdrop=mesh(new T.BoxGeometry(3.65,2.1,.14),mat(0xc5b897),V(0,1,-1.25));
 mesh(new T.BoxGeometry(1.05,1.25,.05),mat(0x6b756b),V(-.72,1.22,-1.15));
 for(const x of [-1.28,-.17])mesh(new T.BoxGeometry(.065,1.38,.09),mat(0x705843),V(x,1.22,-1.1));
 for(const y of [.54,1.22,1.89])mesh(new T.BoxGeometry(1.18,.06,.09),mat(0x705843),V(-.72,y,-1.1));
 mesh(new T.BoxGeometry(.06,1.35,.09),mat(0xd4c9b0),V(-.72,1.22,-1.1));
 const sun=mesh(new T.SphereGeometry(.27,24,16),new T.MeshBasicMaterial({color:0xffdd9c}),V(1.23,1.63,-1.1));sun.scale.z=.15;
 // A familiar garden corner is separate from the present-day café street.
 for(let i=0;i<8;i++)mesh(new T.BoxGeometry(.09,.65,.09),mat(0x8e7758),V(-1.8+i*.5,.31,.96));
 for(const y of [.24,.51])mesh(new T.BoxGeometry(3.65,.055,.06),mat(0x8e7758),V(-.05,y,1.0));
 const jasmine=jasmineShrub();root.add(jasmine.root);jasmine.root.scale.setScalar(.28);jasmine.root.position.set(.72,.1,-.28);
 mesh(new T.CylinderGeometry(.25,.18,.28,24),mat(0x9e7156),V(.84,.14,-.34));
 mesh(new T.CylinderGeometry(.025,.035,1.5,12),mat(0x7a614a),V(.86,.75,-.35));
 for(let i=0;i<20;i++){const a=i*2.4,r=1.6+(i%3)*.12,m=mesh(new T.SphereGeometry(1,10,7),mat(i%2?0x728362:0x8c946c),V(Math.cos(a)*r,.18,Math.sin(a)*r*.5-.28));m.scale.set(.23,.2,.18);}
 root.add(childRoot);childRoot.position.set(-1,0,.45);
 const scent=[];for(let i=0;i<20;i++){const m=mesh(new T.SphereGeometry(.018,10,8),new T.MeshBasicMaterial({color:0xffd18a,transparent:true}),V());scent.push(m);}
 let flower=jasmine.sources[0];let best=Infinity;
 for(const point of jasmine.sources){const p=point.clone().multiplyScalar(.28).add(jasmine.root.position),distance=p.distanceTo(V(.8,.92,-.25));if(distance<best){best=distance;flower=point;}}
 function captureMaterials(){root.traverse(o=>{if(!o.isMesh)return;for(const m of Array.isArray(o.material)?o.material:[o.material])if(!materials.has(m)){materials.set(m,m.opacity);m.transparent=true;}});}
 captureMaterials();
 return {root,childRoot,jasmine,scent,get rig(){return rig;},attachHuman(source,gpu=true){
  const model=cloneRiggedModel(source);fitStreetHuman(model,1.10);styleWorkshopVisitor(model,{young:true});childRoot.add(model);rig=humanRig(model,childRoot);
  if(!gpu)model.traverse(o=>{if(!o.isSkinnedMesh)return;const geo=o.geometry.clone(),proxy=new T.Mesh(geo,mat(0xb69c79));proxy.position.copy(o.position);proxy.quaternion.copy(o.quaternion);proxy.scale.copy(o.scale);o.parent.add(proxy);o.visible=false;proxies.push({source:o,proxy,base:o.geometry.attributes.position.array.slice()});});
  captureMaterials();
 },update(t,reveal){
  root.visible=reveal>.005;const local=t%12,approach=smooth(0,2.5,local),reach=smooth(2.4,3.5,local)*(1-smooth(9.4,11.2,local));
  childRoot.position.lerpVectors(V(-1.05,0,.55),V(.15,0,.25),approach);childRoot.rotation.y=T.MathUtils.lerp(2.3,1.92,reach);root.updateWorldMatrix(true,true);
  const flowerWorld=jasmine.root.localToWorld(flower.clone());
  if(rig){rig.pose(t,local<2.5?Math.sin(Math.PI*approach)*.65:0,{reach,handTarget:flowerWorld.clone().add(V(-.03,-.05,.03)),breath:local>3.5&&local<8.6?(1-Math.cos((local-3.5)*1.2))*.5:0,young:true});
   for(const {source,proxy,base} of proxies){source.skeleton.update();const attr=proxy.geometry.attributes.position,p=V();for(let i=0;i<attr.count;i++){p.fromArray(base,i*3);source.applyBoneTransform(i,p);attr.setXYZ(i,p.x,p.y,p.z);}attr.needsUpdate=true;proxy.geometry.computeVertexNormals();proxy.geometry.computeBoundingSphere();}
  }
  const nose=rig?root.worldToLocal(rig.bones.Head.bone.getWorldPosition(V()).add(V(0,.08,.11).applyQuaternion(childRoot.getWorldQuaternion(new T.Quaternion())))):V(.35,.95,.1),source=root.worldToLocal(flowerWorld.clone());
  scent.forEach((m,i)=>{const f=(t*.24+i*.618)%1,inhale=local>3.5&&local<8.6;m.position.copy(source);if(inhale)m.position.lerp(nose,f);else m.position.add(V(-f*.35,f*.5,Math.sin(i+f*4)*f*.28));m.position.y+=Math.sin(f*Math.PI)*.07;m.userData.scentAlpha=Math.sin(Math.PI*f);});
  for(const [m,opacity] of materials){m.opacity=opacity*reveal;m.depthWrite=reveal>.98&&opacity===1;}
  scent.forEach(m=>{m.material.opacity*=m.userData.scentAlpha;});
  return {approach,reach,local};
 }};
}
