import descriptions from './photo-descriptions.json'

const files = import.meta.glob<string>(
  './schirrhof-festival-2026/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, query: '?url', import: 'default' },
)
const labels: Record<string, string> = descriptions

export const festivalPhotos = Object.entries(files)
  .sort(([a], [b]) => {
    const aCover = /\/cover\.[^/]+$/i.test(a)
    const bCover = /\/cover\.[^/]+$/i.test(b)
    return Number(bCover) - Number(aCover) || a.localeCompare(b, 'en', { numeric: true })
  })
  .map(([path, src], index) => {
    const filename = path.split('/').pop()!
    return { src, filename, alt: labels[filename] || `Summer Perfume-Making Atelier at Schirrhof-Festival 2026 — photo ${index + 1}` }
  })
