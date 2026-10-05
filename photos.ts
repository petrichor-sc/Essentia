export interface BotanicalRegion { id: string; label: string; longitude: number; latitude: number }
export interface BotanicalNote { id: string; name: string; botanicalName: string; tiers: string[]; families: string[]; regionId: string | null; origin: string; originKind: string; context: string; scentProfile: string; sources: { label: string; url: string }[] }
// Public editorial snapshot. No inventory, supplier, cost, recipe or batch fields.
// Sources reviewed 2026-10-05. Coordinates are representative region anchors.
export const REGIONS: BotanicalRegion[] = [
  {
    "id": "north-america",
    "label": "Eastern North America",
    "longitude": -77,
    "latitude": 44
  },
  {
    "id": "sonoran",
    "label": "Southwestern USA & northern Mexico",
    "longitude": -112,
    "latitude": 30
  },
  {
    "id": "europe",
    "label": "Central & southern Europe",
    "longitude": 15,
    "latitude": 46
  },
  {
    "id": "eurasia",
    "label": "Temperate Europe & Asia",
    "longitude": 45,
    "latitude": 54
  },
  {
    "id": "spain",
    "label": "Spain",
    "longitude": -3,
    "latitude": 40
  },
  {
    "id": "calabria",
    "label": "Calabria · Italy",
    "longitude": 16.2,
    "latitude": 38.5
  },
  {
    "id": "mediterranean",
    "label": "Mediterranean cultivation",
    "longitude": 9,
    "latitude": 35
  },
  {
    "id": "himalaya",
    "label": "Himalayas",
    "longitude": 80,
    "latitude": 30
  },
  {
    "id": "kannauj",
    "label": "Kannauj · India",
    "longitude": 79.9,
    "latitude": 27
  },
  {
    "id": "greece",
    "label": "Greece · saffron heritage",
    "longitude": 23,
    "latitude": 38
  },
  {
    "id": "india",
    "label": "Indian subcontinent",
    "longitude": 79,
    "latitude": 22
  },
  {
    "id": "western-ghats",
    "label": "Western Ghats · India",
    "longitude": 76,
    "latitude": 10
  },
  {
    "id": "southeast-asia",
    "label": "Southeast Asia",
    "longitude": 105,
    "latitude": 16
  },
  {
    "id": "malesia",
    "label": "Western Malesia",
    "longitude": 111,
    "latitude": -1
  },
  {
    "id": "east-africa",
    "label": "East Africa & Arabian Peninsula",
    "longitude": 46,
    "latitude": 7
  },
  {
    "id": "central-america",
    "label": "Mexico & Central America",
    "longitude": -91,
    "latitude": 17
  },
  {
    "id": "australia",
    "label": "Australia",
    "longitude": 146,
    "latitude": -36
  }
]

export const PALETTE: BotanicalNote[] = [
  {
    "name": "Agarwood",
    "botanicalName": "Aquilaria malaccensis",
    "regionId": "southeast-asia",
    "origin": "Bangladesh and northeastern India to western and central Malesia",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:830835-1"
      }
    ],
    "context": "",
    "scentProfile": "Deep, woody, resinous",
    "id": "agarwood",
    "tiers": [
      "base"
    ],
    "families": [
      "Woody"
    ]
  },
  {
    "name": "Aqua",
    "botanicalName": "",
    "regionId": null,
    "origin": "No botanical origin assigned",
    "originKind": "Identity to confirm",
    "sources": [],
    "context": "Its identity is being verified; no botanical origin is assigned yet.",
    "scentProfile": "",
    "id": "aqua",
    "tiers": [],
    "families": []
  },
  {
    "name": "Basil",
    "botanicalName": "Ocimum basilicum",
    "regionId": null,
    "origin": "Tropical Asia or Africa · historical origin uncertain",
    "originKind": "Origin uncertain",
    "sources": [
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/basilikumoel-ocimum-basilicum-linalool-bio-nepal.html"
      }
    ],
    "context": "Sunday Natural presents the botanical origin as uncertain, so no precise native-origin pin is assigned.",
    "scentProfile": "Green, aromatic, herbaceous",
    "id": "basil",
    "tiers": [
      "top"
    ],
    "families": [
      "Herbal"
    ]
  },
  {
    "name": "Bergamot",
    "botanicalName": "Citrus bergamia",
    "regionId": "calabria",
    "origin": "Calabria, Italy · traditional cultivation",
    "originKind": "Cultivated heritage",
    "sources": [
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/bergamotteoel-citrus-bergamia-bergaptenfrei-bio-italien.html"
      }
    ],
    "context": "Sunday Natural describes a possible Asian origin. Because that origin is uncertain, the pin marks its established cultivation region.",
    "scentProfile": "Fresh, green, citrus",
    "id": "bergamot",
    "tiers": [
      "top"
    ],
    "families": [
      "Citrus"
    ]
  },
  {
    "name": "Cardamom",
    "botanicalName": "Elettaria cardamomum",
    "regionId": "western-ghats",
    "origin": "Southwestern Indian subcontinent",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/kardamomoel-elettaria-cardamomum-bio-srilanka.html"
      }
    ],
    "context": "",
    "scentProfile": "Warm, fresh, spicy",
    "id": "cardamom",
    "tiers": [
      "top",
      "heart"
    ],
    "families": [
      "Spicy"
    ]
  },
  {
    "name": "Citronella",
    "botanicalName": "Cymbopogon winterianus",
    "regionId": "malesia",
    "origin": "Western Malesia · Borneo, Java and Sumatra",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:397039-1"
      },
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/citronellaoel-cymbopogon-winterianus-jowitt-bio-nepal.html"
      }
    ],
    "context": "",
    "scentProfile": "Lemony, green, herbaceous",
    "id": "citronella",
    "tiers": [
      "top"
    ],
    "families": [
      "Citrus"
    ]
  },
  {
    "name": "Coffee · Tonka · Vanilla",
    "botanicalName": "",
    "regionId": null,
    "origin": "A composition with several botanical inspirations",
    "originKind": "Composition",
    "sources": [],
    "context": "A blended material has no single botanical identity or native range.",
    "scentProfile": "Roasted, sweet, warm",
    "id": "coffee-x-tonka-beans-x-vanilla",
    "tiers": [
      "heart"
    ],
    "families": [
      "Gourmand"
    ]
  },
  {
    "name": "Eucalyptus",
    "botanicalName": "Eucalyptus globulus",
    "regionId": "australia",
    "origin": "Australia",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Sunday Natural · Eucalyptus",
        "url": "https://www.sunday.de/eukalyptus/"
      }
    ],
    "context": "",
    "scentProfile": "Fresh, camphoraceous, green",
    "id": "eucalyptus",
    "tiers": [
      "top"
    ],
    "families": [
      "Herbal"
    ]
  },
  {
    "name": "Geranium",
    "botanicalName": "",
    "regionId": null,
    "origin": "Botanical identity awaiting confirmation",
    "originKind": "Identity to confirm",
    "sources": [
      {
        "label": "Sunday Natural · geranium reference",
        "url": "https://www.sunday.de/geranienoel/"
      }
    ],
    "context": "Its botanical identity is being verified; no origin is assigned yet.",
    "scentProfile": "",
    "id": "geranium",
    "tiers": [
      "heart"
    ],
    "families": [
      "Floral",
      "Herbal"
    ]
  },
  {
    "name": "Himalayan Cedar",
    "botanicalName": "Cedrus deodara",
    "regionId": "himalaya",
    "origin": "Northeastern Afghanistan through the western Himalayas to western Nepal and northwestern India",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:676701-1"
      },
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/himalaya-zedernoel-cedrus-deodara-wild-bio-nepal.html"
      }
    ],
    "context": "An evergreen cedar of the western Himalayas, distinct from the Atlas cedar of North Africa.",
    "scentProfile": "Dry, resinous, woody",
    "id": "himalayan-cedar",
    "tiers": [
      "base"
    ],
    "families": [
      "Woody"
    ]
  },
  {
    "name": "Himalayan Pine",
    "botanicalName": "Pinus wallichiana",
    "regionId": "himalaya",
    "origin": "Northeastern Afghanistan through the Himalayas to southwestern China and northern Myanmar",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:677118-1"
      }
    ],
    "context": "",
    "scentProfile": "Fresh, green, resinous",
    "id": "pine",
    "tiers": [
      "top",
      "heart"
    ],
    "families": [
      "Woody",
      "Herbal"
    ]
  },
  {
    "name": "Jasmine Sambac",
    "botanicalName": "Jasminum sambac",
    "regionId": "india",
    "origin": "Bhutan to India",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:609755-1"
      }
    ],
    "context": "",
    "scentProfile": "Rich, sweet, floral",
    "id": "jasmine",
    "tiers": [
      "heart"
    ],
    "families": [
      "Floral"
    ]
  },
  {
    "name": "Jojoba Oil",
    "botanicalName": "Simmondsia chinensis",
    "regionId": "sonoran",
    "origin": "Southern California to central Utah and northern Mexico",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:236600-2"
      }
    ],
    "context": "A carrier oil, rather than an aromatic perfume note.",
    "scentProfile": "",
    "id": "jojoba-oil",
    "tiers": [],
    "families": [
      "Carrier"
    ]
  },
  {
    "name": "Juniper Berries",
    "botanicalName": "Juniperus communis",
    "regionId": "eurasia",
    "origin": "Northern Hemisphere",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/wacholderbeerenoel-juniperus-communis-wild-bio-bulgarien.html"
      }
    ],
    "context": "A widespread plant; this representative pin does not show its full range.",
    "scentProfile": "Fresh, coniferous, dry",
    "id": "juniper-berries-enebro",
    "tiers": [
      "top",
      "heart"
    ],
    "families": [
      "Herbal"
    ]
  },
  {
    "name": "Key Lime",
    "botanicalName": "Citrus × aurantiifolia",
    "regionId": "himalaya",
    "origin": "Eastern Himalayas · cultivated hybrid origin",
    "originKind": "Cultivated heritage",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:59599-2"
      },
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/limettenoel-citrus-aurantiifolia-bio-italien.html"
      }
    ],
    "context": "Sunday Natural lists major growing regions including Mexico and Italy. Kew distinguishes those from the hybrid’s cultivated origin.",
    "scentProfile": "Zesty, green, citrus",
    "id": "key-lime",
    "tiers": [
      "top"
    ],
    "families": [
      "Citrus"
    ]
  },
  {
    "name": "Lemon",
    "botanicalName": "Citrus × limon",
    "regionId": "mediterranean",
    "origin": "Cultivated citrus hybrid; no single wild native range",
    "originKind": "Cultivated heritage",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:60454758-2"
      },
      {
        "label": "Sunday Natural · citrus origins",
        "url": "https://www.sunday.de/kalte-jahreszeit/"
      }
    ],
    "context": "The pin represents Mediterranean cultivation, not a wild native range. Lemon and Limón are presented as one botanical note.",
    "scentProfile": "Bright, fresh, citrus",
    "id": "lemon",
    "tiers": [
      "top"
    ],
    "families": [
      "Citrus"
    ]
  },
  {
    "name": "Mandarin",
    "botanicalName": "Citrus reticulata",
    "regionId": "southeast-asia",
    "origin": "Southeast Asia",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/mandarinenoel-citrus-gruen-reticulata-bio-italien.html"
      }
    ],
    "context": "Native origin and modern Mediterranean cultivation are distinct.",
    "scentProfile": "Soft, juicy, citrus",
    "id": "mandarin",
    "tiers": [
      "top",
      "heart"
    ],
    "families": [
      "Citrus",
      "Fruity"
    ]
  },
  {
    "name": "Mitti Attar",
    "botanicalName": "",
    "regionId": "kannauj",
    "origin": "Kannauj, India · earth attar tradition",
    "originKind": "Craft tradition",
    "sources": [],
    "context": "An earth-inspired attar, rather than a single botanical species.",
    "scentProfile": "Earthy, rain-soaked, mineral",
    "id": "mitti-attar",
    "tiers": [
      "base"
    ],
    "families": [
      "Earthy"
    ]
  },
  {
    "name": "Myrrh",
    "botanicalName": "Commiphora myrrha",
    "regionId": "east-africa",
    "origin": "East Africa and the Arabian Peninsula",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/myrrhenoel-commiphora-myrrha-wild-kenia.html"
      }
    ],
    "context": "",
    "scentProfile": "Resinous, smoky, warm",
    "id": "myrhh",
    "tiers": [
      "base"
    ],
    "families": [
      "Resinous",
      "Woody"
    ]
  },
  {
    "name": "Nargis",
    "botanicalName": "Narcissus poeticus",
    "regionId": "europe",
    "origin": "East-central and southern Europe to Ukraine",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:66165-1"
      }
    ],
    "context": "Cultivation in Kashmir is distinct from this species’ native European range.",
    "scentProfile": "Rich, green, floral",
    "id": "nargis",
    "tiers": [
      "heart"
    ],
    "families": [
      "Floral"
    ]
  },
  {
    "name": "Neroli",
    "botanicalName": "Citrus × aurantium",
    "regionId": "southeast-asia",
    "origin": "Southeast Asian citrus ancestry",
    "originKind": "Cultivated heritage",
    "sources": [
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/petitgrainoel-bitterorange-citrus-aurantium-italien.html"
      }
    ],
    "context": "Neroli is the flower oil of bitter orange. The botanical reference describes the same plant; its listed oil is petitgrain from leaves and twigs.",
    "scentProfile": "Fresh, floral, citrus",
    "id": "neroli",
    "tiers": [
      "top",
      "heart"
    ],
    "families": [
      "Citrus",
      "Floral"
    ]
  },
  {
    "name": "Palmarosa",
    "botanicalName": "Cymbopogon martini",
    "regionId": "india",
    "origin": "Indian subcontinent to Indo-China",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:396962-1"
      },
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/palmarosaoel-cymbopogon-martinii-bio-madagaskar.html"
      }
    ],
    "context": "Also widely written as Cymbopogon martinii in perfumery. Madagascar is a cultivation region, not its native range.",
    "scentProfile": "Rosy, fresh, softly grassy",
    "id": "palma-rosa",
    "tiers": [
      "top"
    ],
    "families": [
      "Floral",
      "Herbal"
    ]
  },
  {
    "name": "Patchouli",
    "botanicalName": "Pogostemon cablin",
    "regionId": "southeast-asia",
    "origin": "Tropical Asia",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/patchoulioel-pogostemon-cablin-nepal.html"
      }
    ],
    "context": "Sunday Natural describes its Asian distribution from India and Nepal to Malaysia; a Nepalese growing region is not its entire botanical range.",
    "scentProfile": "Earthy, deep, woody",
    "id": "patchouli",
    "tiers": [
      "base"
    ],
    "families": [
      "Woody",
      "Herbal"
    ]
  },
  {
    "name": "Peach",
    "botanicalName": "",
    "regionId": null,
    "origin": "A reconstructed fruit note",
    "originKind": "Composition",
    "sources": [],
    "context": "A reconstructed fragrance material inspired by peach; its scent inspiration has no single material origin.",
    "scentProfile": "Soft, juicy, fruity",
    "id": "peach",
    "tiers": [
      "heart"
    ],
    "families": [
      "Fruity"
    ]
  },
  {
    "name": "Peppermint",
    "botanicalName": "Mentha × piperita",
    "regionId": "eurasia",
    "origin": "Hybrid mint associated with temperate Europe and Asia",
    "originKind": "Hybrid heritage",
    "sources": [
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/pfefferminzoel-mentha-piperita-bio-bulgarien.html"
      },
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/pfefferminzoel-mentha-piperita-bio-indien.html"
      }
    ],
    "context": "A cross of water mint and spearmint. The pin indicates its broad botanical heritage, not the source of a particular bottle.",
    "scentProfile": "Cool, bright, minty",
    "id": "pepper-mint",
    "tiers": [
      "top"
    ],
    "families": [
      "Herbal"
    ]
  },
  {
    "name": "Rose Otto",
    "botanicalName": "Rosa × damascena",
    "regionId": null,
    "origin": "Cultivated rose hybrid; no single wild native range",
    "originKind": "Hybrid heritage",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:77394892-1"
      }
    ],
    "context": "",
    "scentProfile": "Rich, soft, floral",
    "id": "rose-otto",
    "tiers": [
      "heart"
    ],
    "families": [
      "Floral"
    ]
  },
  {
    "name": "Rosewood",
    "botanicalName": "",
    "regionId": null,
    "origin": "Botanical identity awaiting confirmation",
    "originKind": "Identity to confirm",
    "sources": [
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/rosenholzoel-aniba-rosaeodora-wild-peru.html"
      }
    ],
    "context": "Several unrelated trees are called rosewood. Its botanical identity is being verified before an origin is assigned.",
    "scentProfile": "",
    "id": "rosewood",
    "tiers": [
      "heart",
      "base"
    ],
    "families": [
      "Woody",
      "Floral"
    ]
  },
  {
    "name": "Saffron Attar",
    "botanicalName": "Crocus sativus",
    "regionId": "greece",
    "origin": "Cultigen originating in Greece",
    "originKind": "Cultivated heritage",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:436688-1"
      }
    ],
    "context": "This describes the saffron plant’s cultivated origin. It does not establish where the attar was made or the origin of its other components.",
    "scentProfile": "Warm, spicy, floral",
    "id": "saffron-attar",
    "tiers": [
      "heart"
    ],
    "families": [
      "Floral",
      "Gourmand",
      "Spicy"
    ]
  },
  {
    "name": "Sandalwood",
    "botanicalName": "Santalum album",
    "regionId": "india",
    "origin": "Tropical Asia",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/sandelholzoel-santalum-album-bio-sri-lanka.html"
      }
    ],
    "context": "The map anchor represents part of a wider native region.",
    "scentProfile": "Creamy, warm, woody",
    "id": "sandalwood",
    "tiers": [
      "heart",
      "base"
    ],
    "families": [
      "Woody"
    ]
  },
  {
    "name": "Spanish Sage",
    "botanicalName": "Salvia lavandulifolia",
    "regionId": "spain",
    "origin": "Central and eastern Spain",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:77188934-1"
      },
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/lavendelsalbeioel-salvia-lavandulifolia-bio-spanien.html"
      }
    ],
    "context": "Kew accepts this plant as Salvia officinalis subsp. lavandulifolia. The familiar perfumery name is retained.",
    "scentProfile": "Herbal, spicy, softly camphoraceous",
    "id": "sage",
    "tiers": [
      "top"
    ],
    "families": [
      "Herbal"
    ]
  },
  {
    "name": "Spikenard",
    "botanicalName": "Nardostachys jatamansi",
    "regionId": "himalaya",
    "origin": "Himalayan highlands",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/nardenoel-nardostachys-jatamansi-wild-nepal-3200m.html"
      }
    ],
    "context": "",
    "scentProfile": "Earthy, herbal, woody",
    "id": "spikenard",
    "tiers": [
      "heart",
      "base"
    ],
    "families": [
      "Herbal",
      "Woody"
    ]
  },
  {
    "name": "Tea Tree",
    "botanicalName": "Melaleuca alternifolia",
    "regionId": "australia",
    "origin": "Eastern Australia · Queensland and New South Wales",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Sunday Natural",
        "url": "https://www.sunday.de/teebaumoel-melaleuca-alternifolia-nsw-australien.html"
      }
    ],
    "context": "",
    "scentProfile": "Fresh, herbal, medicinal",
    "id": "tea-tree",
    "tiers": [
      "top"
    ],
    "families": [
      "Herbal"
    ]
  },
  {
    "name": "Vanilla",
    "botanicalName": "Vanilla planifolia",
    "regionId": "central-america",
    "origin": "Southern Mexico to northern Brazil",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:262578-2"
      }
    ],
    "context": "",
    "scentProfile": "Warm, sweet, balsamic",
    "id": "vanilla",
    "tiers": [
      "heart",
      "base"
    ],
    "families": [
      "Gourmand"
    ]
  },
  {
    "name": "Wild Mint",
    "botanicalName": "Mentha arvensis",
    "regionId": "eurasia",
    "origin": "Europe to Kamchatka and Nepal",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:30026217-2"
      }
    ],
    "context": "",
    "scentProfile": "Green, cooling, minty",
    "id": "wild-mint",
    "tiers": [
      "top"
    ],
    "families": [
      "Herbal"
    ]
  },
  {
    "name": "Wintergreen",
    "botanicalName": "Gaultheria procumbens",
    "regionId": "north-america",
    "origin": "Central and eastern Canada to north-central and eastern USA",
    "originKind": "Native range",
    "sources": [
      {
        "label": "Kew · Plants of the World Online",
        "url": "https://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:330655-1"
      }
    ],
    "context": "American wintergreen is distinct from Himalayan wintergreen, Gaultheria fragrantissima.",
    "scentProfile": "Sweet, minty, medicinal",
    "id": "wintergreen",
    "tiers": [
      "top",
      "heart"
    ],
    "families": [
      "Herbal"
    ]
  }
]
