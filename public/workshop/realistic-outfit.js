import * as T from '../atlas/assets/three.module.js';

// Garments fitted to FC1's own bind mesh and 102-joint skeleton. The old
// visitor's clothing coordinates and skin shader do not fit this character.
export function dressRealisticVisitor(model){
 if(model.userData.workshopOutfit==='cream-brown-r17')return;
 const body=model.getObjectByName('ludovisions_FC1_mesh_01_2');
 const arms=model.getObjectByName('ludovisions_FC1_mesh_01_3');
 const legs=model.getObjectByName('ludovisions_FC1_mesh_01_4');
 if(!body||!arms||!legs)return;
 const skeleton=body.skeleton,find=name=>skeleton.bones.findIndex(b=>b.name.replace(/^mixamorig:?/,'')===name);
 const hips=find('Hips'),leftThigh=find('LeftUpLeg'),rightThigh=find('RightUpLeg');
 const remove=[];model.traverse(o=>{if(o.isMesh&&/ludovisions_FC1_mesh_0[78]/.test(o.name))remove.push(o);});remove.forEach(o=>o.removeFromParent());
 const root=new T.Group();root.name='FC1 cream knit, brown skirt and boots';body.parent.add(root);
 const texels=new Uint8Array(128*128*4);
 for(let y=0;y<128;y++)for(let x=0;x<128;x++){const i=(y*128+x)*4,c=Math.round(250+4*Math.cos(x*Math.PI/2));texels.set([c,c,c,255],i);}
 const rib=new T.DataTexture(texels,128,128,T.RGBAFormat);rib.wrapS=rib.wrapT=T.RepeatWrapping;rib.repeat.set(3,1);rib.colorSpace=T.SRGBColorSpace;rib.needsUpdate=true;
 const cream=new T.MeshPhysicalMaterial({color:0xece2cf,map:rib,bumpMap:rib,bumpScale:.00035,roughness:.88,sheen:.25,sheenRoughness:.85,side:T.DoubleSide});
 const brown=new T.MeshStandardMaterial({color:0x51372d,roughness:.95,side:T.DoubleSide});
 const leather=new T.MeshPhysicalMaterial({color:0x35221b,roughness:.48,clearcoat:.12,clearcoatRoughness:.65,side:T.DoubleSide});
 function attach(geometry,material,name){
  const mesh=new T.SkinnedMesh(geometry,material);mesh.name=name;mesh.userData.workshopDress=true;mesh.userData.workshopSurface=material===cream?'knit':material===brown?'skirt':'boots';mesh.position.copy(body.position);mesh.quaternion.copy(body.quaternion);mesh.scale.copy(body.scale);root.add(mesh);mesh.bind(skeleton,body.bindMatrix);return mesh;
 }
 function skinAt(source,p){
  const g=source.geometry,a=g.attributes.position;let best=Infinity,closest=0;
  for(let i=0;i<a.count;i++){const d=(a.getX(i)-p[0])**2+(a.getY(i)-p[1])**2+(a.getZ(i)-p[2])**2;if(d<best){best=d;closest=i;}}
  return [Array.from(g.attributes.skinIndex.array.slice(closest*4,closest*4+4)),Array.from(g.attributes.skinWeight.array.slice(closest*4,closest*4+4))];
 }
 function shape(sections,y){let i=0;while(i<sections.length-2&&y>sections[i+1][0])i++;const a=sections[i],b=sections[i+1],t=T.MathUtils.smoothstep(y,a[0],b[0]);return [1,2,3].map(k=>T.MathUtils.lerp(a[k],b[k],t));}
 function surface(columns,rows,point,weights,material,name){
  const p=[],uv=[],joints=[],amounts=[],index=[];
  for(let j=0;j<=rows;j++)for(let i=0;i<=columns;i++){const phi=i/columns*Math.PI*2,t=j/rows,q=point(phi,t),[ids,w]=weights(q,phi,t);p.push(...q);uv.push(i/columns,t);joints.push(...ids);amounts.push(...w);}
  const stride=columns+1;for(let j=0;j<rows;j++)for(let i=0;i<columns;i++){const a=j*stride+i,b=a+stride;index.push(a,b,a+1,a+1,b,b+1);}
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setAttribute('skinIndex',new T.Uint16BufferAttribute(joints,4));g.setAttribute('skinWeight',new T.Float32BufferAttribute(amounts,4));g.setIndex(index);g.computeVertexNormals();return attach(g,material,name);
 }
 // A smooth fabric envelope clears the skin without separate breast cups.
 const shirt=[[1.00,.158,.106,.018],[1.04,.150,.103,.022],[1.10,.132,.103,.030],[1.17,.136,.112,.027],[1.23,.149,.128,.026],[1.29,.163,.130,.015],[1.34,.151,.108,-.003],[1.38,.128,.094,-.012],[1.42,.094,.077,-.013],[1.445,.075,.067,-.010]];
 surface(80,48,(phi,t)=>{
  const front=Math.max(0,Math.sin(phi)),back=Math.max(0,-Math.sin(phi)),neck=1.431-.047*front**1.7-.015*back**2,y=T.MathUtils.lerp(1.005,neck,t),[rx,rz,cz]=shape(shirt,y);
  const c=Math.cos(phi),s=Math.sin(phi);
  return [Math.sign(c)*Math.abs(c)**.65*rx,y,cz+Math.sign(s)*Math.abs(s)**.65*rz];
 },p=>skinAt(body,p),cream,'Modest cream knit top fitted to FC1');
 // Copy and clip the original arm surface, keeping its exact skin weights.
 // The sleeves therefore follow both elbow bends and the reach gesture.
 const g=arms.geometry,srcP=g.attributes.position,srcN=g.attributes.normal,srcJ=g.attributes.skinIndex,srcW=g.attributes.skinWeight;
 for(const side of [-1,1]){
  const p=[],uv=[],joints=[],amounts=[],index=[];
  function interpolate(a,b,t){return {p:a.p.map((v,k)=>T.MathUtils.lerp(v,b.p[k],t)),n:a.n.map((v,k)=>T.MathUtils.lerp(v,b.n[k],t)),weights:a.weights.map((v,k)=>T.MathUtils.lerp(v,b.weights[k],t))};}
  function clip(poly,limit,keepGreater){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],da=side*a.p[0]-limit,db=side*b.p[0]-limit,inside=keepGreater?da>=0:da<=0,next=keepGreater?db>=0:db<=0;if(inside)out.push(a);if(inside!==next)out.push(interpolate(a,b,da/(da-db)));}return out;}
  for(let i=0;i<g.index.count;i+=3){
   let poly=[0,1,2].map(k=>{const v=g.index.getX(i+k),weights=new Array(skeleton.bones.length).fill(0);for(let n=0;n<4;n++)weights[srcJ.array[v*4+n]]+=srcW.array[v*4+n];return {p:[srcP.getX(v),srcP.getY(v),srcP.getZ(v)],n:[srcN.getX(v),srcN.getY(v),srcN.getZ(v)],weights};});
   poly=clip(clip(poly,.095,true),.595,false);if(poly.length<3)continue;
   const first=p.length/3;
   for(const v of poly){const normal=new T.Vector3(...v.n).normalize(),q=v.p.map((x,k)=>x+normal.getComponent(k)*.006);p.push(...q);uv.push(Math.abs(q[0])*1.8,q[2]*3);const w=v.weights.map((w,id)=>({w,id})).filter(v=>v.w>0).sort((a,b)=>b.w-a.w).slice(0,4),sum=w.reduce((s,v)=>s+v.w,0);for(let n=0;n<4;n++){joints.push(w[n]?.id||0);amounts.push((w[n]?.w||0)/sum);}}
   for(let k=1;k<poly.length-1;k++)index.push(first,first+k,first+k+1);
  }
  const sleeve=new T.BufferGeometry();sleeve.setAttribute('position',new T.Float32BufferAttribute(p,3));sleeve.setAttribute('uv',new T.Float32BufferAttribute(uv,2));sleeve.setAttribute('skinIndex',new T.Uint16BufferAttribute(joints,4));sleeve.setAttribute('skinWeight',new T.Float32BufferAttribute(amounts,4));sleeve.setIndex(index);sleeve.computeVertexNormals();attach(sleeve,cream,(side>0?'Left':'Right')+' fitted long cream sleeve');
 }
 const skirt=[[.66,.215,.240,.008],[.79,.208,.182,.008],[.90,.197,.142,.008],[.98,.173,.117,.015],[1.035,.158,.112,.022]];
 surface(80,40,(phi,t)=>{const y=T.MathUtils.lerp(.66,1.035,t),[rx,rz,cz]=shape(skirt,y),fold=.0015*Math.cos(phi*12)*(1-t)**2,c=Math.cos(phi),s=Math.sin(phi),power=T.MathUtils.lerp(.75,.65,t);return [Math.sign(c)*Math.abs(c)**power*(rx+fold),y,cz+Math.sign(s)*Math.abs(s)**power*(rz+fold)];},(p,phi,t)=>{
  const side=T.MathUtils.smoothstep(p[0],-.07,.07),a=.60*(1-t)**1.5;return [[hips,leftThigh,rightThigh,0],[1-a,a*side,a*(1-side),0]];
 },brown,'Chocolate-brown skirt with an even longer hem');
 // Dark tights retain the original leg geometry and detailed surface.
 legs.material=legs.material.clone();legs.material.color.set(0x463e3b);legs.material.roughness=.90;
 for(const sign of [-1,1])surface(56,44,(phi,t)=>{
  const y=T.MathUtils.lerp(.075,.535,t),[rx,rz,cz]=shape([[.075,.040,.043,-.010],[.15,.044,.048,-.008],[.30,.063,.068,-.006],[.43,.059,.064,-.004],[.535,.066,.085,-.002]],y),center=T.MathUtils.lerp(.101,.096,t);
  return [sign*center+Math.cos(phi)*rx,y,cz+Math.sin(phi)*rz];
 },p=>skinAt(legs,p),leather,(sign>0?'Left':'Right')+' fitted knee-high brown boot');
 const shoes=[];model.traverse(o=>{if(o.isMesh&&o.name.startsWith('ludovisions_FC1_mesh_05_'))shoes.push(o);});
 for(const shoe of shoes){if(/_05_[34]$/.test(shoe.name)){shoe.removeFromParent();continue;}shoe.material=leather.clone();if(shoe.name.endsWith('_2')){shoe.material.color.set(0x291c17);shoe.material.roughness=.8;}}
 // Covered skin is omitted, as in a dressed game character. This also avoids
 // flickering and skin poking through the knit or boots when the rig bends.
 // Positions and weights stay available for fitting and joint calculations.
 function coverSkin(mesh,covered){
  if(!mesh)return;const source=mesh.geometry,index=[],p=source.attributes.position;
  for(let i=0;i<source.index.count;i+=3){const tri=[0,1,2].map(k=>source.index.getX(i+k));if(!covered(tri.map(v=>p.getY(v))))index.push(...tri);}
  mesh.geometry=source.clone();mesh.geometry.setIndex(index);
 }
 coverSkin(body,ys=>ys.every(y=>y<1.375));
 coverSkin(legs,ys=>ys.every(y=>y<.525)||ys.every(y=>y>.675));
 coverSkin(model.getObjectByName('ludovisions_FC1_mesh_01_5'),ys=>ys.every(y=>y<.18));
 model.userData.workshopOutfit='cream-brown-r17';
}

export function finishRealisticHair(model){
 if(model.userData.workshopHairFinish==='fc1-cutout-r17')return;
 model.traverse(o=>{if(!o.isMesh||!o.name.startsWith('ludovisions_FC1_mesh_06_'))return;
  o.material=o.material.clone();const m=o.material;
  // FC1's many overlapping transparent hair cards sorted behind one another
  // and exposed the cap. Cutout depth testing keeps the strands in place.
  if(m.transparent){m.transparent=false;m.alphaTest=.035;m.alphaToCoverage=true;}
  m.depthWrite=true;m.side=T.DoubleSide;m.roughness=.78;m.metalness=0;if(m.specularIntensity!==undefined)m.specularIntensity=.25;
  m.needsUpdate=true;
 });
 model.userData.workshopHairFinish='fc1-cutout-r17';
}
