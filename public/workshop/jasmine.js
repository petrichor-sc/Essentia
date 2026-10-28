import * as T from '../atlas/assets/three.module.js';
const mat=(color,roughness=.8)=>new T.MeshStandardMaterial({color,roughness,metalness:0});
export function jasmineShrub(){
 const root=new T.Group(),wood=mat(0x68533d),leaf=mat(0x54765e),leafLight=mat(0x78936c),cream=mat(0xfff7de),heart=mat(0xd6bc78),sources=[];
 const add=(geo,material,p,parent=root)=>{const m=new T.Mesh(geo,material);m.position.copy(p);parent.add(m);return m;};
 const V=(x,y,z)=>new T.Vector3(x,y,z);
 const branch=points=>add(new T.TubeGeometry(new T.CatmullRomCurve3(points),14,.019,5,false),wood,V(0,0,0));
 // Woody branching, paired leaves, and five-petalled jasmine flowers.
 for(let i=0;i<13;i++){
  const angle=i*2.39996,r=.55+(i%4)*.14,top=V(Math.cos(angle)*r,1.75+(i%5)*.23,Math.sin(angle)*r*.7);
  branch([V((i%3-.8)*.06,0,0),V(top.x*.35,.85,top.z*.35),top]);
  for(let j=0;j<5;j++){
   const f=.35+j*.13,point=top.clone().multiplyScalar(f);point.y+=Math.sin(f*Math.PI)*.2;
   for(const side of [-1,1]){const l=add(new T.SphereGeometry(1,10,6),j%2?leaf:leafLight,point.clone().add(V(side*.13,.04,0)));l.scale.set(.22,.075,.09);l.rotation.set(.2,angle+side*.4,side*.45);}
  }
  for(let k=0;k<2;k++){
   const flower=new T.Group();flower.position.copy(top).add(V((k-.5)*.24,k*.09,.08));flower.rotation.set(-.4+(i%3)*.35,angle*.3,i*.5);root.add(flower);
   add(new T.SphereGeometry(.047,10,6),heart,V(0,0,.025),flower);
   for(let j=0;j<5;j++){const a=j*Math.PI*2/5,p=add(new T.SphereGeometry(1,12,7),cream,V(Math.cos(a)*.1,Math.sin(a)*.1,0),flower);p.scale.set(.115,.047,.027);p.rotation.z=a;}
   sources.push(flower.position.clone());
  }
 }
 // The wild climber roots in the ground; its upper growth wraps the pole.
 const vine=new T.CatmullRomCurve3(Array.from({length:50},(_,i)=>{const f=i/49,a=f*Math.PI*6;return V(.5+Math.cos(a)*.16,f*4.4- .7,Math.sin(a)*.16-.25);}));
 add(new T.TubeGeometry(vine,70,.023,5,false),wood,V(0,0,0));
 for(let i=0;i<8;i++){const a=i*2.4,point=V(.5+Math.cos(a)*.17,2.2+i*.2,Math.sin(a)*.17-.25);const l=add(new T.SphereGeometry(1,10,6),leafLight,point);l.scale.set(.22,.07,.1);l.rotation.z=a;}
 return {root,sources};
}
