import * as T from '../atlas/assets/three.module.js';

// Long layered waves, with an exposed forehead and a swept, off-centre part.
// Cap and fall are closed surfaces in a single skinned mesh, not hair tubes.
export function addLongHair(model){
 if(model.userData.workshopHairStyle==='realistic-visitor-r16')return;
 const previous=[];model.traverse(o=>{if(o.userData.workshopHair)previous.push(o);});previous.forEach(o=>o.removeFromParent());
 let body;model.traverse(o=>{if(o.isSkinnedMesh&&!o.userData.workshopHair&&!o.userData.workshopDress&&!body)body=o;});if(!body)return;
 const find=name=>body.skeleton.bones.findIndex(b=>b.name.replace(/^mixamorig:?/,'')===name),head=find('Head'),neck=find('Neck'),spine=find('Spine2');if(head<0||neck<0||spine<0)return;
 const positions=[],colours=[],indices=[],jointIndices=[],jointWeights=[];
 const rim=phi=>{
  const front=Math.max(0,Math.sin(phi));
  return 1.435+.100*front**3+.004*Math.cos(phi)*front;
 };
 function capPoint(phi,t,inside){
  const theta=t*Math.acos(T.MathUtils.clamp((rim(phi)-1.434)/.156,-1,1)),thin=inside*.003;
  const wave=.0008*Math.cos(phi*30+t*3)*Math.sin(theta),sweep=.003*Math.sin(phi-.4)*Math.sin(theta)**2;
  return [Math.cos(phi)*(.106+wave-thin)*Math.sin(theta)+sweep,1.434+(.156-thin)*Math.cos(theta),-.021+Math.sin(phi)*(.132+wave-thin)*Math.sin(theta)];
 }
 function vertex(p,phi,t,isCap){
  const [x,y,z]=p;positions.push(x,y,z);
  const flow=isCap?t:1+t,strand=.84+.11*Math.cos(phi*30+flow*4)+.025*Math.cos(phi*63+flow*7);
  const part=isCap?Math.exp(-(((x+.009-z*.07)/.0015)**2))*T.MathUtils.smoothstep(y,1.515,1.58):0;
  colours.push(strand+part*.22,strand+part*.15,strand+part*.08);
  let h,n,s;
  if(isCap||y>1.435){h=1;n=0;s=0;}
  else if(y>1.31){const f=T.MathUtils.smoothstep(y,1.31,1.435);h=.32+.68*f;n=.68*(1-f);s=0;}
  else{const f=T.MathUtils.smoothstep(y,1.16,1.31);h=.035+.285*f;n=.04+.60*f;s=1-h-n;}
  jointIndices.push(head,neck,spine,0);jointWeights.push(h,n,s,0);
 }
 function surface(columns,rows,point,isCap,start=0,end=Math.PI*2){
  const offset=positions.length/3,stride=columns+1,layerSize=(rows+1)*stride;
  for(let layer=0;layer<2;layer++)for(let j=0;j<=rows;j++)for(let i=0;i<=columns;i++){
   const phi=T.MathUtils.lerp(start,end,i/columns),t=j/rows;vertex(point(phi,t,layer),phi,t,isCap);
  }
  for(let layer=0;layer<2;layer++)for(let j=0;j<rows;j++)for(let i=0;i<columns;i++){
   const a=offset+layer*layerSize+j*stride+i,b=a+stride;
   if(!layer)indices.push(a,a+1,b,a+1,b+1,b);else indices.push(a,b,a+1,a+1,b,b+1);
  }
  for(let i=0;i<columns;i++){const a=offset+rows*stride+i,b=a+1,c=a+layerSize,d=c+1;indices.push(a,b,c,b,d,c);}
  if(!isCap)for(const edge of [0,columns])for(let j=0;j<rows;j++){
   const a=offset+j*stride+edge,b=a+stride,c=a+layerSize,d=b+layerSize;indices.push(a,c,b,b,c,d);
  }
 }
 surface(96,26,capPoint,true);
 const start=Math.PI/2+.88,end=Math.PI/2+Math.PI*2-.88;
 surface(84,44,(phi,t,inside)=>{
  const top=capPoint(phi,1,inside),front=Math.max(0,Math.sin(phi)),tip=1.025+.10*front+.018*Math.sin(phi*4.0+.6),y=T.MathUtils.lerp(top[1],tip,t),spread=T.MathUtils.smoothstep(t,0,.55);
  const baseRadius=(.106-inside*.003)*Math.sin(Math.acos(T.MathUtils.clamp((rim(phi)-1.434)/.156,-1,1))),radius=T.MathUtils.lerp(baseRadius,.126,spread)*(1-.18*T.MathUtils.smoothstep(t,.67,1));
  const wave=Math.sin(t*11.5+phi*3.5)*.003*Math.sin(t*Math.PI*.85),x=Math.cos(phi)*radius+wave;
  const depth=T.MathUtils.lerp(.132,.145,spread)-inside*.003,z=-.021+Math.sin(phi)*depth+(front? .016*spread:0)+wave*.45;
  // Start exactly at the cap rim, then let the length spread over the shoulders.
  return [T.MathUtils.lerp(top[0],x,T.MathUtils.smoothstep(t,0,.14)),y,T.MathUtils.lerp(top[2],z,T.MathUtils.smoothstep(t,0,.18))];
 },false,start,end);
 // Flattened, tapered face-framing locks break up the continuous back layer.
 // Broad waves and narrow tips give volume without a blunt fringe or hem.
 for(const sign of [-1,1])for(let lock=0;lock<1;lock++){
  const offset=lock*.012,rootPhi=sign>0?.68+lock*.045:Math.PI-.68-lock*.045,rootY=1.520-lock*.010,rootTheta=Math.acos(T.MathUtils.clamp((rootY-1.434)/.156,-1,1)),rimTheta=Math.acos(T.MathUtils.clamp((rim(rootPhi)-1.434)/.156,-1,1)),rootPoint=capPoint(rootPhi,rootTheta/rimTheta,0),curve=new T.CatmullRomCurve3([
   new T.Vector3(rootPoint[0],rootPoint[1],rootPoint[2]+.0007),
   new T.Vector3(sign*(.098+offset),1.455,.104-lock*.010),
   new T.Vector3(sign*(.105+offset*.7),1.365,.090-lock*.012),
   new T.Vector3(sign*(.107+offset),1.270,.124-lock*.015),
   new T.Vector3(sign*(.110+offset*.7),1.175-lock*.018,.120-lock*.012),
   new T.Vector3(sign*(.107+offset),1.085-lock*.018,.113-lock*.015)
  ]),columns=16,rows=56,stride=columns+1,base=positions.length/3;
  for(let j=0;j<=rows;j++){
   const t=j/rows,center=curve.getPoint(t),tangent=curve.getTangent(t).normalize(),across=new T.Vector3(sign,0,0).addScaledVector(tangent,-sign*tangent.x).normalize(),normal=new T.Vector3().crossVectors(across,tangent).normalize();
   const taper=1-T.MathUtils.smoothstep(t,.73,1),width=(.014+lock*.0015)*(.50+.50*Math.sin(Math.PI*Math.min(t*1.2,1)))*taper+.0006,depth=.0048*taper+.0004;
   for(let i=0;i<=columns;i++){const a=i/columns*Math.PI*2,p=center.clone().addScaledVector(across,Math.cos(a)*width).addScaledVector(normal,Math.sin(a)*depth);vertex(p.toArray(),(sign>0?.7:2.44)+Math.cos(a)*.11,t,false);}
  }
  for(let j=0;j<rows;j++)for(let i=0;i<columns;i++){const a=base+j*stride+i,b=a+stride;indices.push(a,b,a+1,a+1,b,b+1);}
 }
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new T.Float32BufferAttribute(colours,3));geometry.setAttribute('skinIndex',new T.Uint16BufferAttribute(jointIndices,4));geometry.setAttribute('skinWeight',new T.Float32BufferAttribute(jointWeights,4));geometry.setIndex(indices);geometry.computeVertexNormals();
 // Blend the surface normals where the crown becomes the long fall, keeping
 // a continuous highlight rather than a visible cap-shaped seam.
 const normal=geometry.attributes.normal,capLayer=97*27,capCount=capLayer*2,v=new T.Vector3();
 for(let layer=0;layer<2;layer++)for(let j=0;j<=26;j++)for(let i=0;i<=96;i++){
  const index=layer*capLayer+j*97+i,p=new T.Vector3().fromBufferAttribute(geometry.attributes.position,index);
  v.set(p.x/(.106*.106),(p.y-1.434)/(.156*.156),(p.z+.021)/(.132*.132)).normalize().multiplyScalar(layer?-1:1);normal.setXYZ(index,v.x,v.y,v.z);
 }
 for(let layer=0;layer<2;layer++)for(let j=0;j<6;j++)for(let i=0;i<=84;i++){
  const index=capCount+layer*85*45+j*85+i,phi=T.MathUtils.lerp(start,end,i/84),p=capPoint(phi,1,layer),join=new T.Vector3(p[0]/(.106*.106),(p[1]-1.434)/(.156*.156),(p[2]+.021)/(.132*.132)).normalize().multiplyScalar(layer?-1:1);
  v.fromBufferAttribute(normal,index).lerp(join,1-T.MathUtils.smoothstep(j,0,5)).normalize();normal.setXYZ(index,v.x,v.y,v.z);
 }
 const material=new T.MeshPhysicalMaterial({color:0x2d1d16,roughness:.65,metalness:0,sheen:.6,sheenColor:new T.Color(0x805840),sheenRoughness:.8,vertexColors:true,side:T.DoubleSide});
 const hair=new T.SkinnedMesh(geometry,material);hair.userData.workshopHair=true;hair.name='Layered chestnut waves with a lower hairline and loose face-framing locks';hair.position.copy(body.position);hair.quaternion.copy(body.quaternion);hair.scale.copy(body.scale);body.parent.add(hair);hair.bind(body.skeleton,body.bindMatrix);
 model.userData.workshopSoftHair=true;model.userData.workshopHairStyle='realistic-visitor-r16';
}
