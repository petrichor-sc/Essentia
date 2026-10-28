import * as T from '../atlas/assets/three.module.js';
const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z),AMBER=0xffc16e;
const smooth=(a,b,t)=>T.MathUtils.smoothstep(t,a,b);

export function signalTiming(t){
 const phase=((t%9)+9)%9;
 return {phase,stage:phase<1.1?'Receptor activation':phase<3.4?'Electrical pulses travel along sensory axons':phase<4.6?'Activity gathers in the olfactory bulb':phase<7.2?'Signals travel onward to olfactory cortex':'A new pattern begins',bulb:Math.exp(-Math.pow((phase-3.8)/.65,2)),cortex:Math.exp(-Math.pow((phase-6.4)/.85,2))};
}

export function olfactoryRelay(){
 const root=new T.Group(),axons=[],pulses=[],events=[];
 const lineMat=new T.MeshStandardMaterial({color:0x9780b4,roughness:.6,emissive:0x71558e,emissiveIntensity:.15});
 const neuronMat=new T.MeshStandardMaterial({color:0xb6a1ca,emissive:AMBER,emissiveIntensity:0});
 function tube(points,r=.023,mat=lineMat){const path=new T.CatmullRomCurve3(points);root.add(new T.Mesh(new T.TubeGeometry(path,48,r,7,false),mat));return path;}
 for(let i=0;i<6;i++){
  const x=-1.9+i*.38,z=Math.sin(i*1.8)*.18;
  const cell=new T.Mesh(new T.SphereGeometry(.105,18,12),neuronMat.clone());cell.scale.y=1.6;cell.position.set(x,-1.1,z);root.add(cell);
  for(let k=0;k<4;k++)tube([V(x,-1.24,z),V(x+(k-1.5)*.08,-1.52,z),V(x+(k-1.5)*.13,-1.68,z+.04)],.012);
  axons.push({path:tube([V(x,-.98,z),V(x-.18,-.3,z+.2),V(-.8+i*.12,.42,z+.1),V(-.24+i*.09,.68,0)]),cell,delay:.75+i*.22,duration:1.65});
 }
 const bulb=new T.Mesh(new T.SphereGeometry(1,30,20),new T.MeshStandardMaterial({color:0xaa8a72,emissive:AMBER,emissiveIntensity:.05,roughness:.7}));bulb.scale.set(.68,.3,.4);bulb.position.set(0,.78,0);root.add(bulb);
 const onward=tube([V(.25,.87,0),V(.85,1.2,.12),V(1.3,1.42,.15),V(1.85,1.5,.05)],.042);
 const cortical=new T.Group();cortical.position.set(2,1.45,0);root.add(cortical);const corticalNodes=[];
 for(let i=0;i<22;i++){
  const a=i*2.39996,y=1-2*(i+.5)/22,r=Math.sqrt(1-y*y),p=V(Math.cos(a)*r*.7,y*.65,Math.sin(a)*r*.45);
  const node=new T.Mesh(new T.SphereGeometry(.042,12,8),new T.MeshStandardMaterial({color:0xc5afdd,emissive:AMBER,emissiveIntensity:0}));node.position.copy(p);cortical.add(node);corticalNodes.push(node);
  if(i){const previous=corticalNodes[Math.max(0,i-1)].position;cortical.add(new T.Line(new T.BufferGeometry().setFromPoints([previous,p]),new T.LineBasicMaterial({color:0xa88bc4,transparent:true,opacity:.4})));}
 }
 const movers=[...axons,{path:onward,delay:4.05,duration:1.65},{path:onward,delay:4.6,duration:1.65}];
 movers.forEach(item=>{for(let tail=0;tail<5;tail++){const mesh=new T.Mesh(new T.SphereGeometry(.065-tail*.008,12,8),new T.MeshBasicMaterial({color:tail?0xf5bd6b:0xffecc1,transparent:true,opacity:1-tail*.17}));root.add(mesh);pulses.push({...item,tail,mesh});}});
 return {root,axons,bulb,cortical,onward,pulses,update(t){
  const timing=signalTiming(t);events.length=0;
  for(const pulse of pulses){const f=(timing.phase-pulse.delay)/pulse.duration-pulse.tail*.035;pulse.mesh.visible=f>=0&&f<=1;if(pulse.mesh.visible){pulse.mesh.position.copy(pulse.path.getPoint(f));if(!pulse.tail)events.push({p:pulse.mesh.position.clone(),alpha:1});}}
  for(const {cell,delay} of axons)cell.material.emissiveIntensity=Math.exp(-Math.pow((timing.phase-delay)/.22,2))*1.6;
  bulb.material.emissiveIntensity=.08+timing.bulb*1.2;
  corticalNodes.forEach((node,i)=>{node.material.emissiveIntensity=Math.exp(-Math.pow((timing.phase-(5.55+i*.055))/.22,2))*1.8;});
  return {...timing,events};
 }};
}

export function perceptionTiming(t){
 const phase=Math.max(0,t)%18,reveal=smooth(3.3,5.2,phase)*(1-smooth(16.2,18,phase));
 return {phase,reveal,memoryTime:Math.max(0,phase-4.4),stage:phase<1?'Olfactory activity arrives':phase<3.3?'A pattern spreads across connected neurons':phase<5.2?'A familiar association comes into view':phase<16.2?'An imagined first encounter with jasmine':'The memory gently recedes'};
}

export function neuralCascade(network,t){
 // Follow the existing graph from a single entry point, instead of blinking
 // unrelated dots. The slowed pulse timing is for the workshop illustration.
 if(!network.hops){
  const edges=network.edgeIndices,adj=network.nodes.map(()=>[]);edges.forEach(([a,b])=>{adj[a].push(b);adj[b].push(a);});
  network.hops=network.nodes.map(()=>Infinity);network.hops[0]=0;const queue=[0];
  while(queue.length){const i=queue.shift();for(const j of adj[i])if(!Number.isFinite(network.hops[j])){network.hops[j]=network.hops[i]+1;queue.push(j);}}
  network.hops=network.hops.map((h,i)=>Number.isFinite(h)?h:2+i%5);
 }
 const phase=Math.max(0,t)%3.7,events=[];
 network.nodeMeshes.forEach((node,i)=>{const fire=.2+network.hops[i]*.20+(i*.618%1)*.10,strength=Math.exp(-Math.pow((phase-fire)/.20,2));node.material.emissiveIntensity=strength*1.8;node.scale.setScalar(1+strength*.75);});
 network.edgeIndices.forEach(([a,b],i)=>{
  if(network.hops[b]<network.hops[a])[a,b]=[b,a];
  const start=.2+network.hops[a]*.20,f=(phase-start)/.28;
  const active=f>=0&&f<=1;network.edgeLines[i].material.opacity=active?.64:.15;
  if(active)events.push({p:network.nodes[a].clone().lerp(network.nodes[b],f),alpha:Math.sin(Math.PI*f)});
 });
 return events;
}
