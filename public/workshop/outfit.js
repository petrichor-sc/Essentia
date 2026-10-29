import * as T from '../atlas/assets/three.module.js';
import {addReferenceOutfit} from './wardrobe.js?v=modest-neckline-r14';

// The adult reference wardrobe and a separate, higher-neckline memory dress.
// Both use the visitor's existing skeleton.
export function addWhiteDress(model,{young=false}={}){
 if(!young)return addReferenceOutfit(model);
 const style=young?'ivory-round-neck-young-r12':'ivory-v-neck-r12';
 if(model.userData.workshopDressStyle===style)return;
 const old=[];model.traverse(o=>{if(o.userData.workshopDress)old.push(o);});old.forEach(o=>o.removeFromParent());
 let body;model.traverse(o=>{if(o.isSkinnedMesh&&!o.userData.workshopHair&&!o.userData.workshopDress&&!body)body=o;});if(!body)return;
 const bones=body.skeleton.bones,find=name=>bones.findIndex(b=>b.name.replace(/^mixamorig:?/,'')===name);
 const hip=find('Hips'),spine=find('Spine'),spine1=find('Spine1'),spine2=find('Spine2'),left=find('LeftUpLeg'),right=find('RightUpLeg');
 if([hip,spine,spine1,spine2,left,right].some(i=>i<0))return;
 const sections=[
  [.46,.143,.096,.008],[.60,.150,.102,.008],[.76,.154,.108,.006],
  [.86,.146,.113,.002],[.92,.131,.108,0],[1.005,.088,.076,.005],
  [1.08,.087,.083,.012],[1.15,.110,.118,.018],[1.21,.114,.115,.013],[1.285,.121,.076,.001]
 ];
 if(young){sections[0][1]=.163;sections[1][1]=.160;sections[5][1]=.103;sections[6][1]=.100;}
 function shape(y){
  let i=0;while(i<sections.length-2&&y>sections[i+1][0])i++;
  const a=sections[i],b=sections[i+1],t=T.MathUtils.smoothstep(y,a[0],b[0]);return [1,2,3].map(k=>T.MathUtils.lerp(a[k],b[k],t));
 }
 const segments=72,rings=64,p=[],uv=[],idx=[],joints=[],weights=[];
 for(let j=0;j<=rings;j++)for(let i=0;i<=segments;i++){
  const phi=i/segments*Math.PI*2,t=j/rings,front=Math.max(0,Math.sin(phi)),back=Math.max(0,-Math.sin(phi));
  const neckline=young?1.285-.052*front**2-.041*back**2:1.285-.132*front*(1-Math.abs(Math.cos(phi)))**.68-.041*back**2,y=T.MathUtils.lerp(.46,neckline,t),[rx,rz,cz]=shape(y);
  const hemEase=(1-T.MathUtils.smoothstep(y,.46,.69))*.0015*Math.cos(phi*6),x=Math.cos(phi)*(rx+hemEase),z=cz+Math.sin(phi)*(rz+hemEase);
  p.push(x,y,z);uv.push(i/segments,t);
  if(y>=1.15){joints.push(spine2,spine1,hip,0);weights.push(1,0,0,0);}
  else if(y>=1.035){const blend=T.MathUtils.smoothstep(y,1.035,1.15);joints.push(spine1,spine2,hip,0);weights.push(1-blend,blend,0,0);}
  else if(y>=.91){const blend=T.MathUtils.smoothstep(y,.91,1.035);joints.push(hip,spine1,spine,0);weights.push(1-blend,blend,0,0);}
  else{const skirt=.76*(1-T.MathUtils.smoothstep(y,.49,.91)),side=T.MathUtils.smoothstep(x,-.09,.09);joints.push(hip,left,right,0);weights.push(1-skirt,skirt*side,skirt*(1-side),0);}
 }
 const stride=segments+1;
 for(let j=0;j<rings;j++)for(let i=0;i<segments;i++){const a=j*stride+i,b=a+stride;idx.push(a,b,a+1,a+1,b,b+1);}
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(p,3));geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geometry.setAttribute('skinIndex',new T.Uint16BufferAttribute(joints,4));geometry.setAttribute('skinWeight',new T.Float32BufferAttribute(weights,4));geometry.setIndex(idx);geometry.computeVertexNormals();
 const satin=new T.MeshPhysicalMaterial({color:0xfffcf4,roughness:.48,metalness:0,sheen:.7,sheenColor:new T.Color(0xfff8e8),sheenRoughness:.7,clearcoat:.08,side:T.DoubleSide});
 const dress=new T.SkinnedMesh(geometry,satin);dress.name=young?'Round-neck white dress for the younger memory visitor':'Fitted white satin dress with a soft V neckline';dress.userData.workshopDress=true;dress.userData.workshopYoungOutfit=young;dress.position.copy(body.position);dress.quaternion.copy(body.quaternion);dress.scale.copy(body.scale);body.parent.add(dress);dress.bind(body.skeleton,body.bindMatrix);
 model.userData.workshopDressStyle=style;
}
