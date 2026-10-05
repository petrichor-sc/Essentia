import { useState, useRef } from 'react'

interface Hotspot {
  id: string
  x: number
  y: number
  label: string
  sub: string
  notes: string[]
  tipDir: 'up' | 'down' | 'left' | 'right'
  special?: boolean
}

// x = (lon + 180) * 2.778,  y = (90 - lat) * 2.778   (viewBox 0 0 1000 500)
const HOTSPOTS: Hotspot[] = [
  // ── Europe ──────────────────────────────────────────────────────────
  {
    // Grasse: 43.7°N 6.9°E → x=519 y=129
    id: 'grasse', x: 519, y: 129,
    label: 'Grasse', sub: 'Provence, France',
    notes: ['Rose de Mai', 'Jasmine Absolute', 'Chamomile (Roman)'],
    tipDir: 'up',
  },
  {
    // Calabria: 38.5°N 16.2°E → x=545 y=143
    id: 'calabria', x: 545, y: 143,
    label: 'Calabria', sub: 'Southern Italy',
    notes: ['Bergamot', 'Neroli', 'Lime'],
    tipDir: 'down',
  },
  {
    // Sicily: 37.5°N 14°E → x=539 y=146
    id: 'sicily', x: 539, y: 146,
    label: 'Sicily & Amalfi', sub: 'Italy',
    notes: ['Blood Orange', 'Lemon', 'Mandarin'],
    tipDir: 'left',
  },
  {
    // Andalucía: 37°N 5°W → x=486 y=147
    id: 'spain', x: 486, y: 147,
    label: 'Andalucía & Valencia', sub: 'Spain',
    notes: ['Valencia Orange', 'Spanish Lemon', 'Cypress', 'Cistus Absolute'],
    tipDir: 'left',
  },
  {
    // Bavaria: 48°N 12°E → x=533 y=117
    id: 'germany', x: 533, y: 117,
    label: 'Bavaria', sub: 'Germany',
    notes: ['Chamomile (German)', 'Hops Absolute'],
    tipDir: 'up',
  },
  // ── North Africa & Middle East ───────────────────────────────────────
  {
    // Atlas Mtns: 31.5°N 7°W → x=481 y=163
    id: 'morocco', x: 481, y: 163,
    label: 'Atlas Mountains', sub: 'Morocco',
    notes: ['Moroccan Rose', 'Atlas Cedarwood', 'Cistus'],
    tipDir: 'left',
  },
  {
    // Dhofar/Salalah: 17.5°N 54°E → x=650 y=201
    id: 'oman', x: 650, y: 201,
    label: 'Dhofar', sub: 'Oman',
    notes: ['Frankincense (Hojari)', 'Salalah Rose', 'Myrrh'],
    tipDir: 'right',
  },
  // ── East Africa ──────────────────────────────────────────────────────
  {
    // Tigray: 14°N 38.5°E → x=607 y=211
    id: 'ethiopia', x: 607, y: 211,
    label: 'Tigray & Amhara', sub: 'Ethiopia',
    notes: ['Boswellia Resin', 'Olibanum', 'Ethiopian Myrrh'],
    tipDir: 'right',
  },
  {
    // Madagascar: 20°S 47°E → x=631 y=306
    id: 'madagascar', x: 631, y: 306,
    label: 'Madagascar', sub: 'French Madagascar',
    notes: ['Vanilla Absolute', 'Ylang-Ylang', 'Clove Bud'],
    tipDir: 'right',
  },
  // ── India ────────────────────────────────────────────────────────────
  {
    // Srinagar/Kashmir: 34°N 74.8°E → x=708 y=156
    id: 'kashmir', x: 708, y: 156,
    label: 'Kashmir & Himalayas', sub: 'North India',
    notes: ['Spikenard', 'Himalayan Cedar', 'Pine Resin', 'Nargis (Narcissus)', 'Himalayan Yew'],
    tipDir: 'up',
  },
  {
    // Kannauj: 27°N 79.9°E → x=722 y=175
    id: 'kannauj', x: 722, y: 175,
    label: 'Kannauj', sub: 'Uttar Pradesh, India',
    notes: ['Rose Attar', 'Jasmine Sambac Attar', 'Petrichor Attar (Mitti)', 'Kewra (Screwpine)'],
    tipDir: 'up',
  },
  {
    // Assam/Guwahati: 26°N 91.7°E → x=755 y=178
    id: 'assam', x: 755, y: 178,
    label: 'Assam', sub: 'Northeast India',
    notes: ['Oud (Hindi)', 'Agarwood (Wild & Cultivated)'],
    tipDir: 'right',
  },
  {
    // Kerala: 10°N 76.3°E → x=712 y=222
    id: 'kerala', x: 712, y: 222,
    label: 'Kerala', sub: 'South India',
    notes: ['Green Cardamom', 'Black Pepper', 'Vetiver (Khas)'],
    tipDir: 'down',
  },
  // ── Southeast & East Asia ───────────────────────────────────────────
  {
    // Sumatra: 0.5°N 101.4°E → x=782 y=249
    id: 'indonesia', x: 782, y: 249,
    label: 'Sumatra & Java', sub: 'Indonesia',
    notes: ['Patchouli', 'Benzoin Resinoid', 'Labdanum'],
    tipDir: 'up',
  },
  {
    // Honshu/Nara: 34.7°N 135.8°E → x=877 y=154
    id: 'japan', x: 877, y: 154,
    label: 'Japan', sub: 'East Asia',
    notes: ['Kyara Agarwood', 'Hinoki Wood', 'Yuzu'],
    tipDir: 'up',
  },
  // ── Caribbean ───────────────────────────────────────────────────────
  {
    // Haiti: 18.5°N 72.3°W → x=299 y=199
    id: 'haiti', x: 299, y: 199,
    label: 'Haiti', sub: 'Caribbean',
    notes: ['Vetiver (Haitian)', 'Bay Rum', 'Ylang-Ylang'],
    tipDir: 'down',
  },
  // ── Atelier ─────────────────────────────────────────────────────────
  {
    // Kamp-Lintfort: 51.5°N 6.5°E → x=518 y=107
    id: 'kamp', x: 518, y: 107,
    label: 'Essentia Resonance Atelier', sub: 'Kamp-Lintfort · NRW · Germany',
    notes: ['Our home in North Rhine-Westphalia'],
    tipDir: 'down',
    special: true,
  },
]

// Continent silhouettes — simplified but more recognisable editorial cartography
const CONTINENTS = [
  // North America
  'M 42,74 L 95,66 L 148,62 L 212,58 L 274,54 L 312,76 L 350,104 L 332,128 L 302,148 L 278,160 L 264,186 L 246,214 L 214,210 L 180,202 L 140,194 L 122,124 Z',
  // Greenland
  'M 336,34 L 384,24 L 428,30 L 434,52 L 408,70 L 364,74 L 338,58 Z',
  // South America
  'M 212,210 L 254,220 L 312,232 L 394,286 L 380,348 L 350,390 L 324,422 L 278,406 L 258,356 L 244,300 L 254,256 Z',
  // Europe
  'M 472,96 L 494,82 L 524,78 L 548,82 L 572,88 L 594,96 L 604,112 L 604,132 L 590,146 L 562,154 L 540,156 L 522,150 L 504,148 L 490,138 L 478,122 Z',
  // Africa
  'M 460,164 L 520,154 L 576,160 L 610,190 L 624,238 L 624,292 L 606,346 L 578,382 L 544,402 L 500,396 L 470,370 L 446,332 L 438,286 L 436,228 L 444,188 Z',
  // Asia
  'M 560,116 L 618,104 L 686,96 L 760,90 L 844,98 L 900,126 L 898,166 L 880,196 L 854,222 L 816,238 L 780,234 L 740,228 L 700,214 L 658,204 L 620,198 L 598,186 L 580,164 L 570,142 Z',
  // Arabian peninsula
  'M 594,184 L 636,176 L 680,184 L 700,208 L 694,236 L 652,246 L 614,244 L 596,220 Z',
  // India
  'M 700,200 L 726,188 L 752,190 L 774,202 L 790,220 L 794,246 L 786,272 L 772,292 L 754,308 L 730,304 L 712,290 L 700,272 L 692,244 L 694,220 Z',
  // Southeast Asia
  'M 786,244 L 816,246 L 842,260 L 852,282 L 842,300 L 818,304 L 796,294 L 784,274 Z',
  // Japan
  'M 882,188 L 902,180 L 912,194 L 904,214 L 886,216 L 876,202 Z',
  // Madagascar
  'M 634,250 L 654,260 L 652,292 L 630,304 L 618,284 L 620,262 Z',
  // Australia
  'M 742,358 L 824,346 L 896,358 L 922,402 L 914,446 L 874,468 L 812,474 L 760,458 L 726,424 L 718,388 Z',
]

const CONTINENT_LABELS = [
  { name: 'NORTH AMERICA', x: 196, y: 102 },
  { name: 'SOUTH AMERICA', x: 304, y: 322 },
  { name: 'EUROPE', x: 542, y: 104 },
  { name: 'AFRICA', x: 534, y: 292 },
  { name: 'ASIA', x: 760, y: 146 },
  { name: 'AUSTRALIA', x: 822, y: 414 },
]

const INTERNAL_BORDERS = [
  // Europe / Mediterranean hints
  'M 484,142 L 500,134 L 516,130',
  'M 528,133 L 538,140 L 546,150',
  'M 540,148 L 550,154 L 560,151',
  // Arabian peninsula and Horn / East Africa hints
  'M 620,184 L 632,196 L 638,212',
  'M 602,208 L 620,216 L 640,219',
  // Indian subcontinent and neighbouring regions
  'M 706,176 L 724,170 L 742,170 L 758,173',
  'M 706,187 L 714,200 L 718,216 L 720,236',
  'M 728,190 L 738,204 L 742,218',
  'M 746,183 L 756,193 L 758,207',
  'M 758,192 L 770,198 L 780,210',
  // Southeast Asia islands / peninsulas
  'M 792,250 L 804,262 L 816,274',
  'M 818,252 L 832,262 L 844,276',
]

const LAT_LINES = [28, 111, 194, 278, 361, 444]
const LON_LINES = [0, 167, 333, 500, 667, 833, 1000]

function Tooltip({ spot, visible }: { spot: Hotspot; visible: boolean }) {
  const isLeft = spot.tipDir === 'left'
  const isRight = spot.tipDir === 'right'
  const isUp = spot.tipDir === 'up'

  const offsetX = isLeft ? -216 : isRight ? 18 : -96
  const offsetY = isUp ? -108 - spot.notes.length * 22 : 18

  return (
    <div
      style={{
        position: 'absolute',
        left: `${spot.x / 10}%`,
        top: `${spot.y / 5}%`,
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        pointerEvents: 'none',
        zIndex: 10,
        width: '208px',
      }}
    >
      <div
        style={{
          background: 'rgba(10,7,20,0.94)',
          border: '1px solid rgba(201,164,101,0.28)',
          backdropFilter: 'blur(10px)',
          padding: '14px 16px 12px',
          clipPath: visible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
          transition: 'clip-path 0.55s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div style={{
          fontFamily: "'Pinyon Script', Georgia, serif",
          fontSize: '1.12rem', letterSpacing: '0.01em',
          color: spot.special ? 'rgba(192,172,232,0.92)' : 'rgba(201,164,101,0.92)',
          marginBottom: '1px', lineHeight: 1.2,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease 0.3s',
        }}>
          {spot.label}
        </div>
        <div style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: '0.52rem', letterSpacing: '0.26em',
          textTransform: 'uppercase',
          color: spot.special ? 'rgba(192,172,232,0.55)' : 'rgba(201,164,101,0.50)',
          marginBottom: '10px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease 0.35s',
        }}>
          {spot.sub}
        </div>
        <div style={{
          height: '1px',
          background: spot.special
            ? 'linear-gradient(90deg, rgba(192,172,232,0.5), transparent)'
            : 'linear-gradient(90deg, rgba(201,164,101,0.5), transparent)',
          marginBottom: '10px',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1) 0.2s',
        }} />
        {spot.notes.map((note, i) => (
          <div key={note} style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '0.71rem', fontWeight: 300,
            color: 'rgba(244,237,224,0.78)',
            marginBottom: '4px', letterSpacing: '0.04em',
            opacity: visible ? 1 : 0,
            transition: `opacity 0.4s ease ${0.38 + i * 0.06}s`,
          }}>
            <span style={{ color: spot.special ? 'rgba(192,172,232,0.6)' : 'rgba(201,164,101,0.55)', marginRight: '7px' }}>—</span>
            {note}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function WorldMap() {
  const [active, setActive] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  return (
    <div style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
      <div style={{
        position: 'absolute', top: '16px', right: '20px', zIndex: 5,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: '0.55rem', letterSpacing: '0.28em', textTransform: 'uppercase',
        color: 'rgba(201,164,101,0.38)',
        pointerEvents: 'none',
      }}>
        Hover to reveal origins
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 1000 500"
        style={{ width: '100%', height: 'auto', display: 'block', cursor: 'crosshair' }}
        onMouseLeave={() => setActive(null)}
      >
        <rect width="1000" height="500" fill="#07050f" />

        <defs>
          <linearGradient id="continentLabelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7f6030" stopOpacity="0.78" />
            <stop offset="28%" stopColor="#c9a465" stopOpacity="0.94" />
            <stop offset="52%" stopColor="#f4ede0" stopOpacity="0.86" />
            <stop offset="72%" stopColor="#c9a465" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7f6030" stopOpacity="0.76" />
            <animate attributeName="x1" values="120%;-20%;120%" dur="14s" repeatCount="indefinite" />
            <animate attributeName="x2" values="220%;80%;220%" dur="14s" repeatCount="indefinite" />
          </linearGradient>
        </defs>

        {LAT_LINES.map(y => (
          <line key={y} x1="0" y1={y} x2="1000" y2={y}
            stroke="rgba(201,164,101,0.04)" strokeWidth="0.5" />
        ))}
        {LON_LINES.map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="500"
            stroke="rgba(201,164,101,0.04)" strokeWidth="0.5" />
        ))}
        {/* Equator (approx y=194 for 0°) */}
        <line x1="0" y1="194" x2="1000" y2="194"
          stroke="rgba(201,164,101,0.07)" strokeWidth="0.8" strokeDasharray="6 6" />

        {CONTINENTS.map((d, i) => (
          <path key={i} d={d}
            fill="rgba(192,172,232,0.044)"
            stroke="rgba(201,164,101,0.16)"
            strokeWidth="0.7"
          />
        ))}

        {CONTINENT_LABELS.map(({ name, x, y }) => (
          <g key={name} style={{ pointerEvents: 'none' }}>
            <text
              x={x}
              y={y}
              textAnchor="middle"
              fontFamily="'DM Sans', system-ui, sans-serif"
              fontSize="8.2"
              letterSpacing="2.6"
              fill="rgba(7,5,15,0.44)"
            >
              {name}
            </text>
            <text
              x={x}
              y={y}
              textAnchor="middle"
              fontFamily="'DM Sans', system-ui, sans-serif"
              fontSize="8.2"
              letterSpacing="2.6"
              fill="url(#continentLabelGradient)"
              opacity="0.58"
            >
              {name}
            </text>
          </g>
        ))}

        {INTERNAL_BORDERS.map((d, i) => (
          <path
            key={`border-${i}`}
            d={d}
            fill="none"
            stroke="rgba(201,164,101,0.14)"
            strokeWidth="0.55"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {HOTSPOTS.map(spot => {
          const isActive = active === spot.id
          return (
            <g key={spot.id}
              onMouseEnter={() => setActive(spot.id)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={spot.x} cy={spot.y}
                r={spot.special ? 14 : 11}
                fill="none"
                stroke={spot.special ? 'rgba(192,172,232,0.35)' : 'rgba(201,164,101,0.28)'}
                strokeWidth="0.7"
                opacity={isActive ? 1 : 0}
                style={{ transition: 'opacity 0.3s' }}
              />
              {spot.special && (
                <circle cx={spot.x} cy={spot.y} r={8}
                  fill="none" stroke="rgba(192,172,232,0.18)" strokeWidth="0.6"
                >
                  <animate attributeName="r" values="8;15;8" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.18;0.04;0.18" dur="3s" repeatCount="indefinite" />
                </circle>
              )}
              {spot.special ? (
                <polygon
                  points={`${spot.x},${spot.y - 5} ${spot.x + 5},${spot.y} ${spot.x},${spot.y + 5} ${spot.x - 5},${spot.y}`}
                  fill={isActive ? 'rgba(192,172,232,0.95)' : 'rgba(192,172,232,0.55)'}
                  style={{ transition: 'fill 0.3s' }}
                />
              ) : (
                <circle
                  cx={spot.x} cy={spot.y}
                  r={isActive ? 4 : 2.5}
                  fill={isActive ? 'rgba(201,164,101,0.95)' : 'rgba(201,164,101,0.42)'}
                  style={{ transition: 'r 0.3s, fill 0.3s' }}
                />
              )}
            </g>
          )
        })}

        <text
          x={518} y={97}
          textAnchor="middle"
          fontFamily="'DM Sans', system-ui, sans-serif"
          fontSize="5.5" letterSpacing="1.5"
          fill="rgba(192,172,232,0.38)"
          style={{ pointerEvents: 'none' }}
        >
          ATELIER
        </text>
      </svg>

      {/* Tooltip overlays */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {HOTSPOTS.map(spot => (
          <Tooltip key={spot.id} spot={spot} visible={active === spot.id} />
        ))}
      </div>

      {/* Origin tag strip */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '6px 18px',
        padding: '20px clamp(20px,5vw,60px) 28px',
        borderTop: '1px solid rgba(201,164,101,0.08)',
      }}>
        {HOTSPOTS.filter(s => !s.special).map(spot => (
          <span
            key={spot.id}
            onMouseEnter={() => setActive(spot.id)}
            onMouseLeave={() => setActive(null)}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '0.58rem', letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: active === spot.id ? 'rgba(201,164,101,0.90)' : 'rgba(201,164,101,0.32)',
              cursor: 'pointer',
              transition: 'color 0.25s',
            }}
          >
            {spot.label}
          </span>
        ))}
      </div>
    </div>
  )
}
