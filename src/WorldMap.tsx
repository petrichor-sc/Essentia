import { useId, useState } from 'react'
import { PALETTE, REGIONS } from './data/botanical-palette'
import geography from './data/world-geography.json'
import './botanical-map.css'

const FILTERS = [['all', 'All materials'], ['top', 'Top'], ['heart', 'Heart'], ['base', 'Base'], ['carrier', 'Carriers']]
const project = (lon: number, lat: number) => [(lon + 180) * 1000 / 360, (90 - lat) * 500 / 180]

export default function WorldMap() {
  const [tier, setTier] = useState('all')
  const [query, setQuery] = useState('')
  const [regionId, setRegionId] = useState<string | null>(null)
  const [selected, setSelected] = useState('himalayan-cedar')
  const [expanded, setExpanded] = useState(false)
  const id = useId()
  const matching = PALETTE.filter(note =>
    (tier === 'all' || (tier === 'carrier' ? note.families.includes('Carrier') : note.tiers.includes(tier))) &&
    [note.name, note.botanicalName, note.origin, ...note.families].join(' ').toLowerCase().includes(query.trim().toLowerCase()))
  const visible = matching.filter(note => !regionId || note.regionId === regionId)
  const listed = expanded ? visible : visible.slice(0, 4)
  const active = visible.find(note => note.id === selected) || visible[0]
  const regions = REGIONS.filter(region => matching.some(note => note.regionId === region.id))
  const selectedRegion = REGIONS.find(region => region.id === regionId)
  const selectRegion = (value: string) => {
    setRegionId(value)
    setExpanded(false)
    const first = matching.find(note => note.regionId === value)
    if (first) setSelected(first.id)
  }
  const reset = () => { setTier('all'); setQuery(''); setRegionId(null); setSelected('himalayan-cedar'); setExpanded(false) }

  return <div className="botanical-atlas">
    <div className="atlas-toolbar">
      <div className="atlas-filters" role="group" aria-label="Filter by perfume note position">
        {FILTERS.map(([value, label]) => <button key={value} type="button" aria-pressed={tier === value}
          onClick={() => { setTier(value); setRegionId(null); setExpanded(false) }}>{label}</button>)}
      </div>
      <label className="atlas-search" htmlFor={`${id}-search`}><span>Find a material</span>
        <input id={`${id}-search`} type="search" value={query} placeholder="Name, botanical or region…"
          onChange={event => { setQuery(event.target.value); setRegionId(null); setExpanded(false) }} />
      </label>
    </div>
    <div className="atlas-layout">
      <div className="atlas-map-column">
        <div className="atlas-map-heading"><span>A world of botanical roots</span><span>Hover · tap · explore</span></div>
        <svg className="atlas-map" viewBox="0 0 1000 500" aria-label="World map of botanical origins and cultivated heritage">
          <rect width="1000" height="500" fill="#07050f" />
          {[30, 60, 90, 120, 150].map(value => <line key={`lat-${value}`} x1="0" x2="1000" y1={value * 500 / 180} y2={value * 500 / 180} className="atlas-grid" />)}
          {[-120, -60, 0, 60, 120].map(value => <line key={`lon-${value}`} y1="0" y2="500" x1={project(value,0)[0]} x2={project(value,0)[0]} className="atlas-grid" />)}
          <line x1="0" x2="1000" y1="250" y2="250" className="atlas-equator" />
          <path d={geography.land} className="atlas-land" /><path d={geography.borders} className="atlas-borders" />
          {[['NORTH AMERICA',-105,45],['SOUTH AMERICA',-62,-18],['EUROPE',15,62],['AFRICA',16,3],['ASIA',100,48],['AUSTRALIA',130,-25]].map(([label,lon,lat]) => {
            const [x,y] = project(Number(lon),Number(lat))
            return <text key={label} x={x} y={y} className="atlas-continent">{label}</text>
          })}
          {regions.map(region => {
            const [x,y] = project(region.longitude,region.latitude)
            const notes = matching.filter(note => note.regionId === region.id)
            const native = active?.regionId === region.id ? active.originKind === 'Native range' : notes.some(note => note.originKind === 'Native range')
            const isActive = active?.regionId === region.id
            return <g key={region.id} role="button" tabIndex={0} aria-pressed={regionId === region.id}
              aria-label={`${region.label}: ${notes.map(note => note.name).join(', ')}`}
              onClick={() => selectRegion(region.id)} onFocus={() => setSelected(notes[0].id)}
              onMouseEnter={() => setSelected(notes[0].id)}
              onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectRegion(region.id) } }}
              className={`atlas-pin ${isActive ? 'is-active' : ''} ${native ? '' : 'is-heritage'}`}>
              <title>{region.label} · {notes.map(note => note.name).join(', ')}</title>
              <circle cx={x} cy={y} r="13" fill="transparent" stroke="none" />
              <circle cx={x} cy={y} r="10" className="atlas-pin-halo" />
              <circle cx={x} cy={y} r={isActive ? 4.5 : 3.5} className="atlas-pin-dot" />
            </g>
          })}
          <g aria-label="Essentia Resonance atelier, Kamp-Lintfort, Germany">
            <path d="M518.1 100.2 l4 4 l-4 4 l-4 -4 Z" fill="#c0ace8" />
            <text x="505" y="95" className="atlas-atelier">ATELIER</text>
          </g>
        </svg>
        <div className="atlas-map-key"><span><i /> Native range</span><span><i className="heritage" /> Cultivation &amp; heritage</span></div>
        <div className="atlas-region-list" role="group" aria-label="Explore a region">
          <button type="button" aria-pressed={!regionId} onClick={() => { setRegionId(null); setExpanded(false) }}>All regions</button>
          {regions.map(region => <button key={region.id} type="button" aria-pressed={regionId === region.id}
            onClick={() => selectRegion(region.id)}>{region.label}</button>)}
        </div>
      </div>
      <aside className="atlas-note" aria-label="Selected material">
        {active ? <div key={active.id}>
          <span className="atlas-eyebrow">{active.originKind}</span><h3>{active.name}</h3>
          {active.botanicalName && <p className="atlas-botanical">{active.botanicalName}</p>}
          <div className="atlas-badges">{[active.tiers.map(t => t === 'heart' ? 'Heart' : t[0].toUpperCase()+t.slice(1)).join(' / '),...active.families].filter(Boolean).map(label => <span key={label}>{label}</span>)}</div>
          <h4>Botanical roots</h4><p className="atlas-origin">{active.origin}</p>
          {active.scentProfile && <><h4>Scent character</h4><p>{active.scentProfile}</p></>}
          {active.context && <p className="atlas-context">{active.context}</p>}
          {active.sources.length > 0 && <details className="atlas-sources"><summary>Explore the botanical references</summary>
            {active.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}
          </details>}
        </div> : <div><span className="atlas-eyebrow">Keep exploring</span><h3>No materials found</h3><p>Try another name, region or note position.</p><button type="button" className="atlas-reset" onClick={reset}>Reset exploration</button></div>}
      </aside>
    </div>
    <div className="atlas-palette">
      <div className="atlas-palette-heading"><h3>{selectedRegion ? selectedRegion.label : 'Explore our palette'}</h3>
        <span aria-live="polite">{listed.length < visible.length ? `${listed.length} of ${visible.length}` : visible.length} {visible.length === 1 ? 'material' : 'materials'}</span></div>
      <div id={`${id}-palette`} className="atlas-note-list" role="group" aria-label="Select a material">
        {listed.map(note => <button key={note.id} type="button" aria-pressed={active?.id === note.id}
          onClick={() => setSelected(note.id)}>{note.name}<span>{note.families[0] || note.originKind}</span></button>)}
      </div>
      {visible.length > 4 && <button type="button" className="atlas-show-more" aria-expanded={expanded}
        aria-controls={`${id}-palette`} onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show less' : `Show more (${visible.length - 4})`}
      </button>}
      <p className="atlas-footnote">Pins are representative points within broader botanical regions, not farms or harvest locations. Cultivated hybrids, compositions and uncertain identities are distinguished from wild native ranges. Botanical references: Sunday Natural and Kew.</p>
    </div>
  </div>
}
