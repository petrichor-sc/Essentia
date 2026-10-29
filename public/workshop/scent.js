import * as T from '../atlas/assets/three.module.js';

export function ambientScentPosition(source,seed,time,target=new T.Vector3()){
 const f=(seed.phase+time*seed.speed)%1,eddy=Math.sin(seed.angle+f*5+time*.25);
 target.copy(source);target.x-=f*(.9+seed.phase*1.9);target.y+=f*(.5+seed.phase*.9)+Math.sin(seed.angle+time*.5)*f*.28;target.z+=eddy*f*.95;
 return {position:target,alpha:Math.min(1,f*18)*Math.pow(1-f,.85)};
}

export function jasmineScent(sources){
 const perFlower=Math.max(2,Math.min(6,Math.floor(906/sources.length))),ambientCount=sources.length*perFlower,inhaledCount=40,count=ambientCount+inhaledCount,ambientAlpha=.55*Math.min(1,Math.sqrt(906/ambientCount));
 const seeds=Array.from({length:count},(_,i)=>({phase:i<ambientCount?(Math.floor(i/sources.length)/perFlower+(i%sources.length)*.61803398875)%1:(i*.61803398875)%1,speed:.105+((i%sources.length)%7)*.009,angle:i*2.39996,source:i%sources.length}));
 const geometry=new T.BufferGeometry(),positions=new T.Float32BufferAttribute(new Float32Array(count*3),3),colours=new T.Float32BufferAttribute(new Float32Array(count*4),4);geometry.setAttribute('position',positions);geometry.setAttribute('color',colours);
 const canvas=document.createElement('canvas');canvas.width=64;canvas.height=64;const c=canvas.getContext('2d'),glow=c.createRadialGradient(32,32,0,32,32,32);glow.addColorStop(0,'rgba(255,255,255,1)');glow.addColorStop(.13,'rgba(255,255,255,.95)');glow.addColorStop(.32,'rgba(255,255,255,.35)');glow.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=glow;c.fillRect(0,0,64,64);
 const points=new T.Points(geometry,new T.PointsMaterial({map:new T.CanvasTexture(canvas),size:.075,vertexColors:true,transparent:true,depthWrite:false,depthTest:true,blending:T.AdditiveBlending,toneMapped:false}));
 points.frustumCulled=false;points.name='Continuous jasmine scent';
 const amber=new T.Color(0xffbf65),position=new T.Vector3();
 return {points,seeds,ambientCount,update(time,{nose=null,capture=-1,flower=sources[0]}={}){
  for(let i=0;i<count;i++){
   const seed=seeds[i];let alpha=0;
   if(i<ambientCount){const sample=ambientScentPosition(sources[seed.source],seed,time,position);alpha=sample.alpha*ambientAlpha;}
   else{
    position.copy(flower);
    if(nose&&capture>=0){const f=(capture-seed.phase*.22)/.78;
     if(f>=0&&f<=1){const eased=f*f*(3-2*f),spread=Math.sin(Math.PI*f);position.lerp(nose,eased);position.y+=spread*(.08+Math.sin(seed.angle+f*4)*.08);position.z+=spread*Math.sin(seed.angle)*.11;alpha=Math.min(1,f*12)*Math.min(1,(1-f)*16);}
    }
   }
   positions.setXYZ(i,position.x,position.y,position.z);colours.setXYZW(i,amber.r,amber.g,amber.b,alpha);
  }
  positions.needsUpdate=true;colours.needsUpdate=true;
 }};
}
