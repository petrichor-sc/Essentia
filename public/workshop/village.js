import * as T from '../atlas/assets/three.module.js';
export function hillsideVillage(){
 const root=new T.Group(),walkers=[],V=(x,y,z)=>new T.Vector3(x,y,z),mat=c=>new T.MeshStandardMaterial({color:c,roughness:.95});
 const add=(parent,g,m,p)=>{const o=new T.Mesh(g,m);o.position.copy(p);parent.add(o);return o;};
 const timber=mat(0x695043),wall=mat(0x8e7970),roof=mat(0x514b5c),window=mat(0xc3a06a);
 for(const [x,z,yaw] of [[-9,-8,.4],[8,-10,-.6],[12,5,-1.5],[-12,8,1.6]]){
  const house=new T.Group();house.position.set(x,-2.72,z);house.rotation.y=yaw;root.add(house);
  add(house,new T.BoxGeometry(3,2.4,2.5),wall,V(0,1.2,0));
  for(const px of [-1.45,0,1.45])add(house,new T.BoxGeometry(.12,2.5,2.6),timber,V(px,1.2,0));
  for(const py of [.2,.8,1.6,2.35])add(house,new T.BoxGeometry(3.2,.1,2.65),timber,V(0,py,0));
  for(const px of [-.85,.85])add(house,new T.BoxGeometry(.5,.6,.06),window,V(px,1.55,1.29));
  add(house,new T.BoxGeometry(.6,1.3,.08),timber,V(0,.65,1.3));
  for(const side of [-1,1]){const r=add(house,new T.BoxGeometry(1.95,.13,3),roof,V(side*.78,2.7,0));r.rotation.z=-side*.45;}
 }
 const peopleColours=[0x7f657d,0x827057];
 for(let i=0;i<2;i++){
  const person=new T.Group();root.add(person);const coat=mat(peopleColours[i]),skin=mat(0xb59178),hair=mat(0x302931);
  add(person,new T.CapsuleGeometry(.15,.5,5,10),coat,V(0,1,0));add(person,new T.SphereGeometry(.145,14,10),skin,V(0,1.58,0));add(person,new T.SphereGeometry(.15,12,8),hair,V(0,1.66,-.025));
  const limbs=[];for(const side of [-1,1]){const hip=new T.Group();hip.position.set(side*.09,.72,0);person.add(hip);add(hip,new T.CapsuleGeometry(.065,.5,4,8),coat,V(0,-.28,0));const arm=new T.Group();arm.position.set(side*.23,1.23,0);person.add(arm);add(arm,new T.CapsuleGeometry(.045,.4,4,8),coat,V(0,-.23,0));limbs.push({hip,arm,side});}
  walkers.push({person,limbs,offset:i*Math.PI});
 }
 return {root,update(time){for(const w of walkers){const a=time*.08+w.offset;w.person.position.set(Math.cos(a)*7,-2.72,Math.sin(a)*6-3);w.person.rotation.y=Math.atan2(-Math.sin(a)*7,Math.cos(a)*6);w.limbs.forEach(({hip,arm,side})=>{hip.rotation.x=Math.sin(time*3+side)*.3;arm.rotation.x=-Math.sin(time*3+side)*.22;});}},sources(){return walkers.map(w=>w.person.localToWorld(V(0,1.2,0)));}};
}
