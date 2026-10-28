import * as T from '../atlas/assets/three.module.js';
const V=(x,y,z)=>new T.Vector3(x,y,z),GOLD=0xffbf69;
export function receptorCloseup(){
 const root=new T.Group(),neurons=[];
 const material=(c,o=1)=>new T.MeshStandardMaterial({color:c,roughness:.7,transparent:o<1,opacity:o,emissive:GOLD,emissiveIntensity:0});
 const tube=(points,r,mat)=>{const curve=new T.CatmullRomCurve3(points),m=new T.Mesh(new T.TubeGeometry(curve,28,r,6,false),mat);root.add(m);return curve;};
 const surface=new T.Mesh(new T.BoxGeometry(4.5,.12,1),material(0x6b536e,.27));surface.position.y=-.6;root.add(surface);
 for(let i=0;i<7;i++){
  const x=-1.9+i*.62,z=Math.sin(i*1.7)*.18,m=material(0x9781aa,.85),c=material(0xb8a178,.65);
  const soma=new T.Mesh(new T.SphereGeometry(1,18,12),m);soma.scale.set(.14,.27,.14);soma.position.set(x,0,z);root.add(soma);
  tube([V(x,-.2,z),V(x,-.5,z),V(x,-.67,z)],.026,m);
  for(let k=0;k<7;k++)tube([V(x,-.65,z),V(x+(k-3)*.065,-.84,z+Math.sin(k)*.08),V(x+(k-3)*.1,-1.02,z+Math.sin(k)*.14)],.013,c);
  const axon=tube([V(x,.2,z),V(x,.8,z),V(x*.7,1.25,z*.7),V(0,1.65,0)],.022,m);
  neurons.push({x,z,mat:m,cilia:c,axon});
 }
 const bulb=new T.Mesh(new T.SphereGeometry(1,24,16),material(0xa88d68,.35));bulb.scale.set(.65,.25,.35);bulb.position.y=1.7;root.add(bulb);
 const cortex=new T.Group();cortex.position.set(1.1,2.55,0);root.add(cortex);const cm=material(0x8c709f,.25);
 const shape=new T.Mesh(new T.SphereGeometry(1,28,18),cm);shape.scale.set(.7,.45,.55);cortex.add(shape);
 const relay=tube([V(0,1.7,0),V(.25,2.1,0),V(1.1,2.55,0)],.022,material(0xa88765,.4));
 return {root,neurons,bulb,cortex,relay,update(t){const cycle=Math.floor(t/11),phase=t%11;
  if(cycle!==this.cycle){this.cycle=cycle;const order=[0,1,2,3,4,5,6];for(let i=6;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}this.delays=order.map(i=>3+i*.36+Math.random()*.15);}
  const events=[];neurons.forEach((n,i)=>{const fire=this.delays[i],contact=Math.exp(-Math.pow((phase-(fire-.55))/.42,2)),pulse=(phase-fire)/1.25;n.cilia.emissiveIntensity=contact*1.2;n.cilia.opacity=.35+contact*.65;n.mat.emissiveIntensity=Math.exp(-Math.pow((phase-fire)/.3,2))*.9;if(pulse>=0&&pulse<=1)events.push({p:n.axon.getPoint(pulse),neural:true,alpha:Math.sin(Math.PI*pulse)});const f=(phase-(fire-2))/1.45;if(f>=0&&f<=1)events.push({p:V(n.x+Math.sin(i+f*3)*.1,-2.1+f*1.1,n.z),neural:false,alpha:Math.min(1,f*4)*Math.min(1,(1-f)*6)});});
  const b=Math.exp(-Math.pow((phase-6.35)/.85,2)),brain=Math.exp(-Math.pow((phase-8.1)/1.1,2));bulb.material.emissiveIntensity=b;bulb.material.opacity=.2+b*.5;cm.emissiveIntensity=brain;cm.opacity=.2+brain*.5;
  if(phase>6.1&&phase<7.7)events.push({p:relay.getPoint((phase-6.1)/1.6),neural:true,alpha:1});
  return {phase,events,cortexGlow:brain,stage:phase<2?'Odour molecules approach':phase<3.2?'Receptors on cilia activate':phase<6.3?'Neurons fire in a changing pattern':phase<7.7?'Signals reach the olfactory bulb':'Activity reaches olfactory cortex'};
 }};
}
