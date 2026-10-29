import * as T from '../atlas/assets/three.module.js';

let motionData=null,loading=null;
export function loadLocomotion(fetcher=globalThis.fetch){
 if(!loading)loading=fetcher(new URL('./assets/visitor-motion.json?v=enchanted-street-r18',import.meta.url)).then(async response=>{
  if(!response.ok)throw new Error('Could not load visitor motion');
  const data=await response.json();if(!data.walk?.tracks||!data.idle?.tracks)throw new Error('Invalid visitor motion');motionData=data;return data;
 });
 return loading;
}

// The uploaded Motifect BVH clips were retargeted into FC1's local bone axes.
// Root travel is supplied by the scene; the clip supplies the whole-body pose.
export function createLocomotion(bones){
 if(!motionData)return null;
 const {walk,idle}=motionData,bindings=Object.keys(walk.tracks).filter(name=>bones[name]&&idle.tracks[name]).map(name=>({bone:bones[name].bone,walk:walk.tracks[name],idle:idle.tracks[name]}));
 const a=new T.Quaternion(),b=new T.Quaternion(),other=new T.Quaternion();
 function frame(clip,time){const f=((time%clip.duration)+clip.duration)%clip.duration*clip.fps,i=Math.floor(f);return {a:i%clip.frames,b:(i+1)%clip.frames,t:f-i};}
 function rotation(track,f,out){return out.fromArray(track,f.a*4).slerp(other.fromArray(track,f.b*4),f.t).normalize();}
 const position=(values,f,k)=>T.MathUtils.lerp(values[f.a*3+k],values[f.b*3+k],f.t);
 return {source:motionData.source,joints:bindings.length,speed:walk.speed,apply(time,amount,distance){
  const weight=T.MathUtils.smoothstep(amount,.015,.22),idleFrame=frame(idle,time),walkFrame=frame(walk,Number.isFinite(distance)?distance/walk.speed:time);
  for(const entry of bindings){rotation(entry.idle,idleFrame,a);rotation(entry.walk,walkFrame,b);entry.bone.quaternion.copy(a.slerp(b,weight));}
  const p=bones.Hips.bone.position;for(let k=0;k<3;k++)p.setComponent(k,T.MathUtils.lerp(position(idle.hips,idleFrame,k),position(walk.hips,walkFrame,k),weight));
 }};
}
