import * as T from '../atlas/assets/three.module.js';
const V=()=>new T.Vector3();

export function magnifiedHand(model){
 let source,best=-1;model.traverse(o=>{if(!o.isSkinnedMesh||o.userData.workshopHair||o.userData.workshopDress)return;const g=o.geometry;let score=0;for(let i=0;i<g.attributes.position.count;i++)for(let k=0;k<4;k++){const id=g.attributes.skinIndex.array[i*4+k],w=g.attributes.skinWeight.array[i*4+k];if(/RightHand/.test(o.skeleton.bones[id]?.name||''))score+=w;}if(score>best){best=score;source=o;}});
 if(!source)throw new Error('Hand source is missing');
 model.updateWorldMatrix(true,true);source.updateMatrixWorld(true);source.skeleton.update();
 const bones=source.skeleton.bones,point=name=>{const b=bones.find(b=>b.name.replace(/^mixamorig:?/,'')===name);if(!b)throw new Error('Missing hand joint '+name);return b.getWorldPosition(V());};
 const wrist=point('RightHand'),y=point('RightHandMiddle4').sub(wrist).normalize(),across=point('RightHandIndex1').sub(point('RightHandPinky1')).normalize(),z=across.clone().cross(y).normalize(),x=y.clone().cross(z).normalize(),basis=new T.Matrix4().makeBasis(x,y,z).invert(),scale=1.6/point('RightHandMiddle4').distanceTo(wrist);
 const geometry=source.geometry,weights=geometry.attributes.skinWeight,joints=geometry.attributes.skinIndex,positions=[],normals=[],uvs=[],colors=[],index=[],remap=new Map(),eligible=[];
 for(let i=0;i<geometry.attributes.position.count;i++){
  let amount=0;for(let k=0;k<4;k++)if(/Right(?:Hand|ForeArm)/.test(bones[joints.array[i*4+k]]?.name||''))amount+=weights.array[i*4+k];eligible[i]=amount>.12;
 }
 function vertex(i){
  if(remap.has(i))return remap.get(i);
  const p=source.localToWorld(source.getVertexPosition(i,V())).sub(wrist).applyMatrix4(basis).multiplyScalar(scale),id=positions.length/3,alpha=T.MathUtils.smoothstep(p.y,-1.5,-.75);
  positions.push(p.x,p.y,p.z);uvs.push(geometry.attributes.uv.getX(i),geometry.attributes.uv.getY(i));colors.push(1,1,1,alpha);remap.set(i,id);return id;
 }
 for(let t=0;t<geometry.index.count;t+=3){const a=geometry.index.getX(t),b=geometry.index.getX(t+1),c=geometry.index.getX(t+2);if(eligible[a]||eligible[b]||eligible[c])index.push(vertex(a),vertex(b),vertex(c));}
 const handGeometry=new T.BufferGeometry();handGeometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));handGeometry.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));handGeometry.setAttribute('color',new T.Float32BufferAttribute(colors,4));handGeometry.setIndex(index);handGeometry.computeVertexNormals();handGeometry.computeBoundingSphere();
 const original=Array.isArray(source.material)?source.material[0]:source.material,material=new T.MeshStandardMaterial({color:0xc99c7c,roughness:.82,normalMap:original.normalMap,vertexColors:true,transparent:true,alphaTest:.015,side:T.DoubleSide});
 const mesh=new T.Mesh(handGeometry,material);mesh.name='Magnified intact hand, wrist and fading forearm';
 // Scatter deposits over the visible wrist/palm triangles, rather than a slab.
 const triangles=[],p=handGeometry.attributes.position,a=V(),b=V(),c=V();let total=0;
 for(let i=0;i<index.length;i+=3){a.fromBufferAttribute(p,index[i]);b.fromBufferAttribute(p,index[i+1]);c.fromBufferAttribute(p,index[i+2]);const normal=b.clone().sub(a).cross(c.clone().sub(a)),middle=a.clone().add(b).add(c).divideScalar(3);if(middle.y<-.6||middle.y>.65||normal.z<=0)continue;const area=normal.length()/2;if(!area)continue;normal.normalize();total+=area;triangles.push({a:a.clone(),b:b.clone(),c:c.clone(),normal,end:total});}
 if(!triangles.length)throw new Error('No wrist surface found');
 return {mesh,samples(count){
  return Array.from({length:count},(_,i)=>{const value=((i+.5)*.61803398875%1)*total,tri=triangles.find(t=>t.end>=value)||triangles.at(-1),u=Math.sqrt((i*.41421356237+.27)%1),v=(i*.73205080757+.31)%1;return tri.a.clone().multiplyScalar(1-u).addScaledVector(tri.b,u*(1-v)).addScaledVector(tri.c,u*v).addScaledVector(tri.normal,.008);});
 }};
}
