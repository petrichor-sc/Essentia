import * as T from '../atlas/assets/three.module.js';
import {addLongHair} from './hair.js?v=reference-look-r13';
import {addWhiteDress} from './outfit.js?v=reference-look-r13';

export {addLongHair as addSoftHair};

// Art direction for the fictional workshop visitor. Preserve the rig, texture
// detail and continuous mesh; change the skin, hair and clothing palette.
export function styleWorkshopVisitor(model,options={}){
 addLongHair(model);
 addWhiteDress(model,options);
 model.traverse(mesh=>{
  if(!mesh.isMesh||mesh.userData.workshopHair||mesh.userData.workshopDress)return;
  const region=mesh.geometry.getAttribute('_visitor_region'),count=mesh.geometry.attributes.position.count,neckline=new Float32Array(count),categories=new Float32Array(count);
  for(let i=0;i<count;i++){const value=region?region.getX(i):0;categories[i]=value>4.5?0:value;neckline[i]=value>4.5?1:0;}
  mesh.geometry.setAttribute('visitorRegion',new T.Float32BufferAttribute(categories,1));mesh.geometry.setAttribute('visitorSkin',new T.Float32BufferAttribute(neckline,1));
  const source=Array.isArray(mesh.material)?mesh.material:[mesh.material];
  const styled=source.map(original=>{
   const mat=original.clone();mat.roughness=.80;mat.metalness=0;if(mat.normalScale)mat.normalScale.set(.15,.15);
   if(mat.specularIntensity!==undefined)mat.specularIntensity=.18;
   mat.onBeforeCompile=shader=>{
    shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nattribute float visitorRegion;\nattribute float visitorSkin;\nvarying float vVisitorRegion;\nvarying float vVisitorSkin;\nvarying vec3 vVisitorBindPosition;');
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvVisitorBindPosition = position;\nvVisitorRegion = visitorRegion;\nvVisitorSkin = visitorSkin;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying float vVisitorRegion;\nvarying float vVisitorSkin;\nvarying vec3 vVisitorBindPosition;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
     // Values are linear RGB after the original colour texture is sampled.
     vec3 originalPalette = diffuseColor.rgb;
     float y = vVisitorBindPosition.y;
     float skin = step(originalPalette.g * 1.30, originalPalette.r)
       * step(originalPalette.b * 1.22, originalPalette.g)
       * (1.0 - smoothstep(.42, .64, originalPalette.r))
       * step(.009, originalPalette.g);
     float skinShade = clamp(dot(originalPalette, vec3(.28,.57,.15)) * 3.6 + .45, .48, 1.10);
     vec3 oliveSkin = vec3(.61,.385,.235) * skinShade;
     diffuseColor.rgb = mix(diffuseColor.rgb, oliveSkin, skin);
     float yellowFabric = step(.44, originalPalette.r) * step(.40, originalPalette.g)
       * (1.0-step(.24, originalPalette.b));
     diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.91,.89,.84)
       * clamp(originalPalette.g * .8+.38,.72,1.0),yellowFabric);
     float darkCloth = (1.0-step(.043,max(originalPalette.r,max(originalPalette.g,originalPalette.b))))
       * smoothstep(.65,.92,y) * (1.0-smoothstep(1.34,1.43,y)) * (1.0-skin);
     diffuseColor.rgb = mix(diffuseColor.rgb,vec3(.91,.89,.84)
       * clamp(dot(originalPalette,vec3(.3,.6,.1))*8.0+.78,.78,1.0),darkCloth);
     float necklineFabric=(1.0-skin)*smoothstep(.98,1.01,y)
       *(1.0-smoothstep(1.27,1.30,y))
       *(1.0-smoothstep(.12,.145,abs(vVisitorBindPosition.x)));
     diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.91,.89,.84),necklineFabric);
     // The skin, eyeballs and brows have separate semantic regions. Never
     // treat a dark eye, eyeliner pixel or facial shadow as a patch of hair.
     float upperFace = smoothstep(1.365,1.385,y)
       * smoothstep(.015,.045,vVisitorBindPosition.z);
     float naturalFaceShade = clamp(dot(originalPalette,vec3(.28,.57,.15))*1.4+.70,.72,.94);
     diffuseColor.rgb = mix(diffuseColor.rgb,vec3(.61,.385,.235)*naturalFaceShade,upperFace);
     float cheek = exp(-pow((abs(vVisitorBindPosition.x)-.050)/.021,2.0)
       -pow((y-1.424)/.019,2.0))*smoothstep(.045,.073,vVisitorBindPosition.z);
     diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.63,.325,.245),cheek*.075);
     float mouthY=1.4016+.0022*pow(clamp(abs(vVisitorBindPosition.x)/.028,0.0,1.0),1.5);
     float lipWidth=1.0-smoothstep(.020,.029,abs(vVisitorBindPosition.x));
     float cupidBow=.0012*exp(-pow((abs(vVisitorBindPosition.x)-.0075)/.006,2.0))
       -.0005*exp(-pow(vVisitorBindPosition.x/.003,2.0));
     float upperLip=exp(-pow((y-mouthY-.0015-cupidBow)/.0022,2.0));
     float lowerLip=exp(-pow((y-mouthY+.0014)/.0030,2.0));
     float lip=max(upperLip,lowerLip)*lipWidth*smoothstep(.077,.090,vVisitorBindPosition.z);
     diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.36,.115,.103),lip*.72);
     float smileLine=exp(-pow((y-mouthY)/.00065,2.0))*lipWidth*smoothstep(.080,.093,vVisitorBindPosition.z);
     diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.16,.058,.047),smileLine*.30);
     if(vVisitorRegion>.5 && vVisitorRegion<1.5){
      vec2 eye=vec2((abs(vVisitorBindPosition.x)-.0355)/.0068,(y-1.4517)/.0077);
      float irisRadius=length(eye),iris=1.0-smoothstep(.91,1.03,irisRadius);
      float fibre=.90+.10*sin(atan(eye.y,eye.x)*22.0+irisRadius*7.0);
      vec3 irisColour=mix(vec3(.070,.030,.012),vec3(.20,.095,.033),smoothstep(.32,.85,irisRadius))*fibre;
      diffuseColor.rgb=mix(vec3(.66,.63,.58),irisColour,iris);
      diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.007,.005,.004),1.0-smoothstep(.33,.43,irisRadius));
      float catchlight=exp(-dot(eye-vec2(-.28,.34),eye-vec2(-.28,.34))/.024)*iris;
      diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.96,.94,.88),catchlight*.60);
     }
     if(vVisitorRegion>1.5 && vVisitorRegion<2.5){diffuseColor.rgb=vec3(.075,.040,.024);}
     if(vVisitorRegion>2.5 && vVisitorRegion<3.5){diffuseColor.rgb=vec3(.070,.045,.038);}
     if(vVisitorRegion>3.5 && vVisitorRegion<4.5){diffuseColor.rgb=vec3(.045,.019,.010);}
     diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.61,.385,.235)*.85,vVisitorSkin);
     float chestContour=exp(-pow(vVisitorBindPosition.x/.013,2.0)-pow((y-1.181)/.036,2.0))
       *smoothstep(.055,.090,vVisitorBindPosition.z)*vVisitorSkin;
     diffuseColor.rgb*=1.0-chestContour*.085;

    `);
   };
   mat.customProgramCacheKey=()=> 'essentia-reference-look-r13';
   mat.userData.workshopPalette='warm olive skin, brown eyes, cream knit, brown skirt, dark tights and tall brown boots';
   return mat;
  });
  mesh.material=Array.isArray(mesh.material)?styled:styled[0];
 });
 return model;
}
