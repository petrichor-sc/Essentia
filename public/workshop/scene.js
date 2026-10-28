import {receptorCloseup} from './receptors.js?v=hillstreet-r2';
import {hillStreet,cloneRiggedModel,streetMotion,STREET_BUILD,STREET_POLE,STREET_GROUND} from './street.js?v=hillstreet-r2';
import * as T from '../atlas/assets/three.module.js';
import {GLTFLoader} from './assets/GLTFLoader.js?v=hillstreet-r2';
import {OrbitControls} from './assets/OrbitControls.js?v=hillstreet-r2';

import {cerebralSculpture} from './sculptures.js?v=hillstreet-r2';
import {jasmineShrub} from './jasmine.js?v=hillstreet-r2';
import {humanRig} from './human.js?v=hillstreet-r2';
import {SVGRenderer} from './assets/SVGRenderer.js?v=hillstreet-r2';
const GOLD=0xc9a465,VIOLET=0xb9a1d9;
const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z);
const material=(color,opacity=1)=>new T.MeshStandardMaterial({color,roughness:.48,metalness:.15,transparent:opacity<1,opacity,depthWrite:opacity===1});
export class ScentScene{
 constructor(container,labels){
  this.container=container;this.container.setAttribute('role','group');this.labels=labels;this.time=0;this.paused=false;this.state={chapter:0,step:0,movement:false,airflow:0,weather:'temperate',age:0,concentration:20,sites:['neck'],doseMode:'fixed',skinZoom:true};
  this.scene=new T.Scene();this.camera=new T.PerspectiveCamera(37,1,.1,170);this.scene.add(new T.HemisphereLight(0xf1e5ff,0x26132d,2));
  [[0xffdf9b,3,[-4,8,8]],[0x9c7ed7,2,[5,5,-4]]].forEach(([c,i,p])=>{const l=new T.DirectionalLight(c,i);l.position.set(...p);this.scene.add(l);});
  const canvas=document.createElement('canvas'),context=canvas.getContext('webgl2',{alpha:true,antialias:true});this.gpu=!!context;
  if(context){this.renderer=new T.WebGLRenderer({canvas,context,alpha:true,antialias:true});this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));this.renderer.setClearColor(0x100b19,0);this.renderer.toneMapping=T.ACESFilmicToneMapping;}
  else{this.renderer=new SVGRenderer();this.renderer.setQuality('low');this.renderer.setPrecision(2);}
  this.renderer.domElement.classList.add('sculpture');this.renderer.domElement.setAttribute('aria-hidden','true');container.append(this.renderer.domElement);container.dataset.renderer=this.gpu?'webgl2':'perspective-3d';
  this.overlay=document.createElement('canvas');this.overlay.className='scent-light';this.overlay.setAttribute('aria-hidden','true');container.append(this.overlay);this.ctx=this.overlay.getContext('2d');
  this.controls=new OrbitControls(this.camera,this.renderer.domElement);this.controls.enablePan=false;this.controls.minDistance=8;this.controls.maxDistance=27;this.controls.minPolarAngle=.45;this.controls.maxPolarAngle=2.1;
  this.controls.addEventListener('change',()=>this.dirty=true);this.controls.addEventListener('start',()=>this.streetCameraFollow=false);
  const hint=document.createElement('span');hint.className='orbit-hint';hint.textContent='Drag to turn · Scroll to zoom';container.append(hint);
  this.groups=Array.from({length:6},()=>{const g=new T.Group();this.scene.add(g);return g;});
  this.buildNose();this.buildPathwayUI();this.buildCells();this.buildBrain();this.buildBody();this.buildBottles();this.buildSkin();
  this.proxies=[];this.cloud=[];this.distance=0;this.walkBlend=0;this.position=V(-2,0,0);this.mode=-1;this.ready=this.load();this.ready.catch(e=>console.error('3D models could not load',e));
  this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(container);this.resize();this.update(this.state);
  this.last=performance.now();this.drawAt=0;this.loop=this.loop.bind(this);this.frame=requestAnimationFrame(this.loop);
 }
 mesh(parent,geo,mat,p=[0,0,0]){const m=new T.Mesh(geo,mat);m.position.set(...p);parent.add(m);return m;}
 sphere(parent,p,r,color=GOLD,opacity=1){return this.mesh(parent,new T.SphereGeometry(r,12,8),material(color,opacity),p);}
 tube(parent,points,r=.025,color=GOLD,opacity=.8){const c=new T.CatmullRomCurve3(points.map(p=>V(...p)));this.mesh(parent,new T.TubeGeometry(c,24,r,5,false),material(color,opacity));return c;}
 network(parent,center,scale,count=45){
  const nodes=[],edges=[];for(let i=0;i<count;i++){const a=i*2.39996,y=1-2*(i+.5)/count,r=Math.sqrt(1-y*y),p=V(Math.cos(a)*r*scale[0],y*scale[1],Math.sin(a)*r*scale[2]).add(V(...center));nodes.push(p);this.sphere(parent,p.toArray(),.035,i%4?VIOLET:GOLD,.9);}
  nodes.forEach((p,i)=>{nodes.map((q,j)=>({j,d:p.distanceTo(q)})).filter(x=>x.j!==i).sort((a,b)=>a.d-b.d).slice(0,3).forEach(({j})=>{if(j<i)return;const geo=new T.BufferGeometry().setFromPoints([p,nodes[j]]);parent.add(new T.Line(geo,new T.LineBasicMaterial({color:i%3?VIOLET:GOLD,transparent:true,opacity:.28})));edges.push([p,nodes[j]]);});});return {parent,nodes,edges};
 }
 buildNose(){
  const g=this.groups[0];this.headRoot=new T.Group();g.add(this.headRoot);this.headRoot.position.set(-2.2,0,0);this.headRoot.scale.setScalar(.045);
  this.nosePoint=V(0,.72,2.4);this.receptorPoint=V(0,1.66,1.45);this.bulbPoint=V(0,1.98,1.3);
  this.jasmine=jasmineShrub();g.add(this.jasmine.root);this.jasmine.root.position.copy(STREET_POLE).add(V(-.5,0,.25));this.jasmine.root.scale.setScalar(1);this.village=hillStreet();g.add(this.village.root);this.streetActor=new T.Group();g.add(this.streetActor);this.streetCameraFollow=true;
  // No visible tube, arrow, or continuous line enters the face.
  this.aromaSeeds=Array.from({length:180},(_,i)=>({source:this.jasmine.sources[i%this.jasmine.sources.length],phase:(i*.61803398875)%1,speed:.065+(i%7)*.006,angle:i*2.39996,inhaled:i%4===0}));
  this.olfactoryRegions=[
   {name:'Nose',position:V(0,.85,2.3),scale:V(.22,.3,.18),center:1.9,text:'An inhaled breath carries some airborne scent molecules into the nasal cavity. Most of the scent released by the jasmine disperses into the surrounding air.'},
   {name:'Olfactory sensory neurons',position:V(0,1.66,1.45),scale:V(.45,.1,.25),center:3,text:'High inside the nose, molecules interact with receptors on sensory neurons. Receptor activation changes electrical activity. From this point, the moving amber light represents neural signals, not scent molecules travelling through the brain.'},
   {name:'Olfactory bulbs',position:V(0,2.02,1.3),scale:V(.48,.15,.23),center:3.9,text:'The olfactory bulbs sit just above the nasal cavity and receive signals from olfactory sensory neurons. They process patterns of activity before sending information onward.'},
   {name:'Olfactory cortex',position:V(-.85,1.8,.2),scale:V(.42,.24,.45),center:4.9,text:'Connected regions, including the piriform cortex, help process odour information. Connections with other brain networks support identification, emotion and memory. The highlighted area is a simplified location marker, not a full anatomical segmentation.'}
  ];
  this.olfactoryRegions.forEach(region=>{const m=new T.Mesh(new T.SphereGeometry(1,18,12),new T.MeshBasicMaterial({color:0xffbb58,transparent:true,opacity:.12,depthTest:false,depthWrite:false,blending:T.AdditiveBlending}));m.position.copy(region.position);m.scale.copy(region.scale);m.renderOrder=9;this.headRoot.add(m);region.mesh=m;m.visible=false;});
  this.neuralPath=new T.CatmullRomCurve3([this.receptorPoint,V(0,1.87,1.4),this.bulbPoint,V(-.38,1.96,.9),V(-.85,1.8,.2)]);

 }
 buildPathwayUI(){
  this.hotspotLayer=document.createElement('div');this.hotspotLayer.className='olfactory-hotspots';this.hotspotLayer.setAttribute('aria-label','Explore the sense of smell');this.container.append(this.hotspotLayer);
  this.breathBadge=document.createElement('span');this.breathBadge.className='breath-badge';this.container.append(this.breathBadge);
  this.info=document.createElement('section');this.info.className='olfactory-info';this.info.id='olfactory-info';this.info.hidden=true;this.info.setAttribute('aria-label','About this part of the smell system');
  const close=document.createElement('button');close.type='button';close.className='olfactory-close';close.textContent='×';close.setAttribute('aria-label','Close anatomy description');close.addEventListener('click',()=>this.closePathwayInfo());
  this.infoTitle=document.createElement('h3');this.infoText=document.createElement('p');this.info.append(close,this.infoTitle,this.infoText);this.container.append(this.info);
  this.olfactoryRegions.forEach(region=>{const button=document.createElement('button');button.type='button';button.className='olfactory-hotspot';button.setAttribute('aria-label',region.name+' — open description');button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',this.info.id);button.addEventListener('pointerenter',()=>this.openPathwayInfo(region));button.addEventListener('focus',()=>this.openPathwayInfo(region));button.addEventListener('click',()=>this.openPathwayInfo(region));button.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();this.closePathwayInfo();}});this.hotspotLayer.append(button);region.button=button;});
  this.info.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();const region=this.openRegion;this.closePathwayInfo();region?.button.focus();this.closePathwayInfo();}});
 }
 openPathwayInfo(region){this.activeAnnotation=null;this.openRegion=region;this.infoTitle.textContent=region.name;this.infoText.textContent=region.text;this.info.hidden=false;this.olfactoryRegions.forEach(r=>r.button.setAttribute('aria-expanded',String(r===region)));this.positionPathwayInfo();this.dirty=true;}
 closePathwayInfo(){this.activeAnnotation=null;this.openRegion=null;this.info.hidden=true;this.olfactoryRegions.forEach(r=>r.button.setAttribute('aria-expanded','false'));}
 positionPathwayInfo(){if(!this.openRegion&&!this.activeAnnotation)return;const [x,y]=this.activeAnnotation?this.project(this.activeAnnotation.object.localToWorld(this.activeAnnotation.p.clone())):this.project(this.headRoot.localToWorld(this.openRegion.position.clone()));const w=Math.min(300,Math.max(180,this.width-24));this.info.style.width=w+'px';this.info.style.left=Math.max(12,Math.min(this.width-w-12,x+24))+'px';this.info.style.top=Math.max(46,Math.min(this.height-this.info.offsetHeight-12,y+24))+'px';}
 openAnnotation(text,object,p){this.openRegion=null;this.activeAnnotation={object,p};this.infoTitle.textContent=text;this.infoText.textContent=text.includes('cilia')?'Odour molecules meet receptor proteins on the fine cilia. Receptor activation changes the sensory neuron’s electrical activity.':text.includes('cortex')?'Signals reach connected olfactory cortical regions. The amber pulse here represents neural activity, not a scent molecule.':text.includes('bulb')?'Sensory neuron axons send activity to the olfactory bulb, located above the nasal cavity. This diagram enlarges and separates the structures for clarity.':text.includes('nose')?'The highlighted point is the small area of olfactory tissue high in the nasal cavity. The leader connects this location to its enlarged view on the right.':'An enlarged teaching view of olfactory sensory neurons. The lower branches are cilia in the nasal lining; the axons above carry signals to the olfactory bulb.';this.info.hidden=false;this.positionPathwayInfo();this.dirty=true;}
 buildCells(){
  const g=this.groups[1];this.context=new T.Group();g.add(this.context);this.context.visible=false;this.anatomyActor=new T.Group();this.anatomyActor.position.set(-3.3,-2.15,0);g.add(this.anatomyActor);
  this.detector=receptorCloseup();this.cells=this.detector.root;this.cells.position.set(2,-.25,0);g.add(this.cells);
  this.relay=this.network(this.cells,[0,1.7,0],[.6,.2,.3],20);this.signalRoot=new T.Group();g.add(this.signalRoot);this.signalRoot.position.x=1;this.signalNet=this.network(this.signalRoot,[0,0,0],[2,1.7,1.2],55);
  this.magnifier=new T.Line(new T.BufferGeometry().setFromPoints([V(),V(),V()]),new T.LineBasicMaterial({color:GOLD,transparent:true,opacity:.35}));g.add(this.magnifier);
 }
 buildBrain(){
  const g=this.groups[2];this.brainRoot=new T.Group();g.add(this.brainRoot);
  this.brainRoot.add(cerebralSculpture());this.brainRoot.position.set(.8,.2,0);
  this.memoryContext=new T.Group();g.add(this.memoryContext);this.memoryContext.position.set(-3,0,0);this.memoryContext.scale.setScalar(.32);this.memoryContext.rotation.y=.55;
  this.sphere(this.memoryContext,[0,2.6,-.1],.8,GOLD,.18);
  this.cortex=this.network(this.brainRoot,[0,.35,0],[1.42,1.04,1.15],55);
  this.emotion=this.sphere(this.brainRoot,[.65,-.55,.5],.13,GOLD);this.memory=this.sphere(this.brainRoot,[-.7,-.2,-.4],.13,VIOLET);
 }
 buildBody(){
  const g=this.groups[3];this.actor=new T.Group();g.add(this.actor);
  const floor=this.mesh(g,new T.CircleGeometry(6.4,64),material(0x271b34,.6),[0,-.04,-.8]);floor.rotation.x=-Math.PI/2;
  const grid=new T.GridHelper(12,12,0x806542,0x37263f);grid.position.y=-.02;grid.material.transparent=true;grid.material.opacity=.25;g.add(grid);
  this.path=new T.CatmullRomCurve3([V(-2,0,0),V(2,0,0),V(3,0,-1.6),V(1.4,0,-3),V(-2.2,0,-3),V(-3,0,-1.5)],true,'centripetal');
  this.pathLength=this.path.getLength();this.actor.position.copy(this.position||V(-2,0,0));
 }
 buildBottles(){
  this.bottles=[];[5,10,20,30].forEach((percent,i)=>{const b=new T.Group();b.position.set(-3.3+i*2.2,0,0);this.groups[4].add(b);
   const glass=this.mesh(b,new T.BoxGeometry(1.25,2.7,.8),material(VIOLET,.08));b.add(new T.LineSegments(new T.EdgesGeometry(glass.geometry),new T.LineBasicMaterial({color:VIOLET,transparent:true,opacity:.5})));
   const h=2.35,oil=h*percent/100;
   this.mesh(b,new T.BoxGeometry(1.1,oil,.65),material(GOLD,.94),[0,-1.2+oil/2,0]);
   this.mesh(b,new T.BoxGeometry(1.1,h-oil,.65),material(VIOLET,.16),[0,-1.2+oil+(h-oil)/2,0]);
   this.mesh(b,new T.CylinderGeometry(.28,.28,.35,20),material(0x4a344d),[0,1.52,0]);this.mesh(b,new T.BoxGeometry(.68,.45,.86),material(GOLD),[0,1.82,0]);this.bottles.push(b);
  });
 }
 buildSkin(){
  this.skinRoot=new T.Group();this.groups[5].add(this.skinRoot);this.skinRoot.position.set(1.8,2.1,0);this.skinRoot.rotation.z=-.32;
  this.mesh(this.skinRoot,new T.CylinderGeometry(.62,.83,3.5,48,18),material(0xbc8c76));
  // Pores follow a curved forearm surface, rather than a flat slab.
  for(let i=0;i<160;i++){const y=-1.6+(i*.618%1)*3.2,a=-1.15+(i*.381%1)*2.3,r=.725-y*.06;const pore=this.sphere(this.skinRoot,[Math.sin(a)*r,y,Math.cos(a)*r],.009,0x795444,.5);pore.scale.y=.6;}
  this.deposits=[];this.skinSeeds=[];
  for(let i=0;i<110;i++){const y=-1.4+(i*.618033%1)*2.8,a=-.88+(i*.41421%1)*1.76,r=.735-y*.06,p=V(Math.sin(a)*r,y,Math.cos(a)*r);const m=this.sphere(this.skinRoot,p.toArray(),.035,GOLD,.85);m.scale.set(1,.38,1);this.deposits.push(m);this.skinSeeds.push(p);}
  this.skinLink=new T.Line(new T.BufferGeometry().setFromPoints([V(),V(),V()]),new T.LineBasicMaterial({color:GOLD,transparent:true,opacity:.4}));this.groups[5].add(this.skinLink);
 }
 async load(){
  const loader=new GLTFLoader(),[head,human]=await Promise.all([loader.loadAsync('./assets/head.glb'),loader.loadAsync('./assets/human.glb')]);
  // The scanned bust is confined to the memory location diagram. It cannot enter the street scene.
  head.scene.traverse(o=>{if(o.isMesh)o.material=material(0x9b7cba,1);});this.memoryContext.add(head.scene);
  const streetModel=cloneRiggedModel(human.scene),anatomyModel=cloneRiggedModel(human.scene);
  this.actor.add(human.scene);human.scene.scale.setScalar(2.6);this.streetActor.add(streetModel);streetModel.scale.setScalar(1);streetModel.updateMatrixWorld(true);const streetBounds=new T.Box3().setFromObject(streetModel);const streetHeight=streetBounds.max.y-streetBounds.min.y;if(!Number.isFinite(streetHeight)||streetHeight<=0)throw new Error('Invalid human model bounds');streetModel.scale.setScalar(1.72/streetHeight);streetModel.updateMatrixWorld(true);streetModel.position.y-=new T.Box3().setFromObject(streetModel).min.y;this.anatomyActor.add(anatomyModel);anatomyModel.scale.setScalar(1.9);
  [human.scene,streetModel,anatomyModel].forEach(model=>model.traverse(o=>{if(o.isMesh){o.material.roughness=.85;o.material.metalness=0;}}));
  this.rig=humanRig(human.scene,this.actor);this.streetRig=humanRig(streetModel,this.streetActor);this.anatomyRig=humanRig(anatomyModel,this.anatomyActor);
  this.rig.pose(0,0);this.streetRig.pose(0,0);this.anatomyRig.pose(0,0);this.scene.updateMatrixWorld(true);
  const desired=V(.05,STREET_GROUND+1.25,1.02);this.flowerSource=this.jasmine.sources.reduce((best,p)=>{const point=this.jasmine.root.localToWorld(p.clone());return !best||point.distanceTo(desired)<best.distance?{point,distance:point.distanceTo(desired),local:p}:best;},null).local.clone();
  this.proxies=[];this.streetProxies=[];this.anatomyProxies=[];
  if(!this.gpu){for(const [model,list] of [[human.scene,this.proxies],[streetModel,this.streetProxies],[anatomyModel,this.anatomyProxies]])model.traverse(o=>{if(!o.isSkinnedMesh)return;const geo=o.geometry.clone(),proxy=new T.Mesh(geo,material(0xbda68e));proxy.position.copy(o.position);proxy.quaternion.copy(o.quaternion);proxy.scale.copy(o.scale);o.parent.add(proxy);o.visible=false;list.push({source:o,proxy,base:o.geometry.attributes.position.array.slice()});});}
  this.dirty=true;
 }
 skinSoftware(proxies=[]){for(const {source,proxy,base} of proxies){source.skeleton.update();const p=proxy.geometry.attributes.position,v=V();for(let i=0;i<p.count;i++){v.fromArray(base,i*3);source.applyBoneTransform(i,v);p.setXYZ(i,v.x,v.y,v.z);}p.needsUpdate=true;proxy.geometry.computeVertexNormals();proxy.geometry.computeBoundingSphere();}}
 prepareStreet(){
  this.streetState=streetMotion(this.time);const motion=this.streetState;this.village.update(this.time);this.streetActor.position.copy(motion.position);this.streetActor.rotation.y=motion.yaw;this.streetActor.scale.setScalar(1);
  if(this.streetRig){const target=this.jasmine.root.localToWorld((this.flowerSource||this.jasmine.sources[0]).clone());this.streetRig.pose(this.time,motion.walk,{reach:motion.reach,handTarget:target.clone().add(V(-.08,-.06,.02)),breath:motion.breath});const q=this.streetActor.getWorldQuaternion(new T.Quaternion()),head=this.streetRig.bones.Head.bone.getWorldPosition(V());this.headRoot.position.copy(head).add(V(0,.07,.01).applyQuaternion(q));this.headRoot.quaternion.copy(q);this.headRoot.scale.setScalar(.045);if(!this.gpu)this.skinSoftware(this.streetProxies);}
  if(this.streetCameraFollow){const close=T.MathUtils.smoothstep(motion.reach,0,1)*.65;this.camera.position.lerpVectors(V(-4.8,.15,7.3),V(-2.2,-.55,4.3),close);this.controls.target.lerpVectors(V(-.8,-1.6,1.5),V(-.25,-1.25,1),close);this.controls.update();}
 }
 prepareDetect(){
  const elapsed=this.paused?3:Math.max(0,this.time-(this.detectStart||0)),q=Math.min(1,elapsed/2.5),ease=q*q*(3-2*q);this.detectProgress=q;
  this.anatomyActor.position.set(T.MathUtils.lerp(-.32,-3.3,ease),T.MathUtils.lerp(STREET_GROUND,-2.15,ease),T.MathUtils.lerp(.55,0,ease));this.anatomyActor.scale.setScalar(T.MathUtils.lerp(.55,1,ease));
  if(this.anatomyRig){this.anatomyRig.pose(this.time,0,{breath:(1-Math.cos(this.time*.8))*.5});const head=this.anatomyRig.bones.Head.bone.getWorldPosition(V());this.headRoot.position.copy(head).add(V(0,.12,.02));this.headRoot.quaternion.identity();this.headRoot.scale.setScalar(.08);if(!this.gpu)this.skinSoftware(this.anatomyProxies);}
  if(q<1&&this.detectCamera){const mid=V(-1,-.2,5),end=V(.4,1.3,16),nose=V(-.3,-1.1,.7);if(q<.42){this.camera.position.lerpVectors(this.detectCamera,mid,q/.42);this.controls.target.lerpVectors(this.detectTarget,nose,q/.42);}else{this.camera.position.lerpVectors(mid,end,(q-.42)/.58);this.controls.target.lerpVectors(nose,V(0,.2,0),(q-.42)/.58);}this.controls.update();}
  this.cells.visible=q>.42;this.cells.scale.setScalar(.2+ease*.8);this.magnifier.visible=q>.42;
 }
 update(s){const old=this.mode,oldZoom=this.state.skinZoom;this.state={...this.state,...s};this.mode=s.chapter===0?(s.step===1||s.step===2?1:s.step===3?2:0):s.chapter===1?2:s.step<2?3:s.step===2?5:4;
  this.groups.forEach((g,i)=>g.visible=i===this.mode||(this.mode===5&&i===3)||(this.mode===1&&i===0));this.groups[0].children.forEach(o=>o.visible=this.mode===0||o===this.headRoot);this.context.visible=false;this.groups[5].visible=this.mode===5&&s.skinZoom!==false;this.cells.visible=s.step!==2;this.signalRoot.visible=s.chapter===0&&s.step===2;this.cortex.parent.rotation.y=s.chapter===1?.25:0;
  if(this.mode!==old){if(this.mode===1&&s.step===1){this.detectStart=this.time;this.detectCamera=this.camera.position.clone();this.detectTarget=this.controls.target.clone();}const presets={0:[[-4.8,.15,7.3],[-.8,-1.6,1.5]],1:[[.4,1.3,16],[0,0,0]],2:[[5,3.5,12],[0,.1,0]],3:[[8,5.2,12],[0,1.9,-.8]],4:[[4,4,15],[0,.2,0]],5:[[8,5.2,12],[0,1.9,-.8]]};const [p,t]=presets[this.mode];this.camera.position.set(...p);this.controls.target.set(...t);this.controls.update();if(this.mode===5){this.zoomProgress=0;this.distance=0;this.walkBlend=0;this.position.set(-2,0,0);this.actor.position.copy(this.position);this.actor.rotation.y=0;}}
  if(this.mode===5&&oldZoom!==s.skinZoom){this.zoomProgress=0;this.camera.position.set(8,5.2,12);this.controls.target.set(0,1.9,-.8);this.controls.update();}
  this.bottles.forEach((b,i)=>b.children[1].material.opacity=[5,10,20,30][i]===s.concentration?1:.35);
  this.applyDeposits();
  this.actor.visible=this.mode===3||this.mode===5;this.anatomyActor.visible=this.mode===1;this.streetActor.visible=this.mode===0;
  if(this.mode===0){this.streetCameraFollow=true;this.controls.minDistance=3;this.controls.maxDistance=18;this.controls.maxPolarAngle=Math.PI/2-.03;}else{this.controls.minDistance=8;this.controls.maxDistance=27;this.controls.maxPolarAngle=2.1;}
  this.hotspotLayer.hidden=this.mode!==0;this.breathBadge.hidden=!(this.mode===0||this.mode===1);if(this.mode!==0)this.closePathwayInfo();
  this.setLabels();this.dirty=true;this.render();
 }
 setLabels(){
  this.labels.replaceChildren();const s=this.state;let list=[];
  if(this.mode===0)list=[['Jasmine beside the old café street',this.jasmine.root,V(.2,1.3,0),.57,.82]];
  if(this.mode===1)list=[['Sensory tissue in the nose',this.headRoot,V(0,1.66,1.45),.04,.15],['Magnified olfactory sensory neurons',this.cells,V(0,0,0),.5,.1],['Odour molecules → receptors on cilia',this.cells,V(0,-.9,0),.55,.85],['Olfactory bulb',this.cells,V(0,1.7,0),.46,.29],['Olfactory cortex · schematic',this.detector.cortex,V(),.7,.21]];
  if(this.mode===1&&s.step===2)list=[['Sensory tissue in the nose',this.headRoot,V(0,1.66,1.45),.04,.15],['Electrical activity · enlarged relay',this.signalRoot,V(1,.7,.4),.55,.18],['Connected neurons',this.signalRoot,V(-.5,-.7,0),.55,.8]];
  if(this.mode===2)list=s.chapter===1?[['Emotion networks',this.brainRoot,this.emotion.position,.65,.25],['Memory networks',this.brainRoot,this.memory.position,.52,.8],['Brain location in the head',this.memoryContext,V(0,2.6,-.1),.04,.25]]:[['Olfactory processing networks',this.brainRoot,V(.4,.5,1),.08,.2]];
  if(this.mode===3)list=[[s.step===0?'Projection · around you':'Sillage · left in the air',this.groups[3],V(-1,2,-.5),.07,.2]];
  if(this.mode===5)list=[['Your chosen application areas',this.actor,V(0,2.8,0),.05,.18],['Selected skin · magnified',this.skinRoot,V(0,1,.7),.6,.15],['Fragrance remaining on skin',this.skinRoot,V(0,-.3,.75),.58,.82]];
  if(this.mode===4)list=[5,10,20,30].map((p,i)=>[p+'% · '+['Cologne','EDT','EDP','Extrait'][i],this.bottles[i],V(0,-1.6,0),.1+i*.23,.82]);
  if(this.mode===5&&s.skinZoom===false)list=list.slice(0,1);
  this.labels.removeAttribute('aria-hidden');this.labelItems=list.map(([text,object,p,x,y])=>{const el=document.createElement(this.mode===1?'button':'span');if(this.mode===1){el.type='button';el.addEventListener('pointerenter',()=>this.openAnnotation(text,object,p));el.addEventListener('focus',()=>this.openAnnotation(text,object,p));el.addEventListener('click',()=>this.openAnnotation(text,object,p));}el.className='anchored-label';el.textContent=text;el.style.left=x*100+'%';el.style.top=y*100+'%';this.labels.append(el);return {object,p,el};});
 }
 setPaused(value){this.paused=value;this.dirty=true;}
 applyDeposits(){const s=this.state,areas=Math.max(1,(s.sites||['neck']).length),vol={bright:1.4,balanced:.85,lasting:.45}[s.material]||.85;const rate=vol*Math.sqrt(areas);const left=Math.exp(-(s.age||0)/100*rate*2.5);this.deposits.forEach((m,i)=>{m.visible=(i*.618033%1)<left;m.material.opacity=s.doseMode==='per-area'?.85:.85/Math.sqrt(areas);});}
 resetTime(){this.time=0;this.streetCameraFollow=true;this.distance=0;this.walkBlend=0;this.cloud=[];this.position.set(-2,0,0);this.actor.position.copy(this.position);this.dirty=true;}
 resize(){this.width=this.container.clientWidth;this.height=this.container.clientHeight;if(!this.width||!this.height)return;this.camera.aspect=this.width/this.height;this.camera.updateProjectionMatrix();this.renderer.setSize(this.width,this.height);this.overlay.width=this.width*devicePixelRatio;this.overlay.height=this.height*devicePixelRatio;this.overlay.style.width=this.width+'px';this.overlay.style.height=this.height+'px';this.ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);this.dirty=true;}
 project(p){const q=p.clone().project(this.camera);return [(q.x+1)*this.width/2,(1-q.y)*this.height/2,q.z];}
 glow(p,r=4,alpha=.6,color='201,164,101'){const [x,y,z]=this.project(p);if(z>1||z< -1)return;const c=this.ctx,g=c.createRadialGradient(x,y,0,x,y,r*3);g.addColorStop(0,'rgba('+color+','+alpha+')');g.addColorStop(.18,'rgba('+color+','+alpha*.6+')');g.addColorStop(1,'rgba('+color+',0)');c.fillStyle=g;c.fillRect(x-r*3,y-r*3,r*6,r*6);}
 advance(dt){
  const s=this.state;this.time+=dt;
  if(this.mode===3||this.mode===5){const moving=this.mode===3&&s.step===1&&s.movement;this.walkBlend+=(Number(moving)-this.walkBlend)*(1-Math.exp(-dt*3));this.distance+=dt*1.35*this.walkBlend;
   if(this.distance>0){const u=(this.distance/this.pathLength)%1;this.position.copy(this.path.getPointAt(u));const tangent=this.path.getTangentAt(u);this.actor.rotation.y=Math.atan2(tangent.x,tangent.z);}
   this.actor.position.copy(this.position);if(this.rig)this.rig.pose(this.time,this.walkBlend);
   this.scene.updateMatrixWorld(true);
   if(this.rig){const sites=s.sites||['neck'],areas=Math.max(1,sites.length),warm=s.weather==='summer'?1.4:s.weather==='winter'?.7:1;
    const sources=sites.flatMap(site=>this.rig.point(site));
    if(this.mode===3)for(let i=0;i<Math.ceil(dt*65*(s.doseMode==='per-area'?areas:1)*Math.sqrt(areas));i++){const source=sources[Math.floor(Math.random()*sources.length)];if(!source)continue;this.cloud.push({p:source.clone().add(V((Math.random()-.5)*.12,(Math.random()-.5)*.12,(Math.random()-.5)*.12)),v:V((Math.random()-.5)*.45+(s.airflow||0)/100*.6,.18*warm+Math.random()*.25,(Math.random()-.5)*.5),age:0,life:3+Math.random()*3});}
   }
   this.cloud.forEach(p=>{p.age+=dt;p.p.addScaledVector(p.v,dt);});this.cloud=this.cloud.filter(p=>p.age<p.life).slice(-500);
   if(!this.gpu&&this.proxies.length){this.scene.updateMatrixWorld(true);const temp=V();for(const {source,proxy,base} of this.proxies){source.skeleton.update();const attr=proxy.geometry.attributes.position;for(let i=0;i<attr.count;i++){temp.fromArray(base,i*3);source.applyBoneTransform(i,temp);attr.setXYZ(i,temp.x,temp.y,temp.z);}attr.needsUpdate=true;proxy.geometry.computeVertexNormals();proxy.geometry.computeBoundingSphere();}}
  }
  if(this.mode===5){this.zoomProgress=Math.min(1,(this.zoomProgress||0)+dt*.7);const t=this.zoomProgress*this.zoomProgress*(3-2*this.zoomProgress);this.skinRoot.scale.setScalar(.03+t*.97);if(this.state.skinZoom!==false&&this.zoomProgress<1){this.camera.position.lerpVectors(V(8,5.2,12),V(5,4.3,8),t);this.controls.target.lerpVectors(V(0,1.9,-.8),V(.7,2,0),t);this.controls.update();}}
 }
 render(){
  if(!this.width)return;if(this.mode===0)this.prepareStreet();if(this.mode===1&&this.state.step===1)this.prepareDetect();this.scene.updateMatrixWorld(true);this.renderer.render(this.scene,this.camera);const c=this.ctx;c.clearRect(0,0,this.width,this.height);
  if(this.mode===3)this.cloud.forEach(p=>this.glow(p.p,2.8,(1-p.age/p.life)*.65));
  if((this.mode===3||this.mode===5)&&this.rig){for(const site of (this.state.sites||['neck']))for(const p of this.rig.point(site))this.glow(p,7,.9);}
  if(this.mode===5&&this.rig){const point=this.rig.point(this.state.sites[0])[0];if(point){const end=this.skinRoot.localToWorld(V(-.5,.5,.5)),mid=point.clone().lerp(end,.5).add(V(0,.6,.2)),a=this.skinLink.geometry.attributes.position;[point,mid,end].forEach((p,i)=>a.setXYZ(i,p.x,p.y,p.z));a.needsUpdate=true;this.skinLink.geometry.computeBoundingSphere();}}
  if(this.mode===5&&this.state.skinZoom!==false){const s=this.state,age=(s.age||0)/100,left=Math.exp(-age*2.5*Math.sqrt(Math.max(1,s.sites.length))*({bright:1.4,balanced:.85,lasting:.45}[s.material]||.85));for(let i=0;i<55;i++){const phase=(i*.618+this.time*.17)%1,base=this.skinSeeds[i*2].clone();base.y+=phase*1.8;base.z+=phase*.7;this.glow(this.skinRoot.localToWorld(base),2,(1-phase)*left*.65);}}
  if(this.mode===0){
   const motion=this.streetState,phase=motion.phase,neural=motion.neural;this.breathBadge.textContent=this.paused?'Scene paused':motion.stage;
   for(const source of this.village.sources())for(let i=0;i<9;i++){const f=(i*.618+this.time*.2)%1;this.glow(source.clone().add(V(-f*.5,f*.8,Math.sin(i+f)*f*.3)),1,.16*(1-f),'202,167,123');}
   const nose=this.headRoot.localToWorld(this.nosePoint.clone());
   for(const seed of this.aromaSeeds){
    const start=this.jasmine.root.localToWorld(seed.source.clone()),f=(seed.phase+this.time*seed.speed)%1,p=start.clone();
    // Independent smooth eddies suggest wind and dispersion, not straight molecular trajectories.
    p.x-=f*(1.4+seed.phase*2);p.y+=f*(.6+seed.phase*.9)+Math.sin(seed.angle+this.time*.5)*f*.35;p.z+=Math.sin(seed.angle+f*5+this.time*.25)*f*1.3;
    this.glow(p,1.7+seed.phase,.36*Math.sin(Math.PI*f),'255,184,76');
    if(seed.inhaled&&motion.reach>.7){
     const capture=motion.capture<0?-1:(motion.capture-seed.phase*.25)/.75;
     if(capture>=0&&capture<=1){const q=start.clone().lerp(nose,capture*capture*(3-2*capture)),spread=Math.sin(capture*Math.PI);q.y+=spread*(.3+Math.sin(seed.angle+capture*4)*.3);q.z+=spread*Math.sin(seed.angle)*.6;
      const fade=Math.min(1,capture*5)*Math.min(1,(1-capture)*12);this.glow(q,2.1+seed.phase,.8*fade,'255,189,85');}
    }
   }
   const hotspotPositions=[];
   this.olfactoryRegions.forEach(region=>{
    const phaseSignal=neural>=0?neural*4+2:-20;const strength=region.name==='Nose'&&motion.capture>=0?Math.sin(motion.capture*Math.PI):Math.exp(-(((phaseSignal-region.center)/.65)**2));region.mesh.material.opacity=.05+strength*.48;this.glow(this.headRoot.localToWorld(region.position.clone()),4+strength*5,.18+strength*.7,'255,184,76');
    region.button.classList.toggle('is-lit',strength>.28);let [x,y,z]=this.project(this.headRoot.localToWorld(region.position.clone()));const originX=x,originY=y;for(let i=0;i<12&&hotspotPositions.some(p=>Math.hypot(p.x-x,p.y-y)<32);i++){x+=22;y-=10;}hotspotPositions.push({x,y});if(x!==originX){c.strokeStyle='rgba(255,190,100,.3)';c.lineWidth=.7;c.beginPath();c.moveTo(originX,originY);c.lineTo(x,y);c.stroke();}region.button.style.left=x+'px';region.button.style.top=y+'px';region.button.hidden=z>1||z< -1;
   });
   // This pulse begins at the receptors: it is neural activity, not a molecule entering the brain.
   if(neural>=0){const p=this.neuralPath.getPoint(neural);this.glow(this.headRoot.localToWorld(p),3.6,.95,'255,202,113');}
   this.positionPathwayInfo();
  }
  if(this.mode===1&&this.state.step===1){
   const elapsed=this.paused?3:Math.max(0,this.time-(this.detectStart||0)),q=this.detectProgress||0;
   const nose=this.headRoot.localToWorld(V(0,1.66,1.45)),edge=this.cells.localToWorld(V(-2.2,-.6,0)),middle=nose.clone().lerp(edge,.5).add(V(0,.5,0)),points=this.magnifier.geometry.attributes.position;[nose,middle,edge].forEach((p,i)=>points.setXYZ(i,p.x,p.y,p.z));points.needsUpdate=true;this.magnifier.geometry.computeBoundingSphere();
   const activity=this.detector.update(Math.max(0,elapsed-2.5));this.breathBadge.textContent=q<1?'Following the nose into a magnified view':activity.stage;
   for(const event of activity.events)this.glow(this.cells.localToWorld(event.p.clone()),event.neural?3.5:2.8,event.alpha*.9,'255,192,90');
   this.glow(this.headRoot.localToWorld(V(0,1.66,1.45)),5,.55,'255,192,90');this.glow(this.detector.cortex.localToWorld(V()),8,activity.cortexGlow*.7,'255,192,90');this.positionPathwayInfo();
  }
  if((this.mode===1&&this.state.step===2)||this.mode===2){const net=this.mode===1?(this.state.step===2?this.signalNet:this.relay):this.cortex;for(let i=0;i<net.edges.length;i+=2){const [a,b]=net.edges[i],p=a.clone().lerp(b,(this.time*.5+i*.13)%1);this.glow(net.parent.localToWorld(p),2.5,.8,i%3?'185,161,217':'244,217,161');}}
  // Labels occupy separated margin positions; leaders end at real 3D objects.
  this.labelItems?.forEach(({object,p,el})=>{const [x,y]=this.project(object.localToWorld(p.clone())),box=el.getBoundingClientRect(),r=this.container.getBoundingClientRect(),ex=box.left-r.left+box.width/2,ey=box.bottom-r.top+3;c.strokeStyle='rgba(201,164,101,.42)';c.lineWidth=.8;c.beginPath();c.moveTo(ex,ey);c.lineTo(x,y);c.stroke();c.fillStyle='#c9a465';c.beginPath();c.arc(x,y,2,0,7);c.fill();});
 }
 loop(now){this.frame=requestAnimationFrame(this.loop);if(now-this.drawAt<(this.gpu?28:150))return;const dt=Math.min((now-this.last)/1000,.22);this.last=now;this.drawAt=now;if(document.hidden)return;if(!this.paused)this.advance(dt);if(!this.paused||this.dirty){this.render();this.dirty=false;}}
 dispose(){cancelAnimationFrame(this.frame);this.observer.disconnect();this.controls.dispose();this.renderer.dispose?.();this.hotspotLayer.remove();this.info.remove();this.breathBadge.remove();}
}
