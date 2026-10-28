# Essentia Scent Studio — studio-palette-r11

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
git commit -m "Add today’s palette Atlas, white dress and fuller jasmine"
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

### Visitor and dress

The adult visitor wears a fitted, sleeveless ivory-white satin dress with a scoop neckline, shaped waist, fitted hips and a knee-length skirt, plus low cream flats. The dress is a continuous skinned mesh bound to the same skeleton. The source trousers are reshaped into slim calves beneath it; the original rig, hands, reach and spray gestures remain.

The lower face is softened, the mouth corners have a slight smile, and the skin shader adds subtle rose lips and cheek colour. Forehead-fitted brows, preserved eyes and one continuous dark bob remain. Headphones and sunglasses remain removed. The dress and face are shared by the street visitor and perfume wearer, and the smaller memory illustration retains the same character continuity.

### Fuller jasmine

Three climbing canes now sit outside the pole. Ninety-six leafy shoots form a fuller wrap, with over a thousand leaflets at varied angles, 65 clusters and 453 small flowers. Blossom width stays approximately 2 cm; the hero cluster and sniff target stay in place. Leaves near the hero flower leave a small clear space for the nose and hand.

Stems are batched into one mesh and leaves/petals/centres are instanced. All flowers continue emitting scent. The per-flower particle budget, glow size and opacity are adjusted so the denser plant does not produce a proportional explosion of bright particles.

## Verification

- Production build, all workshop JavaScript syntax and relative module paths passed.
- Four-chapter navigation data, eleven-material filtering, source selection, body-topic filtering and triangle selection passed targeted checks.
- The triangle includes all eleven materials exactly once, in bands of 2 / 6 / 3.
- A 240-pose check keeps the soles within 4.5 mm of the pavement and the illustrated sniff gap below 8.2 cm.
- A 480-frame sample confirms continuous emission from all 453 flowers, including when no inhalation is active.
- Spray tests confirm no cloud before actuation and approximately 18–19 winter particles versus 63 summer particles in the comparison sample.
- Travelling signal pulses, all 55 firing network nodes, finite memory transforms and the intact hand close-up still pass.

Front, three-quarter and profile character projections were inspected through direct CPU model renders. No browser testing, full-scene GPU verification or publishing was performed. The studio and runtime URLs use `studio-palette-r11` to refresh the changed modules and character asset.

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

