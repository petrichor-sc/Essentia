import * as T from '../atlas/assets/three.module.js';
export function jasmineShrub(){
 const root=new T.Group(),sources=[],V=(x,y,z)=>new T.Vector3(x,y,z);
 const material=c=>new T.MeshStandardMaterial({color:c,roughness:.85});const stem=material(0x62573b),green=material(0x527357),light=material(0x7d9868),petal=material(0xfff6dd),gold=material(0xd7b874);
 const mesh=(g,m,p,parent=root)=>{const obj=new T.Mesh(g,m);obj.position.copy(p);parent.add(obj);return obj;};
 const tube=(points,r)=>mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),22,r,5,false),stem,V(0,0,0));
 const centre=f=>{const a=f*Math.PI*7;return V(.5+Math.cos(a)*(.14+.06*Math.sin(f*11)),f*4.6,Math.sin(a)*.17-.25);};
 tube(Array.from({length:80},(_,i)=>centre(i/79)),.034);
 // Branches emerge along a winding woody stem rather than radiating from a bouquet base.
 for(let i=0;i<30;i++){
  const f=.08+i/31*.9,base=centre(f),a=i*2.39996,length=.35+(i%5)*.12,end=base.clone().add(V(Math.cos(a)*length,.1+Math.sin(i)*.16,Math.sin(a)*length));
  tube([base,base.clone().lerp(end,.55).add(V(0,.13,0)),end],.012);
  for(let j=0;j<4;j++)for(const side of [-1,1]){const t=.2+j*.21,p=base.clone().lerp(end,t).add(V(Math.cos(a+side*1.3)*.12,.02,Math.sin(a+side*1.3)*.12));const leaf=mesh(new T.SphereGeometry(1,10,6),j%2?green:light,p);leaf.scale.set(.19,.055,.085);leaf.rotation.set(.15,a+side*.8,side*.4);}
  if(i%3!==1){const flower=new T.Group();flower.position.copy(end);flower.rotation.set(-.25+(i%3)*.4,a*.5,i);root.add(flower);mesh(new T.SphereGeometry(.035,9,6),gold,V(0,0,.02),flower);for(let n=0;n<5;n++){const angle=n*Math.PI*2/5,m=mesh(new T.SphereGeometry(1,10,6),petal,V(Math.cos(angle)*.08,Math.sin(angle)*.08,0),flower);m.scale.set(.1,.039,.023);m.rotation.z=angle;}sources.push(end.clone());}
 }
 return {root,sources};
}
