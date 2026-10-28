(function(){
  'use strict';
  const D=window.EssentiaData,L=window.EssentiaLogic;
  const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
  const KEY='essentia.autumn.atlas.v1';
  const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let storageOK=true,initial={};
  try{initial=JSON.parse(localStorage.getItem(KEY)||'{}');}catch(_){storageOK=false;}
  let state=L.normalize(initial),selected='balsam-fir',family='all',mystery=false,revealed=new Set(),materialId=null;
  let toastTimeout=null,currentStage=0,session=1,timer=null,remainingMs=D.stages[0].minutes*60000,deadline=0;
  const masked=id=>mystery&&!revealed.has(id);
  const noteById=id=>D.notes.find(n=>n.id===id);
  const noteNumber=id=>String(D.notes.findIndex(n=>n.id===id)+1).padStart(2,'0');
  const labelFor=id=>masked(id)?'Mystery '+noteNumber(id):noteById(id).name;
  function toast(message){
    $('#toast').textContent=message;$('#toast').classList.add('visible');
    clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>$('#toast').classList.remove('visible'),3800);
  }
  function save(){
    try{localStorage.setItem(KEY,JSON.stringify(state));storageOK=true;}catch(_){storageOK=false;}
    $('#storage-state').textContent=storageOK?'Saved on this device. Export a backup to keep it.':'Browser storage unavailable. Download or export before closing.';
  }
  function renderMap(){
    $('#map-pins').innerHTML=D.notes.map((n,i)=>`<button class="map-pin ${selected===n.id?'selected ':''}${family!=='all'&&family!==n.family?'filtered ':''}${state.visited.includes(n.id)?'visited':''}" style="--x:${n.x}%;--y:${n.y}%" data-note="${n.id}" aria-label="Explore ${escape(labelFor(n.id))}" aria-pressed="${selected===n.id}"><span class="pin-number">${String(i+1).padStart(2,'0')}</span><span class="pin-name">${escape(labelFor(n.id))}</span></button>`).join('');
    $('#mystery-toggle').setAttribute('aria-pressed',String(mystery));
    $$('.filter').forEach(b=>{
      const active=b.dataset.family===family;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));
      b.disabled=mystery&&b.dataset.family!=='all';b.title=mystery&&b.dataset.family!=='all'?'Families are hidden in mystery mode':'';
    });
  }
  function renderCard(){
    const n=noteById(selected),hidden=masked(n.id),f=D.families[n.family],card=$('#note-card');
    card.classList.toggle('mystery',hidden);
    card.innerHTML=`<div class="note-topline"><span class="note-family">${hidden?'FOLLOW YOUR FIRST IMPRESSION':escape(f.name.toUpperCase())}</span><span class="note-order">${noteNumber(n.id)} / 11</span></div><h2>${hidden?'A mystery, for now.':escape(n.name)}</h2>${hidden?'<button class="reveal-note" data-action="reveal">Reveal this note ↗</button>':`<div class="note-tags">${n.tags.map(t=>`<span>${t}</span>`).join('')}</div>`}<p class="note-description">${hidden?'A prepared blotter and a moment of curiosity. What arrives before the name does?':escape(n.description)}</p><p class="note-question">${hidden?'What place, texture or color do you imagine?':escape(n.question)}</p><label for="note-impression">Your impression · private in this browser</label><textarea id="note-impression" maxlength="350" rows="2" placeholder="A word, an image, a memory…">${escape(state.impressions[n.id])}</textarea><div class="card-lower"><button data-action="sketch">Add to my digital sketch +</button><button data-action="passport">Material passport ↗</button></div>`;
    card.classList.remove('flash');void card.offsetWidth;card.classList.add('flash');
  }
  function renderPassport(){
    $('#passport-stamps').innerHTML=D.notes.map((n,i)=>`<button class="${state.visited.includes(n.id)?'seen':''}" data-note="${n.id}" title="${escape(labelFor(n.id))}${state.visited.includes(n.id)?' · explored':''}" aria-label="${escape(labelFor(n.id))}${state.visited.includes(n.id)?', explored':''}">${String(i+1).padStart(2,'0')}</button>`).join('');
    $('#visited-count').textContent=state.visited.length+' / 11';
  }
  function selectNote(id,mark=true){
    if(!noteById(id))return;selected=id;
    if(family!=='all'&&noteById(id).family!==family)family=noteById(id).family;
    if(mark&&!state.visited.includes(id)){state.visited.push(id);save();}
    renderMap();renderCard();renderPassport();
  }
  $('#map-pins').addEventListener('click',event=>{const b=event.target.closest('[data-note]');if(b)selectNote(b.dataset.note);});
  $('#passport-stamps').addEventListener('click',event=>{const b=event.target.closest('[data-note]');if(b)selectNote(b.dataset.note);});
  $$('.filter').forEach(b=>b.addEventListener('click',()=>{
    family=b.dataset.family;
    if(family!=='all'&&noteById(selected).family!==family)selectNote(D.notes.find(n=>n.family===family).id,false);
    else renderMap();
  }));
  $('#mystery-toggle').addEventListener('click',()=>{
    mystery=!mystery;revealed=new Set();family='all';renderMap();renderCard();renderPassport();
    toast(mystery?'Mystery mode: record your impression before revealing the name.':'Note names and descriptions are visible.');
  });
  $('#next-note').addEventListener('click',()=>{
    const pool=D.notes.filter(n=>(family==='all'||n.family===family)&&n.id!==selected),unseen=pool.filter(n=>!state.visited.includes(n.id));
    const options=unseen.length?unseen:pool;selectNote(options[Math.floor(Math.random()*options.length)].id);
  });
  $('#note-card').addEventListener('input',event=>{
    if(event.target.id==='note-impression'){state.impressions[selected]=event.target.value;save();}
  });
  $('#note-card').addEventListener('click',event=>{
    const b=event.target.closest('[data-action]');if(!b)return;
    if(b.dataset.action==='reveal'){revealed.add(selected);renderCard();renderMap();renderPassport();}
    if(b.dataset.action==='passport')openPassport(selected);
    if(b.dataset.action==='sketch'){
      const before=L.totalParts(state.recipe);state.recipe=L.changeParts(state.recipe,selected,1);save();updateComposer();
      toast(L.totalParts(state.recipe)>before?labelFor(selected)+' added as one relative part. Digital sketch only.':'The 40-part sketch is full. Remove a part before adding another.');
    }
  });
  $('#atlas-map').addEventListener('pointermove',event=>{
    if(document.body.classList.contains('motion-paused')||window.matchMedia('(prefers-reduced-motion: reduce)').matches||event.pointerType==='touch')return;
    const r=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--parallax-x',((event.clientX-r.left)/r.width-.5)*5+'px');event.currentTarget.style.setProperty('--parallax-y',((event.clientY-r.top)/r.height-.5)*4+'px');
  });
  $('#atlas-map').addEventListener('pointerleave',()=>{$('#atlas-map').style.setProperty('--parallax-x','0px');$('#atlas-map').style.setProperty('--parallax-y','0px');});
  function renderStoryFields(){
    $('#story-name').value=state.story.title;$('#story-memory').value=state.story.memory;$('#story-feeling').value=state.story.feeling;
    $('#story-colors').innerHTML=L.COLORS.map((color,i)=>`<button class="color-swatch" data-color="${color}" style="--swatch:${color}" aria-pressed="${state.story.color===color}" aria-label="Choose ${['copper','sage','mauve','gold','blue','terracotta'][i]}"></button>`).join('');
    updateStoryPreview();
  }
  function updateStoryPreview(){
    $('#canvas-title').textContent=state.story.title||'Your autumn, unwritten.';
    $('#canvas-feeling').textContent=state.story.feeling||'A little room for possibility';
    $('#scent-canvas').style.setProperty('--story-color',state.story.color);
    $$('.color-swatch').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.color===state.story.color)));
  }
  [['#story-name','title'],['#story-memory','memory'],['#story-feeling','feeling']].forEach(([selector,key])=>$(selector).addEventListener('input',event=>{
    state.story[key]=event.target.value;save();updateStoryPreview();
  }));
  $$('.feeling-chips button').forEach(b=>b.addEventListener('click',()=>{state.story.feeling=b.textContent;$('#story-feeling').value=state.story.feeling;save();updateStoryPreview();}));
  $('#story-colors').addEventListener('click',event=>{const b=event.target.closest('[data-color]');if(b){state.story.color=b.dataset.color;save();updateStoryPreview();}});
  function renderRecipeRows(){
    $('#recipe-rows').innerHTML=D.notes.map(n=>`<div class="recipe-row"><span class="note-swatch" style="--note-color:${n.color}"></span><div class="recipe-name">${n.name}<small>${D.families[n.family].name}</small></div><div class="stepper"><button data-part="${n.id}" data-delta="-1" aria-label="Remove one relative part of ${n.name}">−</button><output id="parts-${n.id}" aria-label="${n.name} relative parts">0</output><button data-part="${n.id}" data-delta="1" aria-label="Add one relative part of ${n.name}">+</button></div></div>`).join('');
    updateComposer();
  }
  function updateComposer(){
    const total=L.totalParts(state.recipe),balance=L.familyParts(state.recipe);
    $('#parts-used').textContent=total;
    for(const n of D.notes){const output=$('#parts-'+n.id);if(output)output.textContent=state.recipe[n.id];}
    $$('[data-part]').forEach(b=>b.disabled=Number(b.dataset.delta)<0?state.recipe[b.dataset.part]===0:total>=L.MAX_PARTS);
    $('#budget-bar').innerHTML=D.notes.filter(n=>state.recipe[n.id]).map(n=>`<i style="width:${state.recipe[n.id]/L.MAX_PARTS*100}%;background:${n.color}"></i>`).join('');
    $('#family-balance').innerHTML=Object.entries(D.families).map(([id,f])=>`<div><i class="dot ${id}"></i>${f.short}<strong>${total?Math.round(balance[id]/total*100):0}%</strong></div>`).join('');
    for(const f of ['bright','floral','warm'])$('#scent-canvas').style.setProperty('--'+f+'-scale',total?String(.5+balance[f]/total*.8):'.5');
    $('#scent-canvas').setAttribute('aria-label',total?'Artistic canvas. Relative sketch: '+Object.entries(D.families).map(([id,f])=>f.name+' '+balance[id]+' parts').join(', ')+'. This does not measure chemistry or safety.':'An empty artistic scent canvas, ready for your ideas.');
    $('#restore-version').disabled=!state.comparison;
    if(state.comparison){
      const changes=D.notes.filter(n=>state.recipe[n.id]!==state.comparison[n.id]).length;
      $('#comparison-text').textContent=changes?changes+' note'+(changes===1?'':'s')+' changed since version A. Compare with prepared blotters.':'Version A kept. Change one voice and notice the difference.';
    }else $('#comparison-text').textContent='Change one note. Notice what it changes for you.';
  }
  $('#recipe-rows').addEventListener('click',event=>{
    const b=event.target.closest('[data-part]');if(!b)return;
    state.recipe=L.changeParts(state.recipe,b.dataset.part,Number(b.dataset.delta));save();updateComposer();
  });
  $('#keep-version').addEventListener('click',()=>{state.comparison={...state.recipe};save();updateComposer();toast('Version A kept on this device.');});
  $('#restore-version').addEventListener('click',()=>{if(state.comparison){state.recipe={...state.comparison};save();updateComposer();toast('Returned to version A.');}});
  $('#clear-sketch').addEventListener('click',()=>{state.recipe=L.blankRecipe();save();updateComposer();toast('Digital sketch cleared. Your story is still here.');});
  function renderGallery(){
    $('#gallery').innerHTML=state.gallery.length?state.gallery.map(s=>`<article class="story-card" style="--card-color:${s.color};--card-tint:${s.color}22"><div class="privacy-mark" aria-hidden="true"></div><span class="eyebrow">ONE WAY TO FEEL AUTUMN</span><h3>${escape(s.title||'An unnamed autumn')}</h3>${s.feeling?`<p class="story-feeling">${escape(s.feeling)}</p>`:''}${s.memory?`<p>${escape(s.memory)}</p>`:''}<footer><span>SHARED ON THIS SCREEN ONLY</span><button data-remove-story="${escape(s.id)}" aria-label="Remove ${escape(s.title||'this card')} from the gallery">Remove</button></footer></article>`).join(''):'<div class="gallery-empty">There is room for your story here.<small>The gallery begins empty. Sharing is always your choice.</small></div>';
  }
  $('#share-story').addEventListener('click',()=>{
    if(!state.story.title.trim()){toast('Give your autumn a title before adding it to this screen.');$('#story-name').focus();return;}
    if(state.gallery.length>=40){toast('This screen already holds 40 cards. Export a backup before removing any.');return;}
    state.gallery.push({...L.cleanStory(state.story),id:Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7),recipe:{...state.recipe}});save();renderGallery();toast('Your card is now visible in this screen’s gallery.');
  });
  $('#gallery').addEventListener('click',event=>{const b=event.target.closest('[data-remove-story]');if(b){state.gallery=state.gallery.filter(s=>s.id!==b.dataset.removeStory);save();renderGallery();toast('Card removed from this screen. Your personal draft is unchanged.');}});
  function download(name,text,type='text/plain;charset=utf-8'){
    const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function scentText(){
    const lines=['ESSENTIA — YOUR SCENT. YOUR STORY.','AUTUMN EDITION','',state.story.title||'My autumn','',state.story.feeling?'I want it to feel: '+state.story.feeling:'',state.story.memory?'It reminds me of: '+state.story.memory:'','Story color: '+state.story.color,'','DIGITAL SCENT SKETCH — RELATIVE PARTS ONLY'];
    for(const n of D.notes)if(state.recipe[n.id])lines.push(n.name+': '+state.recipe[n.id]+' relative parts');
    lines.push('Total: '+L.totalParts(state.recipe)+' / 40 creative parts','','These parts are not drops, grams or millilitres. No safe dispensing limit or skin-use approval is established for these materials. Physical experimentation uses facilitator-prepared blotters or an assessed liquid workflow.','');
    const impressions=D.notes.filter(n=>state.impressions[n.id]);if(impressions.length){lines.push('MY PRIVATE DISCOVERY NOTES','');for(const n of impressions)lines.push(n.name+': '+state.impressions[n.id]);}
    return lines.filter((v,i)=>v!==''||lines[i-1]!=='').join('\n');
  }
  $('#download-card').addEventListener('click',()=>{const name=(state.story.title||'my-autumn').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,55)||'my-autumn';download('Essentia-'+name+'.txt',scentText());toast('Scent card downloaded with your story and sketch.');});
  function printHTML(html){$('#print-surface').innerHTML=html;window.print();}
  $('#print-card').addEventListener('click',()=>{
    const r=D.notes.filter(n=>state.recipe[n.id]);
    printHTML(`<span class="print-eyebrow">ESSENTIA · AUTUMN EDITION</span><h1>${escape(state.story.title||'My autumn')}</h1><div class="story-color-line" style="--print-color:${state.story.color}"></div>${state.story.feeling?`<h2>${escape(state.story.feeling)}</h2>`:''}${state.story.memory?`<p>${escape(state.story.memory).replace(/\n/g,'<br>')}</p>`:''}<h2>My scent sketch</h2><table><thead><tr><th>Note</th><th>Relative parts</th></tr></thead><tbody>${r.map(n=>`<tr><td>${n.name}</td><td>${state.recipe[n.id]}</td></tr>`).join('')}</tbody></table><p>Total: ${L.totalParts(state.recipe)} / 40 creative parts</p><div class="print-boundary">Digital sketch only. These parts are not drops, grams or millilitres. Wearable dosing is not established; no skin-use approval is given. Physical creation uses prepared blotters or an assessed liquid workflow.</div><footer>Your scent. Your story. Sharing is always your choice.</footer>`);
  });
  $('#print-formula').addEventListener('click',()=>{
    printHTML(`<span class="print-eyebrow">ESSENTIA · INDIVIDUAL LIQUID BLENDING RECORD</span><h1>My autumn, in scent.</h1><p>Name or participant code: ____________________ &nbsp; Date / session: ____________________</p><p>My title / feeling: __________________________________________________________________</p><p>Working palette / batch reference: ____________________ &nbsp; Quantity unit / dispenser: ____________________</p><table><thead><tr><th>Note</th><th>Supplied strength / carrier</th><th>Trial A addition</th><th>Trial B addition</th><th>Final addition</th></tr></thead><tbody>${D.notes.map(n=>`<tr><td>${n.name}</td><td>________________</td><td>__________</td><td>__________</td><td>__________</td></tr>`).join('')}</tbody></table><p style="margin-top:16pt">Alcohol / other carriers and their quantities: ______________________________________________</p><p>Final measured total and unit: ____________________ &nbsp; Concentration basis: ____________________</p><p>Formula / permitted-range reference: ____________________________________________________</p><p>What I changed, and why: ______________________________________________________________</p><p>_________________________________________________________________________________</p><div class="print-boundary">Record every actual addition and its unit. Counts are a record, not a safe-drop limit or automatic conversion to 10 mL / 20%. Apply the facilitator’s documented limits for the exact working materials and check the combined final formula before skin use or take-home supply.</div><footer>Each person creates their own interpretation. Sharing a story is optional.</footer>`);
  });
  function timeRange(s){const time=n=>String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');return time(s.start)+'–'+time(s.start+s.minutes);}
  function renderStages(){
    $('#stage-list').innerHTML=D.stages.map((s,i)=>`<button data-stage="${i}" class="${currentStage===i?'active':''}" aria-current="${currentStage===i?'step':'false'}"><span class="stage-num">${String(i+1).padStart(2,'0')}</span><span class="stage-label">${s.title}<small>${timeRange(s)} · ${s.minutes} MIN</small></span></button>`).join('');
    const s=D.stages[currentStage];
    $('#stage-content').innerHTML=`<div class="stage-top"><span class="eyebrow">SESSION ${session} · ${s.verb.toUpperCase()} · ${timeRange(s)}</span><button class="quiet-button" data-stage-action="project">${document.fullscreenElement||$('#stage-player').classList.contains('projection-fallback')?'Exit projection ×':'Project this stage ↗'}</button></div><h2>${s.title}</h2><blockquote>${s.line}</blockquote><p>${s.activity}</p><dl><dt>On the screen</dt><dd>${s.digital}</dd><dt>On the table</dt><dd>${s.prepare}</dd></dl><div class="stage-result">LEAVE WITH · ${s.result}</div><div class="timer-row"><output class="timer-readout" id="timer-readout" aria-live="off" aria-label="Stage time remaining"></output><span class="timer-caption">TIME TO EXPLORE</span><button class="secondary-button" data-stage-action="timer" id="timer-toggle">Start</button><button class="timer-reset" data-stage-action="reset">Reset</button><button class="primary-button" data-stage-action="next">${currentStage===D.stages.length-1?'Finish session':'Next stage →'}</button></div>`;
    paintTimer();
  }
  function stopTimer(){if(timer){remainingMs=Math.max(0,deadline-Date.now());clearInterval(timer);timer=null;}}
  function setStage(i){stopTimer();currentStage=Math.max(0,Math.min(D.stages.length-1,i));remainingMs=D.stages[currentStage].minutes*60000;renderStages();}
  function paintTimer(){
    const left=timer?Math.max(0,deadline-Date.now()):remainingMs,seconds=Math.ceil(left/1000);
    if($('#timer-readout'))$('#timer-readout').textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
    if($('#timer-toggle'))$('#timer-toggle').textContent=timer?'Pause':left===0?'Restart':'Start';
    if(timer&&left<=0){stopTimer();remainingMs=0;paintTimer();toast('This stage’s time has ended. Move on when your participants are ready.');}
  }
  async function projectStage(){
    const player=$('#stage-player');
    if(document.fullscreenElement){await document.exitFullscreen();return;}
    if(player.classList.contains('projection-fallback')){player.classList.remove('projection-fallback');document.body.style.overflow='';renderStages();return;}
    if(player.requestFullscreen){try{await player.requestFullscreen();return;}catch(_){}}
    player.classList.add('projection-fallback');document.body.style.overflow='hidden';renderStages();
  }
  $('#stage-list').addEventListener('click',event=>{const b=event.target.closest('[data-stage]');if(b)setStage(Number(b.dataset.stage));});
  $('#stage-content').addEventListener('click',event=>{
    const b=event.target.closest('[data-stage-action]');if(!b)return;
    switch(b.dataset.stageAction){
      case 'project':projectStage();break;
      case 'timer':if(timer)stopTimer();else{if(remainingMs<=0)remainingMs=D.stages[currentStage].minutes*60000;deadline=Date.now()+remainingMs;timer=setInterval(paintTimer,250);}paintTimer();break;
      case 'reset':stopTimer();remainingMs=D.stages[currentStage].minutes*60000;paintTimer();break;
      case 'next':if(currentStage<D.stages.length-1)setStage(currentStage+1);else{stopTimer();paintTimer();toast('Session complete. Invite participants to download their scent-memory cards.');}break;
    }
  });
  $$('[data-session]').forEach(b=>b.addEventListener('click',()=>{
    session=Number(b.dataset.session);$$('[data-session]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});setStage(0);toast('Session '+session+' selected. Stage timer reset.');
  }));
  document.addEventListener('fullscreenchange',renderStages);
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&$('#stage-player').classList.contains('projection-fallback')){$('#stage-player').classList.remove('projection-fallback');document.body.style.overflow='';renderStages();}});
  $('#print-plan').addEventListener('click',()=>printHTML(`<span class="print-eyebrow">ESSENTIA · FACILITATOR RUN SHEET</span><h1>An autumn of your own.</h1><p>120 minutes per session · 20 people · four tables of five · two sessions, 40 people total. Allow about 30 minutes to reset between sessions.</p><p>Every participant creates an individual interpretation. Smelling, personal stories, speaking and photographs are optional.</p>${D.stages.map((s,i)=>`<section><span class="print-eyebrow">${String(i+1).padStart(2,'0')} · ${timeRange(s)} · ${s.minutes} MINUTES</span><h2>${s.title}</h2><blockquote>${s.line}</blockquote><p>${s.activity}</p><p><strong>Screen:</strong> ${s.digital}</p><p><strong>Table:</strong> ${s.prepare}</p><p><strong>Leave with:</strong> ${s.result}</p></section>`).join('')}<div class="print-boundary">Your liquid blending materials are prepared. Verify the dispensing limits for the exact supplied materials and the combined final formula before skin use or take-home supply.</div>`));
  function passportHasNotes(id){return Object.values(state.passports[id]).some(v=>v.trim());}
  function renderLimits(){
    $('#limits-body').innerHTML=D.notes.map(n=>`<tr><td><button data-passport="${n.id}"><span class="note-swatch" style="--note-color:${n.color}"></span>${n.name}</button></td><td><span class="limit-pending">Not established</span><span class="passport-state">${passportHasNotes(n.id)?'Preparation notes recorded · not verified':'Supplier / batch documentation missing'}</span></td><td>${n.check}</td><td><button class="table-open" data-passport="${n.id}" aria-label="Open ${n.name} material passport">↗</button></td></tr>`).join('');
  }
  function openPassport(id){
    const n=noteById(id);if(!n)return;materialId=id;
    $('#material-title').textContent=n.name;$('#material-check').textContent=n.check;$('#material-reference').textContent=n.reference;
    for(const key of ['supplier','product','batch','strength','document','memo'])$('#material-form').elements.namedItem(key).value=state.passports[id][key];
    $('#material-dialog').showModal();
  }
  $('#limits-body').addEventListener('click',event=>{const b=event.target.closest('[data-passport]');if(b)openPassport(b.dataset.passport);});
  $('#close-dialog').addEventListener('click',()=>$('#material-dialog').close());
  $('#material-form').addEventListener('submit',event=>{
    event.preventDefault();if(!materialId)return;
    for(const key of ['supplier','product','batch','strength','document','memo'])state.passports[materialId][key]=$('#material-form').elements.namedItem(key).value;
    save();renderLimits();$('#material-dialog').close();toast('Preparation notes saved. Material limits still need assessment.');
  });
  function renderChecklist(){
    $('#prep-checklist').innerHTML=D.preparation.map(([id,title,description])=>`<label class="check-item ${state.checks[id]?'done':''}"><input type="checkbox" data-check="${id}" ${state.checks[id]?'checked':''}><span><strong>${title}</strong><small>${description}</small></span></label>`).join('');
    $('#prep-count').textContent=Object.values(state.checks).filter(Boolean).length+' / '+D.preparation.length+' tasks';
  }
  $('#prep-checklist').addEventListener('change',event=>{
    const id=event.target.dataset.check;if(!id)return;state.checks[id]=event.target.checked;save();event.target.closest('.check-item').classList.toggle('done',event.target.checked);$('#prep-count').textContent=Object.values(state.checks).filter(Boolean).length+' / '+D.preparation.length+' tasks';
  });
  function updateMath(){
    const m=$('#math-material').value,f=$('#math-finished').value,value=m!==''&&f!==''?L.referencePercent(m,f):null,limit=Number($('#math-reference').value),out=$('#math-result');
    out.className='math-result';
    if(value===null){out.classList.add('invalid');out.textContent='Enter valid masses. The entire batch must be positive and at least the raw-material mass.';return;}
    if(value>limit+1e-10){out.classList.add('exceeded');out.textContent=value.toFixed(3)+'% w/w — exceeds this single '+limit.toFixed(2)+'% published reference. This is not a formula assessment.';}
    else out.textContent=value.toFixed(3)+'% w/w — '+(Math.abs(value-limit)<1e-10?'at':'below')+' this single '+limit.toFixed(2)+'% reference. The material identity and whole formula remain unassessed.';
  }
  ['#math-material','#math-finished','#math-reference'].forEach(s=>$(s).addEventListener('input',updateMath));
  $('#sources').innerHTML=D.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title} ↗<small>${s.detail}</small></a>`).join('');
  $('#export-workspace').addEventListener('click',()=>{download('Essentia-Autumn-Workspace.json',JSON.stringify({...state,exportedAt:new Date().toISOString(),notice:'Private text may be included. Digital sketches only; no formula or skin-use approval.'},null,2),'application/json');toast('Workspace backup downloaded. It includes any private text you entered.');});
  $('#import-workspace').addEventListener('change',async event=>{
    const file=event.target.files[0];if(!file)return;
    try{
      if(file.size>1000000)throw new Error('The backup is too large. Choose an Essentia workspace JSON file under 1 MB.');
      const raw=JSON.parse(await file.text());if(!raw||Array.isArray(raw)||raw.version!==1||!raw.recipe||!raw.story)throw new Error('This does not look like a supported Essentia workspace backup.');
      const normalized=L.normalize(raw);
      // Merge local private entries instead of silently replacing them.
      for(const n of D.notes){if(!normalized.impressions[n.id])normalized.impressions[n.id]=state.impressions[n.id];if(!Object.values(normalized.passports[n.id]).some(Boolean))normalized.passports[n.id]=state.passports[n.id];}
      const unique=new Map([...state.gallery,...normalized.gallery].map(s=>[s.id,s]));normalized.gallery=Array.from(unique.values()).slice(-40);
      normalized.visited=[...new Set([...state.visited,...normalized.visited])];
      state=normalized;save();renderAll();toast('Backup imported. Local gallery cards and otherwise empty note records were retained. No skin-use approval was imported.');
    }catch(error){toast(error.message||'The workspace could not be imported.');}finally{event.target.value='';}
  });
  function updateMotion(){
    const system=window.matchMedia('(prefers-reduced-motion: reduce)').matches,paused=system||state.reducedMotion;
    document.body.classList.toggle('motion-paused',paused);$('.motion-toggle').setAttribute('aria-pressed',String(paused));$('.motion-toggle').textContent=paused?'▷':'Ⅱ';$('.motion-toggle').setAttribute('aria-label',system?'System reduced-motion preference is active':paused?'Resume decorative motion':'Pause decorative motion');$('.motion-toggle').title=system?'System reduced-motion preference is active':paused?'Resume decorative motion':'Pause decorative motion';
  }
  $('.motion-toggle').addEventListener('click',()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){toast('Decorative motion is reduced by your system preference.');return;}
    state.reducedMotion=!state.reducedMotion;save();updateMotion();
  });
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',updateMotion);
  function navigate(scroll=true){
    const view=['atlas','story','workshop','setup'].includes(location.hash.slice(1))?location.hash.slice(1):'atlas';
    $$('.view').forEach(el=>el.hidden=el.id!=='view-'+view);
    $$('.nav-link').forEach(a=>{const active=a.hash==='#'+view;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    document.title='Essentia — '+({atlas:'An Autumn of Your Own',story:'My Autumn',workshop:'The Workshop',setup:'Safe Setup'}[view]);
    if(scroll)window.scrollTo({top:0,behavior:'instant'});
  }
  window.addEventListener('hashchange',()=>navigate());
  function renderAll(){renderMap();renderCard();renderPassport();renderStoryFields();renderRecipeRows();renderGallery();renderLimits();renderChecklist();updateMath();updateMotion();}
  renderAll();renderStages();navigate(false);
  $('#storage-state').textContent=storageOK?'Saved on this device. Export a backup to keep it.':'Browser storage unavailable. Download or export before closing.';
})();
