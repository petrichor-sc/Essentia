// Optional captions preserve an existing gallery description file.
const descriptions = import.meta.glob<Record<string, string>>('./photo-descriptions.json', { eager: true, import: 'default' })

const festivalFiles = import.meta.glob<string>(
  './schirrhof-festival-2026/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, query: '?url', import: 'default' },
)
const labels: Record<string, string> = descriptions['./photo-descriptions.json'] || {}

const summerFiles = import.meta.glob<string>(
  './summer-perfume-atelier-2026/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, query: '?url', import: 'default' },
)
const atelier2025Files = import.meta.glob<string>(
  './perfume-atelier-2025/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, query: '?url', import: 'default' },
)

function albumPhotos(files: Record<string, string>, album: string, title: string) {
  return Object.entries(files)
  .sort(([a], [b]) => {
    const aCover = /\/cover\.[^/]+$/i.test(a)
    const bCover = /\/cover\.[^/]+$/i.test(b)
    return Number(bCover) - Number(aCover) || a.localeCompare(b, 'en', { numeric: true })
  })
  .map(([path, src], index) => {
    const filename = path.split('/').pop()!
    return { src, filename, alt: labels[`${album}/${filename}`] || labels[filename] || `${title} — photo ${index + 1}` }
  })
}

export const festivalPhotos = albumPhotos(festivalFiles, 'schirrhof-festival-2026', 'Summer Perfume-Making Atelier at Schirrhof-Festival 2026')
export const summerPhotos = albumPhotos(summerFiles, 'summer-perfume-atelier-2026', 'Summer Perfume Atelier 2026')
export const atelier2025Photos = albumPhotos(atelier2025Files, 'perfume-atelier-2025', 'Perfume Atelier 2025')
