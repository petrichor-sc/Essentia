import * as T from '../atlas/assets/three.module.js';
export const STREET_BUILD='street-20261028-r1';
export const STREET_GROUND=-2.72;
export const STREET_POLE=new T.Vector3(.35,STREET_GROUND,1.35);
const V=(x,y,z)=>new T.Vector3(x,y,z);
const surface=(color,extra={})=>new T.MeshStandardMaterial({color,roughness:.88,metalness:0,...extra});
export function hillStreet(){
 const root=new T.Group(),lanterns=[];
 const box=(parent,w,h,d,p,mat)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),mat);m.position.copy(p);parent.add(m);return m;};
 const cylinder=(parent,r1,r2,h,p,mat,n=14)=>{const m=new T.Mesh(new T.CylinderGeometry(r1,r2,h,n),mat);m.position.copy(p);parent.add(m);return m;};
 const wood=surface(0x58443a),cream=surface(0xe4d4b5),iron=surface(0x383c3d),stone=surface(0x8e877c),glass=surface(0x584c42,{emissive:0xffce7e,emissiveIntensity:.18}),roofMat=surface(0x4d6263);
 function sign(parent,text,w,h,p,bg='#294d45',fg='#f4dfb3'){
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=256;const c=canvas.getContext('2d');c.fillStyle=bg;c.fillRect(0,0,1024,256);c.strokeStyle=fg;c.lineWidth=5;c.strokeRect(15,15,994,226);c.fillStyle=fg;c.textAlign='center';c.textBaseline='middle';c.font='54px Georgia';c.fillText(text,512,134,950);
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
  const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:texture}));m.position.copy(p);parent.add(m);return m;
 }
 function arch(parent,x,y,z,w,h){
  const panel=new T.Shape(),radius=w/2;panel.moveTo(-w/2,0);panel.lineTo(w/2,0);panel.lineTo(w/2,h-radius);panel.absarc(0,h-radius,radius,0,Math.PI,false);panel.lineTo(-w/2,0);
  const mesh=new T.Mesh(new T.ShapeGeometry(panel,18),glass);mesh.position.set(x,y,z);parent.add(mesh);
  const path=[V(x-w/2,y,z+.035),V(x-w/2,y+h-radius,z+.035)];for(let i=0;i<=20;i++){const a=Math.PI-i/20*Math.PI;path.push(V(x+Math.cos(a)*radius,y+h-radius+Math.sin(a)*radius,z+.035));}path.push(V(x+w/2,y,z+.035));
  const curve=new T.CatmullRomCurve3(path);const trim=new T.Mesh(new T.TubeGeometry(curve,45,.045,6,false),cream);parent.add(trim);
  box(parent,.045,h-.1,.07,V(x,y+h/2-.03,z+.05),cream);box(parent,w,.04,.07,V(x,y+.65,z+.05),cream);box(parent,w,.045,.07,V(x,y+h-radius,z+.05),cream);
 }
 function porch(parent,w){
  box(parent,w+.5,.18,1.25,V(0,.12,2.1),stone);
  for(const side of [-1,1]){const x=side*(w/2-.25);box(parent,.12,2.9,.12,V(x,1.6,2.25),wood);box(parent,(w-1.1)/2,.07,.07,V(side*(w/4+.28),.9,2.66),cream);for(let i=0;i<6;i++)box(parent,.035,.62,.035,V(side*(.65+i*(w/2-.8)/5),.55,2.66),cream);}
 }
 function facade(x,z,w,color,name){
  const building=new T.Group();building.position.set(x,STREET_GROUND,z);root.add(building);
  box(building,w,5.3,3.5,V(0,2.65,0),surface(color));box(building,w+.18,.2,3.65,V(0,2.85,0),cream);box(building,w,.45,3.6,V(0,.22,0),stone);
  for(const px of [-w/2+.1,w/2-.1])box(building,.13,5.35,3.64,V(px,2.68,0),cream);
  arch(building,-w*.29,.44,1.79,w*.24,1.9);arch(building,0,.3,1.8,w*.27,2.1);arch(building,w*.29,.44,1.79,w*.24,1.9);
  for(const px of [-w*.28,w*.28]){arch(building,px,3.25,1.8,w*.22,1.55);box(building,w*.26,.09,.35,V(px,3.17,1.87),wood);}
  box(building,w+.35,.12,1.4,V(0,2.86,2.12),wood);for(let i=0;i<12;i++)box(building,w/12+.005,.07,1.2,V(-w/2+(i+.5)*w/12,2.93,2.12),i%2?cream:surface(0x53736c));
  sign(building,name,w*.7,.4,V(0,2.5,2.84));porch(building,w);
  for(const side of [-1,1]){const roof=box(building,w/2+.5,.12,4.2,V(side*w*.23,5.62,0),roofMat);roof.rotation.z=-side*.28;}
  for(const px of [-w*.43,w*.43]){
   const lamp=cylinder(building,.08,.08,.24,V(px,2.05,1.98),glass);box(building,.17,.04,.19,V(px,2.21,1.98),iron);lanterns.push(lamp);
  }
  return building;
 }
 // Adjacent shopfronts define a pedestrian street rather than isolated toy houses.
 facade(-6.8,-5.35,4.6,0x83998b,'THE HILL COFFEE ROOM');
 facade(-2.05,-5.5,4.7,0xb98771,'BOOKS & BOTANICALS');
 facade(2.85,-5.2,4.8,0xa1afa6,'CEDAR CAFÉ');
 facade(7.7,-5.6,4.6,0x9a9aaf,'HILLSIDE BAKERY');
 // Reverse shopfronts and trees also give orbit views a populated foreground.
 const distant=facade(-11,3,4.5,0x849888,'TEA ON THE VERANDA');distant.rotation.y=Math.PI/2;
 const end=facade(11,3,4.7,0xbc9c7b,'THE OLD POST OFFICE');end.rotation.y=-Math.PI/2;
 const earth=new T.Mesh(new T.CircleGeometry(95,96),surface(0x65645c));earth.rotation.x=-Math.PI/2;earth.position.y=STREET_GROUND-.12;root.add(earth);
 const paving=box(root,29,.12,10,V(0,STREET_GROUND-.06,1),surface(0xaaa395));
 // Batched individual paving stones, with a low-poly fallback handled by Three's renderer.
 const rows=20,cols=52,total=rows*cols,tiles=new T.InstancedMesh(new T.BoxGeometry(.53,.025,.46),surface(0xa69e90),total),dummy=new T.Object3D();
 for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const n=j*cols+i;dummy.position.set(-14+i*.55+(j%2)*.26,STREET_GROUND+.002,-3.6+j*.48);dummy.updateMatrix();tiles.setMatrixAt(n,dummy.matrix);tiles.setColorAt(n,new T.Color().setHSL(.095,.06,.53+((n*17)%9)*.008));}tiles.instanceMatrix.needsUpdate=true;root.add(tiles);
 for(const z of [-3.95,6.1])box(root,29,.1,.18,V(0,STREET_GROUND+.01,z),cream);
 function planter(x,z){const g=new T.Group();g.position.set(x,STREET_GROUND,z);root.add(g);cylinder(g,.24,.18,.42,V(0,.21,0),surface(0x9c6c53));for(let i=0;i<9;i++){const a=i*2.4,m=new T.Mesh(new T.SphereGeometry(1,8,6),surface(i%2?0x577659:0x7a8a61));m.position.set(Math.cos(a)*.2,.5+Math.sin(i)*.08,Math.sin(a)*.2);m.scale.set(.2,.32,.12);m.rotation.z=Math.sin(a)*.7;g.add(m);}}
 for(const x of [-8.6,-5,-3,.8,4.8,7.8,10])planter(x,-2.25);
 function chair(parent,x,z,angle){const g=new T.Group();g.position.set(x,0,z);g.rotation.y=angle;parent.add(g);box(g,.42,.055,.42,V(0,.47,0),wood);box(g,.42,.4,.055,V(0,.72,-.19),wood);for(const dx of [-.16,.16])for(const dz of [-.16,.16])box(g,.035,.46,.035,V(dx,.23,dz),iron);}
 for(const x of [-6.4,3.2,6.8]){const cafe=new T.Group();cafe.position.set(x,STREET_GROUND,-1.1);root.add(cafe);cylinder(cafe,.45,.45,.06,V(0,.76,0),wood,24);cylinder(cafe,.045,.045,.73,V(0,.36,0),iron);cylinder(cafe,.24,.24,.04,V(0,.035,0),iron);chair(cafe,-.7,0,Math.PI/2);chair(cafe,.7,0,-Math.PI/2);for(const dx of [-.18,.18]){cylinder(cafe,.055,.043,.08,V(dx,.835,.04),cream,12);}}
 // Benches, a menu board and low iron street rails fill the walking space.
 for(const x of [-8,7]){const g=new T.Group();g.position.set(x,STREET_GROUND,4.65);root.add(g);for(let k=0;k<4;k++)box(g,1.7,.05,.1,V(0,.48,k*.12-.18),wood);for(let k=0;k<3;k++)box(g,1.7,.1,.05,V(0,.72+k*.12,-.25),wood);for(const dx of [-.65,.65])box(g,.08,.5,.35,V(dx,.24,0),iron);}
 const board=new T.Group();board.position.set(1.2,STREET_GROUND,-1.8);board.rotation.y=-.2;root.add(board);box(board,.65,.9,.07,V(0,.6,0),wood);sign(board,'COFFEE • TEA',.55,.6,V(0,.65,.04),'#303d39');
 function tree(x,z,h=4.5){const trunk=surface(0x6d5b4e);cylinder(root,.12,.2,h,V(x,STREET_GROUND+h/2,z),trunk);for(let j=0;j<5;j++){const a=j*2.4;const canopy=new T.Mesh(new T.IcosahedronGeometry(1,1),surface(j%2?0x5e735f:0x71826b));canopy.position.set(x+Math.cos(a)*.8,STREET_GROUND+h+Math.sin(j)*.45,z+Math.sin(a)*.7);canopy.scale.set(1.35,1,1.2);root.add(canopy);}}
 tree(-10,-1);tree(10,-.2);tree(-8,6);tree(8,7);
 // The old pole, insulators and gently sagging telephone lines use metre-like scale.
 cylinder(root,.075,.13,4.8,STREET_POLE.clone().add(V(0,2.4,0)),wood);
 box(root,1.1,.1,.13,STREET_POLE.clone().add(V(0,4.45,0)),wood);
 for(const dx of [-.42,-.14,.14,.42]){cylinder(root,.05,.045,.12,STREET_POLE.clone().add(V(dx,4.56,0)),cream);const line=new T.CatmullRomCurve3([STREET_POLE.clone().add(V(dx-14,4.7,-.8)),STREET_POLE.clone().add(V(dx-6,3.9,-.3)),STREET_POLE.clone().add(V(dx,4.62,0)),STREET_POLE.clone().add(V(dx+7,3.85,.2)),STREET_POLE.clone().add(V(dx+15,4.6,.5))]);root.add(new T.Line(new T.BufferGeometry().setFromPoints(line.getPoints(80)),new T.LineBasicMaterial({color:0x6a625d,transparent:true,opacity:.55})));}
 // Rounded, low distant foothills surround the street below the skyline.
 for(let layer=0;layer<3;layer++){
  const positions=[],r=62+layer*20,base=STREET_GROUND-2;
  for(let i=0;i<128;i++){const a=i/128*Math.PI*2,b=(i+1)/128*Math.PI*2,height=t=>2.1+layer*1.5+Math.sin(t*5+layer)*1.2+Math.sin(t*9-layer)*.8;const p=V(Math.cos(a)*r,height(a),Math.sin(a)*r),q=V(Math.cos(b)*r,height(b),Math.sin(b)*r);positions.push(p.x,base,p.z,...p.toArray(),...q.toArray(),p.x,base,p.z,...q.toArray(),q.x,base,q.z);}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.computeVertexNormals();root.add(new T.Mesh(geo,new T.MeshBasicMaterial({color:[0x637677,0x829294,0xa2abab][layer],side:T.DoubleSide})));
 }
 // Quiet ambient figures remain away from the main interaction.
 const walkers=[];for(let i=0;i<3;i++){
  const person=new T.Group();root.add(person);const coat=surface([0x71637d,0x8d7668,0x63837b][i]),skin=surface(0xbe9a7e),hair=surface(0x423834);
  const torso=new T.Mesh(new T.CapsuleGeometry(.14,.47,5,10),coat);torso.position.y=1.07;person.add(torso);const head=new T.Mesh(new T.SphereGeometry(.135,14,10),skin);head.position.y=1.59;person.add(head);const cap=new T.Mesh(new T.SphereGeometry(.14,12,8),hair);cap.position.set(0,1.66,-.02);cap.scale.y=.65;person.add(cap);const limbs=[];
  for(const side of [-1,1]){const leg=new T.Group();leg.position.set(side*.085,.78,0);person.add(leg);const m=new T.Mesh(new T.CapsuleGeometry(.061,.57,4,8),coat);m.position.y=-.32;leg.add(m);const arm=new T.Group();arm.position.set(side*.22,1.25,0);person.add(arm);const a=new T.Mesh(new T.CapsuleGeometry(.045,.42,4,8),coat);a.position.y=-.25;arm.add(a);limbs.push({leg,arm,side});}walkers.push({person,limbs,index:i});
 }
 return {root,pole:STREET_POLE.clone(),ground:STREET_GROUND,update(t){walkers.forEach(({person,limbs,index})=>{const phase=t*.075+index*2.1;person.position.set(Math.sin(phase)*8,STREET_GROUND,-.8-index*.38);person.rotation.y=Math.cos(phase)>0?Math.PI/2:-Math.PI/2;limbs.forEach(({leg,arm,side})=>{const gait=Math.sin(t*3.8+side*Math.PI/2+index)*.28;leg.rotation.x=gait;arm.rotation.x=-gait;});});},sources(){return walkers.map(w=>w.person.localToWorld(V(0,1.25,0)));}};
}
export function cloneRiggedModel(source){
 const copy=source.clone(true),map=new Map();function pair(a,b){map.set(a,b);a.children.forEach((c,i)=>pair(c,b.children[i]));}pair(source,copy);
 source.traverse(o=>{if(!o.isSkinnedMesh)return;const cloned=map.get(o);cloned.skeleton=o.skeleton.clone();cloned.skeleton.bones=o.skeleton.bones.map(b=>map.get(b));cloned.bindMatrix.copy(o.bindMatrix);cloned.bind(cloned.skeleton,cloned.bindMatrix);});return copy;
}
export function streetMotion(t){
 // Walk, settle, reach, inhale, smell, release, and walk back without teleporting.
 const phase=((t%24)+24)%24,smooth=x=>{x=T.MathUtils.clamp(x,0,1);return x*x*(3-2*x);},start=V(-3.1,STREET_GROUND,2.6),end=V(-.32,STREET_GROUND,.55);
 let position,walk=0,reach=0,yaw=0,breath=0,capture=-1,stage='A walk along the street';
 const direction=Math.atan2(end.x-start.x,end.z-start.z);
 if(phase<4.5){position=start.clone().lerp(end,smooth(phase/4.5));walk=Math.sin(Math.PI*phase/4.5)*.9;yaw=direction;}
 else if(phase<14.5){position=end.clone();yaw=T.MathUtils.lerp(direction,.35,smooth((phase-4.5)/1.2));reach=smooth((phase-4.7)/1.5)*(1-smooth((phase-12.5)/2));stage=phase<6.2?'Reaching gently for jasmine':phase<9.2?'Breathing in the jasmine':phase<12.5?'From receptors to the brain':'Letting the flower go';if(phase>=6.2&&phase<9.2){capture=(phase-6.2)/3;breath=.5-.5*Math.cos(capture*Math.PI);}else if(phase>=9.2&&phase<12.7)breath=.5+.5*Math.cos((phase-9.2)/3.5*Math.PI);}
 else if(phase<20){position=end.clone().lerp(start,smooth((phase-14.5)/5.5));walk=Math.sin(Math.PI*(phase-14.5)/5.5)*.9;yaw=direction+Math.PI;stage='Returning to the street';}
 else{position=start.clone();yaw=direction+Math.PI*(1-smooth((phase-20)/2));stage='A quiet pause';}
 return {phase,position,yaw,walk,reach,breath,capture,stage,neural:phase>=9.1&&phase<12.5?(phase-9.1)/3.4:-1};
}
