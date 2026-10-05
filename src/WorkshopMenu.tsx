import { useEffect, useId, useRef, useState } from 'react'

export default function WorkshopMenu({ buttonStyle = false }: { buttonStyle?: boolean }) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  return (
    <div className="workshop-menu" ref={root}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}
      onKeyDown={event => {
        if (event.key === 'Escape') { setOpen(false); trigger.current?.focus() }
      }}>
      <button ref={trigger} className={buttonStyle ? 'cta-btn' : 'nav-link workshop-menu-trigger'}
        aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span>Workshops <span aria-hidden="true">⌄</span></span>
      </button>
      {open && <div id={id} className="workshop-menu-panel">
        <a href="#workshops" onClick={() => setOpen(false)}>About the workshops</a>
        <a href="#/workshop-galleries" onClick={() => setOpen(false)}>Workshop Galleries <span aria-hidden="true">↗</span></a>
      </div>}
    </div>
  )
}
