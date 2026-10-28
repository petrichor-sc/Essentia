// This workshop's stated materials. Origins refer to the facilitator's stock,
// not automatically to the botanical native-range pins in the wider atlas.
export const WORKSHOP_GROUPS=[
 {id:'top',label:'Top',description:'A bright first impression.'},
 {id:'bridge',label:'Top → heart',description:'Aromatic notes connecting the opening and heart.'},
 {id:'heart',label:'Heart',description:'The floral centre of the fragrance.'},
 {id:'base',label:'Base',description:'The quieter, more persistent dry-down.'}
];
export const WORKSHOP_MATERIALS=[
 {id:'grapefruit',atlasId:'sunday-citrus-paradisi',name:'Grapefruit',origin:'Sicily, Italy',originBasis:'Sunday Natural product listing',group:'top',scent:'Juicy citrus, green peel, a gentle bitter edge.',supplierUrl:'https://www.sunday.de/grapefruitol-bio.html'},
 {id:'bergamot',atlasId:'bergamot',name:'Bergamot FCF',origin:'Calabria, Italy',originBasis:'Sunday Natural bergapten-free/FCF product listing; inferred match to spoken BCP/BCS-free',group:'top',scent:'Fresh citrus with a green, softly floral character.',supplierUrl:'https://www.sunday.de/bergamotteoel-citrus-bergamia-bergaptenfrei-bio-italien.html'},
 {id:'elemi-heart',atlasId:'sunday-canarium-luzonicum',name:'Elemi Heart',origin:'Philippines',originBasis:'Sunday Natural Elemi Heart product listing',group:'bridge',scent:'Rosy, peppery and gently resinous.',supplierUrl:'https://www.sunday.de/elemioel-heart-canarium-luzonicum-philippinen.html',positionNote:'Provisional opening-to-heart role for this fraction. Evaluate the actual material on a blotter.'},
 {id:'lavender',atlasId:'sunday-lavandula-angustifolia',name:'Lavender',origin:'France',originBasis:'Facilitator-provided origin',group:'bridge',scent:'Floral, herbaceous and airy.',positionReference:'https://www.edenbotanicals.com/lavender-high-elevation.html'},
 {id:'rosewood',atlasId:'rosewood',name:'Rosewood',origin:'Brazil',originBasis:'Facilitator-provided origin; botanical identity and plant part not yet specified',group:'bridge',scent:'Soft wood with a fresh, floral character.',positionNote:'Provisional top/heart placement; confirm botanical identity and plant part from the bottle.'},
 {id:'cardamom',atlasId:'cardamom',name:'Cardamom',origin:'Munnar Hills, Kerala, India',originAsSpoken:'Manar Hill',originBasis:'Facilitator-provided place; Munnar spelling inferred',group:'bridge',scent:'Fresh, warm spice with a gently woody finish.',positionReference:'https://www.edenbotanicals.com/cardamom-organic.html',positionNote:'Fresh opening with a persistent spicy heart; not a purely fleeting top note.'},
 {id:'rose-geranium',atlasId:'geranium',name:'Rose geranium',origin:'Munnar, Kerala, India',originAsSpoken:'Manar, Kerala',originBasis:'Facilitator-provided place; Munnar spelling inferred',group:'heart',scent:'Rosy floral, green leaves and a fresh lift.'},
 {id:'jasmine-sambac',atlasId:'jasmine',name:'Jasmine sambac',origin:'Kannauj, India',originBasis:'Facilitator-provided material source; extraction/preparation not specified',group:'heart',scent:'Rich white floral, sweet and gently tea-like.',positionReference:'https://www.edenbotanicals.com/jasmine-sambac-absolute.html',positionNote:'Floral heart with a persistent trail. An attar or diluted preparation may develop differently from an absolute.'},
 {id:'cedarwood-himalayan',atlasId:'himalayan-cedar',name:'Himalayan cedarwood',origin:'Himalayas',originBasis:'Facilitator-provided region; country not assigned',group:'base',scent:'Dry wood, warmth and a soft balsamic finish.',positionReference:'https://www.edenbotanicals.com/cedarwood-himalayan.html'},
 {id:'sandalwood-mysore',atlasId:'sandalwood',name:'Sandalwood',origin:'Mysore, India',originBasis:'Facilitator-provided material source',group:'base',scent:'Creamy, smooth and warm wood.'},
 {id:'vanilla',atlasId:'vanilla',name:'Vanilla',origin:'Madagascar',originBasis:'Facilitator-provided origin; extraction/preparation not specified',group:'base',scent:'Warm sweetness with a soft balsamic depth.',positionReference:'https://www.edenbotanicals.com/vanilla-absolute.html'}
];
export const PALETTE_NOTE='These positions overlap. This is a practical smelling order; extraction, dilution and the blend affect how each material develops. The order within a group is flexible.';
export function materialAtlasURL(material){return '../atlas/#plant='+encodeURIComponent(material.atlasId)+'&view=world&collection=all';}

// Approximate regional reference points for the facilitator's stock. These are
// intentionally separate from the Atlas's botanical native-range records.
export const WORKSHOP_LOCATIONS=[
 {id:'today-sicily',label:'Sicily, Italy',latitude:37.6,longitude:14.1,materials:['grapefruit']},
 {id:'today-calabria',label:'Calabria, Italy',latitude:38.9,longitude:16.5,materials:['bergamot']},
 {id:'today-philippines',label:'Philippines',latitude:12.9,longitude:122.0,materials:['elemi-heart']},
 {id:'today-france',label:'France',latitude:46.5,longitude:2.5,materials:['lavender']},
 {id:'today-brazil',label:'Brazil',latitude:-10.8,longitude:-52.9,materials:['rosewood']},
 {id:'today-munnar',label:'Munnar Hills, Kerala, India',latitude:10.1,longitude:77.1,materials:['cardamom','rose-geranium']},
 {id:'today-kannauj',label:'Kannauj, India',latitude:27.1,longitude:79.9,materials:['jasmine-sambac']},
 {id:'today-himalayas',label:'Himalayas · regional reference',latitude:31.0,longitude:79.0,materials:['cedarwood-himalayan']},
 {id:'today-mysore',label:'Mysore, India',latitude:12.3,longitude:76.6,materials:['sandalwood-mysore']},
 {id:'today-madagascar',label:'Madagascar',latitude:-19.0,longitude:46.7,materials:['vanilla']}
];
export const materialLocation=id=>WORKSHOP_LOCATIONS.find(location=>location.materials.includes(id));
export const materialPosition=material=>({top:'Top',bridge:'Top → middle',heart:'Middle (heart)',base:'Base'}[material.group]);
export const TRIANGLE_BANDS=[
 {id:'top',label:'Top',subtitle:'The first impression',materials:WORKSHOP_MATERIALS.filter(m=>m.group==='top')},
 {id:'middle',label:'Middle · heart',subtitle:'The character unfolds',materials:WORKSHOP_MATERIALS.filter(m=>m.group==='bridge'||m.group==='heart')},
 {id:'base',label:'Base',subtitle:'The lasting foundation',materials:WORKSHOP_MATERIALS.filter(m=>m.group==='base')}
];
