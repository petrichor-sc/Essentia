import * as T from '../atlas/assets/three.module.js';
// Metre-scale common jasmine: ~2 cm star flowers in terminal clusters.
// Botanical reference: https://www.rhs.org.uk/plants/9454/jasminum-officinale/details
export function jasmineShrub({density=10}={}){
 const root=new T.Group(),sources=[],clusters=[],leafTransforms=[],petalTransforms=[],centreTransforms=[],stemGeometry=[],V=(x,y,z)=>new T.Vector3(x,y,z);
 const material=c=>new T.MeshStandardMaterial({color:c,roughness:.88});const stem=material(0x668052),green=material(0xffffff),petal=material(0xfffbed),gold=material(0xe3c582);
 green.side=petal.side=T.DoubleSide;petal.emissive.setHex(0xffe6b3);petal.emissiveIntensity=.22;
 const tube=(points,r,segments=10)=>stemGeometry.push(new T.TubeGeometry(new T.CatmullRomCurve3(points),segments,r,5,false));
 // Three canes stay outside the wooden pole instead of disappearing inside it.
 const centre=(f,offset=0)=>{const a=f*Math.PI*7+offset;return V(.5+Math.cos(a)*(.215+.020*Math.sin(f*11)),f*4.6,Math.sin(a)*.215-.25);};
 const canesCount=density>1?9:3;
 for(let cane=0;cane<canesCount;cane++)tube(Array.from({length:80},(_,i)=>centre(i/79,cane*Math.PI*2/canesCount)),cane?.007:.012,64);
 const dummy=new T.Object3D();
 const hero=V(.34,1.60,-.53);
 function leaf(position,angle,tilt){if(position.distanceTo(hero)<.085)return;dummy.position.copy(position);dummy.rotation.set(tilt,angle,Math.sin(angle)*.32);const size=.93+leafTransforms.length%5*.045;dummy.scale.set(.036*size,.0034,.020*size);dummy.updateMatrix();leafTransforms.push(dummy.matrix.clone());}
 function flowerCluster(end,angle,count=6){
  const tips=[];
  for(let i=0;i<count;i++){
   const a=i*2.39996,r=i===0?0:.016+(i%3)*.006,tip=end.clone().add(V(Math.cos(a)*r,.012+Math.sin(i*1.4)*.015,Math.sin(a)*r));tips.push(tip.clone());
   tube([end,end.clone().lerp(tip,.5).add(V(0,.008,0)),tip],.0008,3);
   const flower=new T.Object3D();flower.position.copy(tip);flower.rotation.set(-.35+(i%3)*.28,angle*.35,a*.2);flower.updateMatrix();
   for(let k=0;k<5;k++){
    const a=k*Math.PI*2/5,p=new T.Object3D();p.position.set(Math.cos(a)*.0055,Math.sin(a)*.0055,0);p.rotation.z=a;p.scale.set(.005,.0022,.0012);p.updateMatrix();petalTransforms.push(flower.matrix.clone().multiply(p.matrix));
   }
   dummy.position.copy(tip);dummy.rotation.set(0,0,0);dummy.scale.setScalar(.0017);dummy.updateMatrix();centreTransforms.push(dummy.matrix.clone());sources.push(tip.clone());
  }
  clusters.push({center:end.clone(),flowers:tips});
 }
 for(let i=0;i<96*density;i++){
  const f=.035+i/(96*density)*.95,offset=(i%canesCount)*Math.PI*2/canesCount,base=centre(f,offset),a=f*Math.PI*7+offset,length=.20+(i%5)*.028,end=base.clone().add(V(Math.cos(a)*length,.07+Math.sin(i)*.04,Math.sin(a)*length));
  tube([base,base.clone().lerp(end,.55).add(V(0,.05,0)),end],.0023);
  for(let j=0;j<5;j++){
   const p=base.clone().lerp(end,.24+j*.145);
   for(const side of [-1,1]){const direction=a+side*.85;leaf(p.clone().add(V(Math.cos(direction)*.028,.006,Math.sin(direction)*.028)),direction,.55+(i%4)*.16+side*.12);}
  }
  leaf(end.clone().add(V(Math.cos(a)*.028,0,Math.sin(a)*.028)),a,.75);
  if(i%3!==1&&end.distanceTo(hero)>.10)flowerCluster(end,a,5+i%5);
 }
 const base=centre(1.51/4.6);tube([base,base.clone().lerp(hero,.5).add(V(0,.06,0)),hero],.0025);flowerCluster(hero,-.5,8);
 for(let j=0;j<3;j++)for(const side of [-1,1])leaf(base.clone().lerp(hero,.2+j*.18).add(V(side*.028,0,.01)),side*.8,.65);
 // Keep the tenfold total explicit, with a small clear sniffing corridor.
 for(let i=0;leafTransforms.length<1062*density;i++){
  const f=.04+((i*.61803398875)%1)*.93,a=i*2.39996,p=centre(f,a).add(V(Math.cos(a)*.18,.02,Math.sin(a)*.18));leaf(p,a,.8+(i%3)*.15);
 }
 for(let i=0;sources.length<453*density;i++){
  const f=.06+((i*.61803398875)%1)*.9,a=i*2.39996,p=centre(f,a).add(V(Math.cos(a)*.28,.06,Math.sin(a)*.28));if(p.distanceTo(hero)>.10)flowerCluster(p,a,(453*density-sources.length<=10?453*density-sources.length:8));
 }
 function instances(transforms,geometry,mat,name){const m=new T.InstancedMesh(geometry,mat,transforms.length);transforms.forEach((matrix,i)=>m.setMatrixAt(i,matrix));m.instanceMatrix.needsUpdate=true;m.name=name;root.add(m);return m;}
 // Low-poly curved leaf and petal surfaces keep thousands of instances light.
 function blade(p){const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setIndex([0,1,6,1,2,6,2,3,6,3,4,6,4,5,6,5,0,6]);g.computeVertexNormals();return g;}
 const leafGeo=blade([-1,0,0,-.6,.1,-.72,.35,.1,-.60,1,0,0,.35,.1,.60,-.6,.1,.72,0,.2,0]);
 const petalGeo=blade([-1,0,0,-.6,-.75,.1,.35,-.8,.1,1,0,0,.35,.8,.1,-.6,.75,.1,0,0,.4]);
 const leaves=instances(leafTransforms,leafGeo,green,'Dense layered jasmine leaflets');leafTransforms.forEach((_,i)=>leaves.setColorAt(i,new T.Color([0x52774a,0x648854,0x78935f,0x5f824f][i%4])));leaves.instanceColor.needsUpdate=true;
 instances(petalTransforms,petalGeo,petal,'Small clustered jasmine petals');instances(centreTransforms,new T.SphereGeometry(1,6,4),gold,'Jasmine flower centres');
 // Batch the many fine stems into one draw call, like the leaves and petals.
 const positions=[],normals=[],indices=[];let vertex=0;
 for(const geo of stemGeometry){positions.push(...geo.attributes.position.array);normals.push(...geo.attributes.normal.array);for(const index of geo.index.array)indices.push(index+vertex);vertex+=geo.attributes.position.count;geo.dispose();}
 const stems=new T.BufferGeometry();stems.setAttribute('position',new T.Float32BufferAttribute(positions,3));stems.setAttribute('normal',new T.Float32BufferAttribute(normals,3));stems.setIndex(indices);const canes=new T.Mesh(stems,stem);canes.name='Three climbing canes and clustered flower stems';root.add(canes);
 root.userData.flowerWidthMetres=.021;root.userData.clusterCount=clusters.length;root.userData.leafletCount=leafTransforms.length;root.userData.flowerCount=sources.length;root.userData.density=density;root.userData.revision='enchanted-jasmine-r18';
 return {root,sources,clusters,hero};
}
