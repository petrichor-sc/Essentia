import { useEffect, useRef, useState } from 'react'
import logoMark from './imports/Essentia_Logo_2.png'
import { ALBUMS, GALLERIES_ROUTE } from './galleries/albums'
import WorkshopMenu from './WorkshopMenu'
import './workshop-galleries.css'

export { GALLERIES_ROUTE, FESTIVAL_ROUTE } from './galleries/albums'

export default function WorkshopGalleries({ albumId }: { albumId?: string }) {
  const album = ALBUMS.find(item => item.id === albumId)
  const photos = album?.photos || []
  const coverIndex = Math.max(0, photos.findIndex(photo => photo.filename === album?.coverFilename))
  const cover = photos[coverIndex]
  const [selected, setSelected] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const hasSelection = selected !== null

  useEffect(() => {
    const previousTitle = document.title
    document.title = `${album?.title || 'Workshop Galleries'} | Essentia Resonance`
    heading.current?.focus({ preventScroll: true })
    return () => { document.title = previousTitle }
  }, [album])

  useEffect(() => {
    if (!hasSelection) return
    const modal = dialog.current
    const previousOverflow = document.body.style.overflow
    modal?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      modal?.close()
      document.body.style.overflow = previousOverflow
    }
  }, [hasSelection])

  const move = (step: number) => setSelected(current => current === null ? null : (current + step + photos.length) % photos.length)

  return (
    <div className="gallery-site">
      <header className="gallery-header">
        <a href="#hero" className="gallery-brand" aria-label="Essentia Resonance home">
          <img src={logoMark} alt="" />
          <span>Essentia<em>Resonance</em></span>
        </a>
        <nav aria-label="Gallery navigation"><WorkshopMenu /><a href="#enquire">Enquire</a></nav>
      </header>
      <main id="gallery-main">
        <nav className="gallery-breadcrumb" aria-label="Breadcrumb">
          <a href="#hero">Home</a><span aria-hidden="true">/</span>
          {album ? <><a href={GALLERIES_ROUTE}>Workshop Galleries</a><span aria-hidden="true">/</span><span aria-current="page">{album.title}</span></> : <span aria-current="page">Workshop Galleries</span>}
        </nav>

        {album ? <>
          <section className="gallery-intro">
            <p className="gallery-eyebrow">{album.eyebrow}</p>
            <h1 ref={heading} tabIndex={-1}>{album.titleLead}<br /><em>{album.titleEmphasis}</em></h1>
            <p className="gallery-event-name">{album.title}</p>
            <p className="gallery-lead">{album.description}</p>
            <a className="gallery-text-link" href={GALLERIES_ROUTE}>← All workshop galleries</a>
          </section>
          {cover && <figure className="gallery-hero-photo">
            <button aria-label="Enlarge cover photo" onClick={() => setSelected(coverIndex)}><img src={cover.src} alt={cover.alt} fetchPriority="high" /></button>
            <figcaption>{album.caption}</figcaption>
          </figure>}
          <section className="gallery-collection" aria-labelledby="collection-title">
            <div className="gallery-section-heading"><h2 id="collection-title">Moments from the atelier</h2>{photos.length > 0 && <span>{photos.length} photographs · Click to explore</span>}</div>
            {photos.length ? <div className="gallery-photo-grid">
              {photos.map((photo, index) => <button className="gallery-photo" key={photo.filename} onClick={() => setSelected(index)} aria-label={`Enlarge photo ${index + 1}: ${photo.alt}`}>
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')} <span>↗</span></span>
              </button>)}
            </div> : <div className="gallery-empty"><span className="gallery-eyebrow">The memories are on their way</span><h3>Photos coming soon</h3><p>Our summer atelier gallery will be here soon. Thank you to everyone who joined us.</p></div>}
          </section>
          <aside className="gallery-credits">
            <p className="gallery-eyebrow">A shared summer experience</p>
            <p>{album.credits}</p>
            {album.officialEvent && <a href={album.officialEvent} target="_blank" rel="noreferrer" className="gallery-text-link">Explore the festival programme ↗</a>}
          </aside>
        </> : <>
          <section className="gallery-intro">
            <p className="gallery-eyebrow">Essentia Resonance · Shared experiences</p>
            <h1 ref={heading} tabIndex={-1}>Workshop <em>Galleries</em></h1>
            <p className="gallery-lead">The people, the process and the perfumes. Revisit our ateliers through the moments we created together.</p>
          </section>
          <section aria-label="Past workshop galleries" className="gallery-events">
            {ALBUMS.map(item => {
              const itemCover = item.photos.find(photo => photo.filename === item.coverFilename) || item.photos[0]
              return <a href={item.route} className="gallery-event-card" key={item.id}>
              <div className="gallery-card-art">
                {itemCover ? <img src={itemCover.src} alt={itemCover.alt} loading="lazy" /> : <div className="gallery-card-placeholder" aria-hidden="true"><img src={logoMark} alt="" /><span>{item.date}</span></div>}
                <span className="gallery-card-badge">{item.date}</span>
              </div>
              <div className="gallery-card-copy"><p className="gallery-eyebrow">{item.location}</p><h2>{item.title}</h2><p>{item.subtitle}</p><span className="gallery-card-cta">{item.photos.length} photographs · Explore the gallery <span aria-hidden="true">↗</span></span></div>
            </a>})}
          </section>
        </>}
        <section className="gallery-invitation"><p className="gallery-eyebrow">Your own scent story</p><h2>Join us at the atelier.</h2><a href="#enquire" className="gallery-button">Enquire about a workshop <span aria-hidden="true">↗</span></a></section>
      </main>
      <footer className="gallery-footer"><span>© {new Date().getFullYear()} Essentia Resonance</span><a href="#hero">Return to the website ↑</a></footer>
      <dialog ref={dialog} className="gallery-lightbox" aria-label="Workshop photograph viewer" onCancel={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null) }} onKeyDown={event => {
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
      }}>
        {selected !== null && photos[selected] && <>
          <div className="gallery-lightbox-toolbar"><span aria-live="polite">{selected + 1} / {photos.length}</span><button autoFocus onClick={() => setSelected(null)} aria-label="Close photograph">Close ×</button></div>
          <div className="gallery-lightbox-image"><img src={photos[selected].src} alt={photos[selected].alt} /></div>
          <div className="gallery-lightbox-controls"><button onClick={() => move(-1)} aria-label="Previous photograph">← Previous</button><a href={photos[selected].src} download={photos[selected].filename}>Download photo ↓</a><button onClick={() => move(1)} aria-label="Next photograph">Next →</button></div>
        </>}
      </dialog>
    </div>
  )
}
