import * as T from '../atlas/assets/three.module.js';
import {createLocomotion} from './locomotion.js?v=visitor-fit-r17';
export function settleForSniff(rig,root,flower,amount,noseOffset=new T.Vector3(0,.1214,.156),gap=.08){
 if(amount<=0)return;
 if(rig.realistic)noseOffset=new T.Vector3(0,.027,.118);
 root.updateWorldMatrix(true,true);const q=root.getWorldQuaternion(new T.Quaternion()),scale=root.getWorldScale(new T.Vector3()),nose=rig.bones.Head.bone.getWorldPosition(new T.Vector3()).add(noseOffset.clone().multiply(scale).applyQuaternion(q)),forward=new T.Vector3(0,0,1).applyQuaternion(q),desired=flower.clone().addScaledVector(forward,-gap),delta=desired.sub(nose);delta.y=0;delta.clampLength(0,.7);
 const position=root.getWorldPosition(new T.Vector3()).addScaledVector(delta,amount);root.position.copy(root.parent?root.parent.worldToLocal(position):position);root.updateWorldMatrix(true,true);
}
// Pose the model's existing skeleton. Hands remain part of the original continuous mesh.
export function humanRig(model,root){
 root.updateWorldMatrix(true,true);
 const rootQ=root.getWorldQuaternion(new T.Quaternion()).invert(),bones={};
 model.traverse(o=>{if(o.isBone)bones[o.name.replace(/^mixamorig:?/, '')]={bone:o,q:o.quaternion.clone(),p:o.position.clone(),scale:o.scale.clone(),world:rootQ.clone().multiply(o.getWorldQuaternion(new T.Quaternion()))};});
 const hips=bones.Hips,hipBase=root.worldToLocal(hips.bone.getWorldPosition(new T.Vector3()));
 const footRootY=Math.min(...['LeftToeBase','RightToeBase'].map(n=>root.worldToLocal(bones[n].bone.getWorldPosition(new T.Vector3())).y));
 const armRestZ=(name,child)=>{const a=root.worldToLocal(bones[name].bone.getWorldPosition(new T.Vector3())),b=root.worldToLocal(bones[child].bone.getWorldPosition(new T.Vector3())).sub(a);return -Math.atan2(b.x,-b.y);};
 const armZ={LeftArm:armRestZ('LeftArm','LeftForeArm'),RightArm:armRestZ('RightArm','RightForeArm'),LeftForeArm:armRestZ('LeftForeArm','LeftHand'),RightForeArm:armRestZ('RightForeArm','RightHand')};
 // A relaxed stance needs lateral space for the palms and the clothing.
 // Rotating the A-pose all the way to vertical buried FC1's hands in her hips.
 const armClearance=model.userData.workshopRealistic ? .18 : 0;
 const locomotion=model.userData.workshopRealistic?createLocomotion(bones):null;
 const sole=model.userData.workshopRealistic?model.getObjectByName('ludovisions_FC1_mesh_05_2'):null;
 const floorRows=sole?new Float64Array(sole.skeleton.bones.length*4):null,floorMatrix=new T.Matrix4();
 const floorJoints=sole?[...new Set(Array.from(sole.geometry.attributes.skinIndex.array))]:[];
 function soleMinimum(){
  const g=sole.geometry,p=g.attributes.position.array,j=g.attributes.skinIndex.array,w=g.attributes.skinWeight.array;
  // In attached bind mode the current mesh matrix cancels its inverse. Use
  // bone world matrices directly so grounding also works before the renderer
  // refreshes a mesh's bind inverse after the actor moves along the street.
  for(const id of floorJoints){floorMatrix.copy(sole.skeleton.bones[id].matrixWorld).multiply(sole.skeleton.boneInverses[id]).multiply(sole.bindMatrix);const m=floorMatrix.elements;floorRows.set([m[1],m[5],m[9],m[13]],id*4);}
  let min=Infinity;
  for(let i=0;i<g.attributes.position.count;i++){const x=p[i*3],y=p[i*3+1],z=p[i*3+2];let height=0;for(let k=0;k<4;k++){const a=i*4+k,r=j[a]*4;height+=w[a]*(floorRows[r]*x+floorRows[r+1]*y+floorRows[r+2]*z+floorRows[r+3]);}min=Math.min(min,height);}
  return min;
 }
 const soleFloor=sole?root.worldToLocal(new T.Vector3(0,soleMinimum(),0)).y:footRootY;
 const X=new T.Vector3(1,0,0),Z=new T.Vector3(0,0,1),Y=new T.Vector3(0,1,0);
 function turn(name,x=0,z=0,y=0){const item=bones[name];if(!item)return;const delta=new T.Quaternion().setFromAxisAngle(X,x).multiply(new T.Quaternion().setFromAxisAngle(Z,z)).multiply(new T.Quaternion().setFromAxisAngle(Y,y)),desired=root.getWorldQuaternion(new T.Quaternion()).multiply(delta).multiply(item.world);item.bone.quaternion.copy(item.bone.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(desired));item.bone.updateMatrixWorld(true);}
 function align(bone,child,target){const origin=bone.getWorldPosition(new T.Vector3()),current=child.getWorldPosition(new T.Vector3()).sub(origin).normalize(),desired=target.clone().sub(origin).normalize(),delta=new T.Quaternion().setFromUnitVectors(current,desired),world=delta.multiply(bone.getWorldQuaternion(new T.Quaternion()));bone.quaternion.copy(bone.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(world));bone.updateMatrixWorld(true);}
 function reach(target,amount,side='Left',arc=true){
  const upper=bones[side+'Arm'].bone,lower=bones[side+'ForeArm'].bone,hand=bones[side+'Hand'].bone;
  root.updateWorldMatrix(true,true);const shoulder=upper.getWorldPosition(new T.Vector3()),elbow=lower.getWorldPosition(new T.Vector3()),wrist=hand.getWorldPosition(new T.Vector3()),u=shoulder.distanceTo(elbow),l=elbow.distanceTo(wrist),goal=wrist.clone().lerp(target,amount);
  if(model.userData.workshopRealistic&&arc)goal.add(new T.Vector3(side==='Left'?.09:-.09,0,.06).applyQuaternion(root.getWorldQuaternion(new T.Quaternion())).multiplyScalar(Math.sin(Math.PI*amount)));
  const direction=goal.clone().sub(shoulder),distance=T.MathUtils.clamp(direction.length(),Math.abs(u-l)+.005,(u+l)*.97);direction.normalize();goal.copy(shoulder).addScaledVector(direction,distance);
  const reference=new T.Vector3(.3,-1,.35).applyQuaternion(root.getWorldQuaternion(new T.Quaternion())),bend=reference.addScaledVector(direction,-reference.dot(direction)).normalize(),cos=T.MathUtils.clamp((u*u+distance*distance-l*l)/(2*u*distance),-1,1),joint=shoulder.clone().addScaledVector(direction,u*cos).addScaledVector(bend,u*Math.sqrt(1-cos*cos));align(upper,lower,joint);align(lower,hand,goal);
 }
 function clearHands(){
  if(!model.userData.workshopRealistic)return;
  const center=root.worldToLocal(hips.bone.getWorldPosition(new T.Vector3())),scale=model.getWorldScale(new T.Vector3()).x/root.getWorldScale(new T.Vector3()).x;
  for(const side of ['Left','Right']){
   const wrist=root.worldToLocal(bones[side+'Hand'].bone.getWorldPosition(new T.Vector3())),sign=side==='Left'?1:-1;
   if(wrist.y-center.y>-.28*scale&&wrist.y-center.y<.24*scale&&Math.abs(wrist.z-center.z)<.17*scale&&sign*(wrist.x-center.x)<.245*scale){wrist.x=center.x+sign*.245*scale;reach(root.localToWorld(wrist),1,side,false);}
  }
 }
 return {bones,realistic:!!model.userData.workshopRealistic,locomotion,pose(time,blend,options={}){
  Object.values(bones).forEach(({bone,q,p,scale})=>{bone.quaternion.copy(q);bone.position.copy(p);bone.scale.copy(scale);});root.updateWorldMatrix(true,true);
  if(locomotion){locomotion.apply(time,blend,options.distance);root.updateWorldMatrix(true,true);}
  else{
  const phase=time*2*Math.PI/1.08,s=Math.sin(phase),c=Math.cos(phase),left=.27*s*blend,right=-.27*s*blend,bob=.018*(1-Math.cos(phase*2))*blend;
  hips.bone.position.copy(hips.bone.parent.worldToLocal(root.localToWorld(hipBase.clone().add(new T.Vector3(0,bob,0)))));root.updateWorldMatrix(true,true);
  turn('Hips',.01*blend,.02*s*blend,.025*c*blend);turn('Spine',.01*blend,-.012*s*blend,-.02*c*blend);
  turn('LeftArm',-s*.25*blend,armZ.LeftArm+armClearance,.03);turn('RightArm',s*.25*blend,armZ.RightArm-armClearance,-.03);turn('LeftForeArm',-.12-s*.2*blend,armZ.LeftForeArm+armClearance);turn('RightForeArm',-.12+s*.2*blend,armZ.RightForeArm-armClearance);
  turn('LeftUpLeg',left);turn('RightUpLeg',right);turn('LeftLeg',left-Math.max(0,-s)*.45*blend);turn('RightLeg',right-Math.max(0,s)*.45*blend);turn('LeftFoot',-.04*blend);turn('RightFoot',-.04*blend);
  }
  const minFoot=sole?soleMinimum():Math.min(...['LeftToeBase','RightToeBase'].map(n=>bones[n].bone.getWorldPosition(new T.Vector3()).y)),correction=root.localToWorld(new T.Vector3(0,sole?soleFloor:footRootY,0)).y-minFoot,current=hips.bone.getWorldPosition(new T.Vector3());current.y+=correction;hips.bone.position.copy(hips.bone.parent.worldToLocal(current));root.updateWorldMatrix(true,true);
  const b=options.breath||0;bones.Spine.bone.scale.multiply(new T.Vector3(1+b*.012,1+b*.012,1+b*.025));root.updateWorldMatrix(true,true);
  if(locomotion)bones.Head.bone.quaternion.multiply(new T.Quaternion().setFromAxisAngle(X,-(options.reach||0)*.045));
  else turn('Head',.015*Math.sin(time*.7)-(options.reach||0)*.06,.01*Math.sin(time*.5),.02*Math.sin(time*.4));
  if(options.young)bones.Head.bone.scale.multiplyScalar(1.12);
  if(options.handTarget&&options.reach>0)reach(options.handTarget,options.reach);
  clearHands();
  root.updateWorldMatrix(true,false);root.updateMatrixWorld(true);
 },point(site){const pos=n=>bones[n]?.bone.getWorldPosition(new T.Vector3());if(site==='neck')return [pos('Neck')].filter(Boolean);if(site==='wrists')return ['LeftHand','RightHand'].map(pos).filter(Boolean);return [['LeftForeArm','LeftHand'],['RightForeArm','RightHand']].map(([a,b])=>{const p=pos(a),q=pos(b);return p&&q?p.lerp(q,.5):null;}).filter(Boolean);}};
}
