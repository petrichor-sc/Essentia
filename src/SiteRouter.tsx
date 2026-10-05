import { useEffect, useState } from 'react'
import App from './App'
import WorkshopGalleries from './WorkshopGalleries'
import { ALBUMS, GALLERIES_ROUTE } from './galleries/albums'

// Hash routes work with GitHub Pages and retain the existing home section links.
export default function SiteRouter() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const update = () => setHash(window.location.hash)
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])
  const route = hash.replace(/\/$/, '')
  const album = ALBUMS.find(item => item.route === route)
  const isGallery = route === GALLERIES_ROUTE || !!album
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (isGallery) window.scrollTo({ top: 0, behavior: 'instant' })
      else {
        const id = hash.slice(1) || 'hero'
        const section = document.getElementById(id)
        if (section) section.scrollIntoView({ behavior: 'instant' })
        else window.scrollTo({ top: 0, behavior: 'instant' })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [hash, isGallery])
  return isGallery ? <WorkshopGalleries key={route} albumId={album?.id} /> : <App />
}
