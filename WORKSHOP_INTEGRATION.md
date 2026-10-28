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

## Organic interaction and clearer anatomy revision

The jasmine and pole are now in front of the figure rather than next to it. A continuous tapered reaching arm and relaxed hand establish a still sculptural interaction with the flowers. The scanned bust's existing breathing rig and amber anatomy sequence remain. Detect now has a larger head-and-shoulders view on the left with a flower and arriving scent, and enlarged receptor cells on the right with incoming scent, receptor activation and neural pulses. The memory/perception brain is now a single folded cerebral form with a fissure, cerebellum and brainstem, accompanied by a small head for location context. These are simplified teaching sculptures rather than anatomical segmentations.

New module: sculptures.js. Build, syntax, local imports and geometry checks passed. No browser testing was performed.

## Surrounding village and climbing jasmine

Three complete terrain rings now surround the scene, so orbiting reveals mountain ridges in every direction. Jasmine stems wind around the pole, with branching leaves and scattered flowers along their height. Four stylised timber houses and two distant walking villagers add context. The villagers emit faint illustrative scent trails; the jasmine-to-nose pathway retains the main amber emphasis. Background scent dots are conceptual cues, not measured human emissions. New module: village.js. The same integration script copies all modules. No browser testing was performed.

## Opaque head correction

The scanned head and reaching arm now use opaque materials with normal depth writing. Internal region meshes no longer render as solid shapes through the face; the amber glow and accessible anatomy points remain. This also lets the face correctly occlude telephone wires behind it. This ZIP includes the preceding reaching-pose, Detect, brain, 360-degree terrain, climbing-vine and village changes. Production build and syntax checks passed. No browser testing was performed.

## Detect continuity and receptor sequence

Detect now reuses the original opaque breathing bust rather than a separate small head. A staged camera move approaches the nasal sensory area and reveals a clearly labelled magnified view with a location leader. The receptor diagram places the cilia at the nasal lining, cell bodies above them, and axons leading up to the bulb. An 11-second teaching cycle shows arriving odour particles, cilia activation, staggered neuron firing in a new randomized order each cycle, bulb activity and an onward pulse to a schematic cortical target. Timing and neuron selection are illustrative rather than a measured biological response.

Detect annotation cards open on hover, click or focus and describe the nose location, enlargement, cilia, bulb and cortex. The existing breathing and amber anatomical interaction in Breathe are retained. New module: receptors.js. Syntax and production build passed; no browser testing was performed.

## Human scale correction

The village scene now uses the existing continuous full-body human model at approximately 1.7 m equivalent height, comparable to the background walkers. The person stands on the same ground plane, reaches toward the lower jasmine flowers, and breathes with subtle spine deformation. The large scanned bust is hidden in the village and appears only as an explicitly magnified anatomy view in Detect. Anatomy hover points follow the full-body model’s head position. The feet correction now accounts for the actor’s current scale and ground placement.

This cumulative ZIP includes the Detect transition, receptor sequence and interactive labels, the surrounding mountain terrain, climbing jasmine, village, and the preceding opacity fixes. Syntax and production build passed; no browser testing was performed.


## Ground contact, greenery and sniff sequence — grounded-garden-r3

The full-body model is fitted in local space before it is attached to the moving actor. This fixes an asynchronous-loading error that added the street’s ground offset a second time and left the person floating above the cafés. The person, walkers, paving and contact shadow share the street surface; the approach ends beside the jasmine pole.

Seventeen additional trees, including twelve gently swaying cedars, seven low planted beds, eight terracotta pots and café window boxes fill the environment while keeping the approach and flower-to-nose view clear. Leaves and border flowers use instanced geometry.

The sequence walks to the jasmine, reaches, then inhales particles from the selected flower. Light travels into the nasal sensory area, then indicates receptor, bulb and cortical activity. Beyond the receptors, the light represents neural signals. Activity markers follow the head. The anatomy buttons are in a fixed legend visible during inhalation and neural activity; no separate markers float above the street. The camera moves closer during the sniff. HTML, module and CSS versions change together to avoid mixing cached revisions.

Production build, workshop syntax/import checks and 240 ground-contact poses passed. The ground check reproduces model loading after the actor has already moved, and the largest sole deviation through the full cycle is less than 4.2 mm. No browser visual testing or publishing was performed.


## Continuous scent, visitor palette and full backdrop — ambient-sky-r4

Every jasmine flower now emits depth-tested amber 3D particles continuously while the animation runs. A separate inhaled subset approaches the nose during the sniff. Pausing freezes both. No emission filter depends on the breath. The 2D fallback also keeps ambient scent visible. The visual stream is a teaching illustration.

The fictional visitor has warm olive skin, dark brown hair and a muted stone/sage clothing palette. This is a material and texture-shader styling revision to the existing continuous model, preserving its skeleton and grounded motion; it is not a replacement character model. Character materials are cloned separately for the street, anatomy and perfume-character scenes.

A gradient sky dome, soft clouds, three layers of 360-degree foothills and 96 distant trees surround the street. The scene has an opaque sky, daylight lighting and distance haze, removing the transparent dark void. The other anatomy chapters retain the purple-and-gold studio background.

Production build and workshop syntax/import checks passed. A geometry check covers 480 time samples over two complete scene cycles with no inhalation, verifying that all 20 flowers continue to emit, plus a separate check of the inhaled stream and finite atmosphere geometry. No browser testing, shader compilation in a graphics context, visual verification or publishing was performed.
