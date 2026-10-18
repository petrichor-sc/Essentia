import { TOPICS, escapeHTML as esc, safeURL, regionIds, isPalette, notePosition, filterMaterials, describeMaterial, botanicalArt, parseAtlasHash } from './core.js';

const $ = id => document.getElementById(id);
const icon = name => ({ share:'<path d="M14 4h6v6m0-6-9 9M10 5H5v14h14v-5"/>', compare:'<path d="M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4"/>', book:'<path d="M12 5v15M3 4c4-1 7 0 9 2 2-2 5-3 9-2v15c-4-1-7 0-9 2-2-2-5-3-9-2Z"/>', print:'<path d="M7 8V3h10v5M7 17H3V9h18v8h-4M7 14h10v7H7z"/>', pause:'<path d="M9 6v12M15 6v12"/>', play:'<path d="m9 5 10 7-10 7Z"/>' }[name] || '');
const svgIcon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icon(name)}</svg>`;
let palette, studies, geography, scene;
let materialMap = new Map(), regionMap = new Map();
let state = { selected:'himalayan-cedar', view:'world', topic:null, collection:'study', query:'', region:null, tier:'all', limit:24, read:false };
const compared = new Set();
let toastTimer;

function toast(message) {
  clearTimeout(toastTimer); $('toast').textContent = message; $('toast').hidden = false;
  toastTimer = setTimeout(() => { $('toast').hidden = true; }, 3400);
}
function profile(note = materialMap.get(state.selected)) { return studies.profiles[note?.id]; }
function filtered(ignoreRegion = false) { return filterMaterials(palette.PALETTE, studies.profiles, state, ignoreRegion); }
function activeNote() { return materialMap.get(state.selected) || palette.PALETTE[0]; }
function regionLabel(note) {
  const region = regionMap.get(note.regionId || regionIds(note)[0]);
  if (region) return region.label.replace(/ · production$/, '');
  return note.originKind === 'Hybrid heritage' ? 'Cultivated hybrid' : note.origin || 'Origin not specified';
}
function materialTags(note) {
  const family = note.families.filter(f => !['Essential oil','Absolute'].includes(f));
  return [note.tiers.length ? notePosition(note) : null, ...family.slice(0,2)].filter(Boolean).map((t,i) => `<span class="tag ${i === 0 ? 'tag-gold' : ''}">${esc(t)}</span>`).join('');
}
function address(read = state.read) {
  const url = new URL(location.href); const params = new URLSearchParams({plant:state.selected,view:state.view});
  if (state.view === 'body' && state.topic) params.set('topic',state.topic);
  if (state.collection !== 'study') params.set('collection',state.collection);
  if (state.tier !== 'all') params.set('tier',state.tier);
  if (state.query) params.set('q',state.query);
  if (state.region) params.set('region',state.region);
  if (read) params.set('read','1'); url.hash = params.toString(); return url.href;
}
function updateAddress() { history.replaceState(null,'',address()); }
async function copyLink() {
  const link = address();
  try { await navigator.clipboard.writeText(link); toast('Link copied — share this botanical and view.'); }
  catch {
    const input = document.createElement('textarea');input.value = link;input.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(input);input.select();
    const copied = document.execCommand('copy');input.remove();toast(copied ? 'Link copied — share this botanical and view.' : 'Copy this page’s address to share the selected botanical.');
  }
}

function renderSpotlight() {
  const note = activeNote(), study = profile(note), material = describeMaterial(note,study);
  const part = study ? material.part.split(';')[0].replace(/\.$/,'') : material.part;
  const description = study?.culture?.[0]?.text || note.context || 'Explore the recorded origins, scent character, and production variants for this aromatic material.';
  const teaser = description.length > 198 ? description.slice(0, description.lastIndexOf(' ',195)) + '…' : description;
  $('botanical-spotlight').innerHTML = `
    <div class="spotlight-topline"><span class="chapter-indicator">${study ? 'A botanical study chapter' : 'Origin & extraction record'}</span><span class="eyebrow" style="font-size:8px">${esc(String(palette.PALETTE.findIndex(n=>n.id===note.id)+1).padStart(3,'0'))}</span></div>
    <div class="spotlight-heading"><h2>${esc(note.name)}</h2><p class="botanical-latin">${esc(note.botanicalName || 'Material identity to confirm')}</p>${botanicalArt(note)}</div>
    <div class="tags">${materialTags(note)}</div>
    <div class="spotlight-origin"><p class="eyebrow">${esc(note.originKind || 'Recorded origin')}</p><p>${esc(note.origin)}</p></div>
    <div class="spotlight-facts"><div><span class="small-label">Plant part</span><p>${esc(part)}</p></div><div><span class="small-label">Scent character</span><p>${esc(note.scentProfile || 'Not specified in the source')}</p></div></div>
    <p class="spotlight-description">${esc(teaser)}</p>
    <div class="spotlight-bottom"><button type="button" class="gold-button" data-read="${esc(note.id)}">${study?'Open the study chapter':'Explore this material'}<span aria-hidden="true">↗</span></button>
    <div class="spotlight-actions"><button type="button" class="text-button" data-compare="${esc(note.id)}" aria-pressed="${compared.has(note.id)}">${svgIcon('compare')}${compared.has(note.id)?'Added to comparison':'Add to compare'}</button><button type="button" class="text-button" data-share>${svgIcon('share')}Share this view</button></div></div>`;
  $('botanical-spotlight').setAttribute('aria-busy','false');
}

function renderLibrary() {
  const notes = filtered(), shown = notes.slice(0,state.limit);
  $('botanical-grid').innerHTML = shown.map(note => `<article class="botanical-card ${note.id===state.selected?'is-selected':''}"><button type="button" class="botanical-card-main" data-select="${esc(note.id)}" aria-label="Explore ${esc(note.name)}, ${esc(note.botanicalName || 'material identity to confirm')}" aria-pressed="${note.id===state.selected}"><div class="card-top">${botanicalArt(note,'card-art')}<span class="card-tier">${note.tiers.length?esc(notePosition(note)):note.families.includes('Carrier')?'Carrier':profile(note)?'Study chapter':'Origin record'}</span></div><h3>${esc(note.name)}</h3><p class="card-botanical">${esc(note.botanicalName || 'Material identity to confirm')}</p></button><div class="card-footer"><span class="card-origin" title="${esc(note.origin)}">${profile(note)?'<span class="study-dot" aria-hidden="true"></span>':''}${esc(regionLabel(note))}</span><button type="button" class="compare-toggle" data-compare="${esc(note.id)}" aria-label="${compared.has(note.id)?'Remove':'Add'} ${esc(note.name)} ${compared.has(note.id)?'from':'to'} comparison" aria-pressed="${compared.has(note.id)}">${compared.has(note.id)?'✓':'+'}</button></div></article>`).join('');
  const label = state.collection === 'study' ? 'study chapter' : 'material';
  $('result-count').textContent = notes.length ? `${shown.length<notes.length?`Showing ${shown.length} of `:''}${notes.length} ${label}${notes.length===1?'':'s'}` : 'No matching materials';
  $('empty-state').hidden = notes.length !== 0; $('load-more').hidden = shown.length >= notes.length;
  const active = [];
  if(state.region) active.push(`<button type="button" class="filter-chip" data-clear-filter="region">${esc(regionMap.get(state.region)?.label || 'Region')}<span aria-hidden="true">×</span></button>`);
  if(state.view==='body' && state.topic) active.push(`<button type="button" class="filter-chip" data-clear-filter="topic">${esc(TOPICS.find(t=>t.id===state.topic)?.label)}<span aria-hidden="true">×</span></button>`);
  $('active-filters').innerHTML=active.join('');
  $('clear-filters').hidden=!(state.query || state.region || state.tier!=='all' || (state.view==='body'&&state.topic));
  document.querySelectorAll('[data-collection]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.collection===state.collection)));
}

function mapCounts() {
  const counts = new Map();
  for(const note of filtered(true))for(const id of regionIds(note)) counts.set(id,(counts.get(id)||0)+1);
  return counts;
}
function renderMap() {
  const counts = mapCounts();
  const regions = palette.REGIONS.filter(r=>counts.has(r.id) || r.id===state.region);
  $('region-select').innerHTML = '<option value="">All regions</option>'+regions.map(r=>`<option value="${esc(r.id)}">${esc(r.label)} (${counts.get(r.id)||0})</option>`).join('');
  $('region-select').value=state.region||'';
  if(scene)scene.setRegions(counts,regionIds(activeNote()));
  else renderFlatMap(counts);
}
function renderFlatMap(counts = mapCounts()) {
  const active = regionIds(activeNote());
  $('scene-fallback').innerHTML = `<svg viewBox="0 0 1000 500" role="img" aria-label="World map with selectable botanical regions"><path d="${esc(geography.land)}" fill="#33233f" stroke="#c9a46577" stroke-width=".8"/><path d="${esc(geography.borders)}" fill="none" stroke="#c9a46525" stroke-width=".5"/>${palette.REGIONS.filter(r=>counts.has(r.id)||active.includes(r.id)).map(r=>`<g class="flat-region" data-region="${esc(r.id)}" role="button" tabindex="0" aria-label="Explore ${esc(r.label)}"><title>${esc(r.label)} · ${counts.get(r.id)||0} materials</title><circle class="flat-pin ${active.includes(r.id)?'active':''}" cx="${(r.longitude+180)/360*1000}" cy="${(90-r.latitude)/180*500}" r="${active.includes(r.id)?6:4.5}"/><circle cx="${(r.longitude+180)/360*1000}" cy="${(90-r.latitude)/180*500}" r="14" fill="transparent"/></g>`).join('')}</svg><p class="fallback-label">Flat map · the same botanical connections</p>`;
}

function renderTopics() {
  $('topic-options').innerHTML = `<button type="button" data-topic="" aria-pressed="${!state.topic}">All topics</button>`+TOPICS.map(topic=>`<button type="button" data-topic="${topic.id}" aria-pressed="${topic.id===state.topic}">${esc(topic.label)}</button>`).join('');
  const placements = {calm:[22,22,true],rest:[77,18,false],attention:[78,31,false],breathing:[79,44,false],skin:[21,44,true],muscles:[22,66,true],digestion:[78,60,false]};
  $('scene-topic-labels').innerHTML=TOPICS.map(topic=>{const [x,y,left]=placements[topic.id];return `<button type="button" class="body-topic ${left?'on-left':''}" style="left:${x}%;top:${y}%;transform:translate(-50%,-50%)" data-topic="${topic.id}" aria-pressed="${topic.id===state.topic}">${esc(topic.short)}</button>`;}).join('');
  $('topic-context').innerHTML=state.topic?`<strong>${esc(TOPICS.find(t=>t.id===state.topic)?.label)}.</strong> ${esc(TOPICS.find(t=>t.id===state.topic)?.description)}`:'These connections describe research topics and documented uses. Open a chapter to see what preparation was used and what the evidence can support.';
}

function renderMode() {
  const body=state.view==='body';
  document.querySelectorAll('[data-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===state.view)));
  $('scene-label-text').textContent=body?'BODY, MIND & SCENT':'THE AROMATIC WORLD';
  $('scene-mode-text').textContent=body?'Connections, in context':'Regional reference points';
  $('scene-topic-labels').hidden=!body;$('topic-strip').hidden=!body;$('world-controls').hidden=body;$('body-note').hidden=!body;
  $('scene-caption').innerHTML=body?'<span>Select a topic to explore its botanical connections</span>':'<span>Drag to explore</span><span class="caption-dot">·</span><span>Select a point to discover</span>';
  $('explorer-note').textContent=body?'A topic connection is not a proven benefit. Read the preparation, route of use, study context, and limitations.':'Production, botanical range, and cultural heritage are distinct. Points represent regions, not individual farms.';
  $('rotate-button').hidden=body||!scene;$('reset-scene-button').hidden=!scene;
  $('scene').setAttribute('aria-label',body?'Conceptual human figure. The labelled topic buttons connect to botanical research.':'Interactive globe showing botanical origin regions. Use the region menu or botanical index for keyboard navigation.');
  if(scene){scene.setMode(state.view);scene.setTopic(state.topic);$('scene-fallback').hidden=true;}
  else{
    $('scene-fallback').hidden=body;
    if(body)renderBodyFallback();
  }
}
function renderBodyFallback(){
  $('scene-fallback').hidden=false;
  $('scene-fallback').innerHTML='<svg viewBox="0 0 400 460" aria-label="Conceptual body figure"><g fill="#a98cc42a" stroke="#c0ace877" stroke-width="1"><ellipse cx="200" cy="55" rx="25" ry="31"/><path d="M187 84v18l-31 12-14 77-8 60 14 2 16-65 10-41-2 99-5 91-2 72h19l7-75 9-67 9 67 7 75h19l-2-72-5-91-2-99 10 41 16 65 14-2-8-60-14-77-31-12V84Z"/></g><ellipse cx="200" cy="231" rx="118" ry="211" fill="none" stroke="#c9a46525" stroke-width=".8"/></svg>';
}

function renderAll() {renderSpotlight();renderLibrary();renderTopics();renderMap();renderMode();renderCompareState();}
function selectNote(id, {focus=true}={}) {
  if(!materialMap.has(id))return;
  state.selected=id;state.read=false;
  if(state.view==='body'&&state.topic&&!(profile()?.topics||[]).includes(state.topic))state.topic=profile()?.topics[0]||null;
  renderAll();updateAddress();
  if(focus&&scene&&state.view==='world')scene.focusRegion(activeNote().regionId||regionIds(activeNote())[0]);
}
function selectRegion(id) {
  state.region=id||null;state.limit=24;
  const notes=filtered();if(notes.length&&!notes.some(n=>n.id===state.selected))state.selected=notes[0].id;
  renderAll();updateAddress();if(scene&&id)scene.focusRegion(id);
}
function setView(view) {
  state.view=view;state.region=null;state.limit=24;
  if(view==='body'){
    state.collection='study';state.tier='all';$('tier-select').value='all';state.query='';$('search').value='';
    state.topic=profile()?.topics[0]||'calm';
    const notes=filtered();if(!notes.some(n=>n.id===state.selected)&&notes.length)state.selected=notes[0].id;
  }
  renderAll();updateAddress();
}
function setTopic(topic) {
  state.topic=TOPICS.some(t=>t.id===topic)?topic:null;state.view='body';state.region=null;state.collection='study';state.limit=24;
  const notes=filtered();if(notes.length&&!notes.some(n=>n.id===state.selected))state.selected=notes[0].id;
  renderAll();updateAddress();
}
function resetFilters() {state.query='';state.tier='all';state.region=null;state.topic=null;state.limit=24;$('search').value='';$('tier-select').value='all';renderAll();updateAddress();}

function sourceContext(note,study) {
  const entries=[], byURL=new Map(), numbers=new Map();
  const add=(id,source)=>{
    if(!source?.url)return;
    let number=byURL.get(source.url);
    if(!number){number=entries.length+1;entries.push({...source,number});byURL.set(source.url,number);}
    numbers.set(id,number);
  };
  const ids=[...(study?.native?.sourceIds||[]),...(study?.extractionSourceIds||[]),...(study?.culture||[]).flatMap(c=>c.sourceIds||[]),...(study?.evidence||[]).flatMap(e=>e.sourceIds||[]),...(study?.use?.sourceIds||[]),...(study?.safety?.sourceIds||[])];
  for(const id of ids)add(id,studies.sources[id]);
  for(const [i,source]of(note.sources||[]).entries())add('original-'+i,{title:source.label,url:source.url,organization:'Original botanical / supplier reference',accessed:'2026-10-05',snapshotDate:'2026-10-05'});
  const refs=(ids=[])=>[...new Set(ids.map(id=>numbers.get(id)).filter(Boolean))].map(number=>`<a class="source-link" href="#reader-source-${number}" data-local="reader-source-${number}" aria-label="Read source ${number}">[${number}]</a>`).join('');
  return {entries,refs};
}
function variantRecords(note) {
  return (note.productionVariants||[]).map((variant,i)=>{
    const fields=[['Production origin',variant.origin],['Extraction',variant.extractionOriginal],['Scent',variant.scentOriginal],['Cultivation',variant.cultivationOriginal],['Provenance',variant.provenanceOriginal],['Harvest',variant.harvestOriginal],['Constituents',variant.constituentsOriginal],['Source discrepancy',variant.originNote]].filter(([,v])=>v);
    return `<details class="reader-variant"><summary>${esc(variant.label)} · ${esc(variant.origin)}</summary><dl>${fields.map(([label,value])=>`<dt>${esc(label)}</dt><dd>${esc(value)}</dd>`).join('')}</dl><p>Original catalogue wording · snapshot 5 October 2026 · <a class="source-link" href="${esc(safeURL(variant.url))}" target="_blank" rel="noopener noreferrer">Open source ↗</a></p></details>`;
  }).join('');
}
function evidenceHTML(study, refs) {
  if(!study?.evidence?.length)return '<p class="reader-notice">A health-evidence appraisal for this exact material is not included in this edition. Its presence in the botanical collection does not establish a benefit for a body area or condition.</p>';
  return study.evidence.map(item=>`<div class="evidence-item"><span class="evidence-badge ${item.status==='Human research'?'human':item.status==='Traditional use'?'tradition':'uncertain'}">${esc(item.status)}</span><h4>${esc(item.title)}</h4><p>${esc(item.text)} ${refs(item.sourceIds)}</p></div>`).join('');
}
function relatedMaterials(note) {
  return palette.PALETTE.filter(other=>other.id!==note.id&&studies.profiles[other.id]).map(other=>({note:other,score:other.tiers.filter(t=>note.tiers.includes(t)).length*2+other.families.filter(f=>note.families.includes(f)&&f!=='Essential oil').length})).sort((a,b)=>b.score-a.score).filter(item=>item.score>0).slice(0,5).map(({note:other})=>`<button type="button" data-read="${esc(other.id)}">${esc(other.name)} <span aria-hidden="true">↗</span></button>`).join('');
}

function openReader(id=state.selected) {
  if(!materialMap.has(id))return;
  const note=materialMap.get(id),study=profile(note),material=describeMaterial(note,study),{entries,refs}=sourceContext(note,study);
  const related=relatedMaterials(note);
  state.selected=id;state.read=true;
  if(state.view==='body'&&state.topic&&!(study?.topics||[]).includes(state.topic))state.topic=study?.topics[0]||null;
  $('reader-content').innerHTML=`
    <div class="dialog-topbar"><span class="reader-brand">ESSENTIA · THE BOTANICAL LIBRARY</span><div class="reader-top-actions"><button type="button" class="text-button" data-share>${svgIcon('share')}Share</button><button type="button" class="text-button" data-print>${svgIcon('print')}Print</button><button type="button" class="icon-button" data-close="reader" aria-label="Close botanical chapter">×</button></div></div>
    <div class="reader-layout"><nav class="reader-toc" aria-label="Chapter contents"><p class="eyebrow">IN THIS CHAPTER</p>${[['origin','Place & identity'],['plant','Plant & extraction'],['culture','People & traditions'],['scent','Scent & perfumery'],['evidence','Body & mind'],['use','Use & precautions'],['sources','Sources']].map(([key,label])=>`<a href="#reader-${key}" data-local="reader-${key}">${label}</a>`).join('')}</nav>
    <article class="reader-article"><header class="reader-heading"><p class="eyebrow">${study?'A BOTANICAL STUDY CHAPTER':'ORIGIN & EXTRACTION RECORD'}</p><h2 id="reader-title">${esc(note.name)}</h2><p class="botanical-latin">${esc(note.botanicalName||'Material identity to confirm')}</p><div class="tags">${materialTags(note)}</div>${botanicalArt(note)}</header>
    <p class="reader-lead">${esc(note.scentProfile||'An aromatic material in the Essentia collection')}. ${esc(study?.keyDistinction||note.context||'Read the source records to distinguish this material from related preparations.')}</p>
    <section class="reader-section" id="reader-origin"><p class="eyebrow">01 · PLACE & IDENTITY</p><h3>A botanical has more than one origin.</h3><div class="reader-facts"><div><span class="small-label">Botanical identity</span><p>${esc(note.botanicalName||'Not confirmed in the original record')}</p></div><div><span class="small-label">Map layer</span><p>${esc(note.originKind)}</p></div><div><span class="small-label">Map reference</span><p>${esc(note.origin)}</p></div><div><span class="small-label">Recorded production</span><p>${esc(note.productionVariants?.length?[...new Set(note.productionVariants.map(v=>v.origin))].join(' · '):'No bottle-specific production record')}</p></div></div>${study?.native?`<p>${esc(study.native.text)} ${refs(study.native.sourceIds)}</p>`:note.context?`<p>${esc(note.context)}</p>`:''}<p class="reader-notice">Map points represent broad botanical regions, production locations, or cultural heritage. They do not identify the source of an individual bottle.</p></section>
    <section class="reader-section" id="reader-plant"><p class="eyebrow">02 · PLANT & EXTRACTION</p><h3>From plant to aromatic material.</h3><div class="reader-facts"><div><span class="small-label">Plant part</span><p>${esc(material.part)}</p></div><div><span class="small-label">Recorded material type</span><p>${esc(note.families.filter(f=>['Essential oil','Absolute','Carrier'].includes(f)).join(' / ')||'Confirm the exact extract specification')}</p></div></div><p>${esc(material.extraction)} ${refs(study?.extractionSourceIds)}</p>${note.productionVariants?.length?`<h4>Explore the recorded variants</h4><p>The catalogue can include different origins, plant parts, fractions, or chemotypes. Original-language details are retained so you can inspect the distinctions.</p>${variantRecords(note)}`:'<p class="reader-notice">The original map does not specify a supplier formulation for this material. Confirm the extract type, ingredients, and batch before applying preparation-specific guidance.</p>'}</section>
    <section class="reader-section" id="reader-culture"><p class="eyebrow">03 · PEOPLE & TRADITIONS</p><h3>Knowledge, in its own context.</h3>${study?.culture?.length?study.culture.map(c=>`<h4>${esc(c.title)}</h4><p>${esc(c.text)} ${refs(c.sourceIds)}</p>`).join(''):'<p>A referenced cultural history for this material is not included in this edition. A region on the map is not, by itself, evidence of a community’s traditional practice.</p>'}</section>
    <section class="reader-section" id="reader-scent"><p class="eyebrow">04 · SCENT & PERFUMERY</p><h3>Meet the material through scent.</h3><div class="reader-facts"><div><span class="small-label">Scent character</span><p>${esc(note.scentProfile||'Not recorded')}</p></div><div><span class="small-label">Perfume note position</span><p>${esc(notePosition(note))}</p></div><div><span class="small-label">Palette classification</span><p>${esc(note.families.join(' · ')||'Not classified')}</p></div><div><span class="small-label">A prompt for your scent study</span><p>Notice the opening, return as it develops, and compare your impressions over time.</p></div></div><p>Note positions and scent descriptions are perfumery references from the existing palette. They do not establish physiological effects or clinical benefits. If no note position is recorded, this edition leaves it unclassified.</p>${related?`<h4>Explore connections in the palette</h4><div class="reader-related">${related}</div>`:''}</section>
    <section class="reader-section" id="reader-evidence"><p class="eyebrow">05 · BODY & MIND</p><h3>What does the evidence actually say?</h3><p>The route and preparation are part of the finding: an inhaled oil, a topical formulation, a leaf tea, and a manufactured oral medicine cannot be treated as interchangeable.</p>${evidenceHTML(study,refs)}${study?.topics?.length?`<h4>Research connections in this atlas</h4><div class="reader-related">${study.topics.map(id=>`<button type="button" data-reader-topic="${esc(id)}">${esc(TOPICS.find(t=>t.id===id)?.label||id)} ↗</button>`).join('')}</div>`:''}</section>
    <section class="reader-section" id="reader-use"><p class="eyebrow">06 · USE & PRECAUTIONS</p><h3>The material and method matter.</h3><h4>Using this material</h4><p>${esc(study?.use?.text||'Preparation-specific use guidance has not been appraised for this record. Check the exact product specification and directions from its supplier.')} ${refs(study?.use?.sourceIds)}</p><h4>Material-specific considerations</h4><p>${esc(study?.safety?.text||'A safety appraisal for the exact extract is not included here. Do not infer suitability, dilution, or route of use from its scent, geographical origin, or a related plant’s history.')} ${refs(study?.safety?.sourceIds)}</p><p class="reader-notice">This is an educational reference, not an individual treatment plan. Use the instructions and precautions for the exact finished product. Research on an oral medicine is not an instruction to swallow a perfumery or aromatherapy oil.</p></section>
    <section class="reader-section" id="reader-sources"><p class="eyebrow">07 · REFERENCES</p><h3>Follow the sources.</h3><p>Expanded study references were checked on 18 October 2026. Catalogue records retain their original snapshot date; the date below describes that record’s review, not a guarantee of current batch details.</p><ol class="source-list">${entries.map(source=>`<li id="reader-source-${source.number}"><a href="${esc(safeURL(source.url))}" target="_blank" rel="noopener noreferrer">${esc(source.title)} ↗</a><span>${esc(source.organization||'Reference source')} · ${source.snapshotDate?'Catalogue snapshot':'Checked'} ${esc(source.snapshotDate||source.accessed||'2026-10-05')}</span></li>`).join('')}</ol></section>
    </article></div>`;
  if(!$('reader').open)$('reader').showModal();$('reader').scrollTop=0;renderSpotlight();renderLibrary();renderMap();updateAddress();
}

function toggleCompare(id) {
  if(compared.has(id))compared.delete(id);
  else if(compared.size<3)compared.add(id);
  else {toast('Compare up to three materials. Remove one to add another.');return;}
  renderSpotlight();renderLibrary();renderCompareState();
  if(compared.size===2)toast('Two materials selected. Open Compare to explore them together.');
}
function renderCompareState() {
  $('compare-count').textContent=compared.size;$('compare-button').disabled=compared.size<2;
  let dock=$('compare-dock');if(!dock){dock=document.createElement('button');dock.id='compare-dock';dock.className='compare-dock gold-button';dock.type='button';document.body.append(dock);dock.addEventListener('click',openCompare);}
  dock.hidden=compared.size<2;dock.innerHTML=`Compare ${compared.size} botanicals <span aria-hidden="true">⇄</span>`;
}
function openCompare() {
  if(compared.size<2)return;
  $('compare-grid').style.setProperty('--compare-columns',compared.size);
  $('compare-grid').innerHTML=[...compared].map(id=>{
    const note=materialMap.get(id),study=profile(note),material=describeMaterial(note,study);
    const evidence=study?.evidence?.[0];
    return `<article class="compare-column">${botanicalArt(note,'card-art')}<h3>${esc(note.name)}</h3><p class="botanical-latin">${esc(note.botanicalName||'Identity to confirm')}</p>${[['Map origin',note.origin],['Plant part',material.part],['Extraction',material.extraction],['Scent & note',`${note.scentProfile} · ${notePosition(note)}`],['Evidence context',evidence?`${evidence.status}. ${evidence.text}`:'A material-specific health appraisal is not included in this edition.'],['Use considerations',study?.safety?.text||'Consult the exact material specification and product directions.']].map(([label,value])=>`<div class="compare-field"><span class="small-label">${esc(label)}</span><p>${esc(value)}</p></div>`).join('')}<button type="button" class="gold-button" data-compare-read="${esc(id)}">Read chapter & sources <span aria-hidden="true">↗</span></button></article>`;
  }).join('');$('compare').showModal();
}
function openAbout() {$('about').showModal();}
function toggleFocus() {
  const on=document.querySelector('.explorer').classList.toggle('focus-mode');document.body.classList.toggle('has-focus-mode',on);
  $('focus-button').innerHTML=svgIcon(on?'book':'share')+`<span>${on?'Exit focus view':'Focus view'}</span>`;
  if(scene)setTimeout(()=>scene.resize(),50);
}

function bindEvents() {
  document.addEventListener('click',event=>{
    const button=event.target.closest('button,a[data-local],.flat-region');if(!button)return;
    if(button.dataset.view){setView(button.dataset.view);return;}
    if('topic'in button.dataset){setTopic(button.dataset.topic);return;}
    if(button.dataset.collection){state.collection=button.dataset.collection;state.region=null;state.limit=24;renderAll();updateAddress();return;}
    if(button.dataset.select){selectNote(button.dataset.select);if(innerWidth<621)$('botanical-spotlight').scrollIntoView({behavior:'smooth',block:'center'});return;}
    if(button.dataset.read){openReader(button.dataset.read);return;}
    if(button.dataset.compare){toggleCompare(button.dataset.compare);return;}
    if('share'in button.dataset){copyLink();return;}
    if(button.dataset.close){$(button.dataset.close).close();return;}
    if(button.dataset.local){event.preventDefault();$(button.dataset.local)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
    if(button.dataset.compareRead){$('compare').close();openReader(button.dataset.compareRead);return;}
    if(button.dataset.readerTopic){$('reader').close();setTopic(button.dataset.readerTopic);$('explore').scrollIntoView({behavior:'smooth'});return;}
    if('print'in button.dataset){window.print();return;}
    if(button.dataset.region){selectRegion(button.dataset.region);return;}
    if(button.dataset.clearFilter){state[button.dataset.clearFilter]=null;state.limit=24;renderAll();updateAddress();}
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='/'&&!event.ctrlKey&&!event.metaKey&&!event.target.matches('input,textarea,select,[contenteditable]')&&!document.querySelector('dialog[open]')){event.preventDefault();$('search').focus();$('botanical-index').scrollIntoView({behavior:'smooth'});}
    const region=event.target.closest('.flat-region');if(region&&(event.key==='Enter'||event.key===' ')){event.preventDefault();selectRegion(region.dataset.region);}
    if(event.key==='Escape'&&document.querySelector('.focus-mode')&&!document.querySelector('dialog[open]'))toggleFocus();
  });
  $('search').addEventListener('input',event=>{state.query=event.target.value;state.region=null;state.limit=24;renderLibrary();renderMap();updateAddress();});
  $('tier-select').addEventListener('change',event=>{state.tier=event.target.value;state.region=null;state.limit=24;renderLibrary();renderMap();updateAddress();});
  $('region-select').addEventListener('change',event=>selectRegion(event.target.value));
  $('load-more').addEventListener('click',()=>{state.limit+=24;renderLibrary();});
  $('clear-filters').addEventListener('click',resetFilters);$('empty-clear').addEventListener('click',resetFilters);
  for(const id of ['about-button','method-button','philosophy-about','footer-sources'])$(id).addEventListener('click',openAbout);
  $('compare-button').addEventListener('click',openCompare);$('focus-button').addEventListener('click',toggleFocus);
  $('rotate-button').addEventListener('click',()=>{if(!scene)return;scene.setRotation(!scene.autoRotate);$('rotate-button').setAttribute('aria-pressed',String(scene.autoRotate));$('rotate-button').setAttribute('aria-label',scene.autoRotate?'Pause globe rotation':'Resume globe rotation');$('rotate-button').innerHTML=svgIcon(scene.autoRotate?'pause':'play');});
  $('reset-scene-button').addEventListener('click',()=>scene?.reset());
  $('reader').addEventListener('close',()=>{state.read=false;updateAddress();});
  for(const id of ['reader','about','compare'])$(id).addEventListener('click',event=>{if(event.target!==$(id))return;const rect=$(id).getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)$(id).close();});
  window.addEventListener('hashchange',()=>{
    if(!location.hash.startsWith('#plant='))return;
    const next=parseAtlasHash(location.hash,new Set(materialMap.keys()),new Set(regionMap.keys()));state={...state,...next};$('search').value=state.query;$('tier-select').value=state.tier;renderAll();if(next.read)openReader(next.selected);else if($('reader').open)$('reader').close();
  });
}

async function initialise() {
  try {
    const responses=await Promise.all(['palette','studies','world-geography'].map(name=>fetch(`./data/${name}.json`)));
    if(responses.some(response=>!response.ok))throw new Error('The collection response was not successful.');
    [palette,studies,geography]=await Promise.all(responses.map(response=>response.json()));
    materialMap=new Map(palette.PALETTE.map(note=>[note.id,note]));regionMap=new Map(palette.REGIONS.map(region=>[region.id,region]));
    state={...state,...parseAtlasHash(location.hash,new Set(materialMap.keys()),new Set(regionMap.keys()))};
    $('search').value=state.query;$('tier-select').value=state.tier;
    $('study-total').textContent=Object.keys(studies.profiles).length;$('palette-total').textContent=palette.PALETTE.filter(isPalette).length;$('all-total').textContent=palette.PALETTE.length;
    $('edition-description').textContent=`This first edition retains ${palette.PALETTE.length} materials from the existing website map, including ${palette.PALETTE.filter(isPalette).length} original palette materials. ${Object.keys(studies.profiles).length} materials have expanded study chapters; other entries remain clearly labelled origin and extraction records. Public supplier catalogue entries do not imply that Essentia owns or uses every listed material.`;
    bindEvents();renderAll();
    const openInitial=state.read;if(openInitial)openReader(state.selected);
    try {
      const {AtlasScene}=await import('./globe.js');
      scene=new AtlasScene($('scene'),geography,palette.REGIONS,{onRegion:selectRegion,onHover:hit=>{
        if(!hit){$('map-tooltip').hidden=true;return;}
        $('map-tooltip').innerHTML=`${esc(hit.region.label)}<span>${hit.count} ${hit.count===1?'material':'materials'} in this collection</span>`;
        $('map-tooltip').style.left=Math.max(10,Math.min(hit.x+14,$('visual-pane').clientWidth-230))+'px';$('map-tooltip').style.top=Math.max(45,Math.min(hit.y-15,$('visual-pane').clientHeight-110))+'px';$('map-tooltip').hidden=false;
      }});
      $('scene-fallback').hidden=true;renderMap();renderMode();
      $('rotate-button').setAttribute('aria-pressed',String(scene.autoRotate));$('rotate-button').innerHTML=svgIcon(scene.autoRotate?'pause':'play');
      $('rotate-button').setAttribute('aria-label',scene.autoRotate?'Pause globe rotation':'Resume globe rotation');
      if(state.view==='world')scene.focusRegion(activeNote().regionId||regionIds(activeNote())[0]);
    } catch(error) {
      console.warn('The 3D scene is unavailable; using accessible flat-map navigation.',error);
      $('scene').hidden=true;renderMap();renderMode();
      $('scene-caption').innerHTML=state.view==='body'?'<span>Select a research topic</span>':'<span>Select a region or explore the botanical index</span>';
    }
  } catch(error) {
    console.error(error);$('botanical-spotlight').setAttribute('aria-busy','false');$('botanical-spotlight').innerHTML='<h2>The collection could not be opened.</h2><p style="margin:20px 0">Please reload the atlas and try again.</p><button type="button" class="gold-button" onclick="location.reload()">Reload atlas ↗</button>';
  }
}
initialise();
