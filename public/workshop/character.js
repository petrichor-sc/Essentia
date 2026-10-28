// Art direction for the fictional workshop visitor. Preserve the rig, texture
// detail and continuous mesh; change the skin, hair and clothing palette.
export function styleWorkshopVisitor(model){
 model.traverse(mesh=>{
  if(!mesh.isMesh)return;
  const source=Array.isArray(mesh.material)?mesh.material:[mesh.material];
  const styled=source.map(original=>{
   const mat=original.clone();mat.roughness=.86;mat.metalness=0;
   if(mat.specularIntensity!==undefined)mat.specularIntensity=.18;
   mat.onBeforeCompile=shader=>{
    shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vVisitorBindPosition;');
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvVisitorBindPosition = position;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vVisitorBindPosition;');
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
     diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.19,.265,.22)
       * clamp(originalPalette.g * 1.25,.55,1.15),yellowFabric);
     float darkCloth = (1.0-step(.043,max(originalPalette.r,max(originalPalette.g,originalPalette.b))))
       * smoothstep(.65,.92,y) * (1.0-smoothstep(1.34,1.43,y)) * (1.0-skin);
     diffuseColor.rgb = mix(diffuseColor.rgb,vec3(.27,.24,.21)
       * clamp(dot(originalPalette,vec3(.3,.6,.1))*22.0+.5,.5,1.0),darkCloth);
     float hair = smoothstep(1.40,1.49,y)
       * (1.0-smoothstep(.045,.12,max(originalPalette.r,max(originalPalette.g,originalPalette.b))));
     diffuseColor.rgb = mix(diffuseColor.rgb,vec3(.045,.026,.017)
       * clamp(dot(originalPalette,vec3(.3,.6,.1))*20.0+.65,.65,1.3),hair);
    `);
   };
   mat.customProgramCacheKey=()=> 'essentia-visitor-olive-knit-r4';
   mat.userData.workshopPalette='warm olive skin, dark brown hair, stone knit and sage clothing';
   return mat;
  });
  mesh.material=Array.isArray(mesh.material)?styled:styled[0];
 });
 return model;
}
