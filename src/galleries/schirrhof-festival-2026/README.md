# Schirrhof-Festival 2026 photos

Drop the Summer Perfume-Making Atelier photos directly into THIS folder, commit,
and push using your normal website deployment. No code or photo list needs editing.

- Supported: .jpg, .jpeg, .png, .webp and .avif (upper-case extensions also work).
- Photos are sorted naturally by filename: 1.jpg, 2.jpg, …, 90.jpg.
- For the cover, name your selected image `cover.jpg` (or cover.webp, etc.).
  It appears first in the gallery too. Otherwise the first sorted image is the cover.
- Use web-sized exports, ideally around 1600–2000 px on the long edge, to keep
  the gallery fast on mobile. The grid loads images lazily.
- Optional: add descriptions in ../photo-descriptions.json, keyed by exact filename.
  For example: { "cover.jpg": "Sarthak introducing the summer perfume atelier" }.
  Without a description, the gallery uses a neutral event-and-photo-number label.
- Rebuild after adding/removing photos (`pnpm build`). Vite discovers photos at
  build time; uploading photos to a running built site alone does not update it.

Gallery link after deployment:
https://www.essentiaresonance.com/#/workshop-galleries/schirrhof-festival-2026

The # route supports GitHub Pages direct links and refreshes without server rewrites.

Event details verified from the organiser:
https://kulturprojekte-niederrhein.de/events/2026-schirrhof-festival
Schirrhof-Festival, 22–23 August 2026; perfume workshop 23 August, 13:00.
Schirrhof, Friedrich-Heinrich-Allee 79, 47475 Kamp-Lintfort.
