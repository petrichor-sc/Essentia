# Essentia workshop integration — 28 October 2026

This is your latest uploaded repository with the workshop connected to the main site.
The latest upload already contained the human model, skin view, application-area controls and autumn activity. This update preserves those files and adds the missing navigation links.

## Recommended: update your existing local Git repository

Keep this extracted folder separate from your existing Git repo. In a terminal inside this extracted folder, run:

    bash INTEGRATE_WORKSHOP.sh /absolute/path/to/your/existing/Essentia-repo

Replace the path with the location of your actual repo. The script copies only public/workshop/, src/App.tsx, src/WorkshopMenu.tsx, public/atlas/index.html and this guide. It leaves your existing .git, images, fonts, package files and deployment workflow alone. It does not commit, push or start a server. Commit any unrelated local edits first; these three source/navigation files are replaced with the versions based on the uploaded snapshot.

Then open a terminal in your existing repo:

    git diff --stat
    git diff -- src/App.tsx src/WorkshopMenu.tsx public/atlas/index.html
    git add public/workshop src/App.tsx src/WorkshopMenu.tsx public/atlas/index.html WORKSHOP_INTEGRATION.md
    git commit -m "Integrate interactive scent workshop into website"
    git push

Use your usual main-branch workflow; the supplied GitHub Pages workflow deploys pushes to main. No Python launcher or new dependency is required.

## Manual alternative

Copy public/workshop/ and the three navigation files listed above into the matching locations in your existing repo. Do not copy the entire snapshot over your working photo/font assets: the uploaded GitHub archive contains Git LFS pointers for many of those originals. Keep your real local assets. Your existing deployment already pulls Git LFS.

## Where to open it

- Direct address: https://www.essentiaresonance.com/workshop/
- Main site's Workshops dropdown → The Scent Studio.
- Mobile menu → The Scent Studio.
- Workshop section → Enter the Scent Studio.
- Atlas navigation → Scent Studio.

## During the workshop

Use Workshop view. Arrow keys move between ideas; Space pauses motion. Sillage starts walking when selected, respecting reduced-motion settings. Choose neck, wrists or forearms to compare application zones. Compare the same total dose spread across zones versus adding at each zone. Longevity includes body/skin views and a qualitative time slider. Concentration examples show different gold fractions in equal-volume bottles.

The autumn activity and optional personal scent card are below the interactive studio. Sharing is optional; scent-card notes are stored locally on the participant's device.

## Checks and limits

Production build and local import/asset checks were performed. No browser testing or live publication was performed, as requested. Please review the live page after GitHub finishes deploying. The scent, dose and skin illustrations are teaching comparisons, not calibrated wear-time predictions or safe-use limits for a perfume formula.

## Jasmine opening scene update

The Breathe step now shows a 3D jasmine shrub, scattered airborne scent particles, and a small fraction approaching the nostril. The solid stream and internal anatomy markers have been removed from this opening view. The later receptor and neural steps remain. The new jasmine.js module is copied by the included merge script. Syntax and production build passed; no browser testing was performed.

## Himachal scene and breathing update

The opening scene is inspired by jasmine growing around an old telephone pole in Himachal Pradesh, with layered Himalayan ridges, snow accents, rocky ground, sagging wires and wild climbing growth. It is an artistic landscape inspired by the supplied memory, not a geographic or botanical identification.

Amber particles disperse along separate, gently varying paths. An eight-second illustrative cycle combines a three-second inhalation, a 3.5-second exhalation and a quiet pause. A three-bone chest/head support rig deforms the scanned bust subtly; a subset of scent particles approaches the nostril during inhalation. Neural regions then glow in sequence. Timing is slowed for teaching, not a measurement of neural processing speed. Airborne amber dots stand for molecules; pulses after the sensory receptors stand for electrical neural activity.

Nose, olfactory sensory neurons, olfactory bulbs and olfactory cortex have projected interaction targets. Hover, keyboard focus or tap opens the description; use Close or Escape to dismiss it. The cortex highlight is a simplified location marker, not full anatomical segmentation.

New code modules are himachal.js and jasmine.js. The included integration script copies these automatically. Production build, local imports, finite geometry and breathing deformation/return-to-rest checks passed. No browser testing was performed.
