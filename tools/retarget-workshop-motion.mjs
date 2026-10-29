import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join,resolve} from 'node:path';
import * as T from '../public/atlas/assets/three.module.js';
import {GLTFLoader} from '../public/workshop/assets/GLTFLoader.js';
const assets=fileURLToPath(new URL('../public/workshop/assets/',import.meta.url));
if(!process.argv[2])throw new Error('Usage: node tools/retarget-workshop-motion.mjs /path/to/Motifect/BVH');
const sourceDirectory=resolve(process.argv[2]);
function parseBVH(file){
 const text=fs.readFileSync(file,'utf8'),tokens=text.slice(0,text.indexOf('MOTION')).match(/\{|\}|[^\s{}]+/g);let i=0,channelCount=0;const nodes=[];
 const expect=t=>{if(tokens[i++]!==t)throw Error('Expected '+t);};
 function node(parent){const type=tokens[i++],name=tokens[i++],n={name:type==='End'?'End'+nodes.length:name,parent,channels:[],offset:[],start:channelCount};const id=nodes.length;nodes.push(n);expect('{');expect('OFFSET');n.offset=[+tokens[i++],+tokens[i++],+tokens[i++]];if(tokens[i]==='CHANNELS'){i++;const count=+tokens[i++];n.channels=tokens.slice(i,i+count);i+=count;channelCount+=count;}while(tokens[i]!=='}')node(id);expect('}');return id;}
 expect('HIERARCHY');node(-1);const part=text.slice(text.indexOf('MOTION')),dt=+part.match(/Frame Time:\s*([\d.]+)/)[1],count=+part.match(/Frames:\s*(\d+)/)[1],data=part.split(/Frame Time:\s*[\d.]+\s*/)[1].trim().split(/\s+/).map(Number);if(data.length!==count*channelCount)throw Error('Bad frame data');
 const frames=[];const axis={X:new T.Vector3(1,0,0),Y:new T.Vector3(0,1,0),Z:new T.Vector3(0,0,1)};
 for(let f=0;f<count;f++){
  const world=[],positions=[];for(const n of nodes){const q=new T.Quaternion(),p=new T.Vector3(...n.offset);for(let c=0;c<n.channels.length;c++){const channel=n.channels[c],v=data[f*channelCount+n.start+c];if(channel.endsWith('rotation'))q.multiply(new T.Quaternion().setFromAxisAngle(axis[channel[0]],v*Math.PI/180));else p[channel[0].toLowerCase()]+=v;}if(n.parent>=0){p.applyQuaternion(world[n.parent]).add(positions[n.parent]);q.premultiply(world[n.parent]);}world.push(q.normalize());positions.push(p);}frames.push({q:world,p:positions});
 }
 return {nodes,frames,dt};
}
const walk=parseBVH(join(sourceDirectory,'walk_forward.bvh')),idle=parseBVH(join(sourceDirectory,'idle_neutral.bvh'));
const sourceIds=Object.fromEntries(walk.nodes.map((n,i)=>[n.name,i]));
let best={score:Infinity};const compare=['LeftLeg','RightLeg','LeftShin','RightShin','LeftFoot','RightFoot','LeftArm','RightArm','LeftForeArm','RightForeArm','Hips'];
for(let start=20;start<95;start++)for(let length=26;length<=44&&start+length<165;length++){
 const end=start+length;let score=0;
 for(const name of compare){const id=sourceIds[name],q0=walk.frames[start].q[id],q1=walk.frames[end].q[id],v0=walk.frames[start+1].q[id].clone().multiply(q0.clone().invert()),v1=walk.frames[end+1].q[id].clone().multiply(q1.clone().invert());score+=q0.angleTo(q1)**2+v0.angleTo(v1)**2*8;}
 score+=(walk.frames[start].p[0].y-walk.frames[end].p[0].y)**2*.004;
 if(score<best.score)best={start,end,length,score};
}
console.log('Walk loop',best);
const raw=fs.readFileSync(assets+'visitor-realistic.glb'),loader=new GLTFLoader();loader.register(()=>({name:'GEO',loadMaterial:()=>Promise.resolve(new T.MeshStandardMaterial())}));const {scene:model}=await loader.parseAsync(raw.buffer.slice(raw.byteOffset,raw.byteOffset+raw.byteLength),'');model.updateMatrixWorld(true);
const bones={};model.traverse(o=>{if(o.isBone)bones[o.name.replace(/^mixamorig:?/,'')]=o;});
function align(name,child,dir){const bone=bones[name],origin=bone.getWorldPosition(new T.Vector3()),old=bones[child].getWorldPosition(new T.Vector3()).sub(origin).normalize(),delta=new T.Quaternion().setFromUnitVectors(old,dir),desired=delta.multiply(bone.getWorldQuaternion(new T.Quaternion()));bone.quaternion.copy(bone.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(desired));bone.updateMatrixWorld(true);}
for(const side of ['Left','Right']){const direction=new T.Vector3(side==='Left'?1:-1,0,0);align(side+'Arm',side+'ForeArm',direction);align(side+'ForeArm',side+'Hand',direction);}
const targetRest=Object.fromEntries(Object.entries(bones).map(([name,bone])=>[name,{q:bone.quaternion.clone(),p:bone.position.clone(),world:bone.getWorldQuaternion(new T.Quaternion())}]));
const mapping={Hips:'Hips',Spine:'Spine1',Spine1:'Spine2',Spine2:'Chest',Neck:'Neck1',ludovisions_FC1_NeckTwist02:'Neck2',Head:'Head'};
for(const side of ['Left','Right']){
 for(const joint of ['Shoulder','Arm','ForeArm','Hand','UpLeg','Leg','Foot','ToeBase'])mapping[side+joint]=side+(joint==='UpLeg'?'Leg':joint==='Leg'?'Shin':joint);
 for(const finger of ['Thumb','Index','Middle','Ring','Pinky'])for(let k=1;k<=3;k++){const target=side+'Hand'+finger+(finger==='Middle'&&k===3?4:k);if(bones[target])mapping[target]=side+'Hand'+finger+k;}
}
const order=[];model.traverse(o=>{const name=o.name.replace(/^mixamorig:?/,'');if(o.isBone&&mapping[name]&&sourceIds[mapping[name]]!==undefined)order.push(name);});
const hipBase=bones.Hips.getWorldPosition(new T.Vector3());
function build(source,start,end,label){
 const ids=Object.fromEntries(source.nodes.map((n,i)=>[n.name,i])),frameCount=end-start+1,tracks=Object.fromEntries(order.map(n=>[n,[]])),hip=[];
 const meanY=source.frames.slice(start,end+1).reduce((s,f)=>s+f.p[0].y,0)/frameCount,scale=hipBase.y/meanY;
 const center=source.frames.slice(start,end+1).reduce((v,f)=>v.add(f.p[0]),new T.Vector3()).multiplyScalar(1/frameCount),speed=label==='walk'?source.frames[end].p[0].distanceTo(source.frames[start].p[0])*scale/((end-start)*source.dt):0;
 for(let f=start;f<=end;f++){
  for(const [n,b] of Object.entries(bones)){b.quaternion.copy(targetRest[n].q);b.position.copy(targetRest[n].p);}model.updateMatrixWorld(true);
  const movement=new T.Vector3(label==='idle'?T.MathUtils.clamp((source.frames[f].p[0].x-center.x)*scale,-.045,.045):0,(source.frames[f].p[0].y-meanY)*scale,label==='idle'?T.MathUtils.clamp((source.frames[f].p[0].z-center.z)*scale,-.02,.02):0);
  bones.Hips.position.copy(bones.Hips.parent.worldToLocal(hipBase.clone().add(movement)));model.updateMatrixWorld(true);
  for(const name of order){const bone=bones[name],desired=source.frames[f].q[ids[mapping[name]]].clone().multiply(targetRest[name].world);bone.quaternion.copy(bone.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(desired)).normalize();bone.updateMatrixWorld(true);tracks[name].push(...bone.quaternion.toArray());}
  hip.push(...bones.Hips.position.toArray());
 }
 // Close the small end-to-start drift over the clip, retaining the stride.
 for(const values of Object.values(tracks)){
  const first=new T.Quaternion().fromArray(values,0),last=new T.Quaternion().fromArray(values,(frameCount-1)*4),correction=first.multiply(last.invert());
  for(let f=0;f<frameCount;f++){const q=new T.Quaternion().fromArray(values,f*4),offset=new T.Quaternion().slerp(correction,f/(frameCount-1));q.premultiply(offset).normalize().toArray(values,f*4);}
 }
 for(let k=0;k<3;k++){const drift=hip[(frameCount-1)*3+k]-hip[k];for(let f=0;f<frameCount;f++)hip[f*3+k]-=drift*f/(frameCount-1);}
 const rounded=a=>a.map(v=>Math.round(v*1e6)/1e6);return {fps:1/source.dt,frames:frameCount,duration:(frameCount-1)*source.dt,speed,tracks:Object.fromEntries(Object.entries(tracks).map(([k,v])=>[k,rounded(v)])),hips:rounded(hip)};
}
const data={clips:['walk_forward','idle_neutral'],revision:'motifect-fc1-r17',source:'Motifect Locomotion Motion Pack',walk:build(walk,best.start,best.end,'walk'),idle:build(idle,0,idle.frames.length-1,'idle')};fs.writeFileSync(assets+'visitor-motion.json',JSON.stringify(data));console.log('Baked',order.length,'joints; source walk speed',data.walk.speed,'m/s');
