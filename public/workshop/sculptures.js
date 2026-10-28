import * as T from '../atlas/assets/three.module.js';
const V=(x,y,z)=>new T.Vector3(x,y,z);
export function reachingArm(parent){
 const root=new T.Group();parent.add(root);const skin=new T.MeshStandardMaterial({color:0x9b7cba,roughness:.65,metalness:0,transparent:false,opacity:1});
 const shoulder=V(2.6,-2.65,.1),elbow=V(2.75,-2.35,2.15),wrist=V(1.45,-1.15,4.1),hand=V(1.25,-.98,4.42);
 // A continuous tapered arm surface avoids visibly separate joint pieces.
 const path=new T.CatmullRomCurve3([shoulder,elbow,wrist]),geo=new T.TubeGeometry(path,40,1,14,false),p=geo.attributes.position;
 for(let i=0;i<p.count;i++){const ring=Math.floor(i/15),t=ring/40,centre=path.getPointAt(t),r=.48*(1-t)+.19*t;const v=V().fromBufferAttribute(p,i).sub(centre).multiplyScalar(r).add(centre);p.setXYZ(i,v.x,v.y,v.z);}geo.computeVertexNormals();root.add(new T.Mesh(geo,skin));
 const palm=new T.Mesh(new T.SphereGeometry(1,18,12),skin);palm.position.copy(hand);palm.scale.set(.25,.13,.39);palm.rotation.x=-.3;root.add(palm);
 for(let i=0;i<4;i++){const x=hand.x+(i-1.5)*.11,length=.48-Math.abs(i-1.3)*.08,base=V(x,hand.y,hand.z+.22),c=new T.CatmullRomCurve3([base,V(x,hand.y+.11,hand.z+.45),V(x-.03,hand.y+.14,hand.z+.22+length)]);root.add(new T.Mesh(new T.TubeGeometry(c,14,.049,7,false),skin));}
 const thumb=new T.CatmullRomCurve3([V(hand.x-.18,hand.y,hand.z),V(hand.x-.34,hand.y+.1,hand.z+.12),V(hand.x-.38,hand.y+.17,hand.z+.3)]);root.add(new T.Mesh(new T.TubeGeometry(thumb,12,.068,7,false),skin));
 return root;
}
export function cerebralSculpture(){
 const root=new T.Group(),geo=new T.SphereGeometry(1,90,64),p=geo.attributes.position;
 for(let i=0;i<p.count;i++){
  const x=p.getX(i),y=p.getY(i),z=p.getZ(i),a=Math.atan2(z,x),latitude=Math.asin(Math.max(-1,Math.min(1,y)));
  const fold=.065*Math.sin(a*17+Math.sin(latitude*7)*1.8)*Math.sin(latitude*22+a*2)+.025*Math.cos(z*31+x*13);
  const cleft=Math.exp(-x*x*140)*Math.max(0,y)*.11;
  p.setXYZ(i,x*(1.65+fold),y*(1.25+fold)-cleft,z*(1.38+fold));
 }
 geo.computeVertexNormals();const body=new T.Mesh(geo,new T.MeshStandardMaterial({color:0x9980b1,roughness:.8,metalness:0,transparent:true,opacity:.64}));root.add(body);
 const cerebellum=new T.Mesh(new T.SphereGeometry(1,30,20),new T.MeshStandardMaterial({color:0x756189,roughness:.9}));cerebellum.position.set(0,-.9,-.85);cerebellum.scale.set(.8,.48,.57);root.add(cerebellum);
 const stem=new T.Mesh(new T.CylinderGeometry(.16,.12,.7,16),new T.MeshStandardMaterial({color:0x967ca7,roughness:.8}));stem.position.set(0,-1.3,-.5);stem.rotation.x=.25;root.add(stem);
 // A subtle longitudinal fissure and folds reinforce the brain's orientation.
 const fissure=new T.CatmullRomCurve3([V(0,.1,1.36),V(0,.95,.85),V(0,1.14,0),V(0,.92,-.9),V(0,.1,-1.35)]);root.add(new T.Line(new T.BufferGeometry().setFromPoints(fissure.getPoints(60)),new T.LineBasicMaterial({color:0x49374e,transparent:true,opacity:.7})));
 return root;
}
