export const TOPICS = [
  { id: 'calm', label: 'Calm & stress', short: 'Calm & stress', description: 'Short-term mood, stress, and relaxation studies. Responses depend on preparation, setting, and the person; a topic connection is not a treatment recommendation.' },
  { id: 'rest', label: 'Sleep & rest', short: 'Sleep & rest', description: 'Explore sleep-related traditions and research, including what remains uncertain. A pleasant bedtime scent and an effective insomnia treatment are different questions.' },
  { id: 'attention', label: 'Attention & arousal', short: 'Attention', description: 'Experiments on alertness and physiological arousal. A laboratory response does not establish improved learning, productivity, or a clinical benefit.' },
  { id: 'skin', label: 'Skin', short: 'Skin', description: 'Topical preparations and skin-related research. Formulation and dilution matter; a laboratory antimicrobial result does not establish that an oil treats a skin condition.' },
  { id: 'muscles', label: 'Muscles & comfort', short: 'Muscles', description: 'Read about specific topical preparations and traditional-use assessments. The same findings do not automatically apply to inhaling the oil.' },
  { id: 'breathing', label: 'Breathing', short: 'Breathing', description: 'Respiratory uses, their preparation-specific evidence, and precautions. Some aromatic products can irritate airways; a fresh sensation is not proof of improved breathing.' },
  { id: 'digestion', label: 'Digestion & nausea', short: 'Digestion', description: 'Differentiate studies of inhaled preparations, herbal teas, and manufactured oral medicines. This atlas does not give instructions for swallowing essential oils.' }
];

export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
export const safeURL = value => { try { const u = new URL(value); return /^https?:$/.test(u.protocol) ? u.href : '#'; } catch { return '#'; } };
export const regionIds = note => [...new Set([note.regionId, ...(note.regionIds || [])].filter(Boolean))];
export const isPalette = note => !note.id.startsWith('sunday-');
export const notePosition = note => note.tiers.length ? note.tiers.map(t => t[0].toUpperCase() + t.slice(1)).join(' / ') : note.families.includes('Carrier') ? 'Carrier' : 'Not classified';

export function filterMaterials(materials, profiles, state, ignoreRegion = false) {
  const q = (state.query || '').trim().toLocaleLowerCase();
  return materials.filter(note => {
    if (state.collection === 'study' && !profiles[note.id]) return false;
    if (state.collection === 'palette' && !isPalette(note)) return false;
    if (state.tier && state.tier !== 'all' && (state.tier === 'carrier' ? !note.families.includes('Carrier') : !note.tiers.includes(state.tier))) return false;
    if (!ignoreRegion && state.region && !regionIds(note).includes(state.region)) return false;
    if (state.view === 'body' && state.topic && !(profiles[note.id]?.topics || []).includes(state.topic)) return false;
    if (q) {
      const content = [note.name, note.botanicalName, note.origin, note.scentProfile, ...note.families, ...(note.productionVariants || []).flatMap(v => [v.label, v.origin, v.scentOriginal || ''])].join(' ').toLocaleLowerCase();
      if (!content.includes(q)) return false;
    }
    return true;
  });
}

export function describeMaterial(note, study) {
  const raw = (note.productionVariants || []).map(v => v.extractionOriginal || '').join(' / ');
  let method = 'Check the specific extract';
  if (/dampf|steam|wasserdestillation|hydrodistill/i.test(raw)) method = 'Distillation';
  if (/kaltpress|cold.press|expression/i.test(raw)) method = 'Cold expression';
  if (/lösungs|lösemittel|solvent|extraktion/i.test(raw)) method = 'Extraction';
  if (/CO2|CO₂|Kohlendioxid/i.test(raw)) method = 'CO₂ extraction';
  const parts = [];
  for (const [rx, label] of [[/Blüten|Blütenstände|flower|inflorescen/i,'Flowers'],[/Fruchtschalen|peel|rind/i,'Fruit peel'],[/Blätter|leaves|leaf/i,'Leaves'],[/Zweige|twigs|branches/i,'Twigs'],[/Kernholz|heartwood/i,'Heartwood'],[/Wurzeln|roots/i,'Roots'],[/Samen|seeds/i,'Seeds'],[/Harz|resin/i,'Resin'],[/Rinde|bark/i,'Bark']]) if (rx.test(raw)) parts.push(label);
  if (!parts.length && /Holz|wood/i.test(raw)) parts.push('Wood');
  return { part: study?.part || (parts.length ? parts.join(' & ') : 'Not specified in this record'), method, extraction: study?.extraction || (raw ? 'Extraction details are recorded per production variant below.' : 'The exact extraction is not specified in the original record. Confirm the material with its supplier.') };
}

export function artKind(note) {
  const text = `${note.id} ${note.name} ${note.botanicalName}`.toLowerCase();
  if (/cedar|cedrus|pinus|pine|fir|spruce|abies|cypress/.test(text)) return 'conifer';
  if (/citrus|bergamot|lemon|lime|mandarin|orange|grapefruit|yuzu/.test(text) && !/neroli|petitgrain/.test(text)) return 'citrus';
  if (/lavand|lavender/.test(text)) return 'lavender';
  if (/rose-otto|rosa.*damascena|rose absolute/.test(text)) return 'rose';
  if (/jasmine|neroli|nargis|ylang|chamom/.test(text)) return 'flower';
  if (/cardamom|pepper|seed|nutmeg/.test(text)) return 'pod';
  if (/vanilla|tonka/.test(text)) return 'vanilla';
  if (/myrhh|myrrh|resin|frankincense|boswellia|benzoin/.test(text)) return 'resin';
  return 'leaf';
}

export function botanicalArt(note, className = 'botanical-art') {
  let drawing = '';
  const kind = artKind(note);
  if (kind === 'conifer') {
    drawing = '<path d="M45 104Q49 65 51 12M49 73l-23-14m23 2 25-16M50 48 31 33m20 3 14-17"/>';
    for (let i = 0; i < 8; i++) { const y = 27 + i * 8; drawing += `<path d="M50 ${y}l-${12+i%3*4} -${8+i%2*3}M50 ${y}l${11+i%3*4} -${9+i%2*2}"/>`; }
    drawing += '<path d="M28 60q-10 2-8 13 10 9 16-1 2-10-8-12Zm-6 5 10 5m-11 2 8 5"/>';
  } else if (kind === 'citrus') drawing = '<path d="M28 102Q33 68 61 27M44 64Q18 57 17 36q24-2 30 22M56 40q1-25 24-27 3 22-19 31M39 79q-12-14-25-7 0 21 22 16M51 54l16 12"/><path d="M67 63c-17-4-27 10-22 26 5 17 29 18 37 3 7-13 2-27-11-29l-4-4Z"/><path d="M50 78q2-8 8-8m14 4 3 2M20 39l22 20m37-43-18 24"/>';
  else if (kind === 'lavender') {
    drawing = '<path d="M43 108 53 16M47 82Q21 77 24 62q18 1 24 15M49 68q22-2 26-18-17 2-25 13M48 92q14 1 24-10"/>';
    for (let i = 0; i < 7; i++) { const y = 18 + i * 7; drawing += `<path d="M${53-i*.5} ${y}q-15-2-9-10 11-2 9 10Zm0 0q14-2 10-11-11-2-10 11Z"/>`; }
  } else if (kind === 'rose') drawing = '<path d="M52 105 50 64M51 84Q26 79 25 63q22 0 26 17m0 10q21 2 26-16-20-2-26 12M51 66c-18 0-29-15-25-29 0-11 10-16 17-17 7-8 20-8 26 1 16 3 22 16 16 29-5 14-18 20-34 16Z"/><path d="M51 60Q29 50 37 35q8-15 24-7 16 8 5 22-12 11-22-1-8-12 5-15 12-3 11 7-2 8-10 3M27 35l11 2m30-15-7 6m23 21-16-3M32 53l8-6"/>';
  else if (kind === 'flower') {
    drawing = '<path d="M48 108q10-31 2-57M51 81Q22 80 22 61q20 0 29 16M50 71q25-3 26-20-20 0-26 14"/>';
    for (let i = 0; i < 7; i++) drawing += `<path transform="rotate(${i*360/7} 51 36)" d="M51 36Q35 28 43 12q15 2 8 24Z"/>`;
    drawing += '<circle cx="51" cy="36" r="5"/>';
  } else if (kind === 'pod') drawing = '<path d="M49 105q12-42-8-76m12 50 20-23m-26 6L26 48"/><path d="M30 28q2-20 13-22 16 10 17 29-2 21-18 25-17-9-12-32Zm10-14q-4 28 2 40m4-40q11 20 5 34M16 41q-13 11-7 23 15 8 25-4 3-15-18-19Zm54 9q21-7 22 11-4 20-22 20-13-13 0-31Zm4 5q-5 10-3 20M15 47l12 12"/>';
  else if (kind === 'vanilla') drawing = '<path d="M35 108Q17 72 42 20M49 105Q67 65 71 39M50 105q18-29 27-58M35 103Q22 65 46 33M44 68q-23-2-28-22 25-1 30 17"/><path d="M56 35q-19-9-14-23 16-3 20 16m0 0q2-22 17-20 9 11-12 24m-2 0q22-10 26 4-1 14-24 2m-5-5q-10 19-18 10-7-9 11-14m5 5 5 5 7-3-6-7Z"/>';
  else if (kind === 'resin') drawing = '<path d="M48 108 49 46 30 23M49 68l23-32M49 49l6-32M34 29 20 31m10-9-3-12M70 40l17-2m-11-7 2-15M48 88l-16-8"/><path d="M48 57q-15 18-3 25 15 4 15-10 0-5-12-15Zm26-9q-10 12-5 18 12 7 14-5 1-4-9-13ZM31 35q-9 12-6 17 9 7 12-3 0-4-6-14Z"/><path d="m44 73 2 3m27-15 2 2"/>';
  else drawing = '<path d="M43 108q2-45 12-88M47 84Q15 77 13 49q32-1 36 29M52 62Q79 57 84 27q-27 0-31 30M54 34Q32 30 32 8q22 2 22 21M43 94q27 6 38-15-27-8-35 11M17 53l28 25m35-45L55 56M37 14l15 16M50 89l25-8"/>';
  return `<svg class="${escapeHTML(className)}" viewBox="0 0 100 120" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${drawing}</svg>`;
}

export function parseAtlasHash(hash, materialIds, knownRegions = null) {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const id = params.get('plant');
  const region = params.get('region');
  return { selected: materialIds.has(id) ? id : 'himalayan-cedar', view: params.get('view') === 'body' ? 'body' : 'world', topic: TOPICS.some(t => t.id === params.get('topic')) ? params.get('topic') : null, read: params.get('read') === '1', collection: ['study','palette','all'].includes(params.get('collection')) ? params.get('collection') : 'study', tier: ['top','heart','base','carrier'].includes(params.get('tier')) ? params.get('tier') : 'all', query: (params.get('q') || '').slice(0,150), region: region && knownRegions?.has(region) ? region : null };
}
