import * as THREE from './assets/three.module.js';
import { OrbitControls } from './assets/OrbitControls.js';

const GOLD = 0xc9a465;
const LAVENDER = 0xc0ace8;
const RADIUS = 1.39;
const DEG = Math.PI / 180;
const locationVector = (latitude, longitude, radius = RADIUS) => {
  const phi = (90 - latitude) * DEG, theta = (longitude + 180) * DEG;
  return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
};

export class AtlasScene {
  constructor(container, geography, regions, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.regions = regions;
    this.mode = 'world';
    this.activeRegions = new Set();
    this.regionCounts = new Map();
    this.autoRotate = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(36, 1, .1, 50);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.7));
    this.renderer.setClearColor(0x100b19, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.setAttribute('aria-hidden', 'true');
    this.renderer.domElement.style.touchAction = 'pan-y';
    container.append(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = .055;
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.autoRotateSpeed = .3;
    this.controls.autoRotate = this.autoRotate;
    this.controls.rotateSpeed = .45;
    this.controls.minPolarAngle = Math.PI * .1;
    this.controls.maxPolarAngle = Math.PI * .9;
    this.controls.addEventListener('start', () => { this.targetCamera = null; this.callbacks.onHover?.(null); });
    this.scene.add(new THREE.HemisphereLight(0xe4d8f3, 0x241331, 2.4));
    const light = new THREE.DirectionalLight(0xffe1ad, 2.8); light.position.set(-3, 4, 5); this.scene.add(light);
    const rim = new THREE.DirectionalLight(0xb69cda, 2.1); rim.position.set(3, 1, -3); this.scene.add(rim);
    this.world = new THREE.Group(); this.scene.add(this.world);
    this.createGlobe(geography);
    this.body = this.createBody(); this.body.visible = false; this.scene.add(this.body);
    this.raycaster = new THREE.Raycaster(); this.pointer = new THREE.Vector2();
    this.rayTargets = [];
    this.createPins();
    let pointerStart = null;
    this.renderer.domElement.addEventListener('pointerdown', e => { pointerStart = [e.clientX, e.clientY]; });
    this.renderer.domElement.addEventListener('pointerup', e => {
      if (this.mode !== 'world' || !pointerStart || Math.hypot(e.clientX - pointerStart[0], e.clientY - pointerStart[1]) > 6) return;
      const hit = this.pick(e); if (hit) this.callbacks.onRegion(hit.userData.region.id);
    });
    this.renderer.domElement.addEventListener('pointermove', e => {
      if (this.mode !== 'world' || e.buttons) return;
      const hit = this.pick(e);
      this.renderer.domElement.style.cursor = hit ? 'pointer' : 'grab';
      const rect = container.getBoundingClientRect();
      this.callbacks.onHover?.(hit ? { region: hit.userData.region, count: this.regionCounts.get(hit.userData.region.id) || 0, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
    });
    this.renderer.domElement.addEventListener('pointerleave', () => this.callbacks.onHover?.(null));
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(container);
    this.visible = true;
    this.visibilityObserver = new IntersectionObserver(entries => { this.visible = entries[0].isIntersecting; }); this.visibilityObserver.observe(container);
    this.resize(); this.reset();
    this.clock = new THREE.Clock();
    this.animate();
  }

  createGlobe(geography) {
    const canvas = document.createElement('canvas'); canvas.width = 2000; canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2); ctx.fillStyle = '#20152e'; ctx.fillRect(0, 0, 1000, 500);
    ctx.fillStyle = '#493851'; ctx.strokeStyle = '#b7976c'; ctx.lineWidth = .55;
    const land = new Path2D(geography.land); ctx.fill(land); ctx.stroke(land);
    ctx.strokeStyle = '#b69cbe40'; ctx.lineWidth = .35; ctx.stroke(new Path2D(geography.borders));
    ctx.strokeStyle = '#c0ace815'; ctx.lineWidth = .45;
    for (let latitude = -60; latitude <= 60; latitude += 30) { const y = (90 - latitude) / 180 * 500; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1000, y); ctx.stroke(); }
    for (let longitude = -150; longitude <= 180; longitude += 30) { const x = (longitude + 180) / 360 * 1000; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 500); ctx.stroke(); }
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(RADIUS, 80, 56), new THREE.MeshStandardMaterial({ map: texture, roughness: .92, metalness: .04 }));
    this.world.add(sphere);
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(RADIUS * 1.045, 48, 32), new THREE.ShaderMaterial({
      transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
      uniforms: { color: { value: new THREE.Color(0x8c659f) } },
      vertexShader: 'varying vec3 n;varying vec3 v;void main(){vec4 p=modelViewMatrix*vec4(position,1.0);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}',
      fragmentShader: 'uniform vec3 color;varying vec3 n;varying vec3 v;void main(){float f=pow(1.0-abs(dot(normalize(n),normalize(v))),3.5);gl_FragColor=vec4(color,f*.26);}'
    }));
    this.world.add(atmosphere);
    const orbitMaterial = new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: .13 });
    const orbit = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({length:160}, (_,i) => {const a=i/160*Math.PI*2;return new THREE.Vector3(Math.cos(a)*1.72,0,Math.sin(a)*1.72);})),orbitMaterial);
    orbit.rotation.z = .24; this.world.add(orbit);
  }

  createPins() {
    this.pins = new Map();
    const circle = new THREE.CircleGeometry(.018, 16), ring = new THREE.RingGeometry(.032, .036, 24);
    const hitGeometry = new THREE.SphereGeometry(.066, 8, 8);
    this.regions.forEach(region => {
      const group = new THREE.Group(); group.position.copy(locationVector(region.latitude, region.longitude, RADIUS * 1.006)); group.lookAt(group.position.clone().multiplyScalar(2));
      const dot = new THREE.Mesh(circle, new THREE.MeshBasicMaterial({ color: GOLD }));
      const halo = new THREE.Mesh(ring, new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: .55, side: THREE.DoubleSide }));
      const hit = new THREE.Mesh(hitGeometry, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }));
      hit.userData.region = region; group.add(dot, halo, hit); this.world.add(group); this.rayTargets.push(hit);
      this.pins.set(region.id, { group, dot, halo, hit });
    });
  }

  createBody() {
    const group = new THREE.Group();
    const skin = new THREE.MeshPhysicalMaterial({ color: 0x8d729b, metalness: .05, roughness: .6, transparent: true, opacity: .36, side: THREE.DoubleSide, depthWrite: false });
    const outline = new THREE.MeshBasicMaterial({ color: 0xc0ace8, transparent: true, opacity: .065, wireframe: true });
    const addMesh = (geometry, position, scale) => {
      const mesh = new THREE.Mesh(geometry, skin); mesh.position.set(...position); if(scale) mesh.scale.set(...scale); group.add(mesh);
      const wire = new THREE.Mesh(geometry, outline); wire.position.copy(mesh.position); wire.scale.copy(mesh.scale); group.add(wire);
      return mesh;
    };
    const segment = (a, b, radiusA, radiusB) => {
      const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b), direction = end.clone().sub(start);
      const geometry = new THREE.CylinderGeometry(radiusB, radiusA, direction.length(), 18, 8);
      const mesh = addMesh(geometry, start.clone().add(end).multiplyScalar(.5).toArray()); mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction.normalize());
      const wire = group.children[group.children.length-1]; wire.quaternion.copy(mesh.quaternion);
    };
    addMesh(new THREE.SphereGeometry(.245, 28, 22), [0,1.38,0], [.87,1.14,.93]);
    addMesh(new THREE.CylinderGeometry(.105,.12,.23,18,6), [0,1.08,0]);
    const points = [[.26,-.34],[.34,-.2],[.31,.05],[.27,.25],[.31,.52],[.39,.77],[.4,.88],[.19,1.0],[.12,1.01]].map(([r,y])=>new THREE.Vector2(r,y));
    addMesh(new THREE.LatheGeometry(points,32), [0,0,0], [1,1,.65]);
    addMesh(new THREE.SphereGeometry(.3,20,14), [0,-.32,0], [1.1,.74,.8]);
    for(const sign of [-1,1]) {
      addMesh(new THREE.SphereGeometry(.15,18,14), [sign*.4,.81,0]);
      segment([sign*.41,.8,0],[sign*.57,.2,0],.14,.10);
      addMesh(new THREE.SphereGeometry(.10,16,12),[sign*.57,.2,0]);
      segment([sign*.57,.2,0],[sign*.65,-.32,.04],.10,.065);
      addMesh(new THREE.SphereGeometry(.105,18,14),[sign*.65,-.42,.045],[.7,1.4,.55]);
      segment([sign*.185,-.4,0],[sign*.235,-1.0,0],.18,.115);
      addMesh(new THREE.SphereGeometry(.115,18,14),[sign*.235,-1.0,0]);
      segment([sign*.235,-1.0,0],[sign*.25,-1.61,0],.115,.065);
      addMesh(new THREE.SphereGeometry(.1,18,14),[sign*.25,-1.68,.08],[.85,.7,1.6]);
    }
    this.topicOrbs = new Map();
    const pointsByTopic = { calm:[0,1.45,.18],rest:[0,1.45,.18],attention:[0,1.45,.18],breathing:[0,.65,.25],skin:[-.45,.6,.1],muscles:[.56,.15,.1],digestion:[0,.02,.25] };
    for(const [id,position] of Object.entries(pointsByTopic)) {
      const orb = new THREE.Group(); orb.position.set(...position);
      const glow = new THREE.Mesh(new THREE.SphereGeometry(.08,20,16),new THREE.MeshBasicMaterial({color:GOLD,transparent:true,opacity:.72}));
      const ring = new THREE.Mesh(new THREE.RingGeometry(.13,.136,48),new THREE.MeshBasicMaterial({color:GOLD,transparent:true,opacity:.5,side:THREE.DoubleSide}));
      orb.add(glow,ring);orb.visible=false;group.add(orb);this.topicOrbs.set(id,orb);
    }
    const arcGeometry = new THREE.BufferGeometry().setFromPoints(Array.from({length:150},(_,i)=>{const a=i/150*Math.PI*2;return new THREE.Vector3(Math.cos(a)*1.02,Math.sin(a)*1.86, -.3);}));
    group.add(new THREE.LineLoop(arcGeometry,new THREE.LineBasicMaterial({color:GOLD,transparent:true,opacity:.14})));
    const floor = new THREE.Mesh(new THREE.RingGeometry(.6,.61,80),new THREE.MeshBasicMaterial({color:GOLD,transparent:true,opacity:.2,side:THREE.DoubleSide}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.8;group.add(floor);
    group.position.y=.035;
    return group;
  }

  pick(event) {
    const rect=this.renderer.domElement.getBoundingClientRect();
    this.pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);
    this.raycaster.setFromCamera(this.pointer,this.camera);
    const hits=this.raycaster.intersectObjects(this.rayTargets,false);
    return hits.find(hit=>{
      if(!hit.object.parent.visible)return false;
      const worldPosition=hit.object.getWorldPosition(new THREE.Vector3());
      return worldPosition.dot(this.camera.position.clone().sub(worldPosition))>0;
    })?.object;
  }

  setRegions(counts, selected) {
    this.regionCounts=counts;this.activeRegions=new Set(selected);
    for(const [id,pin]of this.pins){
      pin.group.visible=counts.has(id)||this.activeRegions.has(id);
      const active=this.activeRegions.has(id);pin.dot.material.color.setHex(active?LAVENDER:GOLD);pin.halo.material.color.setHex(active?LAVENDER:GOLD);
      pin.group.scale.setScalar(active?1.7:1);pin.halo.material.opacity=active ? .9 : .45;
    }
  }

  setMode(mode) {
    if(this.mode===mode)return;
    this.mode=mode;this.world.visible=mode==='world';this.body.visible=mode==='body';
    this.controls.autoRotate=mode==='world'&&this.autoRotate;
    this.controls.enableRotate=mode==='world';this.controls.target.set(0,0,0);this.targetCamera=null;
    this.reset();
  }

  setTopic(topic) { for(const [id,orb]of this.topicOrbs)orb.visible=id===topic; }
  setRotation(enabled) { this.autoRotate=enabled;this.controls.autoRotate=this.mode==='world'&&enabled; }
  focusRegion(id) { const region=this.regions.find(r=>r.id===id);if(region&&this.mode==='world')this.targetCamera=locationVector(region.latitude,region.longitude,this.worldDistance); }
  reset() {
    if(this.mode==='body')this.camera.position.set(0,0,6.0);
    else this.camera.position.copy(locationVector(23,62,this.worldDistance||5));
    this.controls.target.set(0,0,0);this.camera.lookAt(0,0,0);this.controls.update();
  }
  resize() {
    const width=this.container.clientWidth,height=this.container.clientHeight;if(!width||!height)return;
    this.camera.aspect=width/height;this.camera.updateProjectionMatrix();this.renderer.setSize(width,height);
    this.worldDistance=4.85/Math.min(1,this.camera.aspect*.95);
    if(this.mode==='world')this.camera.position.normalize().multiplyScalar(this.worldDistance);
    else this.camera.position.set(0,0,6.0);
  }
  animate() {
    this.frame=requestAnimationFrame(()=>this.animate());
    if(!this.visible||document.hidden)return;
    const delta=Math.min(this.clock.getDelta(),.05);
    if(this.targetCamera){this.camera.position.lerp(this.targetCamera,.055);if(this.camera.position.distanceTo(this.targetCamera)<.003)this.targetCamera=null;}
    this.controls.update(delta);
    this.renderer.render(this.scene,this.camera);
  }
  dispose() {cancelAnimationFrame(this.frame);this.controls.dispose();this.resizeObserver.disconnect();this.visibilityObserver.disconnect();this.renderer.dispose();}
}
