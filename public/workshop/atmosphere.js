import * as T from '../atlas/assets/three.module.js';

export function hillAtmosphere(ground){
 const root=new T.Group(),skyGeometry=new T.SphereGeometry(128,48,24),colours=[];
 const horizon=new T.Color(0xe9dcc3),upper=new T.Color(0x8faebc),blue=new T.Color(0x698da7);
 for(let i=0;i<skyGeometry.attributes.position.count;i++){
  const y=skyGeometry.attributes.position.getY(i)/128;
  const color=y<.3?horizon.clone().lerp(upper,T.MathUtils.smoothstep(y,-.03,.3)):upper.clone().lerp(blue,T.MathUtils.smoothstep(y,.3,.95));
  colours.push(color.r,color.g,color.b);
 }
 skyGeometry.setAttribute('color',new T.Float32BufferAttribute(colours,3));
 const sky=new T.Mesh(skyGeometry,new T.MeshBasicMaterial({side:T.BackSide,vertexColors:true,depthWrite:false,fog:false}));sky.renderOrder=-10;root.add(sky);
 const clouds=[];
 for(let i=0;i<12;i++){
  const cloud=new T.Group(),angle=i*Math.PI*2/12;
  cloud.position.set(Math.cos(angle)*51,15+(i%3)*3,Math.sin(angle)*51);cloud.rotation.y=-angle;root.add(cloud);
  for(let puff=0;puff<4;puff++){
   const m=new T.Mesh(new T.SphereGeometry(1,16,10),new T.MeshBasicMaterial({color:0xeee9da,transparent:true,opacity:.27,depthWrite:false,fog:false}));
   m.position.set((puff-1.5)*2.2,Math.sin(puff*2+i)*.3,Math.cos(puff+i)*.5);m.scale.set(3.2,.55+(puff%2)*.25,1.5);cloud.add(m);
  }
  clouds.push({cloud,angle});
 }
 // Soft 360-degree ridges, connected down to the terrain rather than a cut-out sky strip.
 for(let layer=0;layer<3;layer++){
  const r=34+layer*22,segments=160,positions=[],indices=[];
  for(let i=0;i<=segments;i++){
   const a=i/segments*Math.PI*2,height=ground+3.5+layer*1.6+Math.sin(a*3+layer)*1.1+Math.cos(a*5-layer)*.6;
   positions.push(Math.cos(a)*r,ground-1.5,Math.sin(a)*r,Math.cos(a)*r,height,Math.sin(a)*r);
   if(i<segments){const n=i*2;indices.push(n,n+1,n+3,n,n+3,n+2);}
  }
  const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();
  root.add(new T.Mesh(geometry,new T.MeshBasicMaterial({color:[0x647e70,0x8b9d91,0xb5beb2][layer],side:T.DoubleSide})));
 }
 const treeMaterial=new T.MeshStandardMaterial({color:0x536f59,roughness:1}),forest=new T.InstancedMesh(new T.ConeGeometry(1,1,9),treeMaterial,96),dummy=new T.Object3D();
 for(let i=0;i<96;i++){
  const a=i*2.39996,r=24+(i%7)*1.5,h=2.5+(i%5)*.45;
  dummy.position.set(Math.cos(a)*r,ground+h*.5,Math.sin(a)*r);dummy.scale.set(h*.2,h,h*.2);dummy.rotation.y=a;dummy.updateMatrix();forest.setMatrixAt(i,dummy.matrix);forest.setColorAt(i,new T.Color().setHSL(.30+(i%3)*.013,.14,.27+(i%5)*.02));
 }
 forest.instanceMatrix.needsUpdate=true;root.add(forest);
 return {root,update(t){clouds.forEach(({cloud,angle},i)=>{cloud.position.x=Math.cos(angle)*51+Math.sin(t*.008+i)*2;});}};
}
