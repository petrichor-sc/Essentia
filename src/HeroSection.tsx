import { useEffect, useRef, useState, useCallback } from 'react'
import groupPhoto from '@/imports/1.jpg'

// ── Logo geometry in SVG coordinate space ────────────────────────────────────
//
// ViewBox "0 0 100 60", preserveAspectRatio="xMinYMin slice".
// With that setting, (0,0) is the hero top-left corner and 1 unit ≈ 15 px
// on a typical 1440×900 viewport.
//
// The logo's concentric arch family is rendered at scale=0.08, centered at
// (4, 2.5) — this maps to ≈ (60 px, 37 px) which sits at the nav logo.
//
// EYE-CENTRED COORDINATE SYSTEM (from earlier geometry analysis):
//   Eye at origin (0,0)
//   Arches open downward / feet below eye, arch apex well above eye
//   Arch N: foot_y ≈ +N×8, ctrl_y ≈ −N×11, half_width ≈ N×17
//   Stem: eye → (0,83); roots branch from (0,83)
//
// All paths below are: raw_logo_coord × 0.08 + (4, 2.5)
// ─────────────────────────────────────────────────────────────────────────────

// Helper: outer arch of the logo at arbitrary scale s, centered at (4, 2.5)
// Outer arch raw: foot at (±88, 55), ctrl at (±88, −111)
function outerArch(s: number): string {
  const fx = 4 + s * 88, fy = 2.5 + s * 55
  const ix = 4 - s * 88
  const cy = 2.5 - s * 111
  return `M ${ix.toFixed(2)},${fy.toFixed(2)} C ${ix.toFixed(2)},${cy.toFixed(2)} ${fx.toFixed(2)},${cy.toFixed(2)} ${fx.toFixed(2)},${fy.toFixed(2)}`
}
// Second-to-outer arch: foot at (±72, 49), ctrl at (±72, −86)
function arch2(s: number): string {
  const fx = 4 + s * 72, fy = 2.5 + s * 49
  const ix = 4 - s * 72
  const cy = 2.5 - s * 86
  return `M ${ix.toFixed(2)},${fy.toFixed(2)} C ${ix.toFixed(2)},${cy.toFixed(2)} ${fx.toFixed(2)},${cy.toFixed(2)} ${fx.toFixed(2)},${fy.toFixed(2)}`
}

// ── Draw paths: the logo form itself (scale 0.08) ────────────────────────────
type DrawPath = { d: string; stroke: string; sw: number; delay: number; dur: number; len: number; layer: 3 | 2 | 1 }

const DRAW: DrawPath[] = [
  // Eye arc (innermost) ──────────────────────────────────────────────────────
  { d: 'M 2.64,2.66 C 2.64,1.38 5.36,1.38 5.36,2.66',
    stroke: 'rgba(192,172,232,0.92)', sw: 0.55, delay: 0.15, dur: 0.8,  len: 6,  layer: 3 },
  // Arch 5 ───────────────────────────────────────────────────────────────────
  { d: 'M 2.08,4.34 C 2.08,0.74 5.92,0.74 5.92,4.34',
    stroke: 'rgba(196,158,88,0.85)',   sw: 0.50, delay: 0.50, dur: 1.0,  len: 10, layer: 3 },
  // Stem ─────────────────────────────────────────────────────────────────────
  { d: 'M 4,4.98 L 4,9.14',
    stroke: 'rgba(192,172,232,0.65)', sw: 0.45, delay: 0.72, dur: 0.5,  len: 4,  layer: 3 },
  // Arch 4 ───────────────────────────────────────────────────────────────────
  { d: 'M 0.96,5.06 C 0.96,-0.86 7.04,-0.86 7.04,5.06',
    stroke: 'rgba(192,172,232,0.78)', sw: 0.50, delay: 0.88, dur: 1.1,  len: 14, layer: 3 },
  // Near roots ───────────────────────────────────────────────────────────────
  { d: 'M 4,9.14 L 3.04,10.5',
    stroke: 'rgba(196,158,88,0.55)',   sw: 0.40, delay: 1.12, dur: 0.44, len: 3,  layer: 2 },
  { d: 'M 4,9.14 L 4.96,10.5',
    stroke: 'rgba(196,158,88,0.55)',   sw: 0.40, delay: 1.14, dur: 0.44, len: 3,  layer: 2 },
  // Arch 3 ───────────────────────────────────────────────────────────────────
  { d: 'M -0.32,5.70 C -0.32,-2.54 8.32,-2.54 8.32,5.70',
    stroke: 'rgba(196,158,88,0.70)',   sw: 0.48, delay: 1.22, dur: 1.2,  len: 20, layer: 2 },
  // Mid roots ────────────────────────────────────────────────────────────────
  { d: 'M 4,9.14 L 1.76,11.14',
    stroke: 'rgba(192,172,232,0.45)', sw: 0.38, delay: 1.58, dur: 0.50, len: 4,  layer: 2 },
  { d: 'M 4,9.14 L 6.24,11.14',
    stroke: 'rgba(192,172,232,0.45)', sw: 0.38, delay: 1.60, dur: 0.50, len: 4,  layer: 2 },
  // Arch 2 ───────────────────────────────────────────────────────────────────
  { d: 'M -1.76,6.42 C -1.76,-4.38 9.76,-4.38 9.76,6.42',
    stroke: 'rgba(192,172,232,0.70)', sw: 0.48, delay: 1.72, dur: 1.3,  len: 28, layer: 2 },
  // Far roots ────────────────────────────────────────────────────────────────
  { d: 'M 4,9.14 L -0.96,11.30',
    stroke: 'rgba(196,158,88,0.35)',   sw: 0.35, delay: 2.02, dur: 0.50, len: 5,  layer: 1 },
  { d: 'M 4,9.14 L 8.96,11.30',
    stroke: 'rgba(196,158,88,0.35)',   sw: 0.35, delay: 2.04, dur: 0.50, len: 5,  layer: 1 },
  { d: 'M 4,9.14 L 0,11.70',
    stroke: 'rgba(196,158,88,0.28)',   sw: 0.32, delay: 2.08, dur: 0.50, len: 6,  layer: 1 },
  { d: 'M 4,9.14 L 7.84,11.70',
    stroke: 'rgba(196,158,88,0.28)',   sw: 0.32, delay: 2.10, dur: 0.50, len: 6,  layer: 1 },
  // Outer arch — logo form completes ─────────────────────────────────────────
  { d: 'M -3.04,6.90 C -3.04,-6.38 11.04,-6.38 11.04,6.90',
    stroke: 'rgba(192,172,232,0.65)', sw: 0.52, delay: 2.18, dur: 1.8,  len: 36, layer: 1 },
]

// ── Expansion rings: same arch family at increasing scales ───────────────────
// Each ring is the outer arch (and optionally arch-2) of the logo at scale s,
// fading in to represent scent diffusion / resonance propagation outward.
type FadePath = { d: string; stroke: string; sw: number; delay: number; opacity: number; fadeDur: number; layer: 3 | 2 | 1 }

const RINGS: FadePath[] = [
  // s=0.20 — just beyond logo form ──────────────────────────────────────────
  { d: outerArch(0.20), stroke: 'rgba(192,172,232,1)', sw: 0.45, delay: 1.9,  opacity: 0.24, fadeDur: 2.0, layer: 3 },
  { d: arch2(0.20),     stroke: 'rgba(196,158,88,1)',  sw: 0.38, delay: 2.1,  opacity: 0.18, fadeDur: 2.1, layer: 3 },
  // s=0.35 ───────────────────────────────────────────────────────────────────
  { d: outerArch(0.35), stroke: 'rgba(192,172,232,1)', sw: 0.42, delay: 2.7,  opacity: 0.17, fadeDur: 2.3, layer: 2 },
  { d: arch2(0.35),     stroke: 'rgba(196,158,88,1)',  sw: 0.35, delay: 2.9,  opacity: 0.12, fadeDur: 2.4, layer: 2 },
  // s=0.55 ───────────────────────────────────────────────────────────────────
  { d: outerArch(0.55), stroke: 'rgba(192,172,232,1)', sw: 0.38, delay: 3.5,  opacity: 0.12, fadeDur: 2.6, layer: 2 },
  { d: arch2(0.55),     stroke: 'rgba(196,158,88,1)',  sw: 0.32, delay: 3.7,  opacity: 0.08, fadeDur: 2.7, layer: 2 },
  // s=0.85 ───────────────────────────────────────────────────────────────────
  { d: outerArch(0.85), stroke: 'rgba(196,158,88,1)',  sw: 0.34, delay: 4.4,  opacity: 0.075,fadeDur: 2.9, layer: 1 },
  // s=1.3 ────────────────────────────────────────────────────────────────────
  { d: outerArch(1.30), stroke: 'rgba(192,172,232,1)', sw: 0.30, delay: 5.4,  opacity: 0.048,fadeDur: 3.2, layer: 1 },
  // s=2.0 ────────────────────────────────────────────────────────────────────
  { d: outerArch(2.00), stroke: 'rgba(196,158,88,1)',  sw: 0.26, delay: 6.5,  opacity: 0.026,fadeDur: 3.5, layer: 1 },
]

// CSS px movement per layer for mouse parallax (very restrained)
const PX: Record<number, number> = { 3: 4.5, 2: 2.5, 1: 1.0 }

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mtRef = useRef({ x: 0, y: 0 })
  const mlRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [ready, setReady] = useState(false)
  const [burstKey, setBurstKey] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [coarsePointer, setCoarsePointer] = useState(false)
  const [mobileViewport, setMobileViewport] = useState(false)

  const lerpLoop = useCallback(() => {
    const lx = mlRef.current.x, ly = mlRef.current.y
    const tx = mtRef.current.x, ty = mtRef.current.y
    const nx = lx + (tx - lx) * 0.055
    const ny = ly + (ty - ly) * 0.055
    if (Math.abs(nx - lx) > 0.0003 || Math.abs(ny - ly) > 0.0003) {
      mlRef.current = { x: nx, y: ny }
      setMouse({ x: nx, y: ny })
    }
    rafRef.current = requestAnimationFrame(lerpLoop)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(lerpLoop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [lerpLoop])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = sectionRef.current?.getBoundingClientRect()
    if (!r) return
    mtRef.current = {
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    }
  }, [])

  useEffect(() => {
    let tick = false
    const onScroll = () => {
      if (!tick) {
        requestAnimationFrame(() => { setScrollY(window.scrollY); tick = false })
        tick = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)')
    const mobile = window.matchMedia('(max-width: 768px)')
    const update = () => {
      setReducedMotion(reduced.matches)
      setCoarsePointer(coarse.matches)
      setMobileViewport(mobile.matches)
    }
    update()
    reduced.addEventListener?.('change', update)
    coarse.addEventListener?.('change', update)
    mobile.addEventListener?.('change', update)
    return () => {
      reduced.removeEventListener?.('change', update)
      coarse.removeEventListener?.('change', update)
      mobile.removeEventListener?.('change', update)
    }
  }, [])

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 80)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!ready || reducedMotion || !coarsePointer) return
    const id = setTimeout(() => setBurstKey(k => k + 1), 1550)
    return () => clearTimeout(id)
  }, [ready, reducedMotion, coarsePointer])

  const triggerScentBurst = () => {
    if (!reducedMotion && !coarsePointer) setBurstKey(k => k + 1)
  }

  const photoParallax = reducedMotion ? 0 : scrollY * 0.16
  const contentLift = reducedMotion ? 0 : scrollY * 0.055
  const scrollFade = Math.max(0, 1 - scrollY / 520)

  const burstParticles = [
    { x: 8, y: 18, tx: -32, ty: -44, d: 0.00, t: 1.85, s: 3.2, c: '#d9b66e' },
    { x: 18, y: 70, tx: -42, ty: 24, d: 0.06, t: 2.15, s: 2.2, c: '#efd8a5' },
    { x: 28, y: 42, tx: -12, ty: -58, d: 0.11, t: 1.95, s: 2.8, c: '#f0e7da' },
    { x: 39, y: 12, tx: 10, ty: -50, d: 0.02, t: 2.25, s: 2.0, c: '#d9b66e' },
    { x: 46, y: 78, tx: -5, ty: 42, d: 0.14, t: 2.05, s: 3.0, c: '#c9a465' },
    { x: 55, y: 37, tx: 15, ty: -64, d: 0.08, t: 2.30, s: 2.1, c: '#c8b5ec' },
    { x: 63, y: 17, tx: 28, ty: -42, d: 0.18, t: 1.90, s: 3.4, c: '#e5c37a' },
    { x: 72, y: 72, tx: 32, ty: 28, d: 0.04, t: 2.25, s: 2.2, c: '#d8a7ad' },
    { x: 82, y: 46, tx: 48, ty: -22, d: 0.12, t: 2.00, s: 2.7, c: '#d4ae68' },
    { x: 91, y: 23, tx: 38, ty: -48, d: 0.20, t: 2.35, s: 2.0, c: '#efd8a5' },
    { x: 14, y: 46, tx: -54, ty: -8, d: 0.22, t: 1.95, s: 1.8, c: '#e8d8c6' },
    { x: 33, y: 88, tx: -24, ty: 38, d: 0.09, t: 2.10, s: 2.0, c: '#d9b66e' },
    { x: 50, y: 55, tx: 0, ty: -72, d: 0.16, t: 2.40, s: 1.8, c: '#f0e7da' },
    { x: 68, y: 91, tx: 18, ty: 36, d: 0.24, t: 2.10, s: 2.4, c: '#d4ae68' },
    { x: 87, y: 62, tx: 52, ty: 8, d: 0.07, t: 2.20, s: 2.0, c: '#c8b5ec' },
    { x: 96, y: 52, tx: 50, ty: -12, d: 0.15, t: 1.90, s: 2.8, c: '#e5c37a' },
  ]

  const idleParticles = [
    { x: 22, y: 24, t: 7.8, d: 0.4, c: '#d9b66e' },
    { x: 48, y: 8, t: 9.4, d: 2.1, c: '#efd8a5' },
    { x: 70, y: 76, t: 8.6, d: 1.3, c: '#c8b5ec' },
    { x: 92, y: 32, t: 10.2, d: 3.4, c: '#d4ae68' },
  ]

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { mtRef.current = { x: 0, y: 0 } }}
      style={{ position: 'relative', height: '100svh', minHeight: '640px', overflow: 'hidden', background: '#100820' }}
    >
      <img
        src={groupPhoto}
        alt="Essentia Resonance olfactory atelier session"
        className="hero-background-photo"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: mobileViewport ? '76% center' : 'center center',
          transform: `translateY(${photoParallax}px) scale(${mobileViewport ? 1.04 : 1.10})`,
          transformOrigin: mobileViewport ? '76% top' : 'center top',
          filter: 'brightness(0.64) saturate(0.86) sepia(0.04)',
          opacity: ready ? 1 : 0,
          transitionProperty: 'transform, opacity, filter, object-position',
          transitionDuration: reducedMotion ? '0s' : '0.05s, 2s, 0.05s, 0.4s',
          transitionDelay: reducedMotion ? '0s' : '0s, 0.2s, 0s, 0s',
          willChange: reducedMotion ? 'auto' : 'transform',
        }}
      />

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 18% 72%, rgba(201,164,101,0.10) 0%, rgba(201,164,101,0.025) 24%, transparent 42%), linear-gradient(158deg, rgba(58,28,110,0.40) 0%, rgba(14,7,30,0.52) 54%, rgba(8,4,18,0.73) 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '42%', pointerEvents: 'none',
        background: 'linear-gradient(0deg, rgba(8,4,18,0.88) 0%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '110px', pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(14,7,30,0.55) 0%, transparent 100%)',
      }} />

      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="xMinYMin slice"
        aria-hidden="true"
        className="hero-resonance-svg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}
      >
        {([3, 2, 1] as const).map(layer => (
          <g
            key={`draw-${layer}`}
            style={{
              transform: reducedMotion ? 'none' : `translate(${mouse.x * PX[layer]}px, ${mouse.y * PX[layer] * 0.6}px)`,
              transition: 'transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
          >
            {DRAW.filter(p => p.layer === layer).map((p, i) => (
              <path
                key={i} d={p.d} fill="none"
                stroke={p.stroke} strokeWidth={p.sw} strokeLinecap="round"
                style={{
                  strokeDasharray: p.len,
                  strokeDashoffset: ready || reducedMotion ? 0 : p.len,
                  opacity: ready || reducedMotion ? 0.82 : 0,
                  transitionProperty: 'stroke-dashoffset, opacity',
                  transitionDuration: reducedMotion ? '0s' : `${p.dur}s, 0.35s`,
                  transitionDelay: reducedMotion ? '0s' : `${p.delay}s, ${p.delay}s`,
                  transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1), ease',
                }}
              />
            ))}
          </g>
        ))}

        {([3, 2, 1] as const).map(layer => (
          <g
            key={`ring-${layer}`}
            style={{
              transform: reducedMotion ? 'none' : `translate(${mouse.x * PX[layer] * 0.6}px, ${mouse.y * PX[layer] * 0.35}px)`,
              transition: 'transform 1.6s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
          >
            {RINGS.filter(r => r.layer === layer).map((r, i) => (
              <path
                key={i} d={r.d} fill="none"
                stroke={r.stroke} strokeWidth={r.sw} strokeLinecap="round"
                style={{
                  opacity: ready || reducedMotion ? r.opacity * 0.95 : 0,
                  transition: reducedMotion ? 'none' : `opacity ${r.fadeDur}s ease ${r.delay}s`,
                }}
              />
            ))}
          </g>
        ))}
      </svg>

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 'clamp(96px,14vh,140px) clamp(28px,6vw,80px) clamp(64px,9vh,94px)',
        transform: `translateY(-${contentLift}px)`,
        transition: reducedMotion ? 'none' : 'transform 0.05s linear',
        opacity: scrollFade,
      }}>
        <div className="hero-eyebrow" style={{
          opacity: ready ? 1 : 0,
          transform: ready ? 'translateY(0)' : 'translateY(16px)',
          transition: reducedMotion ? 'none' : 'opacity 0.9s ease 0.75s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.75s',
        }}>
          <span>Independent Olfactory Atelier</span>
          <span className="hero-eyebrow-separator">·</span>
          <span className="hero-eyebrow-gold">Est. 2019</span>
        </div>

        <div
          className="hero-title-wrap"
          onMouseEnter={triggerScentBurst}
          style={{ maxWidth: '790px', position: 'relative', width: 'fit-content' }}
        >
          <h1 className="hero-material-memory-title" style={{
            opacity: ready ? 1 : 0,
            transform: ready ? 'translateY(0)' : 'translateY(28px)',
            transition: reducedMotion ? 'none' : 'opacity 1.1s cubic-bezier(0.16,1,0.3,1) 0.96s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.96s',
          }}>
            <span className="hero-title-main">Between Material</span>
            <span className="hero-title-script-row">
              <span className="hero-title-and">and</span>
              <span className="hero-title-memory">
                Memory
                {!reducedMotion && idleParticles.map((p, i) => (
                  <span
                    key={`idle-${i}`}
                    aria-hidden="true"
                    className="hero-scent-idle"
                    style={{
                      '--x': `${p.x}%`, '--y': `${p.y}%`, '--duration': `${p.t}s`, '--delay': `${p.d}s`, '--particle-color': p.c,
                    } as React.CSSProperties}
                  />
                ))}
                {burstKey > 0 && !reducedMotion && (
                  <span key={burstKey} className="hero-scent-burst" aria-hidden="true">
                    {burstParticles.map((p, i) => (
                      <span
                        key={i}
                        className="hero-scent-particle"
                        style={{
                          '--x': `${p.x}%`, '--y': `${p.y}%`, '--tx': `${p.tx}px`, '--ty': `${p.ty}px`,
                          '--delay': `${p.d}s`, '--duration': `${p.t}s`, '--size': `${p.s}px`, '--particle-color': p.c,
                        } as React.CSSProperties}
                      />
                    ))}
                  </span>
                )}
              </span>
            </span>
          </h1>
        </div>

        <p className="hero-primary-copy" style={{
          fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(1.02rem, 1.5vw, 1.28rem)', lineHeight: 1.55,
          color: 'rgba(232,224,246,0.76)', margin: '22px 0 12px 0', maxWidth: '620px',
          opacity: ready ? 1 : 0,
          transform: ready ? 'translateY(0)' : 'translateY(18px)',
          transition: reducedMotion ? 'none' : 'opacity 1.1s cubic-bezier(0.16,1,0.3,1) 1.18s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 1.18s',
        }}>
          <span className="hero-copy-desktop">From the moment a scent leaves its material and enters the air to the moment it becomes emotion or memory, a whole story exists in between.</span>
          <span className="hero-copy-mobile">From the moment a scent leaves its material to the moment it becomes memory or emotion, a whole story exists in between.</span>
        </p>

        <p className="hero-secondary-copy" style={{
          fontFamily: "'Fraunces', Georgia, serif", fontWeight: 320,
          fontSize: 'clamp(0.88rem, 1.08vw, 1rem)', lineHeight: 1.68,
          margin: '1px 0 26px 0', maxWidth: '560px',
          opacity: ready ? 1 : 0,
          transform: ready ? 'translateY(0)' : 'translateY(18px)',
          transition: reducedMotion ? 'none' : 'opacity 1.1s cubic-bezier(0.16,1,0.3,1) 1.34s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 1.34s',
        }}>
          <span className="hero-secondary-desktop hero-secondary-emphasis">That space is where I create — between what a material is, and what it can awaken in us.</span>
        </p>

        <a
          href="#philosophy"
          className="hero-explore-link"
          style={{ opacity: ready ? 1 : 0, transitionDelay: reducedMotion ? '0s' : '1.5s' }}
        >
          Explore <span aria-hidden="true">↓</span>
        </a>
      </div>

      <div className="hero-scroll-indicator" style={{
        position: 'absolute', bottom: '34px', right: '38px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        opacity: ready ? Math.max(0, 1 - scrollY / 170) : 0,
        transition: 'opacity 0.2s', pointerEvents: 'none',
      }}>
        <div style={{ width: '1px', height: '36px', background: 'linear-gradient(180deg, rgba(192,172,232,0.44), transparent)' }} />
        <span style={{ fontFamily: "'DM Sans'", fontSize: '0.50rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(192,172,232,0.32)' }}>Scroll</span>
      </div>
    </section>
  )
}
