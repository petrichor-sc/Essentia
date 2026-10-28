import {receptorCloseup} from './receptors.js?v=studio-palette-r11';
import {hillStreet,cloneRiggedModel,fitStreetHuman,streetMotion,STREET_BUILD,STREET_POLE,STREET_GROUND,STREET_WALKWAY} from './street.js?v=studio-palette-r11';
import * as T from '../atlas/assets/three.module.js';
import {GLTFLoader} from './assets/GLTFLoader.js?v=studio-palette-r11';
import {OrbitControls} from './assets/OrbitControls.js?v=studio-palette-r11';

import {cerebralSculpture} from './sculptures.js?v=studio-palette-r11';
import {jasmineShrub} from './jasmine.js?v=studio-palette-r11';
import {humanRig,settleForSniff} from './human.js?v=studio-palette-r11';
import {SVGRenderer} from './assets/SVGRenderer.js?v=studio-palette-r11';
import {hillAtmosphere} from './atmosphere.js?v=studio-palette-r11';
import {styleWorkshopVisitor} from './character.js?v=studio-palette-r11';
import {jasmineScent} from './scent.js?v=studio-palette-r11';
import {olfactoryRelay,neuralCascade,perceptionTiming} from './neural.js?v=studio-palette-r11';
import {jasmineMemory} from './memory.js?v=studio-palette-r11';
import {weatherProfiles,sprayPhase} from './perfume.js?v=studio-palette-r11';
import {magnifiedHand} from './skin.js?v=studio-palette-r11';
const GOLD=0xc9a465,VIOLET=0xb9a1d9;
const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z);
const material=(color,opacity=1)=>new T.MeshStandardMaterial({color,roughness:.48,metalness:.15,transparent:opacity<1,opacity,depthWrite:opacity===1});
export class ScentScene{
 constructor(container,labels){
  this.container=container;this.container.setAttribute('role','group');this.labels=labels;this.time=0;this.paused=false;this.appliedSites=new Set();this.sprayQueue=[];this.sprayAction=null;this.sprayMist=[];this.emissionBudget=0;this.state={chapter:0,step:0,movement:false,airflow:0,weather:'temperate',age:0,concentration:20,sites:[],doseMode:'fixed',skinZoom:true};
  this.scene=new T.Scene();this.camera=new T.PerspectiveCamera(37,1,.1,220);this.hemi=new T.HemisphereLight(0xf1e5ff,0x26132d,2);this.scene.add(this.hemi);this.daySky=new T.Color(0xc1cbd0);this.dayFog=new T.FogExp2(0xc4ccbf,.009);
  this.keyLights=[];[[0xffdf9b,3,[-4,8,8]],[0x9c7ed7,2,[5,5,-4]]].forEach(([c,i,p])=>{const l=new T.DirectionalLight(c,i);l.position.set(...p);this.scene.add(l);this.keyLights.push(l);});
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
  const nodes=[],edges=[],edgeIndices=[],edgeLines=[],nodeMeshes=[];for(let i=0;i<count;i++){const a=i*2.39996,y=1-2*(i+.5)/count,r=Math.sqrt(1-y*y),p=V(Math.cos(a)*r*scale[0],y*scale[1],Math.sin(a)*r*scale[2]).add(V(...center));nodes.push(p);const node=this.sphere(parent,p.toArray(),.035,i%4?VIOLET:GOLD,.9);node.material.emissive.setHex(0xffc16e);nodeMeshes.push(node);}
  nodes.forEach((p,i)=>{nodes.map((q,j)=>({j,d:p.distanceTo(q)})).filter(x=>x.j!==i).sort((a,b)=>a.d-b.d).slice(0,3).forEach(({j})=>{if(edgeIndices.some(([a,b])=>a===j&&b===i))return;const geo=new T.BufferGeometry().setFromPoints([p,nodes[j]]),line=new T.Line(geo,new T.LineBasicMaterial({color:i%3?VIOLET:GOLD,transparent:true,opacity:.28}));parent.add(line);edges.push([p,nodes[j]]);edgeIndices.push([i,j]);edgeLines.push(line);});});return {parent,nodes,edges,nodeMeshes,edgeIndices,edgeLines};
 }
 buildNose(){
  const g=this.groups[0];this.headRoot=new T.Group();g.add(this.headRoot);this.headRoot.position.set(-2.2,0,0);this.headRoot.scale.setScalar(.045);
  this.nosePoint=V(0,.72,2.4);this.receptorPoint=V(0,1.66,1.45);this.bulbPoint=V(0,1.98,1.3);
  this.jasmine=jasmineShrub();g.add(this.jasmine.root);this.jasmine.root.position.copy(STREET_POLE).add(V(-.5,0,.25));this.jasmine.root.scale.setScalar(1);this.village=hillStreet();g.add(this.village.root);this.streetActor=new T.Group();g.add(this.streetActor);this.streetCameraFollow=true;
  this.atmosphere=hillAtmosphere(STREET_GROUND);g.add(this.atmosphere.root);this.scent=jasmineScent(this.jasmine.sources);this.jasmine.root.add(this.scent.points);this.scent.points.visible=this.gpu;
  const shadowCanvas=document.createElement('canvas');shadowCanvas.width=128;shadowCanvas.height=128;const shadowContext=shadowCanvas.getContext('2d'),gradient=shadowContext.createRadialGradient(64,64,4,64,64,64);gradient.addColorStop(0,'rgba(20,17,18,.48)');gradient.addColorStop(.45,'rgba(20,17,18,.2)');gradient.addColorStop(1,'rgba(20,17,18,0)');shadowContext.fillStyle=gradient;shadowContext.fillRect(0,0,128,128);
  this.streetShadow=new T.Mesh(new T.PlaneGeometry(.9,.65),new T.MeshBasicMaterial({map:new T.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false}));this.streetShadow.rotation.x=-Math.PI/2;g.add(this.streetShadow);
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
  this.hotspotLayer=document.createElement('div');this.hotspotLayer.className='olfactory-hotspots anatomy-sequence';this.hotspotLayer.setAttribute('aria-label','Inside the nose — follow the smell pathway');const title=document.createElement('span');title.className='anatomy-sequence-title';title.textContent='Inside the nose · then neural signals';this.hotspotLayer.append(title);this.container.append(this.hotspotLayer);
  this.breathBadge=document.createElement('span');this.breathBadge.className='breath-badge';this.container.append(this.breathBadge);
  this.info=document.createElement('section');this.info.className='olfactory-info';this.info.id='olfactory-info';this.info.hidden=true;this.info.setAttribute('aria-label','About this part of the smell system');
  const close=document.createElement('button');close.type='button';close.className='olfactory-close';close.textContent='×';close.setAttribute('aria-label','Close anatomy description');close.addEventListener('click',()=>this.closePathwayInfo());
  this.infoTitle=document.createElement('h3');this.infoText=document.createElement('p');this.info.append(close,this.infoTitle,this.infoText);this.container.append(this.info);
  this.olfactoryRegions.forEach(region=>{const button=document.createElement('button');button.type='button';button.className='olfactory-hotspot';button.textContent=region.name;button.setAttribute('aria-label',region.name+' — open description');button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',this.info.id);button.addEventListener('pointerenter',()=>this.openPathwayInfo(region));button.addEventListener('focus',()=>this.openPathwayInfo(region));button.addEventListener('click',()=>this.openPathwayInfo(region));button.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();this.closePathwayInfo();}});this.hotspotLayer.append(button);region.button=button;});
  this.info.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();const region=this.openRegion;this.closePathwayInfo();region?.button.focus();this.closePathwayInfo();}});
 }
 openPathwayInfo(region){this.activeAnnotation=null;this.openRegion=region;this.infoTitle.textContent=region.name;this.infoText.textContent=region.text;this.info.hidden=false;this.olfactoryRegions.forEach(r=>r.button.setAttribute('aria-expanded',String(r===region)));this.positionPathwayInfo();this.dirty=true;}
 closePathwayInfo(){this.activeAnnotation=null;this.openRegion=null;this.info.hidden=true;this.olfactoryRegions.forEach(r=>r.button.setAttribute('aria-expanded','false'));}
 positionPathwayInfo(){if(!this.openRegion&&!this.activeAnnotation)return;const [x,y]=this.activeAnnotation?this.project(this.activeAnnotation.object.localToWorld(this.activeAnnotation.p.clone())):this.project(this.headRoot.localToWorld(this.openRegion.position.clone()));const w=Math.min(300,Math.max(180,this.width-24));this.info.style.width=w+'px';this.info.style.left=Math.max(12,Math.min(this.width-w-12,x+24))+'px';this.info.style.top=Math.max(46,Math.min(this.height-this.info.offsetHeight-12,y+24))+'px';}
 openAnnotation(text,object,p){this.openRegion=null;this.activeAnnotation={object,p};this.infoTitle.textContent=text;this.infoText.textContent=text.includes('cilia')?'Odour molecules meet receptor proteins on the fine cilia. Receptor activation changes the sensory neuron’s electrical activity.':text.includes('cortex')?'Signals reach connected olfactory cortical regions. The amber pulse here represents neural activity, not a scent molecule.':text.includes('bulb')?'Sensory neuron axons send activity to the olfactory bulb, located above the nasal cavity. This diagram enlarges and separates the structures for clarity.':text.includes('nose')?'The highlighted point is the small area of olfactory tissue high in the nasal cavity. The leader connects this location to its enlarged view on the right.':'An enlarged teaching view of olfactory sensory neurons. The lower branches are cilia in the nasal lining; the axons above carry signals to the olfactory bulb.';this.info.hidden=false;this.positionPathwayInfo();this.dirty=true;}
 buildCells(){
  const g=this.groups[1];this.context=new T.Group();g.add(this.context);this.context.visible=false;this.anatomyBust=new T.Group();this.anatomyBust.position.set(-3.4,-.12,0);this.anatomyBust.scale.setScalar(.42);this.anatomyBust.rotation.y=.28;g.add(this.anatomyBust);
  this.detector=receptorCloseup();this.cells=this.detector.root;this.cells.position.set(2,-.25,0);g.add(this.cells);
  this.relay=this.network(this.cells,[0,1.7,0],[.6,.2,.3],20);this.signalDiagram=olfactoryRelay();this.signalRoot=this.signalDiagram.root;g.add(this.signalRoot);this.signalRoot.position.set(1.25,-.05,0);
  this.magnifier=new T.Line(new T.BufferGeometry().setFromPoints([V(),V(),V()]),new T.LineBasicMaterial({color:GOLD,transparent:true,opacity:.35}));g.add(this.magnifier);
 }
 buildBrain(){
  const g=this.groups[2];this.brainRoot=new T.Group();g.add(this.brainRoot);
  this.brainRoot.add(cerebralSculpture());this.brainRoot.position.set(.8,.2,0);
  this.memoryContext=new T.Group();g.add(this.memoryContext);this.memoryContext.position.set(-3,0,0);this.memoryContext.scale.setScalar(.32);this.memoryContext.rotation.y=.55;
  this.sphere(this.memoryContext,[0,2.6,-.1],.8,GOLD,.18);
  this.cortex=this.network(this.brainRoot,[0,.35,0],[1.42,1.04,1.15],55);
  this.emotion=this.sphere(this.brainRoot,[.65,-.55,.5],.13,GOLD);this.memory=this.sphere(this.brainRoot,[-.7,-.2,-.4],.13,VIOLET);
  this.memoryScene=jasmineMemory();this.memoryScene.root.position.set(2.45,-1.25,0);g.add(this.memoryScene.root);this.memoryScene.root.visible=false;
  this.memoryCaption=document.createElement('p');this.memoryCaption.className='memory-caption';this.memoryCaption.innerHTML='A first jasmine memory<span>An imagined childhood scene</span>';this.memoryCaption.hidden=true;this.container.append(this.memoryCaption);
  this.memoryReplay=document.createElement('button');this.memoryReplay.type='button';this.memoryReplay.className='memory-replay';this.memoryReplay.textContent='Replay this memory';this.memoryReplay.hidden=true;this.memoryReplay.addEventListener('click',()=>{this.viewStartedAt=this.time;this.dirty=true;this.render();});this.container.append(this.memoryReplay);
 }
 buildBody(){
  const g=this.groups[3];this.actor=new T.Group();g.add(this.actor);
  const floor=this.mesh(g,new T.CircleGeometry(6.4,64),material(0x271b34,.6),[0,-.04,-.8]);floor.rotation.x=-Math.PI/2;
  const grid=new T.GridHelper(12,12,0x806542,0x37263f);grid.position.y=-.02;grid.material.transparent=true;grid.material.opacity=.25;g.add(grid);
  this.path=new T.CatmullRomCurve3([V(-2,0,0),V(2,0,0),V(3,0,-1.6),V(1.4,0,-3),V(-2.2,0,-3),V(-3,0,-1.5)],true,'centripetal');
  this.pathLength=this.path.getLength();this.actor.position.copy(this.position||V(-2,0,0));
  this.sprayBottle=new T.Group();g.add(this.sprayBottle);this.sprayBottle.visible=false;
  this.mesh(this.sprayBottle,new T.BoxGeometry(.13,.18,.075),new T.MeshStandardMaterial({color:0xd9c296,roughness:.28,metalness:.1}),[0,-.045,0]);
  this.sprayNozzle=this.mesh(this.sprayBottle,new T.CylinderGeometry(.029,.029,.045,14),material(GOLD),[0,.072,0]);this.mesh(this.sprayBottle,new T.CylinderGeometry(.009,.009,.028,10),material(0xf1d59b),[0,.08,.025]).rotation.x=Math.PI/2;
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
  this.skinRoot=new T.Group();this.groups[5].add(this.skinRoot);this.skinRoot.position.set(1.8,2.1,0);this.skinRoot.rotation.set(0,.32,-.12);this.deposits=[];this.skinSeeds=[];
  this.skinLink=new T.Line(new T.BufferGeometry().setFromPoints([V(),V(),V()]),new T.LineBasicMaterial({color:GOLD,transparent:true,opacity:.4}));this.groups[5].add(this.skinLink);
 }
 buildHandSkin(model){
  const hand=magnifiedHand(model);this.skinRoot.add(hand.mesh);this.skinSeeds=hand.samples(110);
  for(const p of hand.samples(140)){const pore=this.sphere(this.skinRoot,p.toArray(),.004,0x795444,.35);pore.scale.z=.3;}
  for(const p of this.skinSeeds){const drop=this.sphere(this.skinRoot,p.toArray(),.022,GOLD,.85);drop.scale.z=.35;this.deposits.push(drop);}
  this.applyDeposits();
 }
 async load(){
  const loader=new GLTFLoader(),[head,human]=await Promise.all([loader.loadAsync('./assets/head.glb?v=studio-palette-r11'),loader.loadAsync('./assets/human.glb?v=studio-palette-r11')]);
  // Opaque purple busts belong to the anatomy and memory diagrams. The street
  // keeps its own full-body visitor and cannot show these enlarged heads.
  head.scene.traverse(o=>{if(o.isMesh){o.material=material(0x9b7cba,1);o.material.roughness=.56;o.material.metalness=.04;}});this.memoryContext.add(head.scene);this.anatomyBust.add(head.scene.clone(true));
  const streetModel=cloneRiggedModel(human.scene);
  [human.scene,streetModel].forEach(styleWorkshopVisitor);
  this.memoryScene.attachHuman(human.scene,this.gpu);
  this.actor.add(human.scene);human.scene.scale.setScalar(2.6);fitStreetHuman(streetModel);this.streetActor.add(streetModel);
  [human.scene,streetModel].forEach(model=>model.traverse(o=>{if(o.isMesh){o.material.roughness=.85;o.material.metalness=0;}}));
  this.rig=humanRig(human.scene,this.actor);this.streetRig=humanRig(streetModel,this.streetActor);
  this.rig.pose(0,0);this.streetRig.pose(0,0);this.scene.updateMatrixWorld(true);
  this.buildHandSkin(human.scene);
  const desired=this.jasmine.root.localToWorld(this.jasmine.hero.clone());this.flowerSource=this.jasmine.sources.reduce((best,p)=>{const point=this.jasmine.root.localToWorld(p.clone());return !best||point.distanceTo(desired)<best.distance?{point,distance:point.distanceTo(desired),local:p}:best;},null).local.clone();
  this.proxies=[];this.streetProxies=[];
  if(!this.gpu){for(const [model,list] of [[human.scene,this.proxies],[streetModel,this.streetProxies]])model.traverse(o=>{if(!o.isSkinnedMesh)return;const geo=o.geometry.clone(),proxy=new T.Mesh(geo,material(0xbda68e));proxy.position.copy(o.position);proxy.quaternion.copy(o.quaternion);proxy.scale.copy(o.scale);o.parent.add(proxy);o.visible=false;list.push({source:o,proxy,base:o.geometry.attributes.position.array.slice()});});}
  this.dirty=true;
 }
 skinSoftware(proxies=[]){for(const {source,proxy,base} of proxies){source.skeleton.update();const p=proxy.geometry.attributes.position,v=V();for(let i=0;i<p.count;i++){v.fromArray(base,i*3);source.applyBoneTransform(i,v);p.setXYZ(i,v.x,v.y,v.z);}p.needsUpdate=true;proxy.geometry.computeVertexNormals();proxy.geometry.computeBoundingSphere();}}
 prepareStreet(){
  this.streetState=streetMotion(this.time);const motion=this.streetState;this.village.update(this.time);this.atmosphere.update(this.time);this.streetActor.position.copy(motion.position);this.streetActor.rotation.y=motion.yaw;this.streetActor.scale.setScalar(1);
  if(this.streetRig){const target=this.jasmine.root.localToWorld((this.flowerSource||this.jasmine.sources[0]).clone()),pose={reach:motion.reach,handTarget:target.clone().add(V(-.045,-.07,.015)),breath:motion.breath};this.streetRig.pose(this.time,motion.walk,pose);settleForSniff(this.streetRig,this.streetActor,target,motion.reach);this.streetRig.pose(this.time,motion.walk,pose);const q=this.streetActor.getWorldQuaternion(new T.Quaternion()),head=this.streetRig.bones.Head.bone.getWorldPosition(V());this.headRoot.position.copy(head).add(V(0,.035,0).applyQuaternion(q));this.headRoot.quaternion.copy(q);this.headRoot.scale.set(.065,.12,.065);if(!this.gpu)this.skinSoftware(this.streetProxies);}
  this.streetShadow.position.set(this.streetActor.position.x,STREET_WALKWAY+.004,this.streetActor.position.z);
  this.scent.update(this.time,{nose:this.streetRig?this.jasmine.root.worldToLocal(this.headRoot.localToWorld(this.nosePoint.clone())):null,capture:this.streetRig?motion.capture:-1,flower:this.flowerSource||this.jasmine.sources[0]});
  if(this.streetCameraFollow){const close=T.MathUtils.smoothstep(motion.reach,0,1),focus=this.streetRig?this.headRoot.localToWorld(V(0,1,1.4)).lerp(this.jasmine.root.localToWorld((this.flowerSource||this.jasmine.sources[0]).clone()),.4):V(-.25,-1.25,1);this.camera.position.lerpVectors(V(-4.8,.15,7.3),focus.clone().add(V(-.9,.32,1.35)),close);this.controls.target.lerpVectors(V(-.8,-1.6,1.5),focus,close);this.controls.update();}
 }
 prepareDetect(){
  const elapsed=Math.max(0,this.time-(this.viewStartedAt||0)),q=Math.min(1,elapsed/1.8),ease=q*q*(3-2*q);this.detectProgress=q;
  if(q<1){const distance=Math.max(16,5.2/(Math.tan(this.camera.fov*Math.PI/360)*this.camera.aspect));this.camera.position.lerpVectors(V(-1.5,.75,10.5),V(.2,1.3,distance),ease);this.controls.target.lerpVectors(V(-2.7,.3,.3),V(0,.2,0),ease);this.controls.update();}
  this.cells.visible=q>.12;this.cells.scale.setScalar(.7+ease*.3);this.magnifier.visible=q>.25;
 }
 preparePerception(){
  const elapsed=Math.max(0,this.time-(this.viewStartedAt||0)),timing=perceptionTiming(elapsed);this.perception=timing;
  this.memoryScene.root.scale.setScalar(1.25*(.93+timing.reveal*.07));this.memoryScene.update(timing.memoryTime,timing.reveal);
  this.memoryCaption.hidden=timing.reveal<.1;this.memoryCaption.style.opacity=String(timing.reveal);this.breathBadge.textContent=timing.stage;
 }
 update(s){const old=this.mode,oldZoom=this.state.skinZoom,key=s.chapter+':'+s.step,changed=key!==this.viewKey;this.viewKey=key;if(changed)this.viewStartedAt=this.time;this.state={...this.state,...s};this.mode=s.chapter===0?(s.step===1||s.step===2?1:s.step===3?2:0):s.chapter===1?2:s.step<2?3:s.step===2?5:4;
  const selected=new Set(s.sites||[]);for(const site of this.appliedSites)if(!selected.has(site))this.appliedSites.delete(site);this.sprayQueue=this.sprayQueue.filter(site=>selected.has(site));if(this.sprayAction&&!selected.has(this.sprayAction.site))this.sprayAction=null;this.cloud=this.cloud.filter(p=>selected.has(p.site));if(!selected.size){this.sprayMist=[];this.emissionBudget=0;}this.sprayBottle.visible=false;
  const perception=s.chapter===0&&s.step===3;
  this.groups.forEach((g,i)=>g.visible=i===this.mode||(this.mode===5&&i===3));this.groups[0].children.forEach(o=>o.visible=this.mode===0);this.context.visible=false;this.groups[5].visible=this.mode===5&&s.skinZoom!==false&&this.appliedSites.size>0;this.cells.visible=s.step!==2;this.signalRoot.visible=s.chapter===0&&s.step===2;this.magnifier.visible=this.mode===1&&s.step===1;this.memoryContext.visible=!perception;this.memoryScene.root.visible=perception;this.memoryCaption.hidden=true;this.memoryReplay.hidden=!perception;
  this.brainRoot.position.set(perception?-2.6:.8,perception?.25:.2,0);this.brainRoot.scale.setScalar(perception?.86:1);this.brainRoot.rotation.y=s.chapter===1?.25:.1;
  if(changed){const presets={0:[[-4.8,.15,7.3],[-.8,-1.6,1.5]],1:[[.2,1.3,16],[0,.2,0]],2:perception?[[.2,2.6,15],[.3,.1,0]]:[[5,3.5,12],[0,.1,0]],3:[[8,5.2,12],[0,1.9,-.8]],4:[[4,4,15],[0,.2,0]],5:[[8,5.2,12],[0,1.9,-.8]]};const [p,t]=presets[this.mode];this.camera.position.set(...p);this.controls.target.set(...t);this.controls.update();if(this.mode===5&&old!==5){this.zoomProgress=0;this.distance=0;this.walkBlend=0;this.position.set(-2,0,0);this.actor.position.copy(this.position);this.actor.rotation.y=0;}}
  if(this.mode===5&&oldZoom!==s.skinZoom){this.zoomProgress=0;this.camera.position.set(8,5.2,12);this.controls.target.set(0,1.9,-.8);this.controls.update();}
  this.bottles.forEach((b,i)=>b.children[1].material.opacity=[5,10,20,30][i]===s.concentration?1:.35);
  this.applyDeposits();
  this.actor.visible=this.mode===3||this.mode===5;this.anatomyBust.visible=this.mode===1;this.streetActor.visible=this.mode===0;
  if(this.mode===0){this.streetCameraFollow=true;this.controls.minDistance=1.5;this.controls.maxDistance=18;this.controls.maxPolarAngle=Math.PI/2-.03;this.scene.background=this.daySky;this.scene.fog=this.dayFog;this.hemi.color.setHex(0xdde7e5);this.hemi.groundColor.setHex(0x7a7060);this.hemi.intensity=1.65;this.keyLights[0].color.setHex(0xffe6bc);this.keyLights[0].intensity=1.8;this.keyLights[1].color.setHex(0xb3ced6);this.keyLights[1].intensity=.8;}else{this.controls.minDistance=8;this.controls.maxDistance=27;this.controls.maxPolarAngle=2.1;this.scene.background=null;this.scene.fog=null;this.hemi.color.setHex(0xf1e5ff);this.hemi.groundColor.setHex(0x26132d);this.hemi.intensity=2;this.keyLights[0].color.setHex(0xffdf9b);this.keyLights[0].intensity=3;this.keyLights[1].color.setHex(0x9c7ed7);this.keyLights[1].intensity=2;}
  this.hotspotLayer.hidden=this.mode!==0;this.breathBadge.hidden=!(this.mode===0||this.mode===1||this.mode===3||this.mode===5||perception);if(this.mode!==0)this.closePathwayInfo();
  this.setLabels();this.dirty=true;this.render();
 }
 setLabels(){
  this.labels.replaceChildren();const s=this.state;let list=[];
  if(this.mode===0)list=[];
  if(this.mode===1)list=[['Sensory tissue · high inside the nose',this.anatomyBust,this.receptorPoint,.04,.15],['Magnified olfactory sensory neurons',this.cells,V(0,0,0),.5,.1],['Odour molecules → receptors on cilia',this.cells,V(0,-.9,0),.55,.85],['Olfactory bulb',this.cells,V(0,1.7,0),.46,.29],['Olfactory cortex · schematic',this.detector.cortex,V(),.74,.21]];
  if(this.mode===1&&s.step===2)list=[['Nose → sensory neurons → bulb',this.anatomyBust,this.receptorPoint,.04,.15],['Travelling electrical pulses · axons',this.signalRoot,V(-1,-.5,0),.43,.8],['Olfactory bulb',this.signalDiagram.bulb,V(),.51,.2],['Onward to olfactory cortex',this.signalDiagram.cortical,V(),.75,.17]];
  if(this.mode===2)list=s.chapter===1?[['Emotion networks',this.brainRoot,this.emotion.position,.65,.25],['Memory networks',this.brainRoot,this.memory.position,.52,.8],['Brain location in the head',this.memoryContext,V(0,2.6,-.1),.04,.25]]:[['A firing pattern across connected neurons',this.brainRoot,V(.4,.5,1),.07,.15]];
  if(this.mode===3)list=[[s.step===0?'Projection · around you':'Sillage · left in the air',this.groups[3],V(-1,2,-.5),.07,.2]];
  if(this.mode===5)list=this.appliedSites.size?[['Your chosen application areas',this.actor,V(0,2.8,0),.05,.18],['Wrist and palm · skin example',this.skinRoot,V(0,.2,.35),.6,.15],['Fragrance remaining on skin',this.skinRoot,V(0,-.3,.75),.58,.82]]:[];
  if(this.mode===4)list=[5,10,20,30].map((p,i)=>[p+'% · '+['Cologne','EDT','EDP','Extrait'][i],this.bottles[i],V(0,-1.6,0),.1+i*.23,.82]);
  if(this.mode===5&&s.skinZoom===false)list=list.slice(0,1);
  this.labels.removeAttribute('aria-hidden');this.labelItems=list.map(([text,object,p,x,y])=>{const el=document.createElement(this.mode===1?'button':'span');if(this.mode===1){el.type='button';el.addEventListener('pointerenter',()=>this.openAnnotation(text,object,p));el.addEventListener('focus',()=>this.openAnnotation(text,object,p));el.addEventListener('click',()=>this.openAnnotation(text,object,p));}el.className='anchored-label';el.textContent=text;el.style.left=x*100+'%';el.style.top=y*100+'%';this.labels.append(el);return {object,p,el};});
 }
 setPaused(value){this.paused=value;this.dirty=true;}
 applyDeposits(){const s=this.state,areas=Math.max(1,this.appliedSites.size),vol={bright:1.4,balanced:.85,lasting:.45}[s.material]||.85;const rate=vol*Math.sqrt(areas);const left=Math.exp(-(s.age||0)/100*rate*2.5);this.deposits.forEach((m,i)=>{m.visible=this.appliedSites.size>0&&(i*.618033%1)<left;m.material.opacity=s.doseMode==='per-area'?.85:.85/Math.sqrt(areas);});}
 spraySite(site){if(!['neck','wrists','forearms'].includes(site))return;this.sprayQueue.push(site);this.dirty=true;}
 resetTime(){this.time=0;this.viewStartedAt=0;this.appliedSites.clear();this.sprayQueue=[];this.sprayAction=null;this.sprayMist=[];this.emissionBudget=0;this.streetCameraFollow=true;this.distance=0;this.walkBlend=0;this.cloud=[];this.position.set(-2,0,0);this.actor.position.copy(this.position);this.dirty=true;}
 resize(){this.width=this.container.clientWidth;this.height=this.container.clientHeight;if(!this.width||!this.height)return;this.camera.aspect=this.width/this.height;this.camera.updateProjectionMatrix();this.renderer.setSize(this.width,this.height);this.overlay.width=this.width*devicePixelRatio;this.overlay.height=this.height*devicePixelRatio;this.overlay.style.width=this.width+'px';this.overlay.style.height=this.height+'px';this.ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);this.dirty=true;}
 project(p){const q=p.clone().project(this.camera);return [(q.x+1)*this.width/2,(1-q.y)*this.height/2,q.z];}
 glow(p,r=4,alpha=.6,color='201,164,101'){const [x,y,z]=this.project(p);if(z>1||z< -1)return;const c=this.ctx,g=c.createRadialGradient(x,y,0,x,y,r*3);g.addColorStop(0,'rgba('+color+','+alpha+')');g.addColorStop(.18,'rgba('+color+','+alpha*.6+')');g.addColorStop(1,'rgba('+color+',0)');c.fillStyle=g;c.fillRect(x-r*3,y-r*3,r*6,r*6);}
 advance(dt){
  const s=this.state;this.time+=dt;
  if(this.mode===3||this.mode===5){
   const moving=this.mode===3&&s.step===1&&s.movement;this.walkBlend+=(Number(moving)-this.walkBlend)*(1-Math.exp(-dt*3));this.distance+=dt*1.35*this.walkBlend;
   if(this.distance>0){const u=(this.distance/this.pathLength)%1;this.position.copy(this.path.getPointAt(u));const tangent=this.path.getTangentAt(u);this.actor.rotation.y=Math.atan2(tangent.x,tangent.z);}
   this.actor.position.copy(this.position);this.sprayBottle.visible=false;
   if(this.rig){
    if(!this.sprayAction&&this.sprayQueue.length)this.sprayAction={site:this.sprayQueue.shift(),elapsed:0,emitted:false};
    const action=this.sprayAction;
    if(action){
     action.elapsed+=dt;const phase=sprayPhase(action.elapsed);this.scene.updateMatrixWorld(true);
     const target=action.site==='neck'?this.rig.bones.Neck.bone.getWorldPosition(V()):action.site==='wrists'?this.rig.bones.RightHand.bone.getWorldPosition(V()):this.rig.bones.RightForeArm.bone.getWorldPosition(V()).lerp(this.rig.bones.RightHand.bone.getWorldPosition(V()),.55),q=this.actor.getWorldQuaternion(new T.Quaternion()),handGoal=target.clone().add(V(action.site==='neck'?-.24:-.16,.08,.36).applyQuaternion(q));
     this.rig.pose(this.time,this.walkBlend,{reach:phase.reach,handTarget:handGoal});this.scene.updateMatrixWorld(true);
     const hand=this.rig.bones.LeftHand.bone.getWorldPosition(V()),direction=target.clone().sub(hand).normalize();this.sprayBottle.position.copy(hand);this.sprayBottle.quaternion.setFromUnitVectors(V(0,0,1),direction);this.sprayBottle.visible=phase.reach>.03;this.sprayNozzle.position.y=phase.press?.062:.072;
     if(phase.applied&&!action.emitted){
      action.emitted=true;this.appliedSites.add(action.site);this.zoomProgress=0;this.applyDeposits();this.groups[5].visible=this.mode===5&&s.skinZoom!==false;this.setLabels();
      const nozzle=this.sprayBottle.localToWorld(V(0,.08,.04));for(let i=0;i<14;i++)this.sprayMist.push({from:nozzle.clone(),to:target.clone().add(V((Math.random()-.5)*.12,(Math.random()-.5)*.12,(Math.random()-.5)*.12)),age:-i*.012,life:.32});
     }
     this.breathBadge.textContent=phase.press?'Spraying · '+action.site:phase.reach>.3?'Applying fragrance · '+action.site:'Lowering the bottle';if(phase.done)this.sprayAction=null;
    }else{this.rig.pose(this.time,this.walkBlend);this.breathBadge.textContent=this.appliedSites.size?({winter:'Winter · slower release, closer cloud',temperate:'Mild · a gentle fragrance cloud',summer:'Summer · faster release, wider early cloud'}[s.weather]):'No fragrance yet · choose an application area';}
    this.scene.updateMatrixWorld(true);
    const sites=[...this.appliedSites],areas=sites.length,weather=weatherProfiles[s.weather]||weatherProfiles.temperate;
    if(this.mode===3&&areas){
     const sources=sites.flatMap(site=>this.rig.point(site).map(p=>({p,site})));this.emissionBudget+=dt*weather.rate*(s.doseMode==='per-area'?areas:1)*Math.sqrt(areas);
     while(this.emissionBudget>=1){this.emissionBudget--;const source=sources[Math.floor(Math.random()*sources.length)];if(!source)break;this.cloud.push({p:source.p.clone().add(V((Math.random()-.5)*.09,(Math.random()-.5)*.09,(Math.random()-.5)*.09)),v:V((Math.random()-.5)*weather.spread+(s.airflow||0)/100*.9,.18+Math.random()*.20,(Math.random()-.5)*weather.spread),age:0,life:weather.life+Math.random()*.7,site:source.site});}
    }
   }
   this.cloud.forEach(p=>{p.age+=dt;p.p.addScaledVector(p.v,dt);});this.cloud=this.cloud.filter(p=>p.age<p.life).slice(-160);this.sprayMist.forEach(p=>p.age+=dt);this.sprayMist=this.sprayMist.filter(p=>p.age<p.life);
   if(!this.gpu&&this.proxies.length)this.skinSoftware(this.proxies);
  }
  if(this.mode===5&&this.appliedSites.size){this.zoomProgress=Math.min(1,(this.zoomProgress||0)+dt*.7);const t=this.zoomProgress*this.zoomProgress*(3-2*this.zoomProgress);this.skinRoot.scale.setScalar(.03+t*.97);if(this.state.skinZoom!==false&&this.zoomProgress<1){this.camera.position.lerpVectors(V(8,5.2,12),V(5,4.3,8),t);this.controls.target.lerpVectors(V(0,1.9,-.8),V(.7,2,0),t);this.controls.update();}}
 }
 render(){
  if(!this.width)return;const viewElapsed=Math.max(0,this.time-(this.viewStartedAt||0));
  if(this.mode===0)this.prepareStreet();
  if(this.mode===1&&this.state.step===1){this.prepareDetect();this.detectActivity=this.detector.update(Math.max(0,viewElapsed-1.8));}
  if(this.mode===1&&this.state.step===2)this.signalActivity=this.signalDiagram.update(viewElapsed);
  if(this.mode===2){this.cascadeEvents=neuralCascade(this.cortex,viewElapsed);if(this.state.chapter===0&&this.state.step===3)this.preparePerception();}
  this.scene.updateMatrixWorld(true);this.renderer.render(this.scene,this.camera);const c=this.ctx;c.clearRect(0,0,this.width,this.height);
  if(this.mode===3)this.cloud.forEach(p=>this.glow(p.p,1.75,(1-p.age/p.life)*.44));
  if(this.mode===3||this.mode===5)for(const drop of this.sprayMist){if(drop.age<0)continue;const f=drop.age/drop.life;this.glow(drop.from.clone().lerp(drop.to,f),1.35,Math.sin(Math.PI*f)*.45);}
  if((this.mode===3||this.mode===5)&&this.rig){for(const site of this.appliedSites)for(const p of this.rig.point(site))this.glow(p,7,.9);}
  if(this.mode===5&&this.rig&&this.appliedSites.size){const point=this.rig.point([...this.appliedSites][0])[0];if(point){const end=this.skinRoot.localToWorld(V(0,-.2,.15)),mid=point.clone().lerp(end,.5).add(V(0,.6,.2)),a=this.skinLink.geometry.attributes.position;[point,mid,end].forEach((p,i)=>a.setXYZ(i,p.x,p.y,p.z));a.needsUpdate=true;this.skinLink.geometry.computeBoundingSphere();}}
  if(this.mode===5&&this.state.skinZoom!==false&&this.appliedSites.size){const s=this.state,age=(s.age||0)/100,left=Math.exp(-age*2.5*Math.sqrt(Math.max(1,s.sites.length))*({bright:1.4,balanced:.85,lasting:.45}[s.material]||.85));for(let i=0;i<55;i++){const phase=(i*.618+this.time*.17)%1,base=this.skinSeeds[i*2].clone();base.y+=phase*1.8;base.z+=phase*.7;this.glow(this.skinRoot.localToWorld(base),2,(1-phase)*left*.65);}}
  if(this.mode===0){
   const motion=this.streetState,phase=motion.phase,neural=motion.neural;this.breathBadge.textContent=this.paused?'Scene paused':motion.stage;
   for(const source of this.village.sources())for(let i=0;i<9;i++){const f=(i*.618+this.time*.2)%1;this.glow(source.clone().add(V(-f*.5,f*.8,Math.sin(i+f)*f*.3)),1,.16*(1-f),'202,167,123');}
   const nose=this.headRoot.localToWorld(this.nosePoint.clone());
   for(const seed of (this.gpu?[]:this.aromaSeeds)){
    const start=this.jasmine.root.localToWorld(seed.source.clone()),f=(seed.phase+this.time*seed.speed)%1,p=start.clone();
    // Independent smooth eddies suggest wind and dispersion, not straight molecular trajectories.
    p.x-=f*(1.4+seed.phase*2);p.y+=f*(.6+seed.phase*.9)+Math.sin(seed.angle+this.time*.5)*f*.35;p.z+=Math.sin(seed.angle+f*5+this.time*.25)*f*1.3;
    this.glow(p,1.8+seed.phase,.4*Math.min(1,f*18)*Math.pow(1-f,.85),'255,184,76');
    if(seed.inhaled&&motion.reach>.7){
     const capture=motion.capture<0?-1:(motion.capture-seed.phase*.25)/.75;
     if(capture>=0&&capture<=1){const flower=this.jasmine.root.localToWorld((this.flowerSource||seed.source).clone()),q=flower.lerp(nose,capture*capture*(3-2*capture)),spread=Math.sin(capture*Math.PI);q.y+=spread*(.3+Math.sin(seed.angle+capture*4)*.3);q.z+=spread*Math.sin(seed.angle)*.6;
      const fade=Math.min(1,capture*5)*Math.min(1,(1-capture)*12);this.glow(q,2.1+seed.phase,.8*fade,'255,189,85');}
    }
   }
   this.hotspotLayer.hidden=!this.streetRig||!(motion.capture>=0||neural>=0);if(this.hotspotLayer.hidden&&this.openRegion)this.closePathwayInfo();
   this.olfactoryRegions.forEach(region=>{
    const phaseSignal=neural>=0?neural*4+2:-20;const strength=region.name==='Nose'&&motion.capture>=0?Math.sin(motion.capture*Math.PI):Math.exp(-(((phaseSignal-region.center)/.65)**2));region.mesh.material.opacity=strength*.48;if(strength>.035)this.glow(this.headRoot.localToWorld(region.position.clone()),2+strength*3,strength*.75,'255,184,76');
    region.button.classList.toggle('is-lit',strength>.28);
   });
   // This pulse begins at the receptors: it is neural activity, not a molecule entering the brain.
   if(motion.capture>.7){const f=(motion.capture-.7)/.3,p=this.nosePoint.clone().lerp(this.receptorPoint,f);this.glow(this.headRoot.localToWorld(p),2,.65*Math.sin(Math.PI*f),'255,202,113');}
   if(neural>=0){const p=this.neuralPath.getPoint(neural);this.glow(this.headRoot.localToWorld(p),3.6,.95,'255,202,113');}
   this.positionPathwayInfo();
  }
  if(this.mode===1&&this.state.step===1){
   const q=this.detectProgress||0,nose=this.anatomyBust.localToWorld(this.receptorPoint.clone()),edge=this.cells.localToWorld(V(-2.2,-.6,0)),middle=nose.clone().lerp(edge,.5).add(V(0,.5,0)),points=this.magnifier.geometry.attributes.position;[nose,middle,edge].forEach((p,i)=>points.setXYZ(i,p.x,p.y,p.z));points.needsUpdate=true;this.magnifier.geometry.computeBoundingSphere();
   const activity=this.detectActivity;this.breathBadge.textContent=q<1?'Purple anatomy view → enlarged sensory tissue':activity.stage;
   for(const event of activity.events)this.glow(this.cells.localToWorld(event.p.clone()),event.neural?3.5:2.8,event.alpha*.9,'255,192,90');
   this.glow(nose,5,.3+.4*Math.exp(-Math.pow((activity.phase-3)/1.0,2)),'255,192,90');this.glow(this.detector.cortex.localToWorld(V()),8,activity.cortexGlow*.7,'255,192,90');
   for(let i=0;i<12;i++){const f=(viewElapsed*.23+i*.618)%1,p=this.nosePoint.clone().add(V(-2.1*(1-f),-.3*(1-f),.8*(1-f)));this.glow(this.anatomyBust.localToWorld(p),2,Math.sin(Math.PI*f)*.65,'255,192,90');}
   this.positionPathwayInfo();
  }
  if(this.mode===1&&this.state.step===2){
   const activity=this.signalActivity;this.breathBadge.textContent=activity.stage;
   for(const event of activity.events)this.glow(this.signalRoot.localToWorld(event.p.clone()),4,event.alpha*.85,'255,210,133');
   const f=T.MathUtils.clamp((activity.phase-1.0)/5.5,0,1);this.glow(this.anatomyBust.localToWorld(this.neuralPath.getPoint(f)),5,.8,'255,207,119');
   this.glow(this.anatomyBust.localToWorld(this.bulbPoint.clone()),5,activity.bulb*.9,'255,207,119');this.glow(this.signalDiagram.bulb.localToWorld(V()),8,activity.bulb*.8,'255,207,119');this.positionPathwayInfo();
  }
  if(this.mode===2){for(const event of this.cascadeEvents||[])this.glow(this.brainRoot.localToWorld(event.p.clone()),3.2,event.alpha*.9,'255,210,140');}
  // Labels occupy separated margin positions; leaders end at real 3D objects.
  this.labelItems?.forEach(({object,p,el})=>{const [x,y]=this.project(object.localToWorld(p.clone())),box=el.getBoundingClientRect(),r=this.container.getBoundingClientRect(),ex=box.left-r.left+box.width/2,ey=box.bottom-r.top+3;c.strokeStyle='rgba(201,164,101,.42)';c.lineWidth=.8;c.beginPath();c.moveTo(ex,ey);c.lineTo(x,y);c.stroke();c.fillStyle='#c9a465';c.beginPath();c.arc(x,y,2,0,7);c.fill();});
 }
 loop(now){this.frame=requestAnimationFrame(this.loop);if(now-this.drawAt<(this.gpu?28:150))return;const dt=Math.min((now-this.last)/1000,.22);this.last=now;this.drawAt=now;if(document.hidden)return;if(!this.paused)this.advance(dt);if(!this.paused||this.dirty){this.render();this.dirty=false;}}
 dispose(){cancelAnimationFrame(this.frame);this.observer.disconnect();this.controls.dispose();this.renderer.dispose?.();this.hotspotLayer.remove();this.info.remove();this.breathBadge.remove();this.memoryCaption.remove();this.memoryReplay.remove();}
}
