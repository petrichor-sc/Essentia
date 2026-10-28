import * as T from '../atlas/assets/three.module.js';
import {addWhiteDress} from './outfit.js?v=studio-palette-r11';

export function addSoftHair(model){
 if(model.userData.workshopHairStyle==='soft-side-part-r7')return;
 const previous=[];model.traverse(o=>{if(o.userData.workshopHair)previous.push(o);});previous.forEach(o=>o.removeFromParent());
 let body;model.traverse(o=>{if(o.isSkinnedMesh&&!o.userData.workshopHair&&!body)body=o;});if(!body)return;
 const head=body.skeleton.bones.findIndex(b=>/mixamorig:?Head$/.test(b.name));if(head<0)return;
 // One curved, closed shell: the front hairline is high above the eyes and
 // flows continuously down the temples into the bob, with no open side cuts.
 const segments=80,rings=28,positions=[],colours=[],indices=[];
 for(let layer=0;layer<2;layer++)for(let j=0;j<=rings;j++)for(let i=0;i<=segments;i++){
  const phi=i/segments*Math.PI*2,t=j/rings,front=T.MathUtils.smoothstep(Math.sin(phi),.10,.78),rimY=T.MathUtils.lerp(1.305,1.529,front)+front*.003*Math.sin(phi*3),thetaEnd=Math.acos(T.MathUtils.clamp((rimY-1.434)/.176,-1,1)),theta=t*thetaEnd;
  const strands=.0008*Math.cos(phi*24+t*2.5)*Math.sin(theta),thickness=layer*.004;
  const x=Math.cos(phi)*(.112+strands-thickness)*Math.sin(theta),y=1.434+(.176-thickness)*Math.cos(theta),z=-.021+Math.sin(phi)*(.129+strands-thickness)*Math.sin(theta);
  positions.push(x,y,z);const shade=.92+.08*Math.cos(phi*12+t*1.7);colours.push(shade,shade,shade);
 }
 const stride=segments+1,layerSize=(rings+1)*stride;
 for(let layer=0;layer<2;layer++)for(let j=0;j<rings;j++)for(let i=0;i<segments;i++){
  const a=layer*layerSize+j*stride+i,b=a+stride;
  if(!layer)indices.push(a,a+1,b,a+1,b+1,b);else indices.push(a,b,a+1,a+1,b,b+1);
 }
 for(let i=0;i<segments;i++){const a=rings*stride+i,b=a+1,c=a+layerSize,d=c+1;indices.push(a,b,c,b,d,c);}
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('color',new T.Float32BufferAttribute(colours,3));geometry.setIndex(indices);geometry.computeVertexNormals();
 const count=geometry.attributes.position.count,joints=new Uint16Array(count*4),weights=new Float32Array(count*4);for(let i=0;i<count;i++){joints[i*4]=head;weights[i*4]=1;}
 geometry.setAttribute('skinIndex',new T.Uint16BufferAttribute(joints,4));geometry.setAttribute('skinWeight',new T.Float32BufferAttribute(weights,4));
 const material=new T.MeshStandardMaterial({color:0x3a2b23,roughness:.91,metalness:0,vertexColors:true});
 const hair=new T.SkinnedMesh(geometry,material);hair.userData.workshopHair=true;hair.name='Continuous soft bob and curved hairline';hair.position.copy(body.position);hair.quaternion.copy(body.quaternion);hair.scale.copy(body.scale);body.parent.add(hair);hair.bind(body.skeleton,body.bindMatrix);
 model.userData.workshopSoftHair=true;model.userData.workshopHairStyle='soft-side-part-r7';
}

// Art direction for the fictional workshop visitor. Preserve the rig, texture
// detail and continuous mesh; change the skin, hair and clothing palette.
export function styleWorkshopVisitor(model){
 addSoftHair(model);
 addWhiteDress(model);
 model.traverse(mesh=>{
  if(!mesh.isMesh||mesh.userData.workshopHair||mesh.userData.workshopDress)return;
  const region=mesh.geometry.getAttribute('_visitor_region'),count=mesh.geometry.attributes.position.count,neckline=new Float32Array(count),categories=new Float32Array(count);
  for(let i=0;i<count;i++){const value=region?region.getX(i):0;categories[i]=value>4.5?0:value;neckline[i]=value>4.5?1:0;}
  mesh.geometry.setAttribute('visitorRegion',new T.Float32BufferAttribute(categories,1));mesh.geometry.setAttribute('visitorSkin',new T.Float32BufferAttribute(neckline,1));
  const source=Array.isArray(mesh.material)?mesh.material:[mesh.material];
  const styled=source.map(original=>{
   const mat=original.clone();mat.roughness=.86;mat.metalness=0;
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
     float upperFace = smoothstep(1.395,1.425,y)
       * smoothstep(.015,.045,vVisitorBindPosition.z);
     float naturalFaceShade = clamp(dot(originalPalette,vec3(.28,.57,.15))*1.4+.70,.72,.94);
     diffuseColor.rgb = mix(diffuseColor.rgb,vec3(.61,.385,.235)*naturalFaceShade,upperFace);
     float cheek = exp(-pow((abs(vVisitorBindPosition.x)-.050)/.021,2.0)
       -pow((y-1.424)/.019,2.0))*smoothstep(.045,.073,vVisitorBindPosition.z);
     diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.63,.325,.245),cheek*.10);
     float lip = (1.0-smoothstep(.025,.033,abs(vVisitorBindPosition.x)))
       *(1.0-smoothstep(.0035,.0075,abs(y-1.403)))
       *smoothstep(.077,.090,vVisitorBindPosition.z);
     diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.38,.115,.105),lip*.83);
     if(vVisitorRegion>.5 && vVisitorRegion<1.5){
      float whitePart = smoothstep(.26,.65,dot(originalPalette,vec3(.28,.57,.15)));
      diffuseColor.rgb = mix(originalPalette,vec3(.78,.76,.70),whitePart*.28);
     }
     if(vVisitorRegion>1.5 && vVisitorRegion<2.5){diffuseColor.rgb=vec3(.065,.034,.020);}
     if(vVisitorRegion>2.5 && vVisitorRegion<3.5){diffuseColor.rgb=vec3(.61,.385,.235)*.85;}
     if(vVisitorRegion>3.5 && vVisitorRegion<4.5){diffuseColor.rgb=vec3(.88,.85,.79);}
     diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.61,.385,.235)*.85,vVisitorSkin);

    `);
   };
   mat.customProgramCacheKey=()=> 'essentia-white-dress-r11';
   mat.userData.workshopPalette='warm olive skin, rose lips, dark brown bob, fitted ivory dress and cream flats';
   return mat;
  });
  mesh.material=Array.isArray(mesh.material)?styled:styled[0];
 });
 return model;
}
