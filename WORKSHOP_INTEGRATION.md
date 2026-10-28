# Essentia Scent Studio — natural-face-r7

## Integrate into your existing Git repo

Extract this ZIP separately from your existing repo. Open a terminal inside the extracted `Essentia-main` folder and run:

```bash
bash INTEGRATE_WORKSHOP.sh /home/sarthak/Documents/GitHub/Essentia
```

Then review and commit from your existing repo:

```bash
cd /home/sarthak/Documents/GitHub/Essentia
git status --short
git diff --stat
git add public/workshop src/App.tsx src/WorkshopMenu.tsx public/atlas/index.html WORKSHOP_INTEGRATION.md
git commit -m "Update scent workshop illustrations and spray interactions"
git push
```

The included script copies the complete `public/workshop/` directory, three navigation files, and this guide. Your existing Git history, working photos/fonts and deployment setup are retained. Use the integration script rather than replacing the entire working repository with the archive's snapshot. No Python launcher is needed; the workshop is served by the existing website at `/workshop/`.

## Current experience

**Breathe.** An opaque full-body visitor walks through the café street toward jasmine climbing the pole. The visitor has no headphones or sunglasses and has a simpler dark hairstyle. The continuous rig, breathing and grounded motion are preserved. A terminal flower cluster sits about 8 cm from the illustrated nose during the sniff; the raised hand supports the cluster from below. Jasmine is modelled with approximately 2 cm blossoms, 20 clusters and 102 flowers, plus smaller pinnate leaflets. Continuous depth-tested particles disperse from every flower; a separate subset moves toward the nose during inhalation. The surrounding sky, clouds, trees and foothills remain.

Botanical proportion reference: RHS, *Jasminum officinale*: https://www.rhs.org.uk/plants/9454/jasminum-officinale/details. The illustration uses common jasmine proportions and does not identify the species in the remembered real-world location.

**Detect.** The opaque purple anatomy bust replaces the small full-body figure. A camera move reveals the connected magnified sensory-neuron view: odour particles approach, cilia glow, neurons fire in a staggered pattern, then activity reaches the bulb and schematic cortical target. Labels remain interactive.

**Signal.** The purple bust stays for anatomical context. Six sensory axons, a bulb and an onward cortical relay replace the isolated spherical lattice. Visible pulses travel along the paths, gather at the bulb and continue onward. The head also carries a travelling highlight. Moving light beyond the receptors represents neural activity.

**Perceive.** A firing pattern spreads through the brain's connected network. An imagined memory gradually appears beside it: the younger visitor approaches jasmine in a warm garden corner. The scene gently recedes and repeats; the page never advances by itself. A Replay this memory button restarts this view. The caption identifies it as an imagined childhood scene, not a claim about any real person's memory.

**Projection, Sillage and Longevity.** The perfume chapter begins with no selected or applied fragrance. Selecting Neck, Wrists or Forearms queues an application gesture with a bottle and a short mist. Body emissions start at actuation, after the hand has risen; Clear fragrance removes the application. The selected application carries between the three comparisons. Sillage still starts walking automatically. The particle cloud is substantially lighter, and the summer/winter contrast in early release and spread is larger. Airflow remains a separate control. Season settings are exaggerated qualitative animation settings, not measured performance or a prediction in metres/hours.

**Skin.** The capped cylinder is replaced by a magnified hand extracted from the same character mesh, with thumb, fingers, palm and wrist. Its forearm fades out toward the edge of the example. Deposits and pores follow actual wrist/palm triangles; the full-body figure and connecting leader provide context. This hand is an illustrative skin example for all application areas. The close-up appears after fragrance has been applied.

The atlas links, autumn activity, reflection card and concentration comparison are retained. No narration is required.

## Validation and review status

- Vite production build, workshop JavaScript syntax and local import paths passed.
- Accessory removal preserves the skeleton, eyes, eyebrows, UVs and skin weights. Modified body geometry has 10,260 vertices; one continuous skinned hair shell follows the head. The optional asset preparation script is `tools/clean_workshop_character.py`; it takes the original bundled Michelle GLB as input and is not part of normal site startup.
- A 240-pose check keeps the soles within 4.3 mm of the pavement. The illustrated sniff gap stays below 8.3 cm.
- A 480-sample check confirms continuous emission from all 102 flowers across two full cycles, without an inhalation.
- The signal pulses move along their paths; all 55 network nodes fire over the cascade; memory reveal/hide and rig matrices remain valid.
- The application check confirms no particles before actuation. A seasonal sample produced approximately 19 winter particles and 64–66 summer particles, below the prior cloud density.
- The magnified hand has 1,422 vertices, five fingers including the thumb, surface-attached samples and a fading proximal forearm. Its geometry was inspected through a local orthographic projection.

No browser testing, GPU shader compilation in a browser, full-scene visual verification or publishing was performed. Module, stylesheet and GLB URLs are versioned together as `natural-face-r7`.


## Face correction

The exposed face now has thin, forehead-fitted eyebrows in place of the source character's large projecting brow bars. The skin shader no longer classifies dark face pixels as hair. Explicit eye and eyebrow surface IDs preserve the eyes' own colour, keep the brows a soft brown and remove the heavy baked eyeliner from the surrounding facial skin. A single closed bob-shaped hair surface replaces the separate cap, open back and tubular side pieces, giving a continuous curved hairline. All previous workshop features are retained.

Front, three-quarter and profile close-ups were inspected through direct local model renders. The 240-pose geometry check still passes: maximum sole deviation 4.3 mm and maximum illustrated sniff gap 8.2 cm. Both eye surfaces (514 vertices) are preserved; the brow height is reduced to about 6.4 mm in model space. No browser or full-scene GPU visual test was performed.
