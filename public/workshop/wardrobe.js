import * as T from '../atlas/assets/three.module.js';

// An adult fashion look inspired by the supplied outfit reference. Every
// garment uses the original character skeleton, including sleeves and boots.
export function addReferenceOutfit(model){
 const style='modest-cream-knit-brown-skirt-r14';if(model.userData.workshopDressStyle===style)return;
 const old=[];model.traverse(o=>{if(o.userData.workshopDress)old.push(o);});old.forEach(o=>o.removeFromParent());
 let body;model.traverse(o=>{if(o.isSkinnedMesh&&!o.userData.workshopHair&&!o.userData.workshopDress&&!body)body=o;});if(!body)return;
 const bones=body.skeleton.bones,find=name=>bones.findIndex(b=>b.name.replace(/^mixamorig:?/,'')===name);
 const hip=find('Hips'),spine=find('Spine1'),spine2=find('Spine2');if([hip,spine,spine2].some(i=>i<0))return;
 const root=new T.Group();root.name='Cream knit top, brown skirt and tall boots';root.userData.workshopDress=true;body.parent.add(root);
 const V=(x,y,z)=>new T.Vector3(x,y,z);
 function torsoWeights(y){
  if(y>1.145)return [[spine2,0,0,0],[1,0,0,0]];
  const t=T.MathUtils.smoothstep(y,.94,1.145);return [[hip,spine,spine2,0],[1-t,t*(1-t),t*t,0]];
 }
 function material(color,roughness=.8){return new T.MeshStandardMaterial({color,roughness,metalness:0,side:T.DoubleSide});}
 const data=new Uint8Array(128*128*4);
 for(let y=0;y<128;y++)for(let x=0;x<128;x++){
  const stripe=.93+.065*Math.cos(x*Math.PI/2)+.005*Math.sin(y*2.1+x*.7),i=(y*128+x)*4,c=Math.round(stripe*255);data[i]=c;data[i+1]=c;data[i+2]=c;data[i+3]=255;
 }
 const rib=new T.DataTexture(data,128,128,T.RGBAFormat);rib.wrapS=rib.wrapT=T.RepeatWrapping;rib.repeat.set(2,1);rib.needsUpdate=true;rib.colorSpace=T.SRGBColorSpace;
 const knit=new T.MeshPhysicalMaterial({color:0xeee0c8,roughness:.88,metalness:0,sheen:.28,sheenColor:new T.Color(0xfff1da),sheenRoughness:.9,map:rib,bumpMap:rib,bumpScale:.00065,side:T.DoubleSide});
 const suede=material(0x47302b,.96),leather=new T.MeshPhysicalMaterial({color:0x3b241b,roughness:.47,metalness:0,clearcoat:.15,clearcoatRoughness:.6,side:T.DoubleSide}),skin=material(new T.Color().setRGB(.61*.85,.385*.85,.235*.85),.79);
 function attach(geometry,mat,kind,name){
  const mesh=new T.SkinnedMesh(geometry,mat);mesh.name=name;mesh.userData.workshopDress=true;mesh.userData.workshopYoungOutfit=false;mesh.userData.workshopSurface=kind;mesh.position.copy(body.position);mesh.quaternion.copy(body.quaternion);mesh.scale.copy(body.scale);root.add(mesh);mesh.bind(body.skeleton,body.bindMatrix);return mesh;
 }
 function surface(columns,rows,point,weights,mat,kind,name,reverse=false){
  const p=[],uv=[],ids=[],js=[],ws=[];
  for(let j=0;j<=rows;j++)for(let i=0;i<=columns;i++){
   const phi=i/columns*Math.PI*2,t=j/rows,q=point(phi,t),[joint,weight]=weights(q,phi,t);p.push(...q);uv.push(i/columns,t);js.push(...joint);ws.push(...weight);
  }
  const stride=columns+1;for(let j=0;j<rows;j++)for(let i=0;i<columns;i++){const a=j*stride+i,b=a+stride;if(reverse)ids.push(a,a+1,b,a+1,b+1,b);else ids.push(a,b,a+1,a+1,b,b+1);}
  const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(p,3));geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geometry.setAttribute('skinIndex',new T.Uint16BufferAttribute(js,4));geometry.setAttribute('skinWeight',new T.Float32BufferAttribute(ws,4));geometry.setIndex(ids);geometry.computeVertexNormals();return attach(geometry,mat,kind,name);
 }
 function interpolate(sections,y){let i=0;while(i<sections.length-2&&y>sections[i+1][0])i++;const a=sections[i],b=sections[i+1],t=T.MathUtils.smoothstep(y,a[0],b[0]);return [1,2,3].map(k=>T.MathUtils.lerp(a[k],b[k],t));}
 const bodice=[
  [.965,.089,.078,.004],[1.035,.087,.079,.009],[1.10,.096,.091,.011],
  [1.17,.112,.108,.011],[1.225,.116,.101,.007],[1.283,.121,.071,0],
  [1.315,.043,.034,-.006]
 ];
 function bodyPoint(phi,y,offset=0){
  const [rx,rz,cz]=interpolate(bodice,y),x=Math.cos(phi)*rx,front=Math.max(0,Math.sin(phi));
  const bust=.014*Math.exp(-Math.pow((Math.abs(x)-.052)/.034,2)-Math.pow((y-1.188)/.048,2))*front**3;
  const center=.0015*Math.exp(-Math.pow(x/.015,2)-Math.pow((y-1.19)/.038,2))*front**3;
  return [Math.cos(phi)*(rx+offset),y,cz+Math.sin(phi)*(rz+offset)+bust-center];
 }
 // The skin and knit share the same rounded surface, so the neckline follows
 // the form cleanly and the exposed upper chest has continuous geometry.
 surface(80,42,(phi,t)=>bodyPoint(phi,T.MathUtils.lerp(1.105,1.315,t)),q=>torsoWeights(q[1]),skin,'skin','Continuous rounded upper chest and shoulders');
 surface(96,52,(phi,t)=>{
  const front=Math.max(0,Math.sin(phi)),back=Math.max(0,-Math.sin(phi));
  const neckline=1.283-.045*front**1.25-.047*back**2,y=T.MathUtils.lerp(.968,neckline,t);return bodyPoint(phi,y,.0025);
 },q=>torsoWeights(q[1]),knit,'knit','Cream rib-knit top with a modest rounded neckline');
 // A high waist and a small side slit follow the reference's skirt shape.
 const skirt=[ [.72,.148,.105,.004],[.82,.157,.116,.002],[.90,.143,.111,0],[1.013,.096,.082,.005] ];
 surface(96,40,(phi,t)=>{
  const angle=Math.atan2(Math.sin(phi-.84),Math.cos(phi-.84)),hem=.722+.067*Math.exp(-Math.pow(angle/.115,2)),y=T.MathUtils.lerp(hem,1.013,t),[rx,rz,cz]=interpolate(skirt,y);
  return [Math.cos(phi)*rx,y,cz+Math.sin(phi)*rz];
 },(q)=>{const y=q[1],side=T.MathUtils.smoothstep(q[0],-.08,.08),amount=.22*(1-T.MathUtils.smoothstep(y,.74,.94));return [[hip,find('LeftUpLeg'),find('RightUpLeg'),0],[1-amount,amount*side,amount*(1-side),0]];},suede,'skirt','High-waisted chocolate-brown skirt with a side slit');
 // Sleeves are built in the mesh's original T-pose coordinates. Blended arm
 // weights keep the knit continuous as the elbow bends and the hand reaches.
 for(const [sign,side] of [[1,'Left'],[-1,'Right']]){
  const shoulder=find(side+'Shoulder'),upper=find(side+'Arm'),lower=find(side+'ForeArm'),hand=find(side+'Hand');
  const sleeve=[[.102,.037],[.18,.034],[.32,.028],[.43,.026],[.525,.028],[.574,.041]];
  surface(40,64,(phi,t)=>{
   const x=T.MathUtils.lerp(.102,.574,t);let i=0;while(i<sleeve.length-2&&x>sleeve[i+1][0])i++;const f=T.MathUtils.smoothstep(x,sleeve[i][0],sleeve[i+1][0]),r=T.MathUtils.lerp(sleeve[i][1],sleeve[i+1][1],f),y=1.274-.003*t,z=T.MathUtils.lerp(-.007,.002,t);
   return [sign*x,y+Math.cos(phi)*r,z+Math.sin(phi)*r];
  },q=>{
   const x=Math.abs(q[0]),elbow=T.MathUtils.smoothstep(x,.29,.38),rootBlend=1-T.MathUtils.smoothstep(x,.102,.155),wrist=T.MathUtils.smoothstep(x,.535,.574)*.25;
   return [[shoulder,upper,lower,hand],[rootBlend*.35,(1-elbow)*(1-rootBlend*.35),elbow-wrist,wrist]];
  },knit,'knit',side+' long knit sleeve with a gently flared cuff',sign>0);
  const leg=find(side+'Leg'),thigh=find(side+'UpLeg'),foot=find(side+'Foot');
  surface(56,58,(phi,t)=>{
   const y=T.MathUtils.lerp(.065,.532,t),center=T.MathUtils.lerp(.105,.093,T.MathUtils.smoothstep(y,.12,.53)),radii=interpolate([[.065,.033,.036,0],[.14,.034,.038,0],[.31,.054,.057,0],[.43,.052,.053,0],[.532,.051,.053,0]],y);
   return [sign*(center+Math.cos(phi)*radii[0]),y,-.004+Math.sin(phi)*radii[1]];
  },q=>{
   const y=q[1],ankle=1-T.MathUtils.smoothstep(y,.075,.18),knee=T.MathUtils.smoothstep(y,.49,.57);return [[leg,foot,thigh,0],[1-ankle-knee,ankle,knee,0]];
  },leather,'boots',side+' knee-high brown leather boot',sign<0);
  // A small block heel completes the shoe already retained in the source GLB.
  const heel=new T.BoxGeometry(.052,.025,.052).translate(sign*.108,.012,-.035),count=heel.attributes.position.count,joints=new Uint16Array(count*4),weights=new Float32Array(count*4);for(let i=0;i<count;i++){joints[i*4]=foot;weights[i*4]=1;}heel.setAttribute('skinIndex',new T.Uint16BufferAttribute(joints,4));heel.setAttribute('skinWeight',new T.Float32BufferAttribute(weights,4));attach(heel,leather,'boots',side+' low block heel');
 }
 model.userData.workshopDressStyle=style;
}
