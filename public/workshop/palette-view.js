import {AtlasScene} from '../atlas/globe.js';
import {TOPICS,escapeHTML as esc,botanicalArt} from '../atlas/core.js';
import {WORKSHOP_MATERIALS as materials,WORKSHOP_LOCATIONS as locations,TRIANGLE_BANDS,materialLocation,materialPosition,materialAtlasURL} from './palette.js?v=realistic-visitor-r16';

const topicPlacement={calm:[23,22],rest:[77,18],attention:[78,33],breathing:[79,44],skin:[21,44],muscles:[22,66],digestion:[78,61]};
export const paletteTopicMaterials=(profiles,topic)=>materials.filter(m=>!topic||(profiles[m.atlasId]?.topics||[]).includes(topic));

// A precise, code-native diagram: every workshop material has one primary band.
// Asterisks retain the opening-to-heart role of the four bridging materials.
export function perfumeTriangle(selected){
 const rows={top:[[380,166],[380,198]],middle:[[300,315],[460,315],[300,353],[460,353],[300,391],[460,391]],base:[[261,519],[504,519],[380,558]]};
 return '<svg class="perfume-triangle" viewBox="0 0 760 650" aria-labelledby="triangle-title triangle-description">'+
 '<title id="triangle-title">Today’s perfume triangle</title><desc id="triangle-description">Top: Grapefruit, Bergamot FCF. Middle: Elemi Heart, Lavender, Rosewood, Cardamom, Rose geranium, Jasmine sambac. Base: Himalayan cedarwood, Sandalwood, Vanilla. The first four middle notes also bridge the opening. Select a material to explore it.</desc>'+
 '<defs><linearGradient id="triangle-wash" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c9a465" stop-opacity=".18"/><stop offset="1" stop-color="#9171b6" stop-opacity=".18"/></linearGradient></defs>'+
 '<path class="triangle-outline" d="M380 26 724 612H36Z" fill="url(#triangle-wash)"/><path class="triangle-divider" d="M260 230H500M132 448H628"/><text class="triangle-tier" x="380" y="124">TOP</text><text class="triangle-tier" x="380" y="271">MIDDLE · HEART</text><text class="triangle-tier" x="380" y="483">BASE</text>'+
 TRIANGLE_BANDS.map(band=>band.materials.map((m,i)=>{
  const [x,y]=rows[band.id][i],width=band.id==='top'?136:band.id==='base'?226:146;
  return '<g class="triangle-material" role="button" tabindex="0" data-palette-note="'+m.id+'" aria-pressed="'+(selected===m.id)+'" aria-label="'+esc(m.name+', '+materialPosition(m))+'"><rect x="'+(x-width/2)+'" y="'+(y-22)+'" width="'+width+'" height="31" rx="4"/><text x="'+x+'" y="'+y+'">'+esc(m.name)+(m.group==='bridge'?' *':'')+'</text></g>';
 }).join('')).join('')+'<text class="triangle-key" x="380" y="643">* Opens early and continues into the middle.</text></svg>';
}

export class TodayPalette{
 constructor(root,onChange){
  this.root=root;this.onChange=onChange;this.step=0;this.selected=materials[0].id;this.topic=null;this.region=null;this.profiles={};this.sources={};this.records=new Map();this.active=false;this.paused=false;this.scene=null;this.geography=null;this.loading=false;this.loadError=false;
  root.innerHTML='<div class="today-atlas" id="today-atlas" role="group" aria-label="The Atlas globe showing only today’s eleven workshop materials"></div><div class="today-map-fallback" id="today-map-fallback" hidden></div><div class="today-topics" id="today-topics" aria-label="Body and mind topics" hidden></div><div class="today-map-tooltip" id="today-map-tooltip" role="status" hidden></div><div class="today-triangle" id="today-triangle" hidden>'+perfumeTriangle(this.selected)+'</div><div class="today-map-tools" id="today-map-tools"><label class="sr-only" for="today-region">Explore a workshop source</label><select id="today-region"><option value="">All workshop sources · 11 notes</option>'+locations.map(r=>'<option value="'+r.id+'">'+esc(r.label)+' · '+r.materials.length+'</option>').join('')+'</select><button type="button" data-palette-reset-view aria-label="Reset the Atlas view">↺</button></div><p class="today-caption" id="today-caption">Opening today’s Atlas…</p>';
  this.atlas=root.querySelector('#today-atlas');this.fallback=root.querySelector('#today-map-fallback');this.triangle=root.querySelector('#today-triangle');this.topics=root.querySelector('#today-topics');this.tools=root.querySelector('#today-map-tools');this.caption=root.querySelector('#today-caption');this.tooltip=root.querySelector('#today-map-tooltip');this.regionSelect=root.querySelector('#today-region');
  root.addEventListener('click',event=>{
   const note=event.target.closest('[data-palette-note]'),topic=event.target.closest('[data-palette-topic]'),region=event.target.closest('[data-palette-region]');
   if(note)this.selectNote(note.dataset.paletteNote);
   else if(topic)this.selectTopic(topic.dataset.paletteTopic);
   else if(region)this.selectRegion(region.dataset.paletteRegion);
   else if(event.target.closest('[data-palette-reset-view]'))this.scene?.reset();
  });
  root.addEventListener('keydown',event=>{
   if(!['Enter',' '].includes(event.key))return;
   const control=event.target.closest('[data-palette-note],[data-palette-region]');
   if(control&&control.tagName.toLowerCase()!=='button'){event.preventDefault();event.stopPropagation();control.dispatchEvent(new MouseEvent('click',{bubbles:true}));}
  });
  this.regionSelect.addEventListener('change',()=>this.selectRegion(this.regionSelect.value));
 }
 get material(){return materials.find(m=>m.id===this.selected)||materials[0];}
 get profile(){return this.profiles[this.material.atlasId];}
 matching(){
  if(this.step===1)return paletteTopicMaterials(this.profiles,this.topic);
  if(this.step===0&&this.region)return materials.filter(m=>materialLocation(m.id)?.id===this.region);
  return materials;
 }
 setVisible(active){this.active=active;this.root.hidden=!active;if(this.scene)this.scene.visible=active&&this.step!==2;}
 setPaused(paused){this.paused=paused;this.scene?.setRotation(!paused);}
 setView(step){
  this.step=step;this.render();
  if(!this.loading&&!this.geography)this.load();
 }
 async load(){
  this.loading=true;
  // The globe and the evidence are independent: a missing research file must
  // not prevent the eleven source locations or the triangle from opening.
  const results=await Promise.allSettled(['world-geography','studies','palette'].map(async file=>{
   const response=await fetch('../atlas/data/'+file+'.json');if(!response.ok)throw new Error('Atlas data unavailable');return response.json();
  }));
  if(results[1].status==='fulfilled'){this.profiles=results[1].value.profiles;this.sources=results[1].value.sources;}
  if(results[2].status==='fulfilled')this.records=new Map(results[2].value.PALETTE.filter(n=>materials.some(m=>m.atlasId===n.id)).map(n=>[n.id,n]));
  if(results[0].status==='fulfilled'){
   this.geography=results[0].value;
   try{
    this.scene=new AtlasScene(this.atlas,this.geography,locations,{onRegion:id=>this.selectRegion(id),onHover:hit=>this.showTooltip(hit)});
    this.scene.setRotation(!this.paused);
    this.scene.focusRegion(materialLocation(this.selected).id);
   }catch(error){this.atlas.replaceChildren();console.warn('Today’s Atlas is using the flat map.',error);}
  }else this.loadError=true;
  this.loading=false;this.render();this.onChange?.();
 }
 selectNote(id){
  if(!materials.some(m=>m.id===id))return;
  this.selected=id;
  if(this.region!==materialLocation(id).id)this.region=null;
  if(this.topic&&!(this.profile?.topics||[]).includes(this.topic))this.topic=null;
  this.render();if(this.step===0)this.scene?.focusRegion(materialLocation(id).id);this.onChange?.();
 }
 selectRegion(id){
  this.region=locations.some(r=>r.id===id)?id:null;
  const matches=this.matching();if(matches.length&&!matches.some(m=>m.id===this.selected))this.selected=matches[0].id;
  this.render();if(this.region)this.scene?.focusRegion(this.region);this.onChange?.();
 }
 selectTopic(id){
  if(id&&!TOPICS.some(t=>t.id===id))return;
  this.topic=id||null;
  const matches=paletteTopicMaterials(this.profiles,this.topic);
  if(matches.length&&!matches.some(m=>m.id===this.selected))this.selected=matches[0].id;
  this.render();this.onChange?.();
 }
 clearFilter(){this.region=null;this.topic=null;this.render();this.onChange?.();}
 reset(){this.selected=materials[0].id;this.topic=null;this.region=null;this.scene?.reset();this.render();}
 showTooltip(hit){
  if(!hit){this.tooltip.hidden=true;return;}
  this.tooltip.innerHTML='<strong>'+esc(hit.region.label)+'</strong><span>'+hit.region.materials.map(id=>esc(materials.find(m=>m.id===id).name)).join(' · ')+'</span>';
  this.tooltip.style.left=Math.max(10,Math.min(hit.x+14,this.root.clientWidth-240))+'px';this.tooltip.style.top=Math.max(20,Math.min(hit.y-15,this.root.clientHeight-125))+'px';this.tooltip.hidden=false;
 }
 render(){
  const focusedTopic=document.activeElement?.dataset?.paletteTopic,focusedRegion=document.activeElement?.dataset?.paletteRegion;
  const world=this.step===0,body=this.step===1,triangle=this.step===2;
  this.root.classList.toggle('showing-triangle',triangle);this.atlas.hidden=triangle||!this.scene;this.triangle.hidden=!triangle;this.topics.hidden=!body;this.tools.hidden=!world;this.tooltip.hidden=true;
  this.regionSelect.value=this.region||'';
  this.triangle.querySelectorAll('[data-palette-note]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.paletteNote===this.selected)));
  const available=TOPICS.filter(t=>paletteTopicMaterials(this.profiles,t.id).length);
  this.topics.innerHTML=available.map(t=>{const [x,y]=topicPlacement[t.id];return '<button type="button" data-palette-topic="'+t.id+'" aria-pressed="'+(this.topic===t.id)+'" style="left:'+x+'%;top:'+y+'%">'+esc(t.short)+' <span>'+paletteTopicMaterials(this.profiles,t.id).length+'</span></button>';}).join('');
  if(this.scene){
   this.scene.setMode(body?'body':'world');this.scene.setRegions(new Map(locations.map(r=>[r.id,r.materials.length])),[materialLocation(this.selected).id]);this.scene.setTopic(this.topic||(this.profile?.topics||[])[0]||null);this.scene.visible=this.active&&!triangle;this.scene.resize();
  }
  this.fallback.hidden=triangle||!!this.scene;
  if(!triangle&&!this.scene)this.renderFallback(body);
  this.caption.textContent=triangle?'Select a note to explore its role.':body?'Atlas research topics · only today’s materials.':this.loading&&!this.geography?'Opening today’s Atlas…':'Drag to turn · select a source or choose a material.';
  if(focusedTopic)this.topics.querySelector('[data-palette-topic="'+focusedTopic+'"]')?.focus({preventScroll:true});
  if(focusedRegion)this.fallback.querySelector('[data-palette-region="'+focusedRegion+'"]')?.focus({preventScroll:true});
 }
 renderFallback(body){
  if(body){this.fallback.innerHTML='<svg viewBox="0 0 400 460" class="today-body-fallback" role="img" aria-label="The Atlas conceptual body and mind figure"><g fill="#a98cc42a" stroke="#c0ace877" stroke-width="1"><ellipse cx="200" cy="55" rx="25" ry="31"/><path d="M187 84v18l-31 12-14 77-8 60 14 2 16-65 10-41-2 99-5 91-2 72h19l7-75 9-67 9 67 7 75h19l-2-72-5-91-2-99 10 41 16 65 14-2-8-60-14-77-31-12V84Z"/></g><ellipse cx="200" cy="231" rx="118" ry="211" fill="none" stroke="#c9a46525"/></svg>';return;}
  if(!this.geography){this.fallback.innerHTML='<p class="today-loading">'+(this.loadError?'The globe data could not load. All eleven materials and their sources are available in the note list.':'Opening the workshop’s source map…')+'</p>';return;}
  this.fallback.innerHTML='<svg viewBox="0 0 1000 500" class="today-flat-map" aria-label="World map showing only today’s workshop sources"><path d="'+esc(this.geography.land)+'" fill="#33233f" stroke="#c9a46577" stroke-width=".8"/><path d="'+esc(this.geography.borders)+'" fill="none" stroke="#c9a46525" stroke-width=".5"/>'+locations.map(r=>{const x=(r.longitude+180)/360*1000,y=(90-r.latitude)/180*500,active=r.materials.includes(this.selected);return '<g role="button" tabindex="0" data-palette-region="'+r.id+'" aria-label="'+esc(r.label)+'"><title>'+esc(r.label)+'</title><circle cx="'+x+'" cy="'+y+'" r="14" fill="transparent"/><circle cx="'+x+'" cy="'+y+'" r="'+(active?6:4)+'" fill="'+(active?'#c0ace8':'#c9a465')+'" stroke="none"/></g>';}).join('')+'</svg>';
 }
 controlsHTML(){
  const m=this.material,record=this.records.get(m.atlasId),matches=this.matching(),filtering=(this.step===0&&this.region)||(this.step===1&&this.topic);
  let html='<div class="today-note-heading"><p class="control-label">'+(filtering?matches.length+' of today’s 11 notes':'Today’s 11 notes')+'</p>'+(filtering?'<button type="button" class="text-button" data-palette-all>Show all 11</button>':'')+'</div><div class="today-note-list" role="group" aria-label="Choose a material from today’s palette">'+matches.map(note=>'<button type="button" data-palette-note="'+note.id+'" aria-pressed="'+(note.id===this.selected)+'">'+esc(note.name)+'</button>').join('')+'</div>';
  html+='<section class="today-material" aria-labelledby="today-material-name"><div class="today-material-heading"><div><span class="today-position">'+esc(materialPosition(m))+'</span><h3 id="today-material-name">'+esc(m.name)+'</h3></div>'+botanicalArt(record||{id:m.atlasId,name:m.name},'today-botanical-art')+'</div><p class="today-origin">'+esc(m.origin)+'</p><p class="today-scent">'+esc(m.scent)+'</p>'+(m.positionNote?'<p class="small-note">'+esc(m.positionNote)+'</p>':'');
  if(this.step===1){
   const topic=TOPICS.find(t=>t.id===this.topic),profile=this.profile,topicNames=(profile?.topics||[]).map(id=>TOPICS.find(t=>t.id===id)?.short).filter(Boolean);
   html+='<div class="today-body-context"><p class="control-label">'+esc(topic?.label||'Body & mind in the Atlas')+'</p><p>'+esc(topic?.description||(topicNames.length?'Linked research topics: '+topicNames.join(' · ')+'.':'No appraised topic connection is recorded for this material in the Atlas.'))+'</p>';
   if(this.loading)html+='<p class="small-note">Opening the Atlas research context…</p>';
   else if(!Object.keys(this.profiles).length)html+='<p class="small-note">The research context could not load. You can still explore today’s materials and their sources.</p>';
   else if(profile?.evidence?.length){
    html+='<details class="today-evidence"><summary>Read the Atlas research context <span aria-hidden="true">+</span></summary><p class="small-note">These records concern the botanical and the preparation described. They do not test the bottle in this workshop; extraction and route may differ.</p>'+profile.evidence.map(item=>'<article><span>'+esc(item.status)+'</span><h4>'+esc(item.title)+'</h4><p>'+esc(item.text)+'</p>'+this.sourceLinks(item.sourceIds)+'</article>').join('')+'</details>';
   }
   html+='</div>';
  }
  html+='<a class="note-link" href="'+materialAtlasURL(m)+'" target="_blank" rel="noopener noreferrer">'+(this.step===1?'Read the full Atlas context':'Explore the full Atlas record')+' ↗</a>'+(m.supplierUrl?'<a class="note-link today-supplier" href="'+esc(m.supplierUrl)+'" target="_blank" rel="noopener noreferrer">Sunday Natural ↗</a>':'')+'</section>';
  return html;
 }
 sourceLinks(ids=[]){return '<div class="today-evidence-sources">'+ids.map(id=>this.sources[id]).filter(source=>source&&/^https?:\/\//.test(source.url)).map(source=>'<a href="'+esc(source.url)+'" target="_blank" rel="noopener noreferrer">'+esc(source.organization||source.title)+' ↗</a>').join('')+'</div>';}
 dispose(){this.scene?.dispose();}
}
