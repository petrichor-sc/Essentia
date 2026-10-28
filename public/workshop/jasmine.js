import * as T from '../atlas/assets/three.module.js';
// Metre-scale common jasmine: ~2 cm star flowers in terminal clusters.
// Botanical reference: https://www.rhs.org.uk/plants/9454/jasminum-officinale/details
export function jasmineShrub(){
 const root=new T.Group(),sources=[],clusters=[],leafTransforms=[],petalTransforms=[],centreTransforms=[],V=(x,y,z)=>new T.Vector3(x,y,z);
 const material=c=>new T.MeshStandardMaterial({color:c,roughness:.88});const stem=material(0x76674a),green=material(0x63835b),petal=material(0xfff8e7),gold=material(0xe3c582);
 const tube=(points,r)=>{const m=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),20,r,5,false),stem);root.add(m);};
 const centre=f=>{const a=f*Math.PI*7;return V(.5+Math.cos(a)*(.135+.035*Math.sin(f*11)),f*4.6,Math.sin(a)*.14-.25);};
 tube(Array.from({length:80},(_,i)=>centre(i/79)),.012);
 const dummy=new T.Object3D();
 function leaf(position,angle,tilt){dummy.position.copy(position);dummy.rotation.set(tilt,angle,Math.sin(angle)*.25);dummy.scale.set(.027,.0028,.009);dummy.updateMatrix();leafTransforms.push(dummy.matrix.clone());}
 function flowerCluster(end,angle,count=6){
  const tips=[];
  for(let i=0;i<count;i++){
   const a=i*2.39996,r=i===0?0:.016+(i%3)*.006,tip=end.clone().add(V(Math.cos(a)*r,.012+Math.sin(i*1.4)*.015,Math.sin(a)*r));tips.push(tip.clone());
   tube([end,end.clone().lerp(tip,.5).add(V(0,.008,0)),tip],.0008);
   const flower=new T.Object3D();flower.position.copy(tip);flower.rotation.set(-.35+(i%3)*.28,angle*.35,a*.2);flower.updateMatrix();
   for(let k=0;k<5;k++){
    const a=k*Math.PI*2/5,p=new T.Object3D();p.position.set(Math.cos(a)*.0055,Math.sin(a)*.0055,0);p.rotation.z=a;p.scale.set(.005,.0022,.0012);p.updateMatrix();petalTransforms.push(flower.matrix.clone().multiply(p.matrix));
   }
   dummy.position.copy(tip);dummy.rotation.set(0,0,0);dummy.scale.setScalar(.0017);dummy.updateMatrix();centreTransforms.push(dummy.matrix.clone());sources.push(tip.clone());
  }
  clusters.push({center:end.clone(),flowers:tips});
 }
 for(let i=0;i<38;i++){
  const f=.055+i/40*.94,base=centre(f),a=i*2.39996,length=.20+(i%5)*.045,end=base.clone().add(V(Math.cos(a)*length,.07+Math.sin(i)*.04,Math.sin(a)*length));
  tube([base,base.clone().lerp(end,.55).add(V(0,.05,0)),end],.0023);
  for(let j=0;j<3;j++){
   const p=base.clone().lerp(end,.28+j*.19);
   for(const side of [-1,1]){const direction=a+side*.85;leaf(p.clone().add(V(Math.cos(direction)*.025,.002,Math.sin(direction)*.025)),direction,.1+side*.15);}
  }
  leaf(end.clone().add(V(Math.cos(a)*.028,0,Math.sin(a)*.028)),a,.12);
  if(i%2===0)flowerCluster(end,a,4+i%4);
 }
 const hero=V(.34,1.60,-.53),base=centre(1.51/4.6);tube([base,base.clone().lerp(hero,.5).add(V(0,.06,0)),hero],.0025);flowerCluster(hero,-.5,8);
 for(const side of [-1,1])leaf(base.clone().lerp(hero,.5).add(V(side*.025,0,.01)),side*.8,.1);
 function instances(transforms,geometry,mat,name){const m=new T.InstancedMesh(geometry,mat,transforms.length);transforms.forEach((matrix,i)=>m.setMatrixAt(i,matrix));m.instanceMatrix.needsUpdate=true;m.name=name;root.add(m);return m;}
 const sphere=new T.SphereGeometry(1,10,6);
 instances(leafTransforms,sphere,green,'Jasmine leaflets');instances(petalTransforms,sphere,petal,'Small clustered jasmine petals');instances(centreTransforms,new T.SphereGeometry(1,7,5),gold,'Jasmine flower centres');
 root.userData.flowerWidthMetres=.021;root.userData.clusterCount=clusters.length;
 return {root,sources,clusters,hero};
}
