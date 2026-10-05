import { atelier2025Photos, festivalPhotos, summerPhotos } from './photos'

export const GALLERIES_ROUTE = '#/workshop-galleries'
export const FESTIVAL_ROUTE = `${GALLERIES_ROUTE}/schirrhof-festival-2026`

export const ALBUMS = [
  {
    id: 'schirrhof-festival-2026', route: FESTIVAL_ROUTE,
    title: 'Schirrhof-Festival 2026', titleLead: 'Summer Perfume-', titleEmphasis: 'Making Atelier',
    date: '23 August 2026', eyebrow: '23 August 2026 · Schirrhof, Kamp-Lintfort',
    location: 'Schirrhof · Kamp-Lintfort', subtitle: 'Summer Perfume-Making Atelier',
    venue: 'Schirrhof, Kamp-Lintfort',
    theme: 'Discovering scent and creating a personal perfume',
    description: 'A summer afternoon of scent, conversation and personal creations. Explore moments from the Essentia Resonance perfume atelier at the Schirrhof.',
    caption: 'Essentia Resonance · Summer 2026', photos: festivalPhotos, coverFilename: '2026_Hofefestival_079.jpg',
    credits: 'Perfume atelier by Essentia Resonance. With thanks to Kulturprojekte Niederrhein e.V., Schirrhof and AStA HSRW.',
    officialEvent: 'https://kulturprojekte-niederrhein.de/events/2026-schirrhof-festival',
  },
  {
    id: 'summer-perfume-atelier-2026', route: `${GALLERIES_ROUTE}/summer-perfume-atelier-2026`,
    title: 'Summer Perfume Atelier 2026', titleLead: 'Summer Perfume', titleEmphasis: 'Atelier 2026',
    date: '28 May 2026', eyebrow: '28 May 2026 · Hochschule Rhein-Waal',
    location: 'Hochschule Rhein-Waal', subtitle: 'Exploring notes. Creating personal perfumes.',
    venue: 'Hochschule Rhein-Waal',
    theme: 'Exploring aromatic notes and blending personal perfumes',
    description: 'Our Summer Perfume Atelier 2026 was held at Hochschule Rhein-Waal in collaboration with AStA. Discover moments of exploring aromatic notes, blending individual compositions and sharing the joy of creating a personal perfume.',
    caption: 'Essentia Resonance · Summer Perfume Atelier 2026', photos: summerPhotos, coverFilename: '2.jpg',
    credits: 'Organised by Essentia Resonance in collaboration with AStA at Hochschule Rhein-Waal. With thanks to everyone who joined our Summer Perfume Atelier 2026 and shared an afternoon of discovery and creation.',
    officialEvent: '',
  },
  {
    id: 'perfume-atelier-2025', route: `${GALLERIES_ROUTE}/perfume-atelier-2025`,
    title: 'Perfume Atelier 2025', titleLead: 'Perfume', titleEmphasis: 'Atelier 2025',
    date: '24 September 2025', eyebrow: '24 September 2025 · Hochschule Rhein-Waal',
    location: 'Hochschule Rhein-Waal', subtitle: 'A workshop in scent and personal expression.',
    venue: 'Hochschule Rhein-Waal',
    theme: 'Discovering perfume notes and personal expression through scent',
    description: 'Our 2025 perfume atelier was held at Hochschule Rhein-Waal in collaboration with AStA. Revisit a shared experience of scent, curiosity and creativity, from discovering the character of individual notes to composing personal blends.',
    caption: 'Essentia Resonance · Perfume Atelier 2025', photos: atelier2025Photos, coverFilename: '09242025_Perfume_055_1.jpg',
    credits: 'Organised by Essentia Resonance in collaboration with AStA at Hochschule Rhein-Waal. With thanks to everyone who took part in our 2025 perfume atelier and brought their curiosity and personal scent stories to the workshop.',
    officialEvent: '',
  },
]
