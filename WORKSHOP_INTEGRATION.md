# Essentia Scent Studio — enchanted-street-r18

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
git add public/workshop src/App.tsx src/WorkshopMenu.tsx public/atlas/index.html WORKSHOP_INTEGRATION.md tools/retarget-workshop-motion.mjs tools/check-workshop-arms.mjs
git commit -m "Correct forearm bends and add dense magical jasmine"
git push
```

The script copies `public/workshop/`, the existing navigation changes and this guide. It retains your Git history, working photos/fonts and deployment setup. Use the integration script rather than replacing your working repository with the snapshot. No Python launcher is needed; the studio is served by your website at `/workshop/`.

## Four workshop chapters

1. **How we smell.** The café street and walk/reach/sniff sequence lead into the purple anatomy bust, sensory cells, travelling neural signals and an imagined childhood jasmine memory.
2. **Scent & memory.** The existing emotion and memory exploration, with today’s eleven materials in the note selector.
3. **A perfume’s character.** Projection, sillage, longevity and concentration. The scene begins without fragrance; choosing an application area triggers the spray gesture before particles begin. Sparse emissions and the stronger winter/summer contrast remain. The longevity close-up uses an intact hand and wrist.
4. **Today’s palette.** Three manually selected views: **Globe**, **Body & mind**, and **Note triangle**. Direct entry: `/workshop/#palette/globe`, `/workshop/#palette/body`, `/workshop/#palette/triangle`.

### Today’s palette

`palette-view.js` reuses the website’s `public/atlas/globe.js` renderer and `core.js` topic definitions. The workshop has its own source layer: eleven materials at ten approximate regional reference points. Cardamom and rose geranium share the Munnar reference. The source menu supports locations that lie close together on the globe. Selecting a pin, region or note updates the workshop material card. No wider catalogue items enter the workshop list.

The body view uses the same conceptual Atlas figure. Topic buttons filter only the eleven workshop materials against the existing Atlas study profiles. Notes without appraised connections remain available through “Show all 11”. Existing evidence, limitations and source links can be opened in the material card; records do not establish benefits for the workshop’s specific bottles.

The interactive triangle contains every material once: two in Top, six in Middle/heart and three in Base. The four opening-to-heart materials have an asterisk and an explicit Top → middle label when selected. Positions are qualitative and overlapping. A triangle selection updates the same material card.

The standalone palette list below the studio has moved into chapter 04. Reflection and memory note selectors still use the same canonical data. The broader Atlas catalogue and its native-range records are retained.

### Realistic visitor, clothes and motion

The adult visitor retains the supplied LudoVisions FC1 face and hair geometry. Her outfit is now a modest cream knit top with fitted long sleeves, an A-line chocolate-brown skirt, dark tights and knee-high brown boots. The garments use FC1's bind mesh and skeleton. Covered skin is omitted to prevent skin showing through the clothes. The old black dress and accessories are removed.

The supplied Motifect `walk_forward` and `idle_neutral` clips now drive 53 retargeted joints. Walking cadence follows distance travelled along the street, with interpolation into the idle pose. The two loops are closed to avoid an end-to-start snap. A hand-clearance adjustment keeps the relaxed wrists outside the hips, and the reaching hand follows an outward arc. Shoe-sole grounding preserves contact with the pavement. The sniffing gesture reaches below the flower so the hand does not cover the face.

The hair cards now use alpha cutout and depth writing instead of overlapping transparent layers. The character keeps her own hair, with fuller coverage in model checks. The large central foreground conifer at (0, 13) has been removed; the other perimeter trees and café plants remain.

`locomotion.js` loads the retargeted tracks in `assets/visitor-motion.json`. To rebuild those tracks from the supplied pack, extract its BVH folder and run `node tools/retarget-workshop-motion.mjs /path/to/BVH`. The original Motifect credit and license text is included in `assets/MOTION_CREDITS.txt`; raw animation files are not bundled as a standalone pack.

The original 195 MB character upload is reduced to about 66 MB with 1K embedded textures. The younger memory visitor keeps its separate original asset and modest outfit. Speaker notes remain at the bottom of this guide.

### Dense jasmine and magical street

The pole now carries exactly 10,620 leaves and 4,530 jasmine flowers: ten times the previous totals. The blossoms remain approximately 2 cm wide and grow in 646 clusters. Nine climbing canes and denser shoots wrap the pole; a small clear space remains at the sniffing flower. The younger memory garden keeps its original plant density.

Curved leaf and petal surfaces are instanced, with stems batched into one mesh. The vine uses four draw calls and about 600,000 triangles despite the increased density. Every flower has a scent particle source; opacity is reduced to keep the cloud readable. The street has a peach and lavender sky, warmer café windows and gently drifting light motes.

### Forearms and sillage

The previous hand-clearance solver used a fixed forward elbow pole. This could reverse the natural elbow bend in the source animation. The solver now preserves the animated elbow bend plane and uses a backward anatomical fallback near a straight arm. This changes the arm from the elbow through the hand, rather than twisting only the wrist.

Sillage cadence now accounts for the character's enlarged scale. Movement speed is derived from the animation's stride, and the loop has gentler corners and smooth heading changes. The same corrected forearm solver is used for the street, sillage and spray gestures.

## Verification

- Production build, workshop JavaScript syntax and relative imports passed.
- `node tools/check-workshop-arms.mjs` checks 720 idle and walking forearm samples for an elbow reversal. The fixed solver retained the original bend direction; the largest sampled forearm adjustment was below 16 degrees. The old fixed-pole solver fails this test.
- A further 600-frame check exercises the actual sillage scene update, including scale-aware stride timing, smooth turns and both elbow bend directions.
- The 120-pose street grounding and sniff-gap checks passed. Neck, wrist and forearm spray gestures remain functional, with no fragrance before application.
- Plant counts, clustered flowers, finite particle positions, all-flower scent coverage and reduced memory-garden density were checked. The vine and corrected arm poses were inspected using CPU model projections.

These are geometry and motion checks; no browser or GPU appearance testing, publishing or Git push was performed. Runtime URLs use `enchanted-street-r18`.

## This workshop's material palette

The workshop now has one canonical list in `public/workshop/palette.js`. It appears in chapter 04, in the scent-and-memory dropdown and in the autumn reflection card. The list is grouped from the opening toward the base:

| Position | Material | Stated source |
| --- | --- | --- |
| Top | Grapefruit | Sicily, Italy — Sunday Natural |
| Top | Bergamot FCF | Calabria, Italy — Sunday Natural |
| Top/heart | Elemi Heart | Philippines — Sunday Natural |
| Top/heart | Lavender | France |
| Top/heart | Rosewood | Brazil |
| Top/heart | Cardamom | Munnar Hills, Kerala, India |
| Heart | Rose geranium | Munnar, Kerala, India |
| Heart | Jasmine sambac | Kannauj, India |
| Base | Himalayan cedarwood | Himalayas |
| Base | Sandalwood | Mysore, India |
| Base | Vanilla | Madagascar |

This is a qualitative workshop arrangement with overlapping roles, not a measured sequence of evaporation constants. The within-group order is flexible. Cardamom has a fresh opening and a tenacious heart. Elemi Heart's position is provisional for the actual fraction. Jasmine and vanilla preparations and dilutions have not been specified. Rosewood's country is confirmed by the facilitator; botanical identity/plant part still need a bottle label before making species-specific claims.

Spelling assumptions: “Manar Hill / Manar, Kerala” is interpreted as Munnar, Kerala. The spoken bergamot “BCP/BCS free” is matched provisionally to Sunday Natural's bergapten-free/FCF product. These assumptions are recorded in the data's `originBasis` fields so they can be corrected without changing other catalogue records. The botanical atlas retains its own native-range and supplier-catalogue information; the workshop's stated material sources are presented separately. All eleven atlas links resolve the appropriate material in the complete collection.

Verified Sunday Natural listings:
- Elemi Heart: https://www.sunday.de/elemioel-heart-canarium-luzonicum-philippinen.html
- Bergamot FCF: https://www.sunday.de/bergamotteoel-citrus-bergamia-bergaptenfrei-bio-italien.html
- Grapefruit: https://www.sunday.de/grapefruitol-bio.html

Position references, describing example preparations rather than confirming the facilitator's bottles:
- Cardamom: https://www.edenbotanicals.com/cardamom-organic.html
- Lavender EO: https://www.edenbotanicals.com/lavender-high-elevation.html
- Jasmine sambac absolute: https://www.edenbotanicals.com/jasmine-sambac-absolute.html
- Himalayan cedarwood: https://www.edenbotanicals.com/cedarwood-himalayan.html
- Vanilla absolute: https://www.edenbotanicals.com/vanilla-absolute.html


## Speaker notes — how we smell

Within just a few seconds of encountering a scent, it can stir an emotion, bring back a memory and spark a thought. A remarkable amount happens inside the body during that brief moment.

Pause here, then follow the visual sequence from the jasmine flower to the nose, the travelling neural signal and the memory it evokes.
