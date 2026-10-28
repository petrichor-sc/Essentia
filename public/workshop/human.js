import * as T from '../atlas/assets/three.module.js';
// A continuous human mesh, animated in body space from its own rest pose.
export function humanRig(model,root){
 model.updateMatrixWorld(true);root.updateMatrixWorld(true);
 const rootQ=root.getWorldQuaternion(new T.Quaternion()).invert();
 const bones={};model.traverse(o=>{if(o.isBone)bones[o.name.replace('mixamorig','')]={bone:o,q:o.quaternion.clone(),p:o.position.clone(),world:rootQ.clone().multiply(o.getWorldQuaternion(new T.Quaternion()))};});
 const hips=bones.Hips,hipBase=root.worldToLocal(hips.bone.getWorldPosition(new T.Vector3()));
 const footRootY=Math.min(...['LeftToeBase','RightToeBase'].map(n=>root.worldToLocal(bones[n].bone.getWorldPosition(new T.Vector3())).y));
 const axisX=new T.Vector3(1,0,0),axisZ=new T.Vector3(0,0,1),axisY=new T.Vector3(0,1,0);
 function turn(name,x=0,z=0,y=0){const item=bones[name];if(!item)return;const delta=new T.Quaternion().setFromAxisAngle(axisX,x).multiply(new T.Quaternion().setFromAxisAngle(axisZ,z)).multiply(new T.Quaternion().setFromAxisAngle(axisY,y));const desired=root.getWorldQuaternion(new T.Quaternion()).multiply(delta).multiply(item.world);item.bone.quaternion.copy(item.bone.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(desired));item.bone.updateMatrixWorld(true);}
 return {bones,pose(time,blend,options={}){
  Object.values(bones).forEach(({bone,q,p})=>{bone.quaternion.copy(q);bone.position.copy(p);});root.updateMatrixWorld(true);
  const phase=time*2*Math.PI/1.08,s=Math.sin(phase),c=Math.cos(phase),left=.27*s*blend,right=-.27*s*blend;
  const bob=.025*(1-Math.cos(phase*2))*blend;
  hips.bone.position.copy(hips.bone.parent.worldToLocal(root.localToWorld(hipBase.clone().add(new T.Vector3(0,bob,0)))));root.updateMatrixWorld(true);
  turn('Hips',.015*blend,.025*s*blend,.035*c*blend);turn('Spine',.015*blend,-.018*s*blend,-.025*c*blend);
  turn('LeftArm',options.reach?-1:-s*.27*blend,options.reach?-1:-1.34,.03);turn('RightArm',s*.27*blend,1.34,-.03);
  turn('LeftForeArm',options.reach?-1.15:-.16-s*.23*blend,options.reach?-1.1:-1.34);turn('RightForeArm',-.16+s*.23*blend,1.34);
  turn('LeftUpLeg',left);turn('RightUpLeg',right);
  turn('LeftLeg',left-Math.max(0,-s)*.45*blend);turn('RightLeg',right-Math.max(0,s)*.45*blend);
  turn('LeftFoot',-.05*blend);turn('RightFoot',-.05*blend);
  const minFoot=Math.min(...['LeftToeBase','RightToeBase'].map(n=>bones[n].bone.getWorldPosition(new T.Vector3()).y));const correction=root.localToWorld(new T.Vector3(0,footRootY,0)).y-minFoot;const current=hips.bone.getWorldPosition(new T.Vector3());current.y+=correction;hips.bone.position.copy(hips.bone.parent.worldToLocal(current));root.updateMatrixWorld(true);
  bones.Spine.bone.scale.set(1+(options.breath||0)*.012,1+(options.breath||0)*.015,1+(options.breath||0)*.03);
  turn('Head',.015*Math.sin(time*.7),.01*Math.sin(time*.5),.025*Math.sin(time*.4));
 },point(site){
  const pos=n=>bones[n]?.bone.getWorldPosition(new T.Vector3());
  if(site==='neck')return [pos('Neck')].filter(Boolean);
  if(site==='wrists')return ['LeftHand','RightHand'].map(pos).filter(Boolean);
  return [['LeftForeArm','LeftHand'],['RightForeArm','RightHand']].map(([a,b])=>{const p=pos(a),q=pos(b);return p&&q?p.lerp(q,.5):null;}).filter(Boolean);
 }};
}
