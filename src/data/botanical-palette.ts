export interface BotanicalRegion { id: string; label: string; longitude: number; latitude: number }
export interface ProductionVariant { label: string; origin: string; regionIds: string[]; url: string; extractionOriginal?: string; scentOriginal?: string; cultivationOriginal?: string; provenanceOriginal?: string; harvestOriginal?: string; constituentsOriginal?: string; originNote?: string }
export interface BotanicalNote { id: string; name: string; botanicalName: string; tiers: string[]; families: string[]; regionId: string | null; regionIds?: string[]; origin: string; originKind: string; context: string; scentProfile: string; sources: { label: string; url: string }[]; productionVariants?: ProductionVariant[] }
// Editorial snapshot reviewed 2026-10-05. Production origins are kept separate from native ranges.
// Repeated bottle sizes are grouped; species, extraction parts and chemotypes remain distinct.
// German product labels and metadata are preserved for checking the linked source.
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
  },
  {
    "id": "production-france",
    "label": "France · production",
    "longitude": 2.2,
    "latitude": 46.3
  },
  {
    "id": "production-italy",
    "label": "Italy · production",
    "longitude": 12.5,
    "latitude": 42
  },
  {
    "id": "production-spain",
    "label": "Spain · production",
    "longitude": -3.7,
    "latitude": 40.4
  },
  {
    "id": "production-portugal",
    "label": "Portugal · production",
    "longitude": -8,
    "latitude": 39.5
  },
  {
    "id": "production-bulgaria",
    "label": "Bulgaria · production",
    "longitude": 25,
    "latitude": 42.7
  },
  {
    "id": "production-bosnia-herzegovina",
    "label": "Bosnia & Herzegovina · production",
    "longitude": 17.8,
    "latitude": 44
  },
  {
    "id": "production-morocco",
    "label": "Morocco · production",
    "longitude": -6.5,
    "latitude": 32
  },
  {
    "id": "production-nepal",
    "label": "Nepal · production",
    "longitude": 84,
    "latitude": 28
  },
  {
    "id": "production-india",
    "label": "India · production",
    "longitude": 79,
    "latitude": 22
  },
  {
    "id": "production-sri-lanka",
    "label": "Sri Lanka · production",
    "longitude": 80.7,
    "latitude": 7.8
  },
  {
    "id": "production-madagascar",
    "label": "Madagascar · production",
    "longitude": 47,
    "latitude": -19
  },
  {
    "id": "production-comoros",
    "label": "Comoros · production",
    "longitude": 44,
    "latitude": -12
  },
  {
    "id": "production-kenya",
    "label": "Kenya · production",
    "longitude": 38,
    "latitude": 0
  },
  {
    "id": "production-somalia",
    "label": "Somalia · production",
    "longitude": 46,
    "latitude": 7
  },
  {
    "id": "production-oman",
    "label": "Oman · production",
    "longitude": 56,
    "latitude": 21
  },
  {
    "id": "production-ethiopia",
    "label": "Ethiopia · production",
    "longitude": 40,
    "latitude": 9
  },
  {
    "id": "production-canada",
    "label": "Canada · production",
    "longitude": -102,
    "latitude": 56
  },
  {
    "id": "production-vietnam",
    "label": "Vietnam · production",
    "longitude": 106,
    "latitude": 16
  },
  {
    "id": "production-australia",
    "label": "Australia · production",
    "longitude": 134,
    "latitude": -26
  },
  {
    "id": "production-brazil",
    "label": "Brazil · production",
    "longitude": -51,
    "latitude": -10
  },
  {
    "id": "production-peru",
    "label": "Peru · production",
    "longitude": -75,
    "latitude": -10
  },
  {
    "id": "production-egypt",
    "label": "Egypt · production",
    "longitude": 30,
    "latitude": 27
  },
  {
    "id": "production-south-africa",
    "label": "South Africa · production",
    "longitude": 25,
    "latitude": -30
  },
  {
    "id": "production-japan",
    "label": "Japan · production",
    "longitude": 138,
    "latitude": 36
  },
  {
    "id": "production-china",
    "label": "China · production",
    "longitude": 105,
    "latitude": 35
  },
  {
    "id": "production-angola",
    "label": "Angola · production",
    "longitude": 17,
    "latitude": -12
  },
  {
    "id": "production-philippines",
    "label": "Philippines · production",
    "longitude": 123,
    "latitude": 12
  },
  {
    "id": "production-austria",
    "label": "Austria · production",
    "longitude": 14,
    "latitude": 47.5
  },
  {
    "id": "production-iceland",
    "label": "Iceland · production",
    "longitude": -19,
    "latitude": 65
  },
  {
    "id": "production-new-zealand",
    "label": "New Zealand · production",
    "longitude": 174,
    "latitude": -41
  }
]

export const PALETTE: BotanicalNote[] = [
  {
    "id": "sunday-artemisia-afra",
    "name": "African Wormwood",
    "botanicalName": "Artemisia afra",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-south-africa",
    "origin": "Westkap (Prov.), South Africa",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, herbal, fruity, minty.",
    "sources": [
      {
        "label": "Sunday Natural · Wermutöl Afrikanisch bio",
        "url": "https://www.sunday.de/wermutoel-afrikanisch-artemisia-afra-bio-suedafrika.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Wermutöl Afrikanisch bio",
        "origin": "Westkap (Prov.), South Africa",
        "regionIds": [
          "production-south-africa"
        ],
        "url": "https://www.sunday.de/wermutoel-afrikanisch-artemisia-afra-bio-suedafrika.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Blättern",
        "scentOriginal": "sehr aromatisch, krautig-mentholisch, frisch, leicht fruchtig",
        "cultivationOriginal": "kontrolliert biologischer Anbau seit 2015",
        "provenanceOriginal": "Direkt von der auf heimische ätherische Öl-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Ernte im Spätsommer und Frühjahr",
        "constituentsOriginal": "1,8-Cineol, Campher, Camphen, Endo-Borneol, Terpinen-4-Ol"
      }
    ],
    "regionIds": [
      "production-south-africa"
    ]
  },
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
    "id": "sunday-pimpinella-anisum",
    "name": "Anise",
    "botanicalName": "Pimpinella anisum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, spicy.",
    "sources": [
      {
        "label": "Sunday Natural · Anisöl bio",
        "url": "https://www.sunday.de/anisoel-pimpinella-anisum-bio-frankreich.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Anisöl bio",
        "origin": "France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/anisoel-pimpinella-anisum-bio-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den grünen Früchten",
        "scentOriginal": "aromatisch warm, würzig, süßlich",
        "cultivationOriginal": "kontrolliert biologischer Anbau seit 2001",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Von Oktober bis November",
        "constituentsOriginal": "trans-Anethol, ɣ-Himachalen, Carvon, Methylchavicol"
      }
    ],
    "regionIds": [
      "production-france"
    ]
  },
  {
    "id": "sunday-syzygium-anisatum",
    "name": "Anise Myrtle",
    "botanicalName": "Syzygium anisatum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Northern Rivers (Reg.), NSW, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet.",
    "sources": [
      {
        "label": "Sunday Natural · Myrtenöl Anise Myrtle",
        "url": "https://www.sunday.de/myrtenoel-anise-myrtle-syzygium-anisatum-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Myrtenöl Anise Myrtle",
        "origin": "Northern Rivers (Reg.), NSW, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/myrtenoel-anise-myrtle-syzygium-anisatum-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Blättern und Zweigenden",
        "scentOriginal": "sehr aromatisch, frisch, anisartig, süß",
        "cultivationOriginal": "Kein Zertifikat, Nachhaltiger Anbau seit 1993",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "In den Sommermonaten",
        "constituentsOriginal": "trans-Anethol (ca. 82%), Estragol, 1,8-Cineol"
      }
    ],
    "regionIds": [
      "production-australia"
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
    "id": "sunday-cedrus-atlantica",
    "name": "Atlas Cedar",
    "botanicalName": "Cedrus atlantica",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "Auvergne-Rhône-Alpes (Reg.), France; Marokko",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, resinous, herbal, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Zedernöl Bio",
        "url": "https://www.sunday.de/zedernoel-cedrus-atlantica-bio-frankreich.html"
      },
      {
        "label": "Sunday Natural · Zedernöl 800m Bio",
        "url": "https://www.sunday.de/zedernoel-bio.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Zedernöl Bio",
        "origin": "Auvergne-Rhône-Alpes (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/zedernoel-cedrus-atlantica-bio-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem Holz",
        "scentOriginal": "sehr aromatisch, harzig-krautig, mild süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2010",
        "provenanceOriginal": "Direkt von einer auf heimische Aroma-Pflanzen spezialisierten Farm in der malerischen Provence",
        "harvestOriginal": "Von November bis Februar",
        "constituentsOriginal": "β-Himachalen, Trans-α-Atlanton, α-Himachalen, ɣ-Himachalen"
      },
      {
        "label": "Zedernöl 800m Bio",
        "origin": "Marokko",
        "regionIds": [
          "production-morocco"
        ],
        "url": "https://www.sunday.de/zedernoel-bio.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem Holz",
        "scentOriginal": "sehr aromatisch, harzig-krautig, holzig, honig-süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "constituentsOriginal": "β-Himachalen, α-Himachalen, ɣ-Himachalen, δ-Cadinen"
      }
    ],
    "regionIds": [
      "production-france",
      "production-morocco"
    ]
  },
  {
    "id": "sunday-dysoxylum-fraserianum",
    "name": "Australian Rosewood",
    "botanicalName": "Dysoxylum fraserianum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Northern Rivers (Reg.), NSW, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, balsamic, floral, earthy.",
    "sources": [
      {
        "label": "Sunday Natural · Rosenholzöl",
        "url": "https://www.sunday.de/rosenholzoel-dysoxylum-fraserianum-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Rosenholzöl",
        "origin": "Northern Rivers (Reg.), NSW, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/rosenholzoel-dysoxylum-fraserianum-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation von Holzschnitzeln",
        "scentOriginal": "Balsamisch, holzig-erdig, florale Süße, warm",
        "cultivationOriginal": "Kein Zertifikat, aus Altholz gesammelt",
        "provenanceOriginal": "Direkt von der auf heimische Aromapflanzen spezialisierten Farm",
        "constituentsOriginal": "Leden, β-Caryophyllen, δ-Elemen, δ-Cardinen"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-santalum-spicatum",
    "name": "Australian Sandalwood · deadwood",
    "botanicalName": "Santalum spicatum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Südaustralien (Bundesstaat), Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Sandelholzöl Deadwood wild",
        "url": "https://www.sunday.de/australisches-sandelholzoel-deadwood-santalum-spicatum-wild-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Sandelholzöl Deadwood wild",
        "origin": "Südaustralien (Bundesstaat), Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/australisches-sandelholzoel-deadwood-santalum-spicatum-wild-australien.html",
        "extractionOriginal": "Wasserdampfdestillation des abgestorbenen Holzes",
        "scentOriginal": "Holzig-süß, honigartig, cremig-warm",
        "cultivationOriginal": "Wildsammlung",
        "provenanceOriginal": "Direkt von einem auf heimische Pflanzen spezialisierten Familienbetrieb",
        "constituentsOriginal": "α-Bisabolol, cis-Nuciferol, cis-Lanceol"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-prostanthera-melissifolia",
    "name": "Balm Mint Bush",
    "botanicalName": "Prostanthera melissifolia",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Victoria (Bundesstaat), Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, minty.",
    "sources": [
      {
        "label": "Sunday Natural · Balm Mint Bushöl wild",
        "url": "https://www.sunday.de/balm-mint-bushoel-prostanthera-melissifolia-wild-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Balm Mint Bushöl wild",
        "origin": "Victoria (Bundesstaat), Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/balm-mint-bushoel-prostanthera-melissifolia-wild-australien.html",
        "extractionOriginal": "Wasserdampfdestillation frischer Blätter & Zweige",
        "scentOriginal": "Frisch, minzig, eukalyptusartig, dezent Limette",
        "cultivationOriginal": "kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "constituentsOriginal": "Piperiton, 1,8-Cineol, ɑ-Pinen, Linalool"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-abies-balsamea",
    "name": "Balsam Fir",
    "botanicalName": "Abies balsamea",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-canada",
    "origin": "Canada",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, woody, resinous.",
    "sources": [
      {
        "label": "Sunday Natural · Tannenöl Balsam wild bio",
        "url": "https://www.sunday.de/tannenoel-balsam-abies-balsamea-bio-wild-kanada.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Tannenöl Balsam wild bio",
        "origin": "Canada",
        "regionIds": [
          "production-canada"
        ],
        "url": "https://www.sunday.de/tannenoel-balsam-abies-balsamea-bio-wild-kanada.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Nadeln",
        "scentOriginal": "warm-holzig, frisch-harzig, nadelig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2001",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung in den Wintermonaten",
        "constituentsOriginal": "β-Pinen, Sabinen, Terpinolen, δ-3-Caren, α-Pinen"
      }
    ],
    "regionIds": [
      "production-canada"
    ]
  },
  {
    "id": "sunday-abies-balsamea-bark",
    "name": "Balsam Fir · bark",
    "botanicalName": "Abies balsamea",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-canada",
    "origin": "Québec, Canada",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, resinous, balsamic.",
    "sources": [
      {
        "label": "Sunday Natural · Tannenöl Balsam (Borke) wild bio",
        "url": "https://www.sunday.de/tannenoel-balsam-borke-abies-balsamea-wild-bio-kanada.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Tannenöl Balsam (Borke) wild bio",
        "origin": "Québec, Canada",
        "regionIds": [
          "production-canada"
        ],
        "url": "https://www.sunday.de/tannenoel-balsam-borke-abies-balsamea-wild-bio-kanada.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus der Borke",
        "scentOriginal": "warm-holzig, harzig, süß-balsamisch",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2015",
        "provenanceOriginal": "Direkt von einem auf einheimische Pflanzen des borealen Nadelwaldes spezialisierten Herstellers mit eigener Destille",
        "harvestOriginal": "April, May, September, October",
        "constituentsOriginal": "β-Pinen, α-Pinen, Limonen, β-Phellandren"
      }
    ],
    "regionIds": [
      "production-canada"
    ]
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
    ],
    "productionVariants": [
      {
        "label": "Basilikumöl bio",
        "origin": "Terai (Prov.) und Bergregion, Nepal",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/basilikumoel-ocimum-basilicum-linalool-bio-nepal.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen oder halbtrockenen blühenden Pflanzen",
        "scentOriginal": "Frisch, süß-aromatisch, estragonartig",
        "cultivationOriginal": "kontrolliert biologischer Anbau seit 2016",
        "provenanceOriginal": "Direkt von einem nepalesichen Familienbetrieb mit eigener Destille, die sich auf die Kultivierung und Wildsammlung einheimischer medizinischer- und Aromapflanzen spezialisiert hat",
        "harvestOriginal": "Reine Handernte im Juni undJuli",
        "constituentsOriginal": "Linalool, Bergamoten, 1,8-Cineol, Germacren D"
      }
    ],
    "regionIds": [
      "production-nepal"
    ]
  },
  {
    "id": "sunday-laurus-nobilis",
    "name": "Bay Laurel",
    "botanicalName": "Laurus nobilis",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-bosnia-herzegovina",
    "origin": "Balkan-Region",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, spicy, herbal, fruity.",
    "sources": [
      {
        "label": "Sunday Natural · Lorbeerölwildbio",
        "url": "https://www.sunday.de/lorbeeroel-laurus-nobilis-wild-bio.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Lorbeerölwildbio",
        "origin": "Balkan-Region",
        "regionIds": [
          "production-bosnia-herzegovina"
        ],
        "url": "https://www.sunday.de/lorbeeroel-laurus-nobilis-wild-bio.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blättern",
        "scentOriginal": "sehr aromatisch würzig, krautig-frisch, dezent fruchtig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung von März bis Mai",
        "constituentsOriginal": "1,8-Cineol, Sabinen, Terpenylacetat, Linalool, ɑ-Terpineol"
      }
    ],
    "regionIds": [
      "production-bosnia-herzegovina"
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
      },
      {
        "label": "Sunday Natural · Bergamotteöl Bio",
        "url": "https://www.sunday.de/bergamotteoel-citrus-bergamia-bio-italien.html"
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
    ],
    "productionVariants": [
      {
        "label": "Bergamotteöl Bergaptenfrei Bio",
        "origin": "Calabria (Reg.), Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/bergamotteoel-citrus-bergamia-bergaptenfrei-bio-italien.html",
        "extractionOriginal": "Schonende Kaltpressung mit anschließender Rektifikation, aus den frischen Fruchtschalen",
        "scentOriginal": "fruchtig-frisch, zitrisch-grün",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von einer auf heimische Aroma-Pflanzen spezialisierten Farm im malerischen Kalabrien, Italien",
        "harvestOriginal": "Reine Handernte von Dezember bis März",
        "constituentsOriginal": "Limonen, Linalylacetat, Linalool, β-Pinen, ɣ-Terpinen"
      },
      {
        "label": "Bergamotteöl Bio",
        "origin": "Calabria (Reg.) Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/bergamotteoel-citrus-bergamia-bio-italien.html",
        "extractionOriginal": "Schonende Kaltpressung, aus den frischen Fruchtschalen",
        "scentOriginal": "fruchtig-frisch, grün, würzig, leicht süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2005",
        "provenanceOriginal": "Direkt von der auf Zitrus-Früchte spezialisierten Farm im traditionellen mediterranen Anbaugebiet Kalabrien",
        "harvestOriginal": "Reine Handernte von Oktober bis Februar",
        "constituentsOriginal": "Limonen, Linalylacetat, Linalool, ɣ-Terpinen, β-Pinen"
      }
    ],
    "regionIds": [
      "calabria",
      "production-italy"
    ]
  },
  {
    "id": "sunday-mentha-citrata",
    "name": "Bergamot Mint",
    "botanicalName": "Mentha citrata",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-india",
    "origin": "Himalayan Foothills, Uttar Pradesh, India",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, herbal, floral, citrus, minty, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Bergamotteminzöl",
        "url": "https://www.sunday.de/en/bergamot-mint-oil-mentha-citrata-india.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Bergamotteminzöl",
        "origin": "Himalayan Foothills, Uttar Pradesh, India",
        "regionIds": [
          "production-india"
        ],
        "url": "https://www.sunday.de/en/bergamot-mint-oil-mentha-citrata-india.html",
        "extractionOriginal": "Gentle steam distillation of the herb",
        "scentOriginal": "Citrus-fresh, herbal, gently floral, mildly minty",
        "cultivationOriginal": "Nature-aligned cultivation since 2018",
        "provenanceOriginal": "Sourced from a network of independent partner farms",
        "constituentsOriginal": "Linalyl Acetate, Linalool, Menthol"
      }
    ],
    "regionIds": [
      "production-india"
    ]
  },
  {
    "id": "sunday-citrus-bergamia-petitgrain",
    "name": "Bergamot Petitgrain",
    "botanicalName": "Citrus bergamia petitgrain",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-italy",
    "origin": "Calabria (Reg.) Italy",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Floral, green, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Petitgrainöl Bergamotte bio",
        "url": "https://www.sunday.de/petitgrainoel-bergamotte-citrus-bergamia-petitgrain-bio-italien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Petitgrainöl Bergamotte bio",
        "origin": "Calabria (Reg.) Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/petitgrainoel-bergamotte-citrus-bergamia-petitgrain-bio-italien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Blättern",
        "scentOriginal": "sehr aromatisch, herb grünes Aroma der Bergamotte mit floral-zitischen Noten",
        "cultivationOriginal": "kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der auf Zitrus-Früchte spezialisierten Farm im traditionellen mediterranen Anbaugebiet Kalabrien",
        "harvestOriginal": "Reine Handernte zwischen Januar und März",
        "constituentsOriginal": "Linalylacetat, Linalool, Limonen"
      }
    ],
    "regionIds": [
      "production-italy"
    ]
  },
  {
    "id": "sunday-citrus-aurantium-petitgrain",
    "name": "Bitter Orange Petitgrain",
    "botanicalName": "Citrus aurantium",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-morocco",
    "origin": "Rabat-Salé-Kénitra (Reg.), Marokko; Calabria (Reg.), Italy",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, woody, spicy, herbal, floral, green, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Petitgrainöl Bitterorange Bio",
        "url": "https://www.sunday.de/bitterorangenoel-citrus-aurantium-bio-marokko.html"
      },
      {
        "label": "Sunday Natural · Petitgrainöl Bitterorange",
        "url": "https://www.sunday.de/petitgrainoel-bitterorange-citrus-aurantium-italien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Petitgrainöl Bitterorange Bio",
        "origin": "Rabat-Salé-Kénitra (Reg.), Marokko",
        "regionIds": [
          "production-morocco"
        ],
        "url": "https://www.sunday.de/bitterorangenoel-citrus-aurantium-bio-marokko.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Blättern (Petitgrain)",
        "scentOriginal": "zitusartig, würzig-frisch, leicht holzig, dezent süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Von April bis Juni",
        "constituentsOriginal": "Linalylacetat, Linalool, α-Terpineol, Geranylacetat, Limonen"
      },
      {
        "label": "Petitgrainöl Bitterorange",
        "origin": "Calabria (Reg.), Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/petitgrainoel-bitterorange-citrus-aurantium-italien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation (Zweige & Blätter)",
        "scentOriginal": "Herbes, grün-krautiges Aroma mit floral-zitischen Noten",
        "cultivationOriginal": "Kein Zertifikat, in naturnahem Anbau kultiviert",
        "provenanceOriginal": "Direkt von lokaler auf Zitrusfrüchte spezialisierter Farm",
        "constituentsOriginal": "Linalylacetat, Linalool, ɑ-Terpineol, Geranylacetat"
      }
    ],
    "regionIds": [
      "production-morocco",
      "production-italy"
    ]
  },
  {
    "id": "sunday-piper-nigrum",
    "name": "Black Pepper",
    "botanicalName": "Piper nigrum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-sri-lanka",
    "origin": "Sri Lanka",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, spicy.",
    "sources": [
      {
        "label": "Sunday Natural · Pfefferöl schwarz bio",
        "url": "https://www.sunday.de/pfeffer-oel-piper-nigrum-bio-sri-lanka.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Pfefferöl schwarz bio",
        "origin": "Sri Lanka",
        "regionIds": [
          "production-sri-lanka"
        ],
        "url": "https://www.sunday.de/pfeffer-oel-piper-nigrum-bio-sri-lanka.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frisch getrockneten Samen",
        "scentOriginal": "sehr aromatisch, leicht scharf, würzig, nussig-frisch",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2002",
        "provenanceOriginal": "Direkt von der auf Handernte spezialisierten Farm mit kooperativen Vertragspartnern im tropischen Sri Lanka",
        "harvestOriginal": "Reine Handernte"
      }
    ],
    "regionIds": [
      "production-sri-lanka"
    ]
  },
  {
    "id": "sunday-pinus-nigra",
    "name": "Black Pine",
    "botanicalName": "Pinus nigra ssp. larcio",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "Korsika (Reg.), France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, resinous.",
    "sources": [
      {
        "label": "Sunday Natural · Schwarzkieferöl 1000m Wild Bio",
        "url": "https://www.sunday.de/schwarzkieferoel-pinus-nigra-bio-wild-frankreich-1000m.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Schwarzkieferöl 1000m Wild Bio",
        "origin": "Korsika (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/schwarzkieferoel-pinus-nigra-bio-wild-frankreich-1000m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Nadeln",
        "scentOriginal": "aromatisch süß, frisch, harzig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von einer auf Wildsammlung spezialsierten Farm aus Frankreich",
        "harvestOriginal": "Wildsammlung durch reine Handernte",
        "constituentsOriginal": "α-Pinen, β-Phellandren, Limonen, β-Mycren, β-Pinen"
      }
    ],
    "regionIds": [
      "production-france"
    ]
  },
  {
    "id": "sunday-picea-mariana",
    "name": "Black Spruce",
    "botanicalName": "Picea mariana",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-canada",
    "origin": "Eyou Istchee James Bay, Canada",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, resinous, citrus.",
    "sources": [
      {
        "label": "Sunday Natural · Schwarzfichtenöl wild bio",
        "url": "https://www.sunday.de/en/spruce-oil-picea-mariana-wild-organic-canada.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Schwarzfichtenöl wild bio",
        "origin": "Eyou Istchee James Bay, Canada",
        "regionIds": [
          "production-canada"
        ],
        "url": "https://www.sunday.de/en/spruce-oil-picea-mariana-wild-organic-canada.html",
        "extractionOriginal": "Gentle steam distillation of the fresh twigs and needles",
        "scentOriginal": "Very aromatic, fresh coniferous aroma, slightly resinous with subtle citrus notes",
        "provenanceOriginal": "Directly from the producer's own distillery specialising in native plants of the boreal coniferous forest",
        "harvestOriginal": "Wildcrafted throughout the year",
        "constituentsOriginal": "Bornyl acetate, ɑ-pinene, camphene, δ-3-carene, β-pinene"
      }
    ],
    "regionIds": [
      "production-canada"
    ]
  },
  {
    "id": "sunday-picea-mariana-wood-bark",
    "name": "Black Spruce · wood & bark",
    "botanicalName": "Picea mariana",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-canada",
    "origin": "Eeyou Istchee James Bay (Reg.), Canada",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Woody, resinous.",
    "sources": [
      {
        "label": "Sunday Natural · Schwarzfichtenöl (Holz & Borke) wild bio",
        "url": "https://www.sunday.de/fichten-oel-picea-mariana-borke-wild-bio-kanada.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Schwarzfichtenöl (Holz & Borke) wild bio",
        "origin": "Eeyou Istchee James Bay (Reg.), Canada",
        "regionIds": [
          "production-canada"
        ],
        "url": "https://www.sunday.de/fichten-oel-picea-mariana-borke-wild-bio-kanada.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation aus dem frischen Holz & Borke",
        "scentOriginal": "sehr aromatisch, holzig, harzig, warm",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von einem auf einheimische Pflanzen des borealen Nadelwaldes spezialisierten Herstellers mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch das Jahr hindurch",
        "constituentsOriginal": "ɑ-Pinen, β-Pinen, δ-3-Caren, Bornylacetat, Camphen"
      }
    ],
    "regionIds": [
      "production-canada"
    ]
  },
  {
    "id": "sunday-citrus-sinensis-blood",
    "name": "Blood Orange",
    "botanicalName": "Citrus sinensis",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-italy",
    "origin": "Sicily (Reg.) Italy",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, fruity.",
    "sources": [
      {
        "label": "Sunday Natural · Blutorangenöl Bio",
        "url": "https://www.sunday.de/blutorangenoel-citrus-sinensis-bio-italien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Blutorangenöl Bio",
        "origin": "Sicily (Reg.) Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/blutorangenoel-citrus-sinensis-bio-italien.html",
        "extractionOriginal": "Schonende Kaltpressung, aus den frischen grünen Fruchtschalen",
        "scentOriginal": "sehr aromatisch, spritzig-frisch, fruchtig, orangen-süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2005",
        "provenanceOriginal": "Direkt von einer auf Zitrus-Früchten spezialisierten Farm im mediterranen Sizilien",
        "harvestOriginal": "2020, durch reine Handernte von September bis Dezember",
        "constituentsOriginal": "Limonen, Myrcen"
      }
    ],
    "regionIds": [
      "production-italy"
    ]
  },
  {
    "id": "sunday-callitris-intratropica",
    "name": "Blue Cypress",
    "botanicalName": "Callitris intratropica",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Northern Territory, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Woody, balsamic, earthy, honey-like, smoky.",
    "sources": [
      {
        "label": "Sunday Natural · ZypressenölBlauwild",
        "url": "https://www.sunday.de/zypressenoel-blau-callitris-intratropica-wild-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "ZypressenölBlauwild",
        "origin": "Northern Territory, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/zypressenoel-blau-callitris-intratropica-wild-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem frischen Holz und Borke",
        "scentOriginal": "holzig, balsamisch, rauchig, erdig, Noten von Waldhonig",
        "cultivationOriginal": "Kein Zertifikat, Wildsammlung seit 1993",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung ganzjährig außerhalb der Regenzeit"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-tanacetum-annuum",
    "name": "Blue Tansy",
    "botanicalName": "Tanacetum annuum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-morocco",
    "origin": "Marokko",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, spicy, herbal, floral.",
    "sources": [
      {
        "label": "Sunday Natural · Rainfarnöl blau bio",
        "url": "https://www.sunday.de/rainfarnoel-tanacetum-annuum-bio-marokko.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Rainfarnöl blau bio",
        "origin": "Marokko",
        "regionIds": [
          "production-morocco"
        ],
        "url": "https://www.sunday.de/rainfarnoel-tanacetum-annuum-bio-marokko.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blüten",
        "scentOriginal": "sehr aromatisch, krautig-würzig, dezent florale Apfel-Süße",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2021",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Im Frühsommer, hauptsächlich Mai",
        "constituentsOriginal": "Sabinen, Kampfer, 3,6 Dihydrochamazulen, α-Phellandren"
      }
    ],
    "regionIds": [
      "production-morocco"
    ]
  },
  {
    "id": "sunday-eucalyptus-dives",
    "name": "Broad-Leaved Peppermint Eucalyptus",
    "botanicalName": "Eucalyptus dives",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Südwest New South Wales (Reg.), Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, spicy, citrus, minty.",
    "sources": [
      {
        "label": "Sunday Natural · Eukalyptusöl Pfefferminz",
        "url": "https://www.sunday.de/eukalyptusol-pfefferminz-eukalyptus.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Eukalyptusöl Pfefferminz",
        "origin": "Südwest New South Wales (Reg.), Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/eukalyptusol-pfefferminz-eukalyptus.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen jungen Zweigen und Blättern",
        "scentOriginal": "frisches pfefferminzaroma, würzig, eukayptusartig, dezent zitrisch",
        "cultivationOriginal": "Kein Zertifikat, naturbelassener Anbau",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Plantage besteht seit 1950ern, Handernte im August und September",
        "constituentsOriginal": "Piperiton, para-Cymen, ɑ-Phellandran, Terpinen-4-ol"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-agathosma-betulina",
    "name": "Buchu",
    "botanicalName": "Agathosma betulina",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-south-africa",
    "origin": "Westkap (Prov.), South Africa",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fruity, minty.",
    "sources": [
      {
        "label": "Sunday Natural · Buchuölbio",
        "url": "https://www.sunday.de/buchuoel-agathosma-betulina-bio-sued-afrika.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Buchuölbio",
        "origin": "Westkap (Prov.), South Africa",
        "regionIds": [
          "production-south-africa"
        ],
        "url": "https://www.sunday.de/buchuoel-agathosma-betulina-bio-sued-afrika.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation frischer Blätter & Zweige",
        "scentOriginal": "aromatisch, beerig-fruchtig, minzig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2019",
        "provenanceOriginal": "Direkt von auf heimische Pflanzen spezialisierten Farm",
        "constituentsOriginal": "Isomenthon, Limonen, Diosphenol, Menthon, Pulegon"
      }
    ],
    "regionIds": [
      "production-south-africa"
    ]
  },
  {
    "id": "sunday-eremophila-mitchellii",
    "name": "Buddha Wood",
    "botanicalName": "Eremophila mitchellii",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "New South Wales, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Woody, earthy, smoky, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Buddha-Holzöl wild",
        "url": "https://www.sunday.de/buddha-holzoel-eremophila-mitchellii-wild-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Buddha-Holzöl wild",
        "origin": "New South Wales, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/buddha-holzoel-eremophila-mitchellii-wild-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation (Stamm & Zweige)",
        "scentOriginal": "Rauchig, erdig, trocken, holzig, Rosenholznote",
        "cultivationOriginal": "/ Zertifizierung  | Wildsammlung, pestizidfrei",
        "provenanceOriginal": "Spezialisiertes Familienunternehmen, eigene Destille",
        "constituentsOriginal": "Eremophilon, Hydroxy- und Hydroxy-Dihydro-Eremophilon"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-juniperus-oxycedrus",
    "name": "Cade",
    "botanicalName": "Juniperus oxycedrus",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Castilla-La Mancha, Spain, 900m",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, woody.",
    "sources": [
      {
        "label": "Sunday Natural · Cadenöl 900m Wild Bio",
        "url": "https://www.sunday.de/cadenoel-juniperus-oxycedrus-bio-wild-spanien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Cadenöl 900m Wild Bio",
        "origin": "Castilla-La Mancha, Spain, 900m",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/cadenoel-juniperus-oxycedrus-bio-wild-spanien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation",
        "scentOriginal": "aromatisch, zedrig-holzig, frisch, leicht",
        "cultivationOriginal": "Zertifizierte Bio-Qualitä seit 1998",
        "provenanceOriginal": "Spezialisierter Familienbetrieb mit eigener Destille",
        "constituentsOriginal": "Cubebol, δ-Cardinen, Vulgaron B, ɑ-trans-Bergamoten"
      }
    ],
    "regionIds": [
      "production-spain"
    ]
  },
  {
    "id": "sunday-melaleuca-cajuputi",
    "name": "Cajeput",
    "botanicalName": "Melaleuca cajuputi",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-vietnam",
    "origin": "Vietnam",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, fruity, camphoraceous.",
    "sources": [
      {
        "label": "Sunday Natural · Cajeputöl bio",
        "url": "https://www.sunday.de/cajeput-melaleuca-cajuputi-bio-vietnam.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Cajeputöl bio",
        "origin": "Vietnam",
        "regionIds": [
          "production-vietnam"
        ],
        "url": "https://www.sunday.de/cajeput-melaleuca-cajuputi-bio-vietnam.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Zweigen mit Blüten und Blättern",
        "scentOriginal": "aromatisch frisch-fruchtig, kampferartig",
        "cultivationOriginal": "kontrolliert biologischer Anbau seit 2001",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Reine Handernte über das gesamte Jahr verteilt",
        "constituentsOriginal": "1,8-Cineol, ɑ-Terpineol, Limonen, Linalool"
      }
    ],
    "regionIds": [
      "production-vietnam"
    ]
  },
  {
    "id": "sunday-acorus-calamus",
    "name": "Calamus",
    "botanicalName": "Acorus calamus",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-nepal",
    "origin": "Bagmati (Prov.), Nepal, 2200m",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, citrus.",
    "sources": [
      {
        "label": "Sunday Natural · Kalmusöl 2200 Meter wild bio",
        "url": "https://www.sunday.de/kalmusol-wild-2200m-bio.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Kalmusöl 2200 Meter wild bio",
        "origin": "Bagmati (Prov.), Nepal, 2200m",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/kalmusol-wild-2200m-bio.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation aus Wurzeln & Blättern",
        "scentOriginal": "aromatisch-süß, zitrisch, ledrig",
        "cultivationOriginal": "/ Zertifizierung  | Zertifizierte Bio-Qualität seit 2013",
        "provenanceOriginal": "Direkt von spezialisierter Farm mit eigener Destille",
        "constituentsOriginal": "β-Azaron, ɑ-Azaron"
      }
    ],
    "regionIds": [
      "production-nepal"
    ]
  },
  {
    "id": "sunday-helichrysum-crispum",
    "name": "Cape Immortelle",
    "botanicalName": "Helichrysum crispum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-south-africa",
    "origin": "Westkap (Prov.), South Africa",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, spicy, herbal, floral, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Immortellenölbio",
        "url": "https://www.sunday.de/immortellenol-h-crispum-bio.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Immortellenölbio",
        "origin": "Westkap (Prov.), South Africa",
        "regionIds": [
          "production-south-africa"
        ],
        "url": "https://www.sunday.de/immortellenol-h-crispum-bio.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischem blühendem Kraut",
        "scentOriginal": "würzig-floral, krautig, dezent Honig-süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2015",
        "provenanceOriginal": "Direkt von dem auf heimische ätherische Öl-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Von September bis November",
        "constituentsOriginal": "Viridiflorol, δ-Cadinen, ɑ-Pinen, 6-tert-Butyl-m-cresol"
      }
    ],
    "regionIds": [
      "production-south-africa"
    ]
  },
  {
    "id": "sunday-eriocephalus-africanus",
    "name": "Cape Snowbush",
    "botanicalName": "Eriocephalus africanus",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-south-africa",
    "origin": "Westkap (Prov.), South Africa",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, resinous, herbal, minty, green.",
    "sources": [
      {
        "label": "Sunday Natural · Rosmarinöl Afrikanisch bio",
        "url": "https://www.sunday.de/rosmarinoel-eriocephalus-africanus-bio-sued-afrika.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Rosmarinöl Afrikanisch bio",
        "origin": "Westkap (Prov.), South Africa",
        "regionIds": [
          "production-south-africa"
        ],
        "url": "https://www.sunday.de/rosmarinoel-eriocephalus-africanus-bio-sued-afrika.html",
        "extractionOriginal": "Wasserdampfdestillation frischer Zweige/Blätter",
        "scentOriginal": "dezent krautig-frisch, mentholig-süß, Grünes Harz",
        "cultivationOriginal": "/ Zertifizierung  | Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von spezialisierter Farm mit eigener Destille",
        "constituentsOriginal": "1,8-Cineol, Terpinen-4-Ol, ɣ-Terpinen"
      }
    ],
    "regionIds": [
      "production-south-africa"
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
    ],
    "productionVariants": [
      {
        "label": "Kardamomöl bio",
        "origin": "Sri Lanka",
        "regionIds": [
          "production-sri-lanka"
        ],
        "url": "https://www.sunday.de/kardamomoel-elettaria-cardamomum-bio-srilanka.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation der Früchte",
        "scentOriginal": "aromatisch, süß-würzig, warm, holzig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2001",
        "provenanceOriginal": "Direkt von Farm mit eigener Destille",
        "constituentsOriginal": "Linalyl Acetate, Linalool, Limonene, Pinene"
      }
    ],
    "regionIds": [
      "western-ghats",
      "production-sri-lanka"
    ]
  },
  {
    "id": "sunday-daucus-carota",
    "name": "Carrot Seed",
    "botanicalName": "Daucus carota",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "Provence-Alpes-Côte d'Azur, France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, spicy, earthy.",
    "sources": [
      {
        "label": "Sunday Natural · Karottensamenöl wild bio",
        "url": "https://www.sunday.de/karottensamenoel-daucus-carota-wild-bio-frankreich.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Karottensamenöl wild bio",
        "origin": "Provence-Alpes-Côte d'Azur, France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/karottensamenoel-daucus-carota-wild-bio-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem blühenden Kraut",
        "scentOriginal": "aromatisch, süß-erdig, würzig, warm, mit dezenter Cognac Note",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2018",
        "provenanceOriginal": "Direkt von einem Hersteller mit eigener Destille aus eigenem Bio-zertifizierten und nachhaltigen Anbau in Frankreich und Kooperative von Biobauern.",
        "harvestOriginal": "Ernte im September und Oktober",
        "constituentsOriginal": "ɑ-Pinen, Geranylacetat, Sabinen, β-Mycren, β-Sabinen"
      }
    ],
    "regionIds": [
      "production-france"
    ]
  },
  {
    "id": "sunday-vitex-agnus-castus",
    "name": "Chaste Tree",
    "botanicalName": "Vitex agnus castus",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-bosnia-herzegovina",
    "origin": "Herzegowina, Bosnia & Herzegovina",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, floral, minty, earthy.",
    "sources": [
      {
        "label": "Sunday Natural · Mönchspfefferöl wild",
        "url": "https://www.sunday.de/moenchspfefferoel-wild-v-agnus-castus-bosnien-und-herzegowina.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Mönchspfefferöl wild",
        "origin": "Herzegowina, Bosnia & Herzegovina",
        "regionIds": [
          "production-bosnia-herzegovina"
        ],
        "url": "https://www.sunday.de/moenchspfefferoel-wild-v-agnus-castus-bosnien-und-herzegowina.html",
        "extractionOriginal": "Wasserdampfdestillation frischer Beeren",
        "scentOriginal": "Erdig, minzig, pfeffrig, frisch, süß, blumig",
        "cultivationOriginal": "/ Zertifizierung  | Kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "constituentsOriginal": "Sabinen, 1,8-Cineol, ɑ-Pinen, Terpynilacetat"
      }
    ],
    "regionIds": [
      "production-bosnia-herzegovina"
    ]
  },
  {
    "id": "sunday-cinnamomum-zeylanicum-bark",
    "name": "Cinnamon Bark",
    "botanicalName": "Cinnamomum zeylanicum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-sri-lanka",
    "origin": "Zentrale Bergregion, Sri Lanka",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, spicy, earthy.",
    "sources": [
      {
        "label": "Sunday Natural · Zimtöl Rinde bio",
        "url": "https://www.sunday.de/zimtoel-rinde-cinnamomum-zeylanicum-bio-sri-lanka.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Zimtöl Rinde bio",
        "origin": "Zentrale Bergregion, Sri Lanka",
        "regionIds": [
          "production-sri-lanka"
        ],
        "url": "https://www.sunday.de/zimtoel-rinde-cinnamomum-zeylanicum-bio-sri-lanka.html",
        "extractionOriginal": "Schonende Hydrodestillation, aus der Rinde",
        "scentOriginal": "sehr aromatisch, holzig-süß, würzig, erdig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2002",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Ernte von Hand zweimal im Jahr",
        "constituentsOriginal": "Zimtaldehyd (60-69%), Zimt-Acetat, Eugenol"
      }
    ],
    "regionIds": [
      "production-sri-lanka"
    ]
  },
  {
    "id": "sunday-cinnamomum-zeylanicum-leaf",
    "name": "Cinnamon Leaf",
    "botanicalName": "Cinnamomum zeylanicum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-sri-lanka",
    "origin": "Zentrale Bergregion, Sri Lanka",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, spicy, herbal.",
    "sources": [
      {
        "label": "Sunday Natural · Zimtöl Blatt bio",
        "url": "https://www.sunday.de/zimtoel-blatt-cinnamomum-zeylanicum-bio-sri-lanka.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Zimtöl Blatt bio",
        "origin": "Zentrale Bergregion, Sri Lanka",
        "regionIds": [
          "production-sri-lanka"
        ],
        "url": "https://www.sunday.de/zimtoel-blatt-cinnamomum-zeylanicum-bio-sri-lanka.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den Blättern",
        "scentOriginal": "sehr aromatisch, warm-würzig, krautig-holzig, süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2002",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Ernte von Hand zweimal im Jahr",
        "constituentsOriginal": "Eugenol (70-85%), Eugenolacetat"
      }
    ],
    "regionIds": [
      "production-sri-lanka"
    ]
  },
  {
    "id": "sunday-citrus-medica",
    "name": "Citron",
    "botanicalName": "Citrus medica",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-italy",
    "origin": "Sicily (Reg.), Italy",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, fruity, green.",
    "sources": [
      {
        "label": "Sunday Natural · Cedrat-Zitronenölbio",
        "url": "https://www.sunday.de/cedratoel-citrus-medica-bio-italien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Cedrat-Zitronenölbio",
        "origin": "Sicily (Reg.), Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/cedratoel-citrus-medica-bio-italien.html",
        "extractionOriginal": "Schonende Kaltpressung aus frischen Fruchtschalen",
        "scentOriginal": "sehr aromatisch, spritzig-grün, fruchtig, dezent süß",
        "cultivationOriginal": "/ Zertifizierung  | Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von einer auf Aromapflanzen spezialisierten Farm",
        "constituentsOriginal": "Limonen, ɣ-Terpinen, Citral"
      }
    ],
    "regionIds": [
      "production-italy"
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
      },
      {
        "label": "Sunday Natural · Amazongrass",
        "url": "https://www.sunday.de/amazongrass-cymbopogon-winterianus-brasilien.html"
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
    ],
    "productionVariants": [
      {
        "label": "Amazongrass",
        "origin": "Amazonas Regenwald, Nord Brazil",
        "regionIds": [
          "production-brazil"
        ],
        "url": "https://www.sunday.de/amazongrass-cymbopogon-winterianus-brasilien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Blättern",
        "scentOriginal": "aromatisch frisch, dezent blumige Zitrusnote.",
        "cultivationOriginal": "Kein Zertifikat, nachhaltiger konventioneller Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Reine Handernte im April",
        "constituentsOriginal": "Geraniol, Citral, Citronellol"
      },
      {
        "label": "Citronellaöl bio",
        "origin": "Terai (Prov.), Nepal",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/citronellaoel-cymbopogon-winterianus-jowitt-bio-nepal.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen & halbtrockenen Blättern",
        "scentOriginal": "intensiv zitrisch-herb, frisch, dezent süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2016",
        "provenanceOriginal": "Direkt von einem nepalesichen Familienbetrieb mit eigener Destille, die sich auf die Kultivierung und Wildsammlung einheimischer medizinischer- und Aromapflanzen spezialisiert hat",
        "harvestOriginal": "Reine Handernte, März-April und Oktober-November"
      }
    ],
    "regionIds": [
      "malesia",
      "production-brazil",
      "production-nepal"
    ]
  },
  {
    "id": "sunday-salvia-sclarea",
    "name": "Clary Sage",
    "botanicalName": "Salvia sclarea",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "Drôme Provençale (Dep.), Auvergne-Rhône-Alpes (Reg.), France; Piemont, Italy",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, spicy, herbal.",
    "sources": [
      {
        "label": "Sunday Natural · Muskateller-Salbeiöl Bio",
        "url": "https://www.sunday.de/muskatellersalbeioel-salvia-sclarea-bio-frankreich.html"
      },
      {
        "label": "Sunday Natural · Muskateller- salbeiöl bio",
        "url": "https://www.sunday.de/muskatellersalbeioel-salvia-sclarea-bio-italien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Muskateller-Salbeiöl Bio",
        "origin": "Drôme Provençale (Dep.), Auvergne-Rhône-Alpes (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/muskatellersalbeioel-salvia-sclarea-bio-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischem blühendem Kraut",
        "scentOriginal": "sehr aromatisch, würzig-süß, krautig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2005",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Im Juli",
        "constituentsOriginal": "Linalylacetat, Linalool, Germacrene D"
      },
      {
        "label": "Muskateller- salbeiöl bio",
        "origin": "Piemont, Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/muskatellersalbeioel-salvia-sclarea-bio-italien.html",
        "extractionOriginal": "Schonender Wasserdampfdestillation des blühenden Krauts vor Ort",
        "scentOriginal": "sehr aromatisch, würzig-süß, krautig-warm",
        "cultivationOriginal": "kontrolliert biologischer Anbau seit 1995",
        "provenanceOriginal": "Direkt vom Hersteller, der mit nachhaltigen Destillationsprozessen arbeitet",
        "harvestOriginal": "(Jahr, wenn alte ausverkauft sind)  | Juni bis Juli, je nach Erntezeitpunkt des blühenden Krauts",
        "constituentsOriginal": "Linalylacetat, Linalool, Sclareol, β-Caryophyllen"
      }
    ],
    "regionIds": [
      "production-france",
      "production-italy"
    ]
  },
  {
    "id": "sunday-citrus-clementina-petitgrain",
    "name": "Clementine Petitgrain",
    "botanicalName": "Citrus clementina petitgrain",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "Korsika (Reg.), France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, floral, fruity, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Petitgrainöl Clementine bio",
        "url": "https://www.sunday.de/petitgrain-oel-bio-clementine-citrus-clementina-frankreich.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Petitgrainöl Clementine bio",
        "origin": "Korsika (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/petitgrain-oel-bio-clementine-citrus-clementina-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Blättern mit Fruchtansätzen",
        "scentOriginal": "sehr aromatisch, fruchtig-süßes Aroma der Mandarine mit einer frisch-floralen leicht herben Note",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von einer auf kontrolliert biologischen und biodynamischen Anbau sowie auf Wildsammlungen spezialisierten Farm auf Korsika",
        "harvestOriginal": "Reine Handernte im März",
        "constituentsOriginal": "Sabinen, Linalool, Limonen, trans-β-Ocimen"
      }
    ],
    "regionIds": [
      "production-france"
    ]
  },
  {
    "id": "sunday-eugenia-caryphyllus-bud",
    "name": "Clove Bud",
    "botanicalName": "Eugenia caryphyllus",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-sri-lanka",
    "origin": "Kandy, Kegalle, Matale (Reg.), Sri Lanka",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, spicy, leathery.",
    "sources": [
      {
        "label": "Sunday Natural · Nelkenblütenöl bio",
        "url": "https://www.sunday.de/nelkenblueten-oel-eugenia-caryphyllus-bio-sri-lanka.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Nelkenblütenöl bio",
        "origin": "Kandy, Kegalle, Matale (Reg.), Sri Lanka",
        "regionIds": [
          "production-sri-lanka"
        ],
        "url": "https://www.sunday.de/nelkenblueten-oel-eugenia-caryphyllus-bio-sri-lanka.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus der sonnengetrockneten Knospe der Gewürznelke",
        "scentOriginal": "sehr aromatisch, würzige Süße, holzig, dezent lederig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2002",
        "provenanceOriginal": "Direkt von der auf Handernte spezialisierten Farm mit kooperativen Vertragspartnern im tropischen Sri Lanka",
        "harvestOriginal": "Reine Handernte",
        "constituentsOriginal": "Eugenol, Eugenolacetat, β-Caryophyllen"
      }
    ],
    "regionIds": [
      "production-sri-lanka"
    ]
  },
  {
    "id": "sunday-eugenia-caryphyllus-stem",
    "name": "Clove Stem",
    "botanicalName": "Eugenia caryphyllus",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-sri-lanka",
    "origin": "Kandy, Kegalle, Matale (Reg.), Sri Lanka",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, spicy, leathery.",
    "sources": [
      {
        "label": "Sunday Natural · Nelkenstielöl bio",
        "url": "https://www.sunday.de/nelkenoel-stiele-eugenia-caryphyllus-bio-sri-lanka.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Nelkenstielöl bio",
        "origin": "Kandy, Kegalle, Matale (Reg.), Sri Lanka",
        "regionIds": [
          "production-sri-lanka"
        ],
        "url": "https://www.sunday.de/nelkenoel-stiele-eugenia-caryphyllus-bio-sri-lanka.html",
        "extractionOriginal": "Wasserdampfdestillation der sonnengetrockneten Stiele",
        "scentOriginal": "Sehr aromatisch, würzige Süße, holzig, dezent lederig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2002",
        "provenanceOriginal": "Direkt von der auf Handernte spezialisierten Farm",
        "constituentsOriginal": "Eugenol, β-Caryophyllen"
      }
    ],
    "regionIds": [
      "production-sri-lanka"
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
    "id": "sunday-citrus-hystrix-petitgrain",
    "name": "Combava Petitgrain",
    "botanicalName": "Citrus hystrix",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-madagascar",
    "origin": "Madagascar",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Spicy, citrus, minty, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Petitgrainöl Combava Bio",
        "url": "https://www.sunday.de/combavaoel-citrus-hystrix-bio-madagaskar.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Petitgrainöl Combava Bio",
        "origin": "Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/combavaoel-citrus-hystrix-bio-madagaskar.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den Blättern (Petit Grain)",
        "scentOriginal": "zitronig-würzig, leicht mentholig, herb",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2012",
        "provenanceOriginal": "Direkt von dem Kleinbetrieb mit eigener Destille in Madagaskar",
        "harvestOriginal": "Von September bis Oktober",
        "constituentsOriginal": "Citronellal, Citronellol, Linalool, Citronellylacetat"
      }
    ],
    "regionIds": [
      "production-madagascar"
    ]
  },
  {
    "id": "sunday-salvia-officinalis",
    "name": "Common Sage",
    "botanicalName": "Salvia officinalis",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Andalusien (Reg.), Spain; Herzegovina, Bosnia & Herzegovina, 100m",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, spicy, herbal.",
    "sources": [
      {
        "label": "Sunday Natural · Salbeiöl Bio",
        "url": "https://www.sunday.de/salbei-oil.html"
      },
      {
        "label": "Sunday Natural · Salbeiöl wild",
        "url": "https://www.sunday.de/salbeioel-salvia-officinalis-wild-bosnien-und-herzegowina.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Salbeiöl Bio",
        "origin": "Andalusien (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/salbei-oil.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem frischen Kraut",
        "scentOriginal": "sehr aromatisch, süß, krautig-würzig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "constituentsOriginal": "α-Tuyon, Campher, 1,8-Cineol, α-Pinen, Camphen"
      },
      {
        "label": "Salbeiöl wild",
        "origin": "Herzegovina, Bosnia & Herzegovina, 100m",
        "regionIds": [
          "production-bosnia-herzegovina"
        ],
        "url": "https://www.sunday.de/salbeioel-salvia-officinalis-wild-bosnien-und-herzegowina.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, frisches Kraut",
        "scentOriginal": "Frisch-scharf, kraftvoll, warm-würzig, krautig",
        "cultivationOriginal": "/ Zertifizierung  | Kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von Wildsammlungs-Betrieb mit eigener Destille",
        "constituentsOriginal": "α-Thujon, Campher, 1,8-Cineol, α-Pinen, Camphen"
      }
    ],
    "regionIds": [
      "production-spain",
      "production-bosnia-herzegovina"
    ]
  },
  {
    "id": "sunday-copaifera-officinalis",
    "name": "Copaiba",
    "botanicalName": "Copaifera officinalis",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-brazil",
    "origin": "Amazonas-Regenwald, Brazil",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, balsamic, smoky.",
    "sources": [
      {
        "label": "Sunday Natural · Copaibaöl wild",
        "url": "https://www.sunday.de/copaibaoel-copaifera-officinalis-wild-brasilien-10ml.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Copaibaöl wild",
        "origin": "Amazonas-Regenwald, Brazil",
        "regionIds": [
          "production-brazil"
        ],
        "url": "https://www.sunday.de/copaibaoel-copaifera-officinalis-wild-brasilien-10ml.html",
        "extractionOriginal": "Fraktionierte Distillation aus dem Balsam",
        "scentOriginal": "mild, süß, cremig-balsamisch, holzig, rauchig",
        "cultivationOriginal": "kein Zertifikat, Wildsammlung, pestizidfrei und schwermetalfrei",
        "provenanceOriginal": "Direkt vom auf einheimische aromatische Pflanzen spezialisierten Hersteller mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte durch das Jahr hindurch",
        "constituentsOriginal": "β-Caryophilen"
      }
    ],
    "regionIds": [
      "production-brazil"
    ]
  },
  {
    "id": "sunday-coriandrum-sativum",
    "name": "Coriander",
    "botanicalName": "Coriandrum sativum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, spicy.",
    "sources": [
      {
        "label": "Sunday Natural · Korianderöl bio",
        "url": "https://www.sunday.de/korianderoel-coriandrum-sativum-bio-frankreich.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Korianderöl bio",
        "origin": "France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/korianderoel-coriandrum-sativum-bio-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation",
        "scentOriginal": "exotisch, holzig-würzig, süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2001",
        "provenanceOriginal": "Direkt von Farm mit eigener Destille",
        "constituentsOriginal": "Linalool, α-Pinen, ɣ-Terpinen, Limonen"
      }
    ],
    "regionIds": [
      "production-france"
    ]
  },
  {
    "id": "sunday-cupressus-sempervirens",
    "name": "Cypress",
    "botanicalName": "Cupressus sempervirens",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "France; Provence-Alpes-Côte d´Azur (Reg.), France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, resinous, green.",
    "sources": [
      {
        "label": "Sunday Natural · Zypressenöl Bio",
        "url": "https://www.sunday.de/zypressenoel-cupressus-sempervirens-bio-frankreich.html"
      },
      {
        "label": "Sunday Natural · Zypressenöl wild Bio",
        "url": "https://www.sunday.de/zypressenoel-wild-bio-frankreich-5ml.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Zypressenöl Bio",
        "origin": "France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/zypressenoel-cupressus-sempervirens-bio-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Blättern",
        "scentOriginal": "sehr aromatisch, harzig-frisch, grün",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2007",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Von Juli bis August und von Dezember bis März",
        "constituentsOriginal": "α-Pinen, δ-3-Caren, α-Terpenylacetat"
      },
      {
        "label": "Zypressenöl wild Bio",
        "origin": "Provence-Alpes-Côte d´Azur (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/zypressenoel-wild-bio-frankreich-5ml.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Blättern",
        "scentOriginal": "sehr aromatisch, harzig-frisch, grün",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2017",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Ernte aus Wildsammlung und nachhaltigem Bio-Anbau von Dezember bis März",
        "constituentsOriginal": "α-Pinen, δ-3-Caren, α-Terpenylacetat"
      }
    ],
    "regionIds": [
      "production-france"
    ]
  },
  {
    "id": "sunday-artemisia-pallens",
    "name": "Davana",
    "botanicalName": "Artemisia pallens",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-india",
    "origin": "India",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, fruity, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Davanaöl bio",
        "url": "https://www.sunday.de/davanaoel-bio-artemisia-pallens-indien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Davanaöl bio",
        "origin": "India",
        "regionIds": [
          "production-india"
        ],
        "url": "https://www.sunday.de/davanaoel-bio-artemisia-pallens-indien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, getrocknetes Kraut",
        "scentOriginal": "Warm-exotisch, fruchtig-süß, Noten von Aprikose & Honig",
        "cultivationOriginal": "kontrolliert biologischer Anbau seit 2014",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "constituentsOriginal": "Davanon, Bicyclogermacren, Zingiberen"
      }
    ],
    "regionIds": [
      "production-india"
    ]
  },
  {
    "id": "sunday-pseudotsuga-menziesii",
    "name": "Douglas Fir",
    "botanicalName": "Pseudotsuga menziesii",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, woody, fruity.",
    "sources": [
      {
        "label": "Sunday Natural · TannenölDouglas wild bio",
        "url": "https://www.sunday.de/tannenoel-douglas-pseudotsuga-menziesii-bio-wild-frankreich.html"
      }
    ],
    "productionVariants": [
      {
        "label": "TannenölDouglas wild bio",
        "origin": "France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/tannenoel-douglas-pseudotsuga-menziesii-bio-wild-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Nadeln",
        "scentOriginal": "frisch-holzig, fruchtig-orangig, nadelig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2001",
        "provenanceOriginal": "frisch-holzig, fruchtig-orangig, nadelig",
        "harvestOriginal": "Wildsammlung in den Wintermonaten",
        "constituentsOriginal": "β-Pinen, Sabinen, Terpinolen, δ-3-Caren, α-Pinen"
      }
    ],
    "regionIds": [
      "production-france"
    ]
  },
  {
    "id": "sunday-canarium-luzonicum",
    "name": "Elemi",
    "botanicalName": "Canarium luzonicum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-philippines",
    "origin": "Philippines",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, woody, resinous, balsamic, spicy, citrus, green.",
    "sources": [
      {
        "label": "Sunday Natural · Elemiöl",
        "url": "https://www.sunday.de/elemioel-canarium-luzonicum-philippinen.html"
      },
      {
        "label": "Sunday Natural · Elemi Heart-Öl",
        "url": "https://www.sunday.de/elemioel-heart-canarium-luzonicum-philippinen.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Elemiöl",
        "origin": "Philippines",
        "regionIds": [
          "production-philippines"
        ],
        "url": "https://www.sunday.de/elemioel-canarium-luzonicum-philippinen.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation des Harzes",
        "scentOriginal": "leicht, frisch-zitronig, pfeffrig, balsamisch, leicht grün-holzig, süß-würzig",
        "cultivationOriginal": "Kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von einer Kooperative und auf Handernte spezialisierten Farm auf den Philippinen",
        "harvestOriginal": "Reine Handernte von April bis Mai",
        "constituentsOriginal": "D-Limonen, α-Phellandren, Elemol, Elemicin, Sabinen"
      },
      {
        "label": "Elemi Heart-Öl",
        "origin": "Philippines",
        "regionIds": [
          "production-philippines"
        ],
        "url": "https://www.sunday.de/elemioel-heart-canarium-luzonicum-philippinen.html",
        "extractionOriginal": "Wasserdampfdestillation und Fraktionierung des Harzes",
        "scentOriginal": "aromatisch, rosig, würzig, leicht harzig",
        "cultivationOriginal": "Wildsammlung, kein Zertifikat",
        "provenanceOriginal": "Direkt von Kooperative und spezialisierter Farm",
        "constituentsOriginal": "D-Limonen, α-Phellandren, Paracymen, β-Phellandren"
      }
    ],
    "regionIds": [
      "production-philippines"
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
      },
      {
        "label": "Sunday Natural · Eukalyptusöl Bio",
        "url": "https://www.sunday.de/eukalyptusoel-eucalyptus-globulus-bio-spanien.html"
      },
      {
        "label": "Sunday Natural · Eukalyptusöl500M Wild Bio",
        "url": "https://www.sunday.de/eukalyptusoel-eucalyptus-globulus-bio-wild-portugal.html"
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
    ],
    "productionVariants": [
      {
        "label": "Eukalyptusöl Bio",
        "origin": "Andalusien (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/eukalyptusoel-eucalyptus-globulus-bio-spanien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Blättern",
        "scentOriginal": "sehr aromatisch, kampferartig, frisch, leicht scharf",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Über das gesamte Jahr verteilt",
        "constituentsOriginal": "1,8-Cineol (ca. 75%), ɑ-Pinen, Limonen, para-Cymen"
      },
      {
        "label": "Eukalyptusöl500M Wild Bio",
        "origin": "Zentralportugal (Reg.), Portugal",
        "regionIds": [
          "production-portugal"
        ],
        "url": "https://www.sunday.de/eukalyptusoel-eucalyptus-globulus-bio-wild-portugal.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Blättern",
        "scentOriginal": "sehr aromatisch, kampferartig, frisch, leicht süß",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2015",
        "provenanceOriginal": "Direkt von dem auf Handernte spezialisierten Familienunternehmen in Zentral-Portugal",
        "harvestOriginal": "Wildsammlung, Handernte über das Jahr verteilt",
        "constituentsOriginal": "1,8-Cineol (ca. 70%), α-Pinen"
      }
    ],
    "regionIds": [
      "australia",
      "production-spain",
      "production-portugal"
    ]
  },
  {
    "id": "sunday-eucalyptus-radiata",
    "name": "Eucalyptus · radiata",
    "botanicalName": "Eucalyptus radiata var. australiana",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Südost NSW/Nordost Victoria (Reg.), Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, citrus, fruity, minty.",
    "sources": [
      {
        "label": "Sunday Natural · Eukalyptusöl wild",
        "url": "https://www.sunday.de/eukalyptusoel-eucalyptus-radiata-wild-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Eukalyptusöl wild",
        "origin": "Südost NSW/Nordost Victoria (Reg.), Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/eukalyptusoel-eucalyptus-radiata-wild-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation aus frischen grünen Zweigen und Blättern",
        "scentOriginal": "sehr aromatisch frisch, mildes Eukalyptus aroma, fruchtig, dezent zitrisch-minzig",
        "cultivationOriginal": "Kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung und Kultur periodisch durch das Jahr, Handernte seit 2003",
        "constituentsOriginal": "1,8-Cineol (ca. 70%), ɑ-Terpineol, Limonen, β-Phellandran, ɑ-Pinen"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-larix-decidua",
    "name": "European Larch",
    "botanicalName": "Larix decidua",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-italy",
    "origin": "South Tyrol, Italy",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Woody, balsamic, floral.",
    "sources": [
      {
        "label": "Sunday Natural · Lärchenöl 2000 Meter wild bio",
        "url": "https://www.sunday.de/laerchenoel-larix-decidua-wild-bio-suedtirol.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Lärchenöl 2000 Meter wild bio",
        "origin": "South Tyrol, Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/laerchenoel-larix-decidua-wild-bio-suedtirol.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation aus den frischen Zweigen und Nadeln",
        "scentOriginal": "waldig, nadelholzartig, balsamisch-weich, mit floralen Noten",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 1995",
        "provenanceOriginal": "Direkt von dem auf lokale ätherische Ölpflanzen spezialisierten bio-zertifizierten Familienbetrieb mit eigener Destille",
        "harvestOriginal": "(Jahr, wenn alte ausverkauft sind)  | Wildsammlung durch reine Handernte von Juli bis Mitte September"
      }
    ],
    "regionIds": [
      "production-italy"
    ]
  },
  {
    "id": "sunday-foeniculum-vulgare",
    "name": "Fennel",
    "botanicalName": "Foeniculum vulgare",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Andalusien (Reg.), Spain",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, spicy, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Fenchelöl Bio",
        "url": "https://www.sunday.de/fencheloel-bio.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Fenchelöl Bio",
        "origin": "Andalusien (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/fencheloel-bio.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den Samen",
        "scentOriginal": "sehr aromatisch, honig-süß, mild-würzig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "constituentsOriginal": "Trans-Anethol (ca. 67%), Fenchon, ɑ-Pinen, Estragol"
      }
    ],
    "regionIds": [
      "production-spain"
    ]
  },
  {
    "id": "sunday-anthoxanthum-odoratum",
    "name": "Flouve Absolute · 20%",
    "botanicalName": "Anthoxanthum odoratum",
    "tiers": [],
    "families": [
      "Absolute"
    ],
    "regionId": "production-france",
    "origin": "Landes (Reg.), France",
    "originKind": "Absolute · production origin",
    "context": "The source product is a 20% grass absolute in 80% naturally derived triethyl citrate. It is a diluted absolute, rather than a pure steam-distilled essential oil.",
    "scentProfile": "Fresh, sweet, herbal, honey-like, hay-like.",
    "sources": [
      {
        "label": "Sunday Natural · Flouve Absolue",
        "url": "https://www.sunday.de/flouve-anthoxanthum-odoratum-absolue-frankreich.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Flouve Absolue",
        "origin": "Landes (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/flouve-anthoxanthum-odoratum-absolue-frankreich.html",
        "extractionOriginal": "Extraktion aus dem luftgetrockneten Gras (Absolue) (20%), Triethylcitrat (natürlich) (80%)",
        "scentOriginal": "süß, frisch geschnittenes Heu, krautig mit komplexen Noten von Honig, Vanille, Pflaume, Mimose",
        "cultivationOriginal": "Kein Zertifikat",
        "provenanceOriginal": "Direkt von der Farm mit eigener Extraktionsanlage",
        "harvestOriginal": "Von Mai bis September",
        "constituentsOriginal": "Coumarin"
      }
    ],
    "regionIds": [
      "production-france"
    ]
  },
  {
    "id": "sunday-agonis-fragrans",
    "name": "Fragonia",
    "botanicalName": "Agonis fragrans",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Westaustralien, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, woody, balsamic, spicy, citrus.",
    "sources": [
      {
        "label": "Sunday Natural · Fragoniaöl",
        "url": "https://www.sunday.de/fragoniaoel-agonis-fragrans-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Fragoniaöl",
        "origin": "Westaustralien, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/fragoniaoel-agonis-fragrans-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation aus frischen jungen Zweigen und Blättern",
        "scentOriginal": "sehr frisch-aromatisch, holzig-würzig, zitronig, dezente Zimt-Note, süß-balsamisch",
        "cultivationOriginal": "Keine Zertifizierung",
        "provenanceOriginal": "Direkt von einem kleinen auf den Anbau einheimischer regionaler Pflanzen spezialisierten Familienbetrieb mit eigener Destille",
        "harvestOriginal": "Nachhaltiger Anbau seit 2002, Ernte im November & Dezember",
        "constituentsOriginal": "1,8-Cineol, ɑ-Pinen, Linalool, ɑ-Terpineol, Myrtenol"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-frankincense-myrrh-blend",
    "name": "Frankincense & Myrrh · co-distillate",
    "botanicalName": "Boswellia & Commiphora species",
    "tiers": [],
    "families": [
      "Co-distillate"
    ],
    "regionId": "production-somalia",
    "origin": "Oman, Somalia",
    "originKind": "Co-distillate · production origins",
    "context": "The source describes equal parts of frankincense and myrrh resins distilled together in a traditional copper still. This co-distillate involves two botanical genera.",
    "scentProfile": "Woody, resinous, balsamic, citrus.",
    "sources": [
      {
        "label": "Sunday Natural · Weihrauchöl& Myrrhenölwild",
        "url": "https://www.sunday.de/weihrauchoel-boswellia-sacra-wild-oman-myrrhenoel-commiphora-myrrha-somalia.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Weihrauchöl& Myrrhenölwild",
        "origin": "Oman, Somalia",
        "regionIds": [
          "production-somalia",
          "production-oman"
        ],
        "url": "https://www.sunday.de/weihrauchoel-boswellia-sacra-wild-oman-myrrhenoel-commiphora-myrrha-somalia.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem Harz",
        "scentOriginal": "tief-harzig, warm, harzig-holzig, balsamisch, dezente zitrus note",
        "cultivationOriginal": "Kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "periodische Wildsammlung durch reine Handernte",
        "constituentsOriginal": "α-Pinen, δ-3-Caren, Curzeren, Furanoeudesma-1,3-dien, β-Elemen"
      }
    ],
    "regionIds": [
      "production-somalia",
      "production-oman"
    ]
  },
  {
    "id": "sunday-boswellia-carterii",
    "name": "Frankincense · carterii",
    "botanicalName": "Boswellia carterii",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-somalia",
    "origin": "Somalia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, resinous, spicy, floral.",
    "sources": [
      {
        "label": "Sunday Natural · Weihrauchöl Bio (B. carterii)",
        "url": "https://www.sunday.de/weihrauchoel-wild-bio-5ml-somalia.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Weihrauchöl Bio (B. carterii)",
        "origin": "Somalia",
        "regionIds": [
          "production-somalia"
        ],
        "url": "https://www.sunday.de/weihrauchoel-wild-bio-5ml-somalia.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem Harz",
        "scentOriginal": "sehr aromatisch, harzig-frisch, würzig, dezent süßlich-floral",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Mai bis September",
        "constituentsOriginal": "α-Pinen, Limonen, p-Cymen, Mycren"
      },
      {
        "label": "Weihrauchöl(B. carterii) wild Bio",
        "origin": "Somalia",
        "regionIds": [
          "production-somalia"
        ],
        "url": "https://www.sunday.de/weihrauchoel-wild-bio-5ml-somalia.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem Harz",
        "scentOriginal": "sehr aromatisch, harzig-frisch, würzig, dezent süßlich-floral",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Mai bis September",
        "constituentsOriginal": "α-Pinen, Limonen, p-Cymen, Mycren"
      }
    ],
    "regionIds": [
      "production-somalia"
    ]
  },
  {
    "id": "sunday-boswellia-neglecta",
    "name": "Frankincense · neglecta",
    "botanicalName": "Boswellia neglecta",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-kenya",
    "origin": "Nord Kenya",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Woody, spicy, smoky.",
    "sources": [
      {
        "label": "Sunday Natural · Weihrauchöl (B. neglecta)Wild Bio",
        "url": "https://www.sunday.de/weihrauchoel-boswellia-neglecta-bio-wild-kenia.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Weihrauchöl (B. neglecta)Wild Bio",
        "origin": "Nord Kenya",
        "regionIds": [
          "production-kenya"
        ],
        "url": "https://www.sunday.de/weihrauchoel-boswellia-neglecta-bio-wild-kenia.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem Harz",
        "scentOriginal": "sehr intensiv, holzig-würzig, rauchig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2007",
        "provenanceOriginal": "Direkt von der auf Wildsammlung und Handernte spezialisierten Farm im tropischen Kenia",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Juli bis November",
        "constituentsOriginal": "α-Pinen, Terpinen-4-Ol, α-Thujen, p-Cymen"
      }
    ],
    "regionIds": [
      "production-kenya"
    ]
  },
  {
    "id": "sunday-boswellia-rivae",
    "name": "Frankincense · rivae",
    "botanicalName": "Boswellia rivae",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-ethiopia",
    "origin": "Ethiopia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, woody, resinous, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Weihrauchöl (B. rivae) wild bio",
        "url": "https://www.sunday.de/weihrauchoel-boswellia-rivae-bio-wild-aethiopien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Weihrauchöl (B. rivae) wild bio",
        "origin": "Ethiopia",
        "regionIds": [
          "production-ethiopia"
        ],
        "url": "https://www.sunday.de/weihrauchoel-boswellia-rivae-bio-wild-aethiopien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem Harz",
        "scentOriginal": "harzig-holzige Frische, süßlich-herb, ein Hauch von Zeder",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte über das gesamte Jahr verteilt"
      }
    ],
    "regionIds": [
      "production-ethiopia"
    ]
  },
  {
    "id": "sunday-boswellia-sacra",
    "name": "Frankincense · sacra",
    "botanicalName": "Boswellia sacra",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-oman",
    "origin": "Oman",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, balsamic, citrus, green.",
    "sources": [
      {
        "label": "Sunday Natural · Weihrauchöl(B. sacra)wild",
        "url": "https://www.sunday.de/weihrauchoel-boswellia-sacra-wild-oman.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Weihrauchöl(B. sacra)wild",
        "origin": "Oman",
        "regionIds": [
          "production-oman"
        ],
        "url": "https://www.sunday.de/weihrauchoel-boswellia-sacra-wild-oman.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation aus Harz",
        "scentOriginal": "Aromatisch, opulent, frisch, grün-zitronig, balsamisch",
        "cultivationOriginal": "/ Zertifizierung  | Wildsammlung, kein Zertifikat",
        "provenanceOriginal": "Direkt von Farm mit eigener Destille",
        "constituentsOriginal": "α-Pinen, Limonen, δ-3-Caren"
      }
    ],
    "regionIds": [
      "production-oman"
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
    "id": "sunday-matricaria-chamomilla",
    "name": "German Chamomile",
    "botanicalName": "Matricaria chamomilla",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-bulgaria",
    "origin": "Thrakisches Tal (Reg.), Bulgaria",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, herbal, fruity, hay-like.",
    "sources": [
      {
        "label": "Sunday Natural · Kamillenölblaubio",
        "url": "https://www.sunday.de/kamillenoel-matricaria-chamomila-bio-bulgarien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Kamillenölblaubio",
        "origin": "Thrakisches Tal (Reg.), Bulgaria",
        "regionIds": [
          "production-bulgaria"
        ],
        "url": "https://www.sunday.de/kamillenoel-matricaria-chamomila-bio-bulgarien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blüten",
        "scentOriginal": "warm, süß, krautig, fruchtig, heuartig, tabakartig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "August bis September",
        "constituentsOriginal": "β-Farnesen, ɑ-Farnesen, ɑ-Bisabolol, ɑ-Bisabololoxid B, Chamazulen"
      }
    ],
    "regionIds": [
      "production-bulgaria"
    ]
  },
  {
    "id": "sunday-zingiber-officinale",
    "name": "Ginger",
    "botanicalName": "Zingiber officinale",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-madagascar",
    "origin": "Analamanga (Reg.), Madagascar",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, fruity.",
    "sources": [
      {
        "label": "Sunday Natural · Ingweröl 1000m Bio",
        "url": "https://www.sunday.de/ingweroel-zingiber-officinale-bio-madagaskar-1000m.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Ingweröl 1000m Bio",
        "origin": "Analamanga (Reg.), Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/ingweroel-zingiber-officinale-bio-madagaskar-1000m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Wurzeln",
        "scentOriginal": "spritzig-scharf, frisch, fruchtig-saftig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2017",
        "provenanceOriginal": "Direkt von eine Kooperative und auf Handernte spezialisierten Farm im tropischen Madagaskar",
        "harvestOriginal": "Reine Handernte von Mai bis November",
        "constituentsOriginal": "Zingiberen, Limonen, β-Phellandren, Camphen, β-Sesquiphellandren"
      }
    ],
    "regionIds": [
      "production-madagascar"
    ]
  },
  {
    "id": "sunday-hedychium-spicatum",
    "name": "Ginger Lily",
    "botanicalName": "Hedychium spicatum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-nepal",
    "origin": "Daman (Reg.), Nepal",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, woody, spicy, floral.",
    "sources": [
      {
        "label": "Sunday Natural · Ingwerlilienöl 1000m wild Bio",
        "url": "https://www.sunday.de/ingwerlilienoel-hedychium-spicatum-wild-bio-nepal-1000-1400m.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Ingwerlilienöl 1000m wild Bio",
        "origin": "Daman (Reg.), Nepal",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/ingwerlilienoel-hedychium-spicatum-wild-bio-nepal-1000-1400m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Wurzeln",
        "scentOriginal": "warm-holzig, süß-würzige frische, dezent pudrig-florale Note",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte im August und September",
        "constituentsOriginal": "Curzerenon, Kampfer, Eucalyptol, Curzerene"
      }
    ],
    "regionIds": [
      "production-nepal"
    ]
  },
  {
    "id": "sunday-citrus-paradisi",
    "name": "Grapefruit",
    "botanicalName": "Citrus paradisi",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-italy",
    "origin": "Sicily (Reg.), Italy",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, fruity, green.",
    "sources": [
      {
        "label": "Sunday Natural · Grapefruitöl bio",
        "url": "https://www.sunday.de/grapefruitol-bio.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Grapefruitöl bio",
        "origin": "Sicily (Reg.), Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/grapefruitol-bio.html",
        "extractionOriginal": "Schonende Kaltpressung, aus frischen Fruchtschalen",
        "scentOriginal": "sehr aromatisch, saftig-grün, fruchtig-süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2002",
        "provenanceOriginal": "Direkt von dem auf Zitrus-Früchten spezialisierten Familienbetrieb im mediterranen Sizilien",
        "harvestOriginal": "Reine Handernte von Dezember bis März",
        "constituentsOriginal": "Limonen, Myrcen, Sabinen"
      }
    ],
    "regionIds": [
      "production-italy"
    ]
  },
  {
    "id": "sunday-thujopsis-dolabrata",
    "name": "Hiba",
    "botanicalName": "Thujopsis dolabrata",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-japan",
    "origin": "Aomori (Präf.), Japan",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Woody, resinous, earthy.",
    "sources": [
      {
        "label": "Sunday Natural · Hibaöl",
        "url": "https://www.sunday.de/hibaoel-thujopsis-dolabrata-japan.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Hibaöl",
        "origin": "Aomori (Präf.), Japan",
        "regionIds": [
          "production-japan"
        ],
        "url": "https://www.sunday.de/hibaoel-thujopsis-dolabrata-japan.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation der Hiba-Holzspähne, gewonnen aus Abfällen der Holzwirtschaft.",
        "scentOriginal": "sehr aromatisch, holzig-harzig, tief-erdig, zedernartig",
        "cultivationOriginal": "Nicht zertifiziert, Konventionell",
        "provenanceOriginal": "Direkt von einem auf einheimische Pflanzen spezialisierten Hersteller mit eigener Destille",
        "harvestOriginal": "Durch das Jahr hindurch",
        "constituentsOriginal": "cis-Thujopsen, α-Cedrol, α-Cuprenen, β-Himachalen"
      }
    ],
    "regionIds": [
      "production-japan"
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
      },
      {
        "label": "Sunday Natural · Zedernöl 1500-3200m wild bio",
        "url": "https://www.sunday.de/en/himalaya-cedar-oil-cedrus-deodara-wildcrafted-organic-nepal.html"
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
    ],
    "productionVariants": [
      {
        "label": "Zedernöl 1500-3200m wild bio",
        "origin": "Bagmati, Nepal",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/en/himalaya-cedar-oil-cedrus-deodara-wildcrafted-organic-nepal.html",
        "extractionOriginal": "Gentle steam distillation of the wood and roots",
        "scentOriginal": "Very aromatic, fresh, woody, sweet, resinous, spicy",
        "cultivationOriginal": "Certified organic cultivation since 2018",
        "provenanceOriginal": "Sourced directly from a farm specialised in native plants, with an on-site distillery",
        "harvestOriginal": "Wildcrafted; hand-harvested from October to December",
        "constituentsOriginal": "β-Himachalene, α-Himachalene, Himachalol, ɣ-Himachalene"
      }
    ],
    "regionIds": [
      "himalaya",
      "production-nepal"
    ]
  },
  {
    "id": "sunday-abies-spectabilis",
    "name": "Himalayan Fir",
    "botanicalName": "Abies spectabilis",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-nepal",
    "origin": "Bagmati (Prov.), Nepal",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, resinous, earthy.",
    "sources": [
      {
        "label": "Sunday Natural · Tannenöl Himalaya wild bio",
        "url": "https://www.sunday.de/himalaya-tannenoel-abies-spectabilis-bio-wild-nepal.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Tannenöl Himalaya wild bio",
        "origin": "Bagmati (Prov.), Nepal",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/himalaya-tannenoel-abies-spectabilis-bio-wild-nepal.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Nadeln",
        "scentOriginal": "intensiv aromatisch-frisch, moosig-erdig, nadelig-harzig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2018",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von September bis Februar",
        "constituentsOriginal": "Limonen, α-Pinen, α-Fenchen, Isopulegyl-Acetat, β-Pinen"
      }
    ],
    "regionIds": [
      "production-nepal"
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
    "id": "sunday-rhododendron-anthopogon",
    "name": "Himalayan Rhododendron",
    "botanicalName": "Rhododendron anthopogon",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-nepal",
    "origin": "Bagmati (Prov.), Nepal",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, woody, fruity, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Rhododendronöl 3600m wild",
        "url": "https://www.sunday.de/rhododendronoel-rhododendron-anthopogon-bio-wild-nepal-3600m.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Rhododendronöl 3600m wild",
        "origin": "Bagmati (Prov.), Nepal",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/rhododendronoel-rhododendron-anthopogon-bio-wild-nepal-3600m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blättern und Blüten",
        "scentOriginal": "aromatisch frische Süße, holzig-herb, fruchtig-leicht",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2013",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Februar bis Juni",
        "constituentsOriginal": "α-Pinen, β-Pinen, ɣ-Cardinen, Limonen"
      }
    ],
    "regionIds": [
      "production-nepal"
    ]
  },
  {
    "id": "sunday-gaultheria-fragrantissima",
    "name": "Himalayan Wintergreen",
    "botanicalName": "Gaultheria fragrantissima",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-nepal",
    "origin": "Nepal",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, spicy, minty.",
    "sources": [
      {
        "label": "Sunday Natural · Wintergrünöl 2400 Meter wild bio",
        "url": "https://www.sunday.de/wintergruenoel-gaultheria-fragrantissima-bio-nepal.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Wintergrünöl 2400 Meter wild bio",
        "origin": "Nepal",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/wintergruenoel-gaultheria-fragrantissima-bio-nepal.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus Zweigen und Blättern",
        "scentOriginal": "Kräftig aromatisch, minzig-süß, dezent mentholig, leicht würzig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Juni bis August",
        "constituentsOriginal": "Methylsalicylat (99%)"
      }
    ],
    "regionIds": [
      "production-nepal"
    ]
  },
  {
    "id": "sunday-chamaecyparis-obtusa",
    "name": "Hinoki",
    "botanicalName": "Chamaecyparis obtusa",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-japan",
    "origin": "Präfektur Kōchi, Japan",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Woody, resinous.",
    "sources": [
      {
        "label": "Sunday Natural · Hinokiöl",
        "url": "https://www.sunday.de/hinokioel-chamaecyparis-obtusa-japan.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Hinokiöl",
        "origin": "Präfektur Kōchi, Japan",
        "regionIds": [
          "production-japan"
        ],
        "url": "https://www.sunday.de/hinokioel-chamaecyparis-obtusa-japan.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation aus dem Holz",
        "scentOriginal": "Aromatisch, holzig-harzig, zedernartig",
        "cultivationOriginal": "Unbewirtschaftete Plantagen, pestizidfrei",
        "provenanceOriginal": "Direkt von spezialisiertem Hersteller mit Destille",
        "constituentsOriginal": "ɑ-Pinen, δ-Cadinen, γ-Cadinen, α-Cedrol"
      }
    ],
    "regionIds": [
      "production-japan"
    ]
  },
  {
    "id": "sunday-cinnamomum-camphora-ho-wood",
    "name": "Ho Wood",
    "botanicalName": "Cinnamomum camphora var. linaloolofera",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-china",
    "origin": "Süd-China",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet forest honey with subtle resinous and floral facets.",
    "sources": [
      {
        "label": "Sunday Natural · Ho-Holzöl wild bio",
        "url": "https://www.sunday.de/ho-holzoel-cinnamomum-camphora-linaloolofera-bio-wild-china.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Ho-Holzöl wild bio",
        "origin": "Süd-China",
        "regionIds": [
          "production-china"
        ],
        "url": "https://www.sunday.de/ho-holzoel-cinnamomum-camphora-linaloolofera-bio-wild-china.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem Holz",
        "scentOriginal": "aromatisch-süß, Waldhonig, dezent harzig-floral",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2015",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung und Kultur durch reine Handernte über das Jahr verteilt",
        "constituentsOriginal": "Linalool, Trans-Linalol-Oxyd, Limonen"
      }
    ],
    "regionIds": [
      "production-china"
    ]
  },
  {
    "id": "sunday-melaleuca-teretifolia",
    "name": "Honey Myrtle",
    "botanicalName": "Melaleuca teretifolia",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Südwest Westaustralien, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, herbal, citrus, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Myrtenöl Honigmyrte",
        "url": "https://www.sunday.de/myrtenoel-honigmyrte-meleleuca-teretifolia-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Myrtenöl Honigmyrte",
        "origin": "Südwest Westaustralien, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/myrtenoel-honigmyrte-meleleuca-teretifolia-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Blättern und Zweigenden",
        "scentOriginal": "Honig-süß, zitronig-frisch, dezent krautige Note",
        "cultivationOriginal": "Kein Zertifikat",
        "provenanceOriginal": "Direkt von einem auf einheimische Pflanzen spezialisierten Familienbetrieb mit eigener Destille",
        "harvestOriginal": "Nachhaltiger Anbau seit 2002, Ernte im Januar",
        "constituentsOriginal": "Geranial, Neral, Dehydro-1,8-cineole, Myrcen, Geraniol"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-hyssopus-officinalis",
    "name": "Hyssop",
    "botanicalName": "Hyssopus officinalis",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-italy",
    "origin": "Italy",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, spicy, herbal.",
    "sources": [
      {
        "label": "Sunday Natural · Ysopöl bio",
        "url": "https://www.sunday.de/ysopoel-hyssopus-officinalis-bio-italien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Ysopöl bio",
        "origin": "Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/ysopoel-hyssopus-officinalis-bio-italien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation frischer Blätter",
        "scentOriginal": "aromatisch, krautig-würzig, süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2001",
        "provenanceOriginal": "Direkt von Farm mit eigener Destille",
        "constituentsOriginal": "Pinocamphon, β-Pinen, Germacren D"
      }
    ],
    "regionIds": [
      "production-italy"
    ]
  },
  {
    "id": "sunday-psiadia-altissima",
    "name": "Iary",
    "botanicalName": "Psiadia altissima",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-madagascar",
    "origin": "Vakinankaratra, Madagascar",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody.",
    "sources": [
      {
        "label": "Sunday Natural · Iaryöl 1000m Wild Bio",
        "url": "https://www.sunday.de/en/iaryoil-psiadia-altissima-organic-wild-madagascar.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Iaryöl 1000m Wild Bio",
        "origin": "Vakinankaratra, Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/en/iaryoil-psiadia-altissima-organic-wild-madagascar.html",
        "extractionOriginal": "Gentle steam distillation, fresh petals and leaves",
        "scentOriginal": "Aromatic, woody, sweet",
        "cultivationOriginal": "Certified organic since 2015",
        "provenanceOriginal": "Sourced directly from the farm in Madagascar, which specialises in wildcrafting and harvesting by hand.",
        "harvestOriginal": "Wildcrafted; harvested by hand throughout the year",
        "constituentsOriginal": "β-Pinene, Germacren D, Trans-β-Ocimen, ɑ-Pinene"
      }
    ],
    "regionIds": [
      "production-madagascar"
    ]
  },
  {
    "id": "sunday-helichrysum-italicum",
    "name": "Immortelle",
    "botanicalName": "Helichrysum italicum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-bosnia-herzegovina",
    "origin": "Bosnia & Herzegovina",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, fruity, honey-like, hay-like.",
    "sources": [
      {
        "label": "Sunday Natural · Immortellenöl wild",
        "url": "https://www.sunday.de/immortellenoel-helichrysum-italicum-wild-bosnien-und-herzegowina.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Immortellenöl wild",
        "origin": "Bosnia & Herzegovina",
        "regionIds": [
          "production-bosnia-herzegovina"
        ],
        "url": "https://www.sunday.de/immortellenoel-helichrysum-italicum-wild-bosnien-und-herzegowina.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem frischen blühenden Kraut",
        "scentOriginal": "warm, intensiv, heuartig, amberartig-süß, honigartig, teeartig, süß-fruchtig",
        "cultivationOriginal": "Kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "constituentsOriginal": "α-Pinen, Selinen, ɣ-Curcumen, Nerylacetat"
      }
    ],
    "regionIds": [
      "production-bosnia-herzegovina"
    ]
  },
  {
    "id": "sunday-cinnamomum-tamala",
    "name": "Indian Cassia",
    "botanicalName": "Cinnamomum tamala",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-nepal",
    "origin": "Bergregion, Nepal",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Woody, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Cassiaöl indisch 500-2000M wild bio",
        "url": "https://www.sunday.de/cassiaoel-cinnamomum-tamala-bio-wild-nepal.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Cassiaöl indisch 500-2000M wild bio",
        "origin": "Bergregion, Nepal",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/cassiaoel-cinnamomum-tamala-bio-wild-nepal.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen oder halbtrockenen Blättern",
        "scentOriginal": "sehr aromatisch, zimtähnlich, grasig trocken, holzig, leicht scharf",
        "cultivationOriginal": "Zertifzierte Bio-Qualität seit 2020",
        "provenanceOriginal": "Direkt von einem nepalesichen Familienbetrieb mit eigener Destille, die sich auf die Kultivierung und Wildsammlung einheimischer medizinischer- und Aromapflanzen spezialisiert hat",
        "harvestOriginal": "Wildsammlung durch reine Handernte von August bis November",
        "constituentsOriginal": "Linalool, 1,8-Cineol, ɑ- und β- Pinen, Camphor, Limonen"
      }
    ],
    "regionIds": [
      "production-nepal"
    ]
  },
  {
    "id": "sunday-inula-graveolens",
    "name": "Inula",
    "botanicalName": "Inula graveolens",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "Korsika, France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, spicy, herbal, floral, minty, camphoraceous.",
    "sources": [
      {
        "label": "Sunday Natural · Alantölbio",
        "url": "https://www.sunday.de/alantoel-inula-graveolens-bio-frankreich.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Alantölbio",
        "origin": "Korsika, France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/alantoel-inula-graveolens-bio-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus der blühenden Pflanze",
        "scentOriginal": "sehr aromatisch, krautig, minzig-kampferartig, dezent würzig und blumig-süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2001",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Von Oktober bis November",
        "constituentsOriginal": "Bornylacetat, Borneol, Camphen"
      }
    ],
    "regionIds": [
      "production-france"
    ]
  },
  {
    "id": "sunday-pinus-banksiana",
    "name": "Jack Pine",
    "botanicalName": "Pinus banksiana",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-canada",
    "origin": "Québec, Canada",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Woody, resinous, citrus, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Bankskiefernöl wildbio",
        "url": "https://www.sunday.de/bankskiefer-oel-pinus-banksiana-wild-bio-kanada.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Bankskiefernöl wildbio",
        "origin": "Québec, Canada",
        "regionIds": [
          "production-canada"
        ],
        "url": "https://www.sunday.de/bankskiefer-oel-pinus-banksiana-wild-bio-kanada.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Nadeln",
        "scentOriginal": "sehr aromatisch, holzig-harzig, waldhonigartig, dezente Zitrusnote im Abgang",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2015",
        "provenanceOriginal": "Direkt von einem auf einheimische Pflanzen des borealen Nadelwaldes spezialisierten Herstellers mit eigener Destille",
        "harvestOriginal": "Wildsammlung, von Mai bis Oktober",
        "constituentsOriginal": "α-Pinen, β-Pinen, Limonen, Δ3-Caren"
      }
    ],
    "regionIds": [
      "production-canada"
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
    ],
    "productionVariants": [
      {
        "label": "Wacholderöl 800-1600m wild bio",
        "origin": "Balkan, Rhodopen & Rila-Gebirge, Bulgaria (800–1600 m)",
        "regionIds": [
          "production-bulgaria",
          "production-bosnia-herzegovina"
        ],
        "url": "https://www.sunday.de/wacholderbeerenoel-juniperus-communis-wild-bio-bulgarien.html",
        "originNote": "The catalogue lists Bulgaria; the product metadata lists Balkan, Rhodopen & Rila-Gebirge, Bulgaria (800–1600 m).",
        "extractionOriginal": "Wasserdampfdestillation frisch gepflückter Beeren",
        "scentOriginal": "Aromatisch-frisch, balsamisch-warm, kiefernartig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2018",
        "provenanceOriginal": "Direkt von bio-zertifizierter Farm mit eigener Destille",
        "constituentsOriginal": "ɑ-Pinen, Myrcen, Sabinen, Limonen"
      }
    ],
    "regionIds": [
      "eurasia",
      "production-bulgaria",
      "production-bosnia-herzegovina"
    ]
  },
  {
    "id": "sunday-juniperus-communis-leaf",
    "name": "Juniper Leaf",
    "botanicalName": "Juniperus communis var. nana",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-italy",
    "origin": "hochalpine Regionen in South Tyrol, Italy; Hochgebirgsketten Nepals",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, balsamic, spicy.",
    "sources": [
      {
        "label": "Sunday Natural · Wacholderöl 1900 Meter wild bio",
        "url": "https://www.sunday.de/wacholderoel-juniperus-communis-var-nana-wild-bio-suedtirol.html"
      },
      {
        "label": "Sunday Natural · Wacholderöl 3000-3500m wild bio",
        "url": "https://www.sunday.de/wacholderoel-juniperus-communis-wild-bio-nepal.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Wacholderöl 1900 Meter wild bio",
        "origin": "hochalpine Regionen in South Tyrol, Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/wacholderoel-juniperus-communis-var-nana-wild-bio-suedtirol.html",
        "extractionOriginal": "handwerkliche und schonende Wasserdampfdestillation, aus den benadeltern Zweigen",
        "scentOriginal": "aromatisch-würzig, kiefernartig, balsamisch, kräftig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 1995",
        "provenanceOriginal": "Direkt von dem auf lokale ätherische Ölpflanzen spezialisierten bio-zertifizierten Familienbetrieb mit eigener Destille",
        "harvestOriginal": "(Jahr, wenn alte ausverkauft sind)  | Wildsammlung durch reine Handernte im Mai und November",
        "constituentsOriginal": "Sabinen, α-Pinen, Thyopsen, γ-Terpinen, β-Myrcen, δ-Cadinen, Terpinen-4-Ol, Limonen"
      },
      {
        "label": "Wacholderöl 3000-3500m wild bio",
        "origin": "Hochgebirgsketten Nepals",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/wacholderoel-juniperus-communis-wild-bio-nepal.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frisch gepflückten Blättern",
        "scentOriginal": "aromatisch-frisch, baslamisch-warm, kiefernartig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von dem auf lokale ätherische Ölpflanzen spezialisierten bio-zertifizierten Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Februar bis April",
        "constituentsOriginal": "δ-3-Caren, α-Pinen, Limonen, Myrcen, trans-Calamenen, δ-Cadinen"
      }
    ],
    "regionIds": [
      "production-italy",
      "production-nepal"
    ]
  },
  {
    "id": "sunday-kunzea-ericoides",
    "name": "Kanuka",
    "botanicalName": "Kunzea ericoides",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-new-zealand",
    "origin": "Waikato (Reg.), New Zealand",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, resinous, spicy, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Kanukaöl Wild Bio",
        "url": "https://www.sunday.de/kanukaoel-kunzea-ericoides-wild-bio-neuseeland.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Kanukaöl Wild Bio",
        "origin": "Waikato (Reg.), New Zealand",
        "regionIds": [
          "production-new-zealand"
        ],
        "url": "https://www.sunday.de/kanukaoel-kunzea-ericoides-wild-bio-neuseeland.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation frischer Zweige/Blätter",
        "scentOriginal": "sehr aromatisch, harzig, honig-süß, dezent würzig",
        "cultivationOriginal": "/ Zertifizierung  | Zertifizierte Bio-Qualität seit 2000",
        "provenanceOriginal": "Von einem auf Kanuka und Manuka spezialisierten Familienbetrieb",
        "constituentsOriginal": "ɑ-Pinen, Viridiflorol, 1,8-Cineol, Calamen, Ledol"
      }
    ],
    "regionIds": [
      "production-new-zealand"
    ]
  },
  {
    "id": "sunday-cedrelopsis-grevei",
    "name": "Katrafay",
    "botanicalName": "Cedrelopsis grevei",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-madagascar",
    "origin": "Fitovinany (Reg.), Madagascar",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, resinous, earthy, green.",
    "sources": [
      {
        "label": "Sunday Natural · Katrafayöl wild bio",
        "url": "https://www.sunday.de/katrafayoel-cedrelopsis-grevei-wild-bio-fitovinany-madagaskar.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Katrafayöl wild bio",
        "origin": "Fitovinany (Reg.), Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/katrafayoel-cedrelopsis-grevei-wild-bio-fitovinany-madagaskar.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus der Rinde",
        "scentOriginal": "aromatisch, grün, erdig, harzig-süß, dezent holzig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2001",
        "provenanceOriginal": "Direkt von familiengeführter Farm mit eigener Destille im tropischen Madagaskar",
        "harvestOriginal": "Wildsammlung durch traditionelle Handernte von April bis September",
        "constituentsOriginal": "Ishwarane, δ-Cadinen, β-Selinen, ɑ-Muurolen, ɑ-Copaen"
      }
    ],
    "regionIds": [
      "production-madagascar"
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
    ],
    "productionVariants": [
      {
        "label": "Limettenöl bio",
        "origin": "Sicily (Reg.) Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/limettenoel-citrus-aurantiifolia-bio-italien.html",
        "extractionOriginal": "Schonende Kaltpressung, aus den frischen Fruchtschalen",
        "scentOriginal": "sehr aromatisch, zitrisch-süß, krautig-grün",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2002",
        "provenanceOriginal": "Direkt von einer auf Zitrus-Früchten spezialisierten Farm im mediterranen Sizilien",
        "harvestOriginal": "Reine Handernte von August bis Oktober",
        "constituentsOriginal": "Limonene, γ-Terpinen, β-Pinen, β-Cariophyllen"
      }
    ],
    "regionIds": [
      "himalaya",
      "production-italy"
    ]
  },
  {
    "id": "sunday-kunzea-ambigua",
    "name": "Kunzea",
    "botanicalName": "Kunzea ambigua",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Flinders Iceland (Reg.), Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, spicy.",
    "sources": [
      {
        "label": "Sunday Natural · Kunzeaöl wild",
        "url": "https://www.sunday.de/kunzeaoel-kunzea-ambigua-wild-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Kunzeaöl wild",
        "origin": "Flinders Iceland (Reg.), Australia",
        "regionIds": [
          "production-australia",
          "production-iceland"
        ],
        "url": "https://www.sunday.de/kunzeaoel-kunzea-ambigua-wild-australien.html",
        "originNote": "The catalogue lists Australia; the product metadata lists Flinders Iceland (Reg.), Australia.",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blättern und Zweigen",
        "scentOriginal": "sehr aromatisch, eukalyptusartig, süß-würzig, holzig",
        "cultivationOriginal": "Kein Zertifikat, Wildsammlung, pestizidfrei",
        "provenanceOriginal": "Direkt von einem auf einheimische Pflanzen spezialisierten Familienbetrieb mit eigener Destille",
        "harvestOriginal": "Wildsammlung der frischen Zweige und Blätter zwischen September bis Mai",
        "constituentsOriginal": "α-Pinen, Viridiflorol, 1,8-Cineol, Leden"
      }
    ],
    "regionIds": [
      "production-australia",
      "production-iceland"
    ]
  },
  {
    "id": "sunday-rhododendron-groenlandicum",
    "name": "Labrador Tea",
    "botanicalName": "Rhododendron groenlandicum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-canada",
    "origin": "Quebec, Canada",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, spicy, herbal, earthy, green.",
    "sources": [
      {
        "label": "Sunday Natural · Ledumöl Wild bio",
        "url": "https://www.sunday.de/ledumoel-rhododendron-groenlandicum-wild-bio-kanada.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Ledumöl Wild bio",
        "origin": "Quebec, Canada",
        "regionIds": [
          "production-canada"
        ],
        "url": "https://www.sunday.de/ledumoel-rhododendron-groenlandicum-wild-bio-kanada.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blättern",
        "scentOriginal": "komplexes Aroma, würzig, holzig-krautig, süß, grün, dezent erdig, moosartig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt vom Hersteller, der mit nachhaltigen Destillationsprozessen arbeitet.",
        "harvestOriginal": "Wildsammlung durch Handernte im Juli und August",
        "constituentsOriginal": "Sabinen, γ-Terpinen, Terpinen-4-ol, β-Selinen"
      }
    ],
    "regionIds": [
      "production-canada"
    ]
  },
  {
    "id": "sunday-lavandula-intermedia",
    "name": "Lavandin Grosso",
    "botanicalName": "Lavandula intermedia",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "Drôme Provençale (Dep.), Auvergne-Rhône-Alpes (Reg.), France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, spicy.",
    "sources": [
      {
        "label": "Sunday Natural · Lavandinöl Grosso 700-1100m Bio",
        "url": "https://www.sunday.de/lavandinoel-lavandula-intermedia-grosso-bio-frankreich.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Lavandinöl Grosso 700-1100m Bio",
        "origin": "Drôme Provençale (Dep.), Auvergne-Rhône-Alpes (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/lavandinoel-lavandula-intermedia-grosso-bio-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blütenständen",
        "scentOriginal": "frisch, klar, würzig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2009",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Im Juli",
        "constituentsOriginal": "Linalool, Linalylacetat, Kampfer, Eukalyptol"
      }
    ],
    "regionIds": [
      "production-france"
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
      },
      {
        "label": "Sunday Natural · Zitronenöl Bio",
        "url": "https://www.sunday.de/zitronenoel-citrus-gelb-bio-italien.html"
      },
      {
        "label": "Sunday Natural · Zitronenöl grün Bio",
        "url": "https://www.sunday.de/zitronenoel-citrus-limon-gruen-bio-italien.html"
      },
      {
        "label": "Sunday Natural · Zitronenöl Bio",
        "url": "https://www.sunday.de/bio-spanien-zitronenoel.html"
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
    ],
    "productionVariants": [
      {
        "label": "Zitronenöl Bio",
        "origin": "Sicily (Reg.) Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/zitronenoel-citrus-gelb-bio-italien.html",
        "extractionOriginal": "Schonende Kaltpressung frischer Fruchtschalen",
        "scentOriginal": "sehr aromatisch, fruchtig-saftig, spritzig-gelb",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2002",
        "provenanceOriginal": "Direkt von auf Zitrusfrüchte spezialisierter Farm",
        "constituentsOriginal": "Limonen, β-Pinen, ɣ-Terpinen, β-Bisabolen"
      },
      {
        "label": "Zitronenöl grün Bio",
        "origin": "Sicily (Reg.) Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/zitronenoel-citrus-limon-gruen-bio-italien.html",
        "extractionOriginal": "Schonende Kaltpressung, aus den frischen Fruchtschalen",
        "scentOriginal": "zitronig-frisch, leicht süß, aromatisch",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2002",
        "provenanceOriginal": "Direkt von einer auf Zitrus-Früchten spezialisierten Farm.",
        "constituentsOriginal": "Limonen, β-Pinen, ɣ-Terpinen, β-Bisabolen"
      },
      {
        "label": "Zitronenöl Bio",
        "origin": "Murcia (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/bio-spanien-zitronenoel.html",
        "extractionOriginal": "Schonende Kaltpressung aus den frischen Fruchtschalen",
        "scentOriginal": "sehr aromatisch, zitronig-süß, fruchtig, blumig",
        "cultivationOriginal": "/ Zertifizierung  | Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "constituentsOriginal": "Limonen, β-Pinen, ɣ-Terpinen"
      }
    ],
    "regionIds": [
      "mediterranean",
      "production-italy",
      "production-spain"
    ]
  },
  {
    "id": "sunday-eucalyptus-citriodora",
    "name": "Lemon Eucalyptus",
    "botanicalName": "Eucalyptus citriodora (corymbia citriodora)",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-madagascar",
    "origin": "Fitovinany (Reg.), Madagascar",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, floral, citrus.",
    "sources": [
      {
        "label": "Sunday Natural · Eukalyptusöl Zitronen-Eukalyptus bio",
        "url": "https://www.sunday.de/zitronen-eukalyptusoel-bio-eucalyptus-citriodora-madagaskar.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Eukalyptusöl Zitronen-Eukalyptus bio",
        "origin": "Fitovinany (Reg.), Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/zitronen-eukalyptusoel-bio-eucalyptus-citriodora-madagaskar.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Blättern",
        "scentOriginal": "aromatisch, zitronig-frisch, floral, citronellaartig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2001",
        "provenanceOriginal": "Direkt von familiengeführter Farm mit eigener Destille im tropischen Madagaskar",
        "harvestOriginal": "Reine Handernte im April - Juni und September - Dezember",
        "constituentsOriginal": "Citronellal, Citronellol, Isopulegol, 1,8-Cineol"
      }
    ],
    "regionIds": [
      "production-madagascar"
    ]
  },
  {
    "id": "sunday-backhousia-citriodora",
    "name": "Lemon Myrtle",
    "botanicalName": "Backhousia citriodora",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Nordost New South Wales (Reg.), Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, herbal, citrus, green.",
    "sources": [
      {
        "label": "Sunday Natural · Myrtenöl Zitronenmyrte",
        "url": "https://www.sunday.de/myrtenoel-zitronenmyrte-backhousia-citriodora-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Myrtenöl Zitronenmyrte",
        "origin": "Nordost New South Wales (Reg.), Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/myrtenoel-zitronenmyrte-backhousia-citriodora-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Blättern und Zweigen",
        "scentOriginal": "sehr aromatisch, sehr zitrisch, süß, dezent grün-krautige Note",
        "cultivationOriginal": "Kein Zertifikat, Naturbelassener Anbau seit 1989",
        "provenanceOriginal": "Direkt von einem auf einheimische Pflanzen spezialisierten Familienbetrieb mit eigener Destille",
        "harvestOriginal": "Bei Bedarf, durch das Jahr hindurch verteilt",
        "constituentsOriginal": "Geranial, Neral, trans-Isocitral, cis-Isocitral"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-citrus-limon-petitgrain",
    "name": "Lemon Petitgrain",
    "botanicalName": "Citrus limon petitgrain",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-italy",
    "origin": "Calabria (Reg.) Italy",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Floral, citrus, green, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Petitgrainöl Zitrone",
        "url": "https://www.sunday.de/petitgrainoel-zitrone-citrus-limon-italien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Petitgrainöl Zitrone",
        "origin": "Calabria (Reg.) Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/petitgrainoel-zitrone-citrus-limon-italien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Blättern",
        "scentOriginal": "sehr aromatisch, herbes, grün-zitrisches Aroma mit floral-zitischen Noten",
        "cultivationOriginal": "Kein Zertifikat, nachhaltiger konventioneller Anbau",
        "provenanceOriginal": "Direkt von der auf Zitrus-Früchte spezialisierten Farm im traditionellen mediterranen Anbaugebiet Kalabrien",
        "harvestOriginal": "Reine Handernte von Januar bis März",
        "constituentsOriginal": "Limonen, Citral, Geranylacetat, β-Caryophyllen, Geraniol"
      }
    ],
    "regionIds": [
      "production-italy"
    ]
  },
  {
    "id": "sunday-leptospermum-petersonii",
    "name": "Lemon Tea Tree",
    "botanicalName": "Leptospermum petersonii",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Nordost New South Wales, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, spicy, citrus.",
    "sources": [
      {
        "label": "Sunday Natural · Teebaumöl Zitronen-Teebaum",
        "url": "https://www.sunday.de/zitronen-teebaumoel-leptospermum-petersonii.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Teebaumöl Zitronen-Teebaum",
        "origin": "Nordost New South Wales, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/zitronen-teebaumoel-leptospermum-petersonii.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Zweigen und Blättern",
        "scentOriginal": "sehr aromatisch, zitrisch frisch, fein würzig, dezente Noten von Verbene und Limette",
        "cultivationOriginal": "kein Zertifikat, naturbelassener Anbau",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Handernte der Zweige und Blätter zwischen April und Juni",
        "constituentsOriginal": "Citronellal, Geranial, Neral, Citronellol"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-aloysia-citrodora",
    "name": "Lemon Verbena",
    "botanicalName": "Aloysia citrodora",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "Occitane Region, France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, floral, citrus, fruity.",
    "sources": [
      {
        "label": "Sunday Natural · Verbenenöl",
        "url": "https://www.sunday.de/verbenenoel-zitrone-aloysia-citriodora-bio-frankreich.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Verbenenöl",
        "origin": "Occitane Region, France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/verbenenoel-zitrone-aloysia-citriodora-bio-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Blättern",
        "scentOriginal": "sehr aromatisch, süß-zitrisch, frisch, dezente fruchtig-florale Note",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2020",
        "provenanceOriginal": "Direkt von einem Hersteller mit eigener Destille aus eigenem Bio-zertifizierten und nachhaltigen Anbau in Frankreich und Kooperative von Biobauern.",
        "harvestOriginal": "Im Juni und September",
        "constituentsOriginal": "Geranial, Neral, Limonen, β-Caryophyllen, α-Curcumen, Germancren D"
      }
    ],
    "regionIds": [
      "production-france"
    ]
  },
  {
    "id": "sunday-eucalyptus-staigeriana",
    "name": "Lemon-Scented Ironbark",
    "botanicalName": "Eucalyptus staigeriana",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Atherton Tablelands, Queensland, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, citrus, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Eukalyptusöl",
        "url": "https://www.sunday.de/eukalyptusoel-eucalyptus-staigeriana-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Eukalyptusöl",
        "origin": "Atherton Tablelands, Queensland, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/eukalyptusoel-eucalyptus-staigeriana-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation",
        "scentOriginal": "Zitronig, frisch, honig-süß, dezenter Eukalyptus",
        "cultivationOriginal": "Kein Zertifikat",
        "provenanceOriginal": "Aromapflanzen-Farm mit eigener Destille",
        "constituentsOriginal": "Limonen, Geranial, Geranylacetat, Methylgeranat"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-cymbopogon-citratus",
    "name": "Lemongrass",
    "botanicalName": "Cymbopogon citratus",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-sri-lanka",
    "origin": "Uva (Prov.), Sri Lanka",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, herbal, citrus.",
    "sources": [
      {
        "label": "Sunday Natural · Lemongrassöl bio",
        "url": "https://www.sunday.de/lemongrassoel-cymbopogon-citratus-bio-product.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Lemongrassöl bio",
        "origin": "Uva (Prov.), Sri Lanka",
        "regionIds": [
          "production-sri-lanka"
        ],
        "url": "https://www.sunday.de/lemongrassoel-cymbopogon-citratus-bio-product.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation frischer Blätter",
        "scentOriginal": "Frisch, zitrusartig, süß, dezent krautig",
        "cultivationOriginal": "Kontrolliert biol. Anbau seit 2002",
        "provenanceOriginal": "Direkt von Handernte-Farm, Sri Lanka",
        "constituentsOriginal": "Geranial, Neral, Geraniol, Geranylacetate"
      }
    ],
    "regionIds": [
      "production-sri-lanka"
    ]
  },
  {
    "id": "sunday-litsea-cubeba",
    "name": "Litsea",
    "botanicalName": "Litsea cubeba",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-china",
    "origin": "China",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, citrus, fruity.",
    "sources": [
      {
        "label": "Sunday Natural · Litseaöl bio",
        "url": "https://www.sunday.de/litseaoel-litsea-cubeba-bio-china.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Litseaöl bio",
        "origin": "China",
        "regionIds": [
          "production-china"
        ],
        "url": "https://www.sunday.de/litseaoel-litsea-cubeba-bio-china.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den Früchten",
        "scentOriginal": "sehr aromatisch, frisch-fruchtig, zitronig-süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2021",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Reine Handernte von Juli bis September",
        "constituentsOriginal": "Geranial, Neral, Limonen, Linalool"
      }
    ],
    "regionIds": [
      "production-china"
    ]
  },
  {
    "id": "sunday-pinus-contorta",
    "name": "Lodgepole Pine",
    "botanicalName": "Pinus contorta",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-iceland",
    "origin": "Daníelslundur, Borgarfjörður, Iceland",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, woody, green.",
    "sources": [
      {
        "label": "Sunday Natural · KiefernölDrehkiefer wild",
        "url": "https://www.sunday.de/drehkiefernoel-pinus-contorta-wild-island.html"
      }
    ],
    "productionVariants": [
      {
        "label": "KiefernölDrehkiefer wild",
        "origin": "Daníelslundur, Borgarfjörður, Iceland",
        "regionIds": [
          "production-iceland"
        ],
        "url": "https://www.sunday.de/drehkiefernoel-pinus-contorta-wild-island.html",
        "extractionOriginal": "Wasserdampfdestillation frischer Zweige/Nadeln",
        "scentOriginal": "Aromatisch, frisch, grün, holzig",
        "cultivationOriginal": "Pestizidfreie Wildsammlung",
        "provenanceOriginal": "Direkt von Öl-Manufaktur mit eigener Destille",
        "constituentsOriginal": "β-Phellandren, α-Pinen, β-Pinen, Myrcen"
      }
    ],
    "regionIds": [
      "production-iceland"
    ]
  },
  {
    "id": "sunday-myristica-fragrans-mace",
    "name": "Mace",
    "botanicalName": "Myristica fragrans",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-sri-lanka",
    "origin": "Kandy, Kegalle, Matale (Reg.), Sri Lanka",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Muskatblütenölbio",
        "url": "https://www.sunday.de/muskatblueten-oel-myristica-fragrans-bio-sri-lanka.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Muskatblütenölbio",
        "origin": "Kandy, Kegalle, Matale (Reg.), Sri Lanka",
        "regionIds": [
          "production-sri-lanka"
        ],
        "url": "https://www.sunday.de/muskatblueten-oel-myristica-fragrans-bio-sri-lanka.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus der getrockneten Macis",
        "scentOriginal": "sehr aromatisch, herb bis dezent süß, leicht scharf, feines Aroma von frisch geriebener Muskatnuss",
        "cultivationOriginal": "Kontrolliert-biologischer Anbau seit 2002",
        "provenanceOriginal": "Direkt von der auf Handernte spezialisierten Farm mit kooperativen Vertragspartnern im tropischen Sri Lanka",
        "harvestOriginal": "Reine Handernte",
        "constituentsOriginal": "ɑ-Pinen, Sabinen, β-Pinen, Terpinen-4-ol, Myristicin"
      }
    ],
    "regionIds": [
      "production-sri-lanka"
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
      },
      {
        "label": "Sunday Natural · Mandarinenöl Rot Bio",
        "url": "https://www.sunday.de/mandarinenoel-citrus-reticulata-bio-kalabrien-italien.html"
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
    ],
    "productionVariants": [
      {
        "label": "Mandarinenöl grün Bio",
        "origin": "Calabria, Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/mandarinenoel-citrus-gruen-reticulata-bio-italien.html",
        "extractionOriginal": "Schonende Kaltpressung der grünen Fruchtschalen",
        "scentOriginal": "Spritzig-frisch, fruchtig, grün, blumig-süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2005",
        "provenanceOriginal": "Direkt von der auf Zitrus-Früchte spezialisierten Farm",
        "constituentsOriginal": "Limonen, γ-Terpinen, ɑ-Pinen"
      },
      {
        "label": "Mandarinenöl Rot Bio",
        "origin": "Calabria (Reg.), Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/mandarinenoel-citrus-reticulata-bio-kalabrien-italien.html",
        "extractionOriginal": "Schonende Kaltpressung, aus den frischen roten Fruchtschalen",
        "scentOriginal": "spritzig-frisch,blumig, fruchtig, orangen-süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2005",
        "provenanceOriginal": "Direkt von der auf Zitrus-Früchte spezialisierten Farm im traditionellen mediterranen Anbaugebiet Kalabrien",
        "harvestOriginal": "Reine Handernte von Oktober bis November",
        "constituentsOriginal": "Limonen, ɣ-Terpinen, ɑ-Pinen, β-Pinen"
      }
    ],
    "regionIds": [
      "southeast-asia",
      "production-italy"
    ]
  },
  {
    "id": "sunday-syzygium-oleosum",
    "name": "Mango Myrtle",
    "botanicalName": "Syzygium oleosum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Northern Rivers (Reg.), NSW, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Woody, citrus, fruity, green.",
    "sources": [
      {
        "label": "Sunday Natural · Myrtenöl Mango myrtle",
        "url": "https://www.sunday.de/myrtenoel-mango-myrtle-syzygium-oleosum-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Myrtenöl Mango myrtle",
        "origin": "Northern Rivers (Reg.), NSW, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/myrtenoel-mango-myrtle-syzygium-oleosum-australien.html",
        "extractionOriginal": "chonende Wasserdampfdestillation, aus den frischen Blättern und Zweigenden",
        "scentOriginal": "aromatisch, fruchtig, holzig, Noten von grüner Mango, dezent Zitrisch",
        "cultivationOriginal": "Kein Zertifikat, Nachhaltiger Anbau seit 2022",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "In den Sommermonaten",
        "constituentsOriginal": "β-Pinen, Terpinolen, ɑ-Pinen, ɣ-Terpinen, Mycren"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-leptospermum-scoparium",
    "name": "Manuka",
    "botanicalName": "Leptospermum scoparium",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-new-zealand",
    "origin": "Waikato (Reg.), New Zealand; Südwest Westaustralien, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, balsamic, floral, earthy, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Manukaöl Wild Bio",
        "url": "https://www.sunday.de/manukaoel-leptospermum-scoparium-wild-bio-neuseelandss.html"
      },
      {
        "label": "Sunday Natural · Manukaöl",
        "url": "https://www.sunday.de/manukaoel-leptospermum-scoparium-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Manukaöl Wild Bio",
        "origin": "Waikato (Reg.), New Zealand",
        "regionIds": [
          "production-new-zealand"
        ],
        "url": "https://www.sunday.de/manukaoel-leptospermum-scoparium-wild-bio-neuseelandss.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Zweigen und Blättern",
        "scentOriginal": "sehr aromatisch, honig-süß, blumig, holzig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2000",
        "provenanceOriginal": "Direkt von dem auf Handernte von Manuka und Kanuka spezialisierten Familienunternehmen",
        "harvestOriginal": "Wildsammlung durch reine Handernte von September bis Mai",
        "constituentsOriginal": "cis-Calamenen, Leptospermon, Muurola-3,5-diene, Trans-cadina-1,4-dien,"
      },
      {
        "label": "Manukaöl",
        "origin": "Südwest Westaustralien, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/manukaoel-leptospermum-scoparium-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation frischer Blüten",
        "scentOriginal": "Honig-süß, erdig, balsamisch, holzig, dezent floral",
        "cultivationOriginal": "Kein Zertifikat, in naturnaherm Anbau kultiviert seit 2020",
        "provenanceOriginal": "Direkt vom Familienbetrieb mit eigener Destille",
        "constituentsOriginal": "ɑ-Selinen, β-Selinen, Calamenen, β-Caryophyllen"
      }
    ],
    "regionIds": [
      "production-new-zealand",
      "production-australia"
    ]
  },
  {
    "id": "sunday-pinus-pinaster",
    "name": "Maritime Pine",
    "botanicalName": "Pinus pinaster",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-portugal",
    "origin": "Zentralportugal (Reg.), Portugal",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, resinous.",
    "sources": [
      {
        "label": "Sunday Natural · Seekieferöl wild Bio",
        "url": "https://www.sunday.de/seekieferoel-pinus-pinaster-bio-wild-portugal.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Seekieferöl wild Bio",
        "origin": "Zentralportugal (Reg.), Portugal",
        "regionIds": [
          "production-portugal"
        ],
        "url": "https://www.sunday.de/seekieferoel-pinus-pinaster-bio-wild-portugal.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Nadeln",
        "scentOriginal": "faromatisch, leicht harzig, frisch",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2015",
        "provenanceOriginal": "Direkt von dem auf Handernte spezialisierten Familienunternehmen in Zentral-Portugal",
        "harvestOriginal": "Wildsammlung, über das ganze Jahr verteilt",
        "constituentsOriginal": "α-Pinen, β-Pinen, β-Caryophyllen"
      }
    ],
    "regionIds": [
      "production-portugal"
    ]
  },
  {
    "id": "sunday-pistacia-lentiscus",
    "name": "Mastic",
    "botanicalName": "Pistacia lentiscus",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-morocco",
    "origin": "Rabat-Salé-Kénitra (Reg.), Marokko",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, resinous.",
    "sources": [
      {
        "label": "Sunday Natural · Mastixöl Bio",
        "url": "https://www.sunday.de/mastixoel-pistacia-lentiscus-bio-marokko.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Mastixöl Bio",
        "origin": "Rabat-Salé-Kénitra (Reg.), Marokko",
        "regionIds": [
          "production-morocco"
        ],
        "url": "https://www.sunday.de/mastixoel-pistacia-lentiscus-bio-marokko.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Zweigen und Blättern",
        "scentOriginal": "sehr aromatisch harzig, warm, holzig, süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2011",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Von Juni bis August",
        "constituentsOriginal": "ɑ-Pinen, Mycren, d-Limonen, β-Pinen"
      }
    ],
    "regionIds": [
      "production-morocco"
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
    "id": "sunday-colophospermum-mopane",
    "name": "Mopane",
    "botanicalName": "Colophospermum mopane",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-angola",
    "origin": "Cunene (Prov.), Angola",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Woody, spicy.",
    "sources": [
      {
        "label": "Sunday Natural · Mopaneöl wild bio",
        "url": "https://www.sunday.de/mopaneoel-colophospermum-mopane-wild-bio-angola.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Mopaneöl wild bio",
        "origin": "Cunene (Prov.), Angola",
        "regionIds": [
          "production-angola"
        ],
        "url": "https://www.sunday.de/mopaneoel-colophospermum-mopane-wild-bio-angola.html",
        "extractionOriginal": "Wasserdampfdestillation (Stiele, Blätter)",
        "scentOriginal": "Weich, rund, cremig, holzige & würzige Noten",
        "cultivationOriginal": "Zertifizierte Bio-Qualität, Wildsammlung",
        "provenanceOriginal": "Direkt von Farm mit eigener Destille",
        "constituentsOriginal": "ɑ-Pinen, β-Caryophyllen"
      }
    ],
    "regionIds": [
      "production-angola"
    ]
  },
  {
    "id": "sunday-pinus-mugo",
    "name": "Mountain Pine",
    "botanicalName": "Pinus mugo",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-italy",
    "origin": "hochalpine Regionen in South Tyrol, Italy",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, herbal.",
    "sources": [
      {
        "label": "Sunday Natural · Latschenkieferöl 2500 Meter wild bio",
        "url": "https://www.sunday.de/latschenkieferoel-pinus-mugo-bio-wild-suedtirol.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Latschenkieferöl 2500 Meter wild bio",
        "origin": "hochalpine Regionen in South Tyrol, Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/latschenkieferoel-pinus-mugo-bio-wild-suedtirol.html",
        "extractionOriginal": "handwerkliche und schonende Wasserdampfdestillation, aus den dicht benadeltern Zweigen",
        "scentOriginal": "frisch, klar, krautig-waldig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 1995",
        "provenanceOriginal": "Direkt von dem auf lokale ätherische Ölpflanzen spezialisierten bio-zertifizierten Familienbetrieb mit eigener Destille",
        "harvestOriginal": "(Jahr, wenn alte ausverkauft sind)zertifizierte Wildsammlung, Mai bis November",
        "constituentsOriginal": "Δ3-Caren, β-Phellandren, α-Pinen, β-Mycren, β-Pinen, Limonene, β-Caryophyllen"
      }
    ],
    "regionIds": [
      "production-italy"
    ]
  },
  {
    "id": "sunday-brachylaena-huillensis",
    "name": "Muhuhu",
    "botanicalName": "Brachylaena huillensis",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-angola",
    "origin": "Huila, Cuando Cubango & Cunene (Reg.), Angola",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, balsamic.",
    "sources": [
      {
        "label": "Sunday Natural · Sandelholzöl Muhuhu wild bio",
        "url": "https://www.sunday.de/sandelholzoel-muhuhu-brachylaena-huillensis-wild-bio-angola.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Sandelholzöl Muhuhu wild bio",
        "origin": "Huila, Cuando Cubango & Cunene (Reg.), Angola",
        "regionIds": [
          "production-angola"
        ],
        "url": "https://www.sunday.de/sandelholzoel-muhuhu-brachylaena-huillensis-wild-bio-angola.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation aus Totholz",
        "scentOriginal": "Holzig, balsamisch, reichhaltig, sinnlich, süß",
        "cultivationOriginal": "Zertifizierte, naturnahe Wildsammlung",
        "provenanceOriginal": "Direkt vom Produzenten mit eigener Destille",
        "constituentsOriginal": "cis-Lanceol, cis-Nuciferol"
      }
    ],
    "regionIds": [
      "production-angola"
    ]
  },
  {
    "id": "sunday-minthostachys-mollis",
    "name": "Muña",
    "botanicalName": "Minthostachys mollis",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-peru",
    "origin": "Heiliges Tal der Inka (Reg.), Peru",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, woody, citrus, minty.",
    "sources": [
      {
        "label": "Sunday Natural · Muñaöl wild",
        "url": "https://www.sunday.de/munaoel-minthostachys-mollis-wild-peru.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Muñaöl wild",
        "origin": "Heiliges Tal der Inka (Reg.), Peru",
        "regionIds": [
          "production-peru"
        ],
        "url": "https://www.sunday.de/munaoel-minthostachys-mollis-wild-peru.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, der frischen Blätter und Blütenstände",
        "scentOriginal": "frisch-minzig, holzig, mit Zitrusnoten",
        "cultivationOriginal": "Kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Periodische Wildsammlung durch reine Handernte",
        "constituentsOriginal": "Menthon, Pulegon, cis-Dihydrocarvon, Carvon"
      }
    ],
    "regionIds": [
      "production-peru"
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
      },
      {
        "label": "Sunday Natural · Myrrhenölwild bio",
        "url": "https://www.sunday.de/myrrhenoel-commiphora-myrrha-wild-bio-somalia.html"
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
    ],
    "productionVariants": [
      {
        "label": "Myrrhenöl Wild",
        "origin": "Halbwüste im Norden Kenias",
        "regionIds": [
          "production-kenya"
        ],
        "url": "https://www.sunday.de/myrrhenoel-commiphora-myrrha-wild-kenia.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem Harz",
        "scentOriginal": "sehr aromatisch harzig, würzig, leicht süß, rauchig",
        "cultivationOriginal": "kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von der auf Wildsammlung und Handernte spezialisierten Farm im tropischen Kenia",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Juli bis November",
        "constituentsOriginal": "Curzeren, Furanoeudesma-1,3-dien, Lindestren, ß-Elemen"
      },
      {
        "label": "Myrrhenölwild bio",
        "origin": "Somaliland (Reg.), Somalia",
        "regionIds": [
          "production-somalia"
        ],
        "url": "https://www.sunday.de/myrrhenoel-commiphora-myrrha-wild-bio-somalia.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem Harz",
        "scentOriginal": "sehr aromatisch harzig, würzig, leicht süß, rauchig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Juni bis August und Januar bis März",
        "constituentsOriginal": "Curzeren, Furanoeudesma-1,3-dien, Lindestren, β-Elemen"
      }
    ],
    "regionIds": [
      "east-africa",
      "production-kenya",
      "production-somalia"
    ]
  },
  {
    "id": "sunday-commiphora-myrrha-commiphora-kua",
    "name": "Myrrh · mixed species",
    "botanicalName": "Commiphora myrrha & commiphora kua",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-kenya",
    "origin": "Halbwüste im Norden Kenias",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, resinous, spicy, smoky.",
    "sources": [
      {
        "label": "Sunday Natural · Myrrhenöl wild",
        "url": "https://www.sunday.de/myrrhenoel-commiphora-myrrha-kua-wild-kenia.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Myrrhenöl wild",
        "origin": "Halbwüste im Norden Kenias",
        "regionIds": [
          "production-kenya"
        ],
        "url": "https://www.sunday.de/myrrhenoel-commiphora-myrrha-kua-wild-kenia.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den von Hand gesammelten Harzen von Commiphora myrrha und C. kua in einem Verhältnis von 75:25",
        "scentOriginal": "sehr aromatisch harzig, würzig, leicht süß, rauchig",
        "cultivationOriginal": "kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von der auf Wildsammlung und Handernte spezialisierten Farm im tropischen Kenia",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Juli bis November",
        "constituentsOriginal": "Curzeren, Furanoeudesma-1,3-dien, Lindestren, ß-Elemen"
      }
    ],
    "regionIds": [
      "production-kenya"
    ]
  },
  {
    "id": "sunday-myrtus-communis",
    "name": "Myrtle",
    "botanicalName": "Myrtus communis",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-morocco",
    "origin": "Marokko; Korsika (Reg.), France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, balsamic, spicy, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Myrtenöl Bio",
        "url": "https://www.sunday.de/myrtenoel-myrtus-communis-marokko.html"
      },
      {
        "label": "Sunday Natural · Myrtenöl Wild Bio",
        "url": "https://www.sunday.de/myrtenoel-myrtus-communis-wild-bio-frankreich.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Myrtenöl Bio",
        "origin": "Marokko",
        "regionIds": [
          "production-morocco"
        ],
        "url": "https://www.sunday.de/myrtenoel-myrtus-communis-marokko.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blüten und Blättern",
        "scentOriginal": "aromatisch-herb, balsamisch, leicht süßlich-scharf",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Von Juli bis August",
        "constituentsOriginal": "1,8-Cineol, ɑ-Pinen, Myrtenylacetat, Limonen, Linalool"
      },
      {
        "label": "Myrtenöl Wild Bio",
        "origin": "Korsika (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/myrtenoel-myrtus-communis-wild-bio-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Zweigen",
        "scentOriginal": "sehr aromatisch, würzig-süß, leicht scharf, balsamisch",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2003",
        "provenanceOriginal": "Direkt von einer auf Wildsammlungen spezialisierten Farm aus Frankreich",
        "harvestOriginal": "Wildsammlung durch reine Handernte in April-Mai und September-Oktober"
      }
    ],
    "regionIds": [
      "production-morocco",
      "production-france"
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
    "id": "sunday-melaleuca-quinquenervia",
    "name": "Niaouli",
    "botanicalName": "Melaleuca quinquenervia",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-madagascar",
    "origin": "Atsinanana (Reg.), Madagascar",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, floral, minty, camphoraceous.",
    "sources": [
      {
        "label": "Sunday Natural · Niaouliöl Bio",
        "url": "https://www.sunday.de/niaouliol-bio.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Niaouliöl Bio",
        "origin": "Atsinanana (Reg.), Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/niaouliol-bio.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blättern",
        "scentOriginal": "sehr aromatisch, menthol-kampferartig, leicht blumig-süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2019",
        "provenanceOriginal": "Direkt von einer Kooperative und auf Handernte spezialisierten Farm im tropischen Madagaskar",
        "harvestOriginal": "Reine Handernte über das gesamte Jahr verteilt",
        "constituentsOriginal": "1,8-Cineol, α-Pinen, Viridiflorol, β-Pinen"
      }
    ],
    "regionIds": [
      "production-madagascar"
    ]
  },
  {
    "id": "sunday-santalum-lanceolatum",
    "name": "Northern Sandalwood",
    "botanicalName": "Santalum lanceolatum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Queensland, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Woody, resinous, balsamic.",
    "sources": [
      {
        "label": "Sunday Natural · Sandelholzöl Northern wild",
        "url": "https://www.sunday.de/sandelholzoel-santalum-lanceolatum-wild-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Sandelholzöl Northern wild",
        "origin": "Queensland, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/sandelholzoel-santalum-lanceolatum-wild-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation aus Holz",
        "scentOriginal": "Balsamisch, holzig-harzig, Orangen- u. Rosennote",
        "cultivationOriginal": "/ Zertifizierung  | Wildsammlung, ohne Zertifizierung",
        "provenanceOriginal": "Direkt von spezialisiertem Kleinstunternehmen",
        "constituentsOriginal": "cis-Nuciferol, cis-β-Curcumen-12-Ol, cis-Lanceol"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-myristica-fragrans",
    "name": "Nutmeg",
    "botanicalName": "Myristica fragrans",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-sri-lanka",
    "origin": "Kandy, Kegalle, Matale (Reg.), Sri Lanka",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, spicy, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Muskatnussölbio",
        "url": "https://www.sunday.de/muskatnuss-oel-myristica-fragrans-bio-sri-lanka.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Muskatnussölbio",
        "origin": "Kandy, Kegalle, Matale (Reg.), Sri Lanka",
        "regionIds": [
          "production-sri-lanka"
        ],
        "url": "https://www.sunday.de/muskatnuss-oel-myristica-fragrans-bio-sri-lanka.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den sonnengetrockneten Nüssen",
        "scentOriginal": "sehr aromatisch, herb bis dezent süß, nussig-würzig, holzig, leicht scharf",
        "cultivationOriginal": "Kontrolliert-biologischer Anbau seit 2002",
        "provenanceOriginal": "Direkt von der auf Handernte spezialisierten Farm mit kooperativen Vertragspartnern im tropischen Sri Lanka",
        "harvestOriginal": "Reine Handernte",
        "constituentsOriginal": "Sabinen, ɑ-Pinen, β-Pinen, Terpinen-4-ol, Myristicin"
      }
    ],
    "regionIds": [
      "production-sri-lanka"
    ]
  },
  {
    "id": "sunday-origanum-vulgare",
    "name": "Oregano",
    "botanicalName": "Origanum vulgare",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-italy",
    "origin": "Piemont und Basilikata, Italy; Murcia (Reg.), Spain",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, spicy, herbal, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Oreganoöl 700m bio",
        "url": "https://www.sunday.de/oreganooel-origanum-vulgare-bio-italien.html"
      },
      {
        "label": "Sunday Natural · Oreganoöl 600m bio",
        "url": "https://www.sunday.de/oreganooel-origanum-vulgare-bio-spanien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Oreganoöl 700m bio",
        "origin": "Piemont und Basilikata, Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/oreganooel-origanum-vulgare-bio-italien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation vor Ort, aus dem frischen blühenden Kraut",
        "scentOriginal": "herb-aromatisch, würzig-krautig, trocken",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2005",
        "provenanceOriginal": "Direkt vom Hersteller, der mit nachhaltigen Destillationsprozessen arbeitet",
        "harvestOriginal": "(Jahr, wenn alte ausverkauft sind)  | Juni bis Juli, je nach Erntezeitpunkt des blühenden Krauts",
        "constituentsOriginal": "Carvacrol (rd. 76%), Para-Cymen, γ-Terpinen, β-Caryophyllen"
      },
      {
        "label": "Oreganoöl 600m bio",
        "origin": "Murcia (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/oreganooel-origanum-vulgare-bio-spanien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischem blühendem Kraut",
        "scentOriginal": "sehr aromatisch, würzig-herb, krautig-süß, trocken",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2018",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Von Juni bis Juli",
        "constituentsOriginal": "Carvacrol (rd. 70%), Para-Cymen, γ-Terpinen"
      }
    ],
    "regionIds": [
      "production-italy",
      "production-spain"
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
    ],
    "productionVariants": [
      {
        "label": "Palmarosaöl Bio",
        "origin": "Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/palmarosaoel-cymbopogon-martinii-bio-madagaskar.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation frischer Blätter",
        "scentOriginal": "Zitrisch-frisch, floral-süß, grasig-herb",
        "cultivationOriginal": "/ Zertifizierung  | Kontrolliert biologischer Anbau seit 2014",
        "provenanceOriginal": "Direkt von Farm mit eigener Destille",
        "constituentsOriginal": "Geraniol, Geranylacetat, Linalool, Farnesol"
      }
    ],
    "regionIds": [
      "india",
      "production-madagascar"
    ]
  },
  {
    "id": "sunday-bursera-graveolens",
    "name": "Palo Santo",
    "botanicalName": "Bursera graveolens",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-peru",
    "origin": "Piura (Reg.), Peru",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, resinous, spicy, citrus.",
    "sources": [
      {
        "label": "Sunday Natural · Palo Santoöl wild",
        "url": "https://www.sunday.de/palo-santool.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Palo Santoöl wild",
        "origin": "Piura (Reg.), Peru",
        "regionIds": [
          "production-peru"
        ],
        "url": "https://www.sunday.de/palo-santool.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem Holz",
        "scentOriginal": "sehr aromatisch, würzig-harzig, dezent süß-zitrisch",
        "cultivationOriginal": "Kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von der auf heimische Aromapflanzen und Wildsammlung spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte durch das Jahr verteilt",
        "constituentsOriginal": "Limonen, ɑ-Terpineol, β-Bisabolen"
      }
    ],
    "regionIds": [
      "production-peru"
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
    ],
    "productionVariants": [
      {
        "label": "Patchouliöl",
        "origin": "Nawalparashi (Reg.), Nepal",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/patchoulioel-pogostemon-cablin-nepal.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den sorgfältig getrockneten Blättern",
        "scentOriginal": "sehr aromatisch, erdig-süß, harzig-würzig",
        "cultivationOriginal": "Kein Zertifikat, naturbelassener Anbau",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Reine Handernte durch das Jahr hindurch",
        "constituentsOriginal": "Caryophyllenacetat, ɑ-Bulnesen, ɑ-Guaien, Patchoulen, Seychellen"
      }
    ],
    "regionIds": [
      "southeast-asia",
      "production-nepal"
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
      },
      {
        "label": "Sunday Natural · Pfefferminzöl Mitcham",
        "url": "https://www.sunday.de/pfefferminzoel-mitcham-mentha-piperita-australien.html"
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
    ],
    "productionVariants": [
      {
        "label": "Pfefferminzöl Bio",
        "origin": "Thrakisches Tal (Reg.), Bulgaria",
        "regionIds": [
          "production-bulgaria"
        ],
        "url": "https://www.sunday.de/pfefferminzoel-mentha-piperita-bio-bulgarien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Pflanzen",
        "scentOriginal": "sehr aromatisch kräftig-minzig, krautig-frisch, dezente süße",
        "cultivationOriginal": "Zertifizierte Bio-Qualität, Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Von Juni bis August",
        "constituentsOriginal": "Menthol, Menthon, Piperithon"
      },
      {
        "label": "Pfefferminzöl Bio",
        "origin": "India",
        "regionIds": [
          "production-india"
        ],
        "url": "https://www.sunday.de/pfefferminzoel-mentha-piperita-bio-indien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus der frischen Pflanzen",
        "scentOriginal": "sehr aromatisch kräftig-minzig, krautig-frisch, dezent süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2001",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Von Juli bis August",
        "constituentsOriginal": "Menthol, Menthon, 1,8-Cineol"
      },
      {
        "label": "Pfefferminzöl Mitcham",
        "origin": "Tasmanien, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/pfefferminzoel-mitcham-mentha-piperita-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Pflanzen",
        "scentOriginal": "sehr aromatisch, kräftig-minzig, honigsüß, mentholig",
        "cultivationOriginal": "Keine Zertifizierung, naturbelassener Anbau; pestizidfrei",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Im Januar und Februar (Sommermonate der Südhalbkugel)",
        "constituentsOriginal": "Menthol, Menthon, 1,8-Cineol"
      }
    ],
    "regionIds": [
      "eurasia",
      "production-bulgaria",
      "production-india",
      "production-australia"
    ]
  },
  {
    "id": "sunday-pelargonium-tomentosum",
    "name": "Peppermint Geranium",
    "botanicalName": "Pelargonium tomentosum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-south-africa",
    "origin": "Westkap (Prov.), South Africa",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, floral, citrus, minty.",
    "sources": [
      {
        "label": "Sunday Natural · Geranienöl Pfefferminze bio",
        "url": "https://www.sunday.de/geranienoel-pfefferminze-pelargonium-tomentosum-bio-sued-afrika.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Geranienöl Pfefferminze bio",
        "origin": "Westkap (Prov.), South Africa",
        "regionIds": [
          "production-south-africa"
        ],
        "url": "https://www.sunday.de/geranienoel-pfefferminze-pelargonium-tomentosum-bio-sued-afrika.html",
        "extractionOriginal": "Wasserdampfdestillation frischer Zweige & Blätter",
        "scentOriginal": "mentholig-frisch, dezent zitrisch, dezent floral",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2015",
        "provenanceOriginal": "Direkt von auf heimische Pflanzen spezialisierter Farm"
      }
    ],
    "regionIds": [
      "production-south-africa"
    ]
  },
  {
    "id": "sunday-leptospermum-petersonii-pineapple",
    "name": "Pineapple Myrtle",
    "botanicalName": "Leptospermum petersonii variety b ct. alpha-pinene",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Northern Rivers (Reg.), NSW, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, spicy, citrus, fruity.",
    "sources": [
      {
        "label": "Sunday Natural · Myrtenöl Pineapple Myrtle",
        "url": "https://www.sunday.de/myrtenoel-pineapple-myrtle-leptospermum-petersonii-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Myrtenöl Pineapple Myrtle",
        "origin": "Northern Rivers (Reg.), NSW, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/myrtenoel-pineapple-myrtle-leptospermum-petersonii-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Blättern und Zweigenden",
        "scentOriginal": "sehr frisch fruchtig, Aromen von Ananas und Bananen, dezente Noten von Zitrus und Gewürzen",
        "cultivationOriginal": "Kein Zertifikat, Nachhaltiger Anbau seit 2022",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Ernte von Hand in den Herbstmonaten",
        "constituentsOriginal": "ɑ-Pinen, Geranylacetat, Geranial, Neral, ɣ-Terpinen"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-schinus-molle",
    "name": "Pink Pepper",
    "botanicalName": "Schinus molle",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-peru",
    "origin": "Ayacucho (Reg.), Peru",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, fruity.",
    "sources": [
      {
        "label": "Sunday Natural · Pfefferöl rosa 3200m wild",
        "url": "https://www.sunday.de/pfefferoel-schinus-molle-wild-peru.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Pfefferöl rosa 3200m wild",
        "origin": "Ayacucho (Reg.), Peru",
        "regionIds": [
          "production-peru"
        ],
        "url": "https://www.sunday.de/pfefferoel-schinus-molle-wild-peru.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Früchten",
        "scentOriginal": "sehr aromatisch, fruchtig-süß, frisch, dezent scharf",
        "cultivationOriginal": "Kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von der auf heimische Aromapflanzen und Wildsammlung spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von März bis Juni",
        "constituentsOriginal": "Mycren, α-Phellandren, β-Phellandren"
      }
    ],
    "regionIds": [
      "production-peru"
    ]
  },
  {
    "id": "sunday-cyperus-articulatus",
    "name": "Priprioca",
    "botanicalName": "Cyperus articulatus",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-brazil",
    "origin": "Amazonas Regenwald, Brazil",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, woody, spicy, floral, smoky.",
    "sources": [
      {
        "label": "Sunday Natural · Pripriocaöl",
        "url": "https://www.sunday.de/pripriocaoel-cyperus-articulatus-brasilien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Pripriocaöl",
        "origin": "Amazonas Regenwald, Brazil",
        "regionIds": [
          "production-brazil"
        ],
        "url": "https://www.sunday.de/pripriocaoel-cyperus-articulatus-brasilien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Wurzeln",
        "scentOriginal": "holzig, wurzelartig, frisch, würzig, rauchig, floral mit Noten von Vanille",
        "cultivationOriginal": "Keine Zertifizierung, naturbelassener Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "(Jahr, wenn alte ausverkauft sind)",
        "constituentsOriginal": "Musktakon, α-Pinene, Cyperotundon"
      }
    ],
    "regionIds": [
      "production-brazil"
    ]
  },
  {
    "id": "sunday-ravensara-aromatica",
    "name": "Ravensara",
    "botanicalName": "Ravensara aromatica",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-madagascar",
    "origin": "Atsinanana (Reg.), Madagascar, 800m",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, spicy, fruity, minty.",
    "sources": [
      {
        "label": "Sunday Natural · Ravensaraöl 800 Meter wild",
        "url": "https://www.sunday.de/ravensaraoel-ravensara-aromatica-wild-madagaskar-800m.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Ravensaraöl 800 Meter wild",
        "origin": "Atsinanana (Reg.), Madagascar, 800m",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/ravensaraoel-ravensara-aromatica-wild-madagaskar-800m.html",
        "extractionOriginal": "Wasserdampfdestillation frischer Blätter",
        "scentOriginal": "Würzig-süß, dezent mentholig, fruchtig",
        "cultivationOriginal": "Naturbelassener Anbau seit 2006, Nature et Progrès zertifiziert",
        "provenanceOriginal": "Direkt von Farm für Wildsammlung, Madagaskar",
        "constituentsOriginal": "Limonene, Linalool, Eugenol, Geraniol"
      }
    ],
    "regionIds": [
      "production-madagascar"
    ]
  },
  {
    "id": "sunday-cinnamomum-camphora",
    "name": "Ravintsara",
    "botanicalName": "Cinnamomum camphora",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-madagascar",
    "origin": "Haute Matsiatra (Reg.), Madagascar",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, minty, camphoraceous.",
    "sources": [
      {
        "label": "Sunday Natural · Ravintsaraöl 1200m bio",
        "url": "https://www.sunday.de/ravintsaraoel-cinnamomum-camphora-bio-madagaskar-1200m.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Ravintsaraöl 1200m bio",
        "origin": "Haute Matsiatra (Reg.), Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/ravintsaraoel-cinnamomum-camphora-bio-madagaskar-1200m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blättern",
        "scentOriginal": "mentholig-frisch, kampferartig, dezent süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2015",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Handernte der frischen Blätter durch das Jahr hindurch",
        "constituentsOriginal": "1,8-Cineol, Sabinen, α-Terpineol"
      }
    ],
    "regionIds": [
      "production-madagascar"
    ]
  },
  {
    "id": "sunday-myrothamnus-flabellifolia",
    "name": "Resurrection Bush",
    "botanicalName": "Myrothamnus flabellifolia",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-angola",
    "origin": "Huila (Prov.), Angola",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, spicy, floral.",
    "sources": [
      {
        "label": "Sunday Natural · Resurrection Bush-öl 1200m wild bio",
        "url": "https://www.sunday.de/resurrection-bush-oel-myrothamnus-flabellifolius-wild-bio-angola-1200m.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Resurrection Bush-öl 1200m wild bio",
        "origin": "Huila (Prov.), Angola",
        "regionIds": [
          "production-angola"
        ],
        "url": "https://www.sunday.de/resurrection-bush-oel-myrothamnus-flabellifolius-wild-bio-angola-1200m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blättern und Blüten",
        "scentOriginal": "würzig, kiefernartig, blumig, frisch",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Mai bis September",
        "constituentsOriginal": "Limonen, Cis-Verbenol, 1,8-Cineol, Pinocarvon, Cis-Carveol"
      }
    ],
    "regionIds": [
      "production-angola"
    ]
  },
  {
    "id": "sunday-cistus-ladanifer",
    "name": "Rock Rose",
    "botanicalName": "Cistus ladanifer",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-portugal",
    "origin": "Zentralportugal (Reg.), Portugal",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, woody, resinous, spicy, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Cistrosenöl 500M Wild Bio",
        "url": "https://www.sunday.de/cistrosenoel-cistus-ladanifer-bio-wild-portugal-500m.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Cistrosenöl 500M Wild Bio",
        "origin": "Zentralportugal (Reg.), Portugal",
        "regionIds": [
          "production-portugal"
        ],
        "url": "https://www.sunday.de/cistrosenoel-cistus-ladanifer-bio-wild-portugal-500m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Blättern",
        "scentOriginal": "würzig-herb, frisch, holzig, harzig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2015",
        "provenanceOriginal": "Direkt von dem auf Handernte spezialisierten Familienunternehmen in Zentral-Portugal",
        "harvestOriginal": "Wildsammlung durch reine Handernte im Juni bis November",
        "constituentsOriginal": "ɑ-Pinen, Camphen, Leden, Bornylacetat, Viridiflorol"
      }
    ],
    "regionIds": [
      "production-portugal"
    ]
  },
  {
    "id": "sunday-chamaemelum-nobile",
    "name": "Roman Chamomile",
    "botanicalName": "Chamaemelum nobile",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-morocco",
    "origin": "Rabat-Salé-Kénitra (Reg.), Marokko",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, herbal, floral.",
    "sources": [
      {
        "label": "Sunday Natural · KamillenölRömisch Bio",
        "url": "https://www.sunday.de/kamillenoel-chamaemelum-nobile-bio-marokko.html"
      }
    ],
    "productionVariants": [
      {
        "label": "KamillenölRömisch Bio",
        "origin": "Rabat-Salé-Kénitra (Reg.), Marokko",
        "regionIds": [
          "production-morocco"
        ],
        "url": "https://www.sunday.de/kamillenoel-chamaemelum-nobile-bio-marokko.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blüten",
        "scentOriginal": "sehr aromatisch, krautig, floral, süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2011",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "August bis September",
        "constituentsOriginal": "Isobutylmergelat, Methylallylengelat, 3-Methylamylangelat, Isoamyllengelat, 2-Methylbutylegelat, Pinocarveol"
      }
    ],
    "regionIds": [
      "production-morocco"
    ]
  },
  {
    "id": "sunday-melaleuca-ericifolia-cineole",
    "name": "Rosalina · cineole",
    "botanicalName": "Melaleuca ericifolia ct. cineol",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Flinders Iceland (Reg.), Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, spicy, floral, minty.",
    "sources": [
      {
        "label": "Sunday Natural · Teebaumöl Rosalina wild",
        "url": "https://www.sunday.de/teebaumoel-rosalina-melaleuca-ericifolia-wild-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Teebaumöl Rosalina wild",
        "origin": "Flinders Iceland (Reg.), Australia",
        "regionIds": [
          "production-australia",
          "production-iceland"
        ],
        "url": "https://www.sunday.de/teebaumoel-rosalina-melaleuca-ericifolia-wild-australien.html",
        "originNote": "The catalogue lists Australia; the product metadata lists Flinders Iceland (Reg.), Australia.",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blättern und Zweigen",
        "scentOriginal": "sehr aromatisch, erinnert an Eukalyptus und Menthol, mit leicht süß-floraler, würziger Note",
        "cultivationOriginal": "Kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von einem auf einheimische Pflanzen spezialisierten Familienbetrieb mit eigener Destille",
        "harvestOriginal": "Wildsammlung der kleinen Zweige und Blätter zwischen September bis Mai",
        "constituentsOriginal": "1,8-Cineol, α-pinene, Linalool, Limonen, α-Terpineol"
      }
    ],
    "regionIds": [
      "production-australia",
      "production-iceland"
    ]
  },
  {
    "id": "sunday-melaleuca-ericifolia-linalool",
    "name": "Rosalina · linalool",
    "botanicalName": "Melaleuca ericifolia ct. linalool",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Südwest Westaustralien, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Spicy, floral.",
    "sources": [
      {
        "label": "Sunday Natural · Teebaumöl Rosalina",
        "url": "https://www.sunday.de/teebaumoel-rosalina-melaleuca-ericifolia-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Teebaumöl Rosalina",
        "origin": "Südwest Westaustralien, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/teebaumoel-rosalina-melaleuca-ericifolia-australien.html",
        "extractionOriginal": "schonende Wasserdampfdestillation, aus frischen Blättern und Zweigen",
        "scentOriginal": "aromatisch, warm-floral, dezent eukalyptusartig, würzige Note",
        "cultivationOriginal": "kein Zertifikat, nachhaltiger Anbau seit 2003",
        "provenanceOriginal": "Direkt von einem auf einheimische Pflanzen spezialisierten Familienbetrieb mit eigener Destille",
        "harvestOriginal": "Ernte im Januar",
        "constituentsOriginal": "Linalool, 1,8-Cineol, α-Pinen, cis-Linalooloxid, Terpinolen, α-Terpineol"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-pelargonium-graveolens",
    "name": "Rose Geranium",
    "botanicalName": "Pelargonium graveolens",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-madagascar",
    "origin": "Alaotra-Mangoro (Reg.), Madagascar; Egypt",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, herbal, floral, citrus.",
    "sources": [
      {
        "label": "Sunday Natural · Geranienöl Bourbon bio",
        "url": "https://www.sunday.de/bourbongeranienoel-pelargonium-graveolens-bio-madagaskar.html"
      },
      {
        "label": "Sunday Natural · Geranienöl bio",
        "url": "https://www.sunday.de/rosengeranienoel-pelargonium-graveolens-bio-aegypten.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Geranienöl Bourbon bio",
        "origin": "Alaotra-Mangoro (Reg.), Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/bourbongeranienoel-pelargonium-graveolens-bio-madagaskar.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blättern",
        "scentOriginal": "floral, frisch, dezent zitrisch-süß, Rosennoten",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2015",
        "provenanceOriginal": "Direkt von einer Kooperative und auf Handernte spezialisierten Farm im tropischen Madagaskar",
        "harvestOriginal": "Reine Handernte von Februar bis März und von Oktober bis November",
        "constituentsOriginal": "β-Citronellol, Geraniol, Zitronenellylformiat, Isomenthon, Linalool"
      },
      {
        "label": "Geranienöl bio",
        "origin": "Egypt",
        "regionIds": [
          "production-egypt"
        ],
        "url": "https://www.sunday.de/rosengeranienoel-pelargonium-graveolens-bio-aegypten.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blütenständen",
        "scentOriginal": "blumig, frisch, süß, dezent krautig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Reine Handernte von Juli bis August und von Dezember bis April",
        "constituentsOriginal": "Neral, Citronellol, Geraniol, Zitronenellylformiat, Isomenthon"
      }
    ],
    "regionIds": [
      "production-madagascar",
      "production-egypt"
    ]
  },
  {
    "id": "sunday-leptospermum-petersonii-rose",
    "name": "Rose Myrtle",
    "botanicalName": "Leptospermum petersonii variety b",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Northern Rivers (Reg.), NSW, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Citrus, fruity.",
    "sources": [
      {
        "label": "Sunday Natural · Myrtenöl Rose Myrtle",
        "url": "https://www.sunday.de/myrtenoel-rose-myrtle-leptospermum-petersonii-var-b-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Myrtenöl Rose Myrtle",
        "origin": "Northern Rivers (Reg.), NSW, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/myrtenoel-rose-myrtle-leptospermum-petersonii-var-b-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Blättern und Zweigenden",
        "scentOriginal": "aromatisch, zitrisch, fruchtig, rosenartig",
        "cultivationOriginal": "Kein Zertifikat, Nachhaltiger Anbau seit 2014",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Ernte von Hand in den Herbstmonaten",
        "constituentsOriginal": "Geraniol, Geranylacetat, ɣ-Terpinen, Geranial, Terpinolen"
      }
    ],
    "regionIds": [
      "production-australia"
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
    "id": "sunday-rosmarinus-officinalis-alpha-pinene",
    "name": "Rosemary · alpha-pinene",
    "botanicalName": "Rosmarinus officinalis ct. a-pinen",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "Tasmanien (Bundesstaat), Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, herbal, floral.",
    "sources": [
      {
        "label": "Sunday Natural · Rosmarinöl",
        "url": "https://www.sunday.de/rosmarinoel-rosmarinus-officinalis-ct-a-pinene-tasmanien-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Rosmarinöl",
        "origin": "Tasmanien (Bundesstaat), Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/rosmarinoel-rosmarinus-officinalis-ct-a-pinene-tasmanien-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blättern und blühenden Zweigen",
        "scentOriginal": "kühle alpine Frische, stark krautig, dezent floral-süß",
        "cultivationOriginal": "Keine Zertifizierung, nachhaltiger konventioneller Anbau",
        "provenanceOriginal": "Direkt von dem auf heimische ätherische Öl Pflanzen spezialisierten Familienunternehmen mit eigener Destille",
        "harvestOriginal": "Im Januar und Februar",
        "constituentsOriginal": "α-Pinen (rd. 40%), 1,8-Cineol, Camphen"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-rosmarinus-officinalis-camphor",
    "name": "Rosemary · camphor",
    "botanicalName": "Rosmarinus officinalis ct. campher",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Spain",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, woody, herbal, minty.",
    "sources": [
      {
        "label": "Sunday Natural · Rosmarinölbio",
        "url": "https://www.sunday.de/rosmarinoel-rosmarinus-officinalis-ct-campher-wild-bio-spanien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Rosmarinölbio",
        "origin": "Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/rosmarinoel-rosmarinus-officinalis-ct-campher-wild-bio-spanien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Blättern",
        "scentOriginal": "frisch, stark, medizinisch, holzig-krautig, etwas minzig-waldig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "In den Sommermonaten",
        "constituentsOriginal": "α-Pinen, Eukalyptol, Campher, Camphen"
      }
    ],
    "regionIds": [
      "production-spain"
    ]
  },
  {
    "id": "sunday-rosmarinus-officinalis-cineole",
    "name": "Rosemary · cineole",
    "botanicalName": "Rosmarinus officinalis ct. cineol",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Andalusion (Reg.), Spain; Castilla-La Mancha, Spain, 900m",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, spicy, herbal.",
    "sources": [
      {
        "label": "Sunday Natural · Rosmarinölbio",
        "url": "https://www.sunday.de/rosmarinoel-rosmarinus-officinalis-ct-cineol-bio-spanien.html"
      },
      {
        "label": "Sunday Natural · Rosmarinöl wild bio",
        "url": "https://www.sunday.de/rosmarinol-900m-bio.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Rosmarinölbio",
        "origin": "Andalusion (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/rosmarinoel-rosmarinus-officinalis-ct-cineol-bio-spanien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem frischen blühenden Kraut",
        "scentOriginal": "sehr aromatisch, krautig-scharf, würzig-süß",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Kontrolliert biologischer Anbau",
        "constituentsOriginal": "1,8-Cineol, Camphor, α-Pinen, α-Thuyen, β-Pinen"
      },
      {
        "label": "Rosmarinöl wild bio",
        "origin": "Castilla-La Mancha, Spain, 900m",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/rosmarinol-900m-bio.html",
        "extractionOriginal": "Wasserdampfdestillation aus frischen Zweigen",
        "scentOriginal": "sehr aromatisch, krautig-süß, frisch, dezent scharf",
        "cultivationOriginal": "/ Zertifizierung  | Zertifizierte Bio-Qualität seit 1998",
        "provenanceOriginal": "Direkt von Familienbetrieb mit eigener Destille",
        "constituentsOriginal": "1,8-Cineol, Kampfer, α-Pinen"
      }
    ],
    "regionIds": [
      "production-spain"
    ]
  },
  {
    "id": "sunday-rosmarinus-officinalis-verbenone",
    "name": "Rosemary · verbenone",
    "botanicalName": "Rosmarinus officinalis ct. verbenon",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "Korsika (Reg.), France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, herbal.",
    "sources": [
      {
        "label": "Sunday Natural · Rosmarinöl Wild Bio",
        "url": "https://www.sunday.de/rosmarinoel-rosmarinus-officinalis-ct-verbenon-wild-bio-frankreich.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Rosmarinöl Wild Bio",
        "origin": "Korsika (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/rosmarinoel-rosmarinus-officinalis-ct-verbenon-wild-bio-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation aus frischem Kraut",
        "scentOriginal": "sehr aromatisch, krautig-süß, frisch, dezent scharf",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2003",
        "provenanceOriginal": "Direkt von der auf Wildsammlung spezialisierten Farm",
        "constituentsOriginal": "α-Pinen, Bornylacetat, Verbenon, Camphen, 1,8-Cineol"
      }
    ],
    "regionIds": [
      "production-france"
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
    "id": "sunday-aniba-rosaeodora",
    "name": "Rosewood · Aniba",
    "botanicalName": "Aniba rosaeodora",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-peru",
    "origin": "Loreto (Reg.), Peru",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, woody, resinous, floral.",
    "sources": [
      {
        "label": "Sunday Natural · Rosenholzöl wild",
        "url": "https://www.sunday.de/rosenholzoel-aniba-rosaeodora-wild-peru.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Rosenholzöl wild",
        "origin": "Loreto (Reg.), Peru",
        "regionIds": [
          "production-peru"
        ],
        "url": "https://www.sunday.de/rosenholzoel-aniba-rosaeodora-wild-peru.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus Zweigen und Holz",
        "scentOriginal": "aromatische süße Frische, dezent floral, dezent harzig-holzig",
        "cultivationOriginal": "Kein Zertifikat, Wildsammlung",
        "provenanceOriginal": "Direkt von der auf heimische Aromapflanzen und Wildsammlung spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte über das gesamte Jahr verteilt",
        "constituentsOriginal": "Linalool, α-Copaen"
      }
    ],
    "regionIds": [
      "production-peru"
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
      },
      {
        "label": "Sunday Natural · Sandelholzöl",
        "url": "https://www.sunday.de/sandelholzoel-santalum-album-australien.html"
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
    ],
    "productionVariants": [
      {
        "label": "Sandelholzöl bio",
        "origin": "Beragala, Diyaluma, Sri Lanka",
        "regionIds": [
          "production-sri-lanka"
        ],
        "url": "https://www.sunday.de/sandelholzoel-santalum-album-bio-sri-lanka.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation aus Kernholz",
        "scentOriginal": "Sehr aromatisch, holzig-süß, harzig-frisch, hell",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2002",
        "provenanceOriginal": "Direkt von auf heimische Aromapflanzen spezialisierter Farm",
        "constituentsOriginal": "α-Santalol, β-Santalol, Z-α-trans-Bergamotol"
      },
      {
        "label": "Sandelholzöl",
        "origin": "Nord-Westaustralien, Nord-Queensland, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/sandelholzoel-santalum-album-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation aus Kernholz",
        "scentOriginal": "aromatisch, balsamisch, warm, holzig-süß",
        "cultivationOriginal": "Kein Zertifikat, naturnaher Anbau",
        "provenanceOriginal": "Direkt vom spezialisierten Familienbetieb mit eigener Destille",
        "constituentsOriginal": "cis-α-Santalol, cis-β-Santalol, t-α-Bergamotol"
      }
    ],
    "regionIds": [
      "india",
      "production-sri-lanka",
      "production-australia"
    ]
  },
  {
    "id": "sunday-santolina-chamaecyparissus",
    "name": "Santolina",
    "botanicalName": "Santolina chamaecyparissus",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Castilla-La Mancha, Spain (800-900m)",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Resinous, herbal, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Heiligenkrautöl Bio",
        "url": "https://www.sunday.de/heiligenkrautoel-santolina-chamaecyparissus-bio-spanien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Heiligenkrautöl Bio",
        "origin": "Castilla-La Mancha, Spain (800-900m)",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/heiligenkrautoel-santolina-chamaecyparissus-bio-spanien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation frischer Blüten",
        "scentOriginal": "sehr aromatisch, krautig, harzig, herb",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 1999",
        "provenanceOriginal": "Direkt von spezialisiertem Familienbetrieb mit Destille",
        "constituentsOriginal": "β-Pinen, Myrcen, β-Pellandren, Limonen, 1,8-Cineol"
      }
    ],
    "regionIds": [
      "production-spain"
    ]
  },
  {
    "id": "sunday-cinnamosma-fragrans",
    "name": "Saro",
    "botanicalName": "Cinnamosma fragrans",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-madagascar",
    "origin": "Fitovinany (Reg.), Madagascar",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, citrus.",
    "sources": [
      {
        "label": "Sunday Natural · Saroölbio",
        "url": "https://www.sunday.de/sarooel-cinnamosma-fragrans-bio-fitovinany-madagaskar.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Saroölbio",
        "origin": "Fitovinany (Reg.), Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/sarooel-cinnamosma-fragrans-bio-fitovinany-madagaskar.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den Blättern",
        "scentOriginal": "aromatisch, rein, frisch, eukalyptusartig, dezent zitrisch",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2001",
        "provenanceOriginal": "Direkt von familiengeführter Farm mit eigener Destille im tropischen Madagaskar",
        "harvestOriginal": "Kontrolliert biologischer Anbau, Handernte von Juni bis November",
        "constituentsOriginal": "1,8 Cineol, Limonen, Sabinen, β-Pinen"
      }
    ],
    "regionIds": [
      "production-madagascar"
    ]
  },
  {
    "id": "sunday-pinus-sylvestris",
    "name": "Scots Pine",
    "botanicalName": "Pinus sylvestris",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "Auvergne-Rhône-Alpes (Reg.), France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, resinous, earthy.",
    "sources": [
      {
        "label": "Sunday Natural · Waldkieferöl Bio",
        "url": "https://www.sunday.de/waldkieferoel-pinus-sylvestris-bio-frankreich.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Waldkieferöl Bio",
        "origin": "Auvergne-Rhône-Alpes (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/waldkieferoel-pinus-sylvestris-bio-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Nadeln",
        "scentOriginal": "aromatisch, frisch, harzig, erdig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Kleine Kooperative im Herzen der Provence, Frankreich",
        "constituentsOriginal": "α-Pinen, β-Pinen, Limonen, β-Phellandren, β-Mycren"
      }
    ],
    "regionIds": [
      "production-france"
    ]
  },
  {
    "id": "sunday-abies-sibirica",
    "name": "Siberian Fir",
    "botanicalName": "Abies sibirica",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-iceland",
    "origin": "Hallormsstaður (Reg), Iceland",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, balsamic, green.",
    "sources": [
      {
        "label": "Sunday Natural · TannenölSibirische Tanne wild",
        "url": "https://www.sunday.de/tannenoel-sibirische-tanne-abies-sibirica-wild-island.html"
      }
    ],
    "productionVariants": [
      {
        "label": "TannenölSibirische Tanne wild",
        "origin": "Hallormsstaður (Reg), Iceland",
        "regionIds": [
          "production-iceland"
        ],
        "url": "https://www.sunday.de/tannenoel-sibirische-tanne-abies-sibirica-wild-island.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Nadeln und Zweigen",
        "scentOriginal": "aromatisch, frischer Nadelbaumduft mit grün-balsamischen Noten",
        "cultivationOriginal": "Kein Zertifikat, Wildsammlung. Pestizid frei. (Pestizide sind in der isländischen Forstwirtschaft gesetzlich nicht erlaubt.)",
        "provenanceOriginal": "Direkt von der ätherischen Öl-Manufaktur mit eigener Destille",
        "harvestOriginal": "(Jahr, wenn alte ausverkauft sind)  | Periodische Wildsammlung",
        "constituentsOriginal": "Camphen, Bornylacetat, α-Pinen, Borneol, δ-3-Caren"
      }
    ],
    "regionIds": [
      "production-iceland"
    ]
  },
  {
    "id": "sunday-abies-alba",
    "name": "Silver Fir",
    "botanicalName": "Abies alba",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-bosnia-herzegovina",
    "origin": "Bosnia & Herzegovina; alpine bis hochalpine Regionen in South Tyrol, Italy",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, woody, spicy.",
    "sources": [
      {
        "label": "Sunday Natural · Tannenöl Weiß wild bio",
        "url": "https://www.sunday.de/tannenoel-weiss-abies-alba-bio-wild-balkan.html"
      },
      {
        "label": "Sunday Natural · Tannenöl Weiss 1800m wild bio",
        "url": "https://www.sunday.de/tannenoel-weiss-abies-alba-bio-wild-suedtirol.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Tannenöl Weiß wild bio",
        "origin": "Bosnia & Herzegovina",
        "regionIds": [
          "production-bosnia-herzegovina"
        ],
        "url": "https://www.sunday.de/tannenoel-weiss-abies-alba-bio-wild-balkan.html",
        "extractionOriginal": "Wasserdampfdestillation frischer Zweige & Nadeln",
        "scentOriginal": "warm-holzig, waldig-würzig, aromatisch-frisch",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2001",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "constituentsOriginal": "Limonen, α-Pinen, Camphen, β-Caryophyllen"
      },
      {
        "label": "Tannenöl Weiss 1800m wild bio",
        "origin": "alpine bis hochalpine Regionen in South Tyrol, Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/tannenoel-weiss-abies-alba-bio-wild-suedtirol.html",
        "extractionOriginal": "handwerkliche und schonende Wasserdampfdestillation, aus den benadeltern Zweigen",
        "scentOriginal": "aromatisch-frisch, kräftig, waldig, holzig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 1995",
        "provenanceOriginal": "Direkt von dem auf lokale ätherische Ölpflanzen spezialisierten bio-zertifizierten Familienbetrieb mit eigener Destille",
        "harvestOriginal": "(Jahr, wenn alte ausverkauft sind)  | Zertifizierte Wildsammlung von Oktober bis Dezember",
        "constituentsOriginal": "α-Pinen, Limonen, Camphen, β-Pinen, β-Caryophyllen"
      }
    ],
    "regionIds": [
      "production-bosnia-herzegovina",
      "production-italy"
    ]
  },
  {
    "id": "sunday-lavandula-stoechas",
    "name": "Spanish Lavender",
    "botanicalName": "Lavandula stoechas",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-portugal",
    "origin": "Zentralportugal (Reg.), Portugal",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Spicy, herbal, camphoraceous.",
    "sources": [
      {
        "label": "Sunday Natural · Schopf-Lavendelöl500m Wild Bio",
        "url": "https://www.sunday.de/schopflavendeloel-lavandula-stoechas-bio-wild-portugal.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Schopf-Lavendelöl500m Wild Bio",
        "origin": "Zentralportugal (Reg.), Portugal",
        "regionIds": [
          "production-portugal"
        ],
        "url": "https://www.sunday.de/schopflavendeloel-lavandula-stoechas-bio-wild-portugal.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blütenständen",
        "scentOriginal": "sehr aromatisch, würzig-krautig, dezent kampferartig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2015",
        "provenanceOriginal": "Direkt von dem auf Handernte spezialisiertes Familienunternehmen in Zentral-Portugal",
        "harvestOriginal": "Wildsammlung durch reine Handernte von April bis Mai",
        "constituentsOriginal": "1,8-Cineol, Lavandulol, Lavandulylacetat, Linalool"
      }
    ],
    "regionIds": [
      "production-portugal"
    ]
  },
  {
    "id": "sunday-thymus-mastichina",
    "name": "Spanish Marjoram",
    "botanicalName": "Thymus mastichina",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Spain, Castilla-La Mancha, 800-900m",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Spicy, herbal.",
    "sources": [
      {
        "label": "Sunday Natural · Thymianöl 800-900M Bio",
        "url": "https://www.sunday.de/thymianoel-thymus-mastichina-bio-spanien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Thymianöl 800-900M Bio",
        "origin": "Spain, Castilla-La Mancha, 800-900m",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/thymianoel-thymus-mastichina-bio-spanien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation (frisches Kraut)",
        "scentOriginal": "Intensiv lieblich-würzig, warm, krautig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 1999",
        "provenanceOriginal": "Direkt von einem Familienbetrieb mit eigener Destille",
        "constituentsOriginal": "Linalool, 1,8-Cineol, Linalylacetat, β-Pinen"
      }
    ],
    "regionIds": [
      "production-spain"
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
    ],
    "productionVariants": [
      {
        "label": "Lavendelsalbeiöl Bio",
        "origin": "Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/lavendelsalbeioel-salvia-lavandulifolia-bio-spanien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus der frischen Pflanze",
        "scentOriginal": "sehr aromatisch, krautig-würzig, mentholig-frisch, dezent süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Von Juli bis August",
        "constituentsOriginal": "Kampfer, 1,8-Cineol, Limonen, α-Pinen"
      }
    ],
    "regionIds": [
      "spain",
      "production-spain"
    ]
  },
  {
    "id": "sunday-thymus-baeticus",
    "name": "Spanish Thyme · baeticus",
    "botanicalName": "Thymus baeticus",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Andalusien (Reg.), Spain",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Spicy, earthy, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Thymianöl 950M wild bio",
        "url": "https://www.sunday.de/thymianoel-thymus-baeticus-wild-bio-spanien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Thymianöl 950M wild bio",
        "origin": "Andalusien (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/thymianoel-thymus-baeticus-wild-bio-spanien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischem blühendem Kraut",
        "scentOriginal": "sehr aromatisch, Waldhonig, pfeffrig-würzig, erdig-warm",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2017",
        "provenanceOriginal": "Direkt von einer kleinen Kooperative mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Mai bis Juni",
        "constituentsOriginal": "Linalool, 1,8-Cineol, ɣ-Terpinen, α-Pinen, Thymol, Verbenon, p-Cymen"
      }
    ],
    "regionIds": [
      "production-spain"
    ]
  },
  {
    "id": "sunday-thymus-capitatus",
    "name": "Spanish Thyme · capitatus",
    "botanicalName": "Thymus capitatus",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Andalusion (Reg.), Spain",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Spicy, herbal.",
    "sources": [
      {
        "label": "Sunday Natural · Thymianöl 600m Wild Bio",
        "url": "https://www.sunday.de/thymianoel-t-capitatus-bio.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Thymianöl 600m Wild Bio",
        "origin": "Andalusion (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/thymianoel-t-capitatus-bio.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem frischen blühenden Kraut",
        "scentOriginal": "intensiv lieblich-würzig, warm, krautig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung",
        "constituentsOriginal": "Carvacrol (50-75%), p-Cymen, ɣ-Terpinen, β-Caryophyllen"
      }
    ],
    "regionIds": [
      "production-spain"
    ]
  },
  {
    "id": "sunday-thymus-zygis",
    "name": "Spanish Thyme · zygis",
    "botanicalName": "Thymus zygis",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Andalusion (Reg.), Spain",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Spicy, earthy.",
    "sources": [
      {
        "label": "Sunday Natural · Thymianöl Wild Bio",
        "url": "https://www.sunday.de/thymianoel-t-zygis-bio.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Thymianöl Wild Bio",
        "origin": "Andalusion (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/thymianoel-t-zygis-bio.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem frischen blühenden Kraut",
        "scentOriginal": "sehr aromatisch, würzig-scharf, erdig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung",
        "constituentsOriginal": "Thymol (37-55%), p-Cymen, ɣ-Terpinen, Linalool, Carvacrol (0,5-5,5%)"
      }
    ],
    "regionIds": [
      "production-spain"
    ]
  },
  {
    "id": "sunday-mentha-spicata",
    "name": "Spearmint",
    "botanicalName": "Mentha spicata",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-india",
    "origin": "India",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, herbal, minty.",
    "sources": [
      {
        "label": "Sunday Natural · Spearmintöl Bio",
        "url": "https://www.sunday.de/spearmintoel-mentha-spicata-bio-indien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Spearmintöl Bio",
        "origin": "India",
        "regionIds": [
          "production-india"
        ],
        "url": "https://www.sunday.de/spearmintoel-mentha-spicata-bio-indien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Pflanzen",
        "scentOriginal": "sehr aromatisch mild-minzig, krautig-frisch, süßlich",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2001",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Von Juli bis September",
        "constituentsOriginal": "Carvon, Limonen"
      }
    ],
    "regionIds": [
      "production-india"
    ]
  },
  {
    "id": "sunday-lavandula-latifolia",
    "name": "Spike Lavender",
    "botanicalName": "Lavandula latifolia",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Andalusien (Reg.), Spain",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, spicy, herbal.",
    "sources": [
      {
        "label": "Sunday Natural · Speik-Lavendelöl 800m Bio",
        "url": "https://www.sunday.de/spike-lavendeloel-bio-800m.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Speik-Lavendelöl 800m Bio",
        "origin": "Andalusien (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/spike-lavendeloel-bio-800m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blütenständen",
        "scentOriginal": "sehr aromatisch, würzig-süß, krautig, frisch",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2006",
        "provenanceOriginal": "Direkt von der Farm mit eingener Destille",
        "harvestOriginal": "im August",
        "constituentsOriginal": "Linalool, 1,8 Cineol, Kampfer"
      }
    ],
    "regionIds": [
      "production-spain"
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
    ],
    "productionVariants": [
      {
        "label": "Nardenöl 3200m wild",
        "origin": "Jumla (Distrikt), Nepal",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/nardenoel-nardostachys-jatamansi-wild-nepal-3200m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den sonnengetrockneten Wurzeln",
        "scentOriginal": "intensiv aromatisch, holzig-erdig, dezent fruchtig-süß",
        "cultivationOriginal": "Keine Zertifizierung, Wildsammlung",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Oktober bis November",
        "constituentsOriginal": "Valeranone, Spirojatamol, 7-epi alpha selinene, Valencene"
      }
    ],
    "regionIds": [
      "himalaya",
      "production-nepal"
    ]
  },
  {
    "id": "sunday-illicium-verum",
    "name": "Star Anise",
    "botanicalName": "Illicium verum",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-vietnam",
    "origin": "Vietnam",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, spicy, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Anisöl Stern wild bio",
        "url": "https://www.sunday.de/anisoel-illicium-verum-wild-bio-vietnam.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Anisöl Stern wild bio",
        "origin": "Vietnam",
        "regionIds": [
          "production-vietnam"
        ],
        "url": "https://www.sunday.de/anisoel-illicium-verum-wild-bio-vietnam.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den Früchten",
        "scentOriginal": "sehr aromatisch, Honig-süß, dezent würzig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte im März und Oktober",
        "constituentsOriginal": "trans-Anethol, Limonen, ɑ-Pinen"
      }
    ],
    "regionIds": [
      "production-vietnam"
    ]
  },
  {
    "id": "sunday-abies-lasiocarpa",
    "name": "Subalpine Fir",
    "botanicalName": "Abies lasiocarpa",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-iceland",
    "origin": "Skorradalur, Iceland",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, balsamic, citrus.",
    "sources": [
      {
        "label": "Sunday Natural · TannenölFelsentanne wild",
        "url": "https://www.sunday.de/tannenoel-felsentanne-abies-lasiocarpa-wild-island.html"
      }
    ],
    "productionVariants": [
      {
        "label": "TannenölFelsentanne wild",
        "origin": "Skorradalur, Iceland",
        "regionIds": [
          "production-iceland"
        ],
        "url": "https://www.sunday.de/tannenoel-felsentanne-abies-lasiocarpa-wild-island.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation (Nadeln & Zweige)",
        "scentOriginal": "Frisch, balsamisch, süß, dezent würztig mit Zitrusnote",
        "cultivationOriginal": "Wildsammlung, pestizidfrei",
        "provenanceOriginal": "Direkt von ätherischer Öl-Manufaktur mit Destille",
        "constituentsOriginal": "β-Phellandren, 1,8-Cineol, Limonen"
      }
    ],
    "regionIds": [
      "production-iceland"
    ]
  },
  {
    "id": "sunday-cinnamomum-glaucescens",
    "name": "Sugandha Kokila",
    "botanicalName": "Cinnamomum glaucescens",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-nepal",
    "origin": "Bagmati (Prov.), Nepal",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, spicy, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Sugandha Kokila Öl 1300 Meter wild bio",
        "url": "https://www.sunday.de/sugandha-kokila-1300m-wild-bio.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Sugandha Kokila Öl 1300 Meter wild bio",
        "origin": "Bagmati (Prov.), Nepal",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/sugandha-kokila-1300m-wild-bio.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Beeren",
        "scentOriginal": "aromatisch-herb, würzig-süß, holzig, leichte scharf",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2012",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Oktober bis November",
        "constituentsOriginal": "1,8-Cineol, Methyl-Zimtamat, β-Pinen, α-Terpineol, α-Phellandren, α-Pinen"
      }
    ],
    "regionIds": [
      "production-nepal"
    ]
  },
  {
    "id": "sunday-artemisia-annua",
    "name": "Sweet Annie",
    "botanicalName": "Artemisia annua",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-bosnia-herzegovina",
    "origin": "Herzegovina, Bosnia and Herzegovina",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, balsamic, spicy.",
    "sources": [
      {
        "label": "Sunday Natural · Beifußöl Annakraut wild",
        "url": "https://www.sunday.de/en/sweet-wormwood-artemisia-annua-wildcrafted-bosnia-herzegovina.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Beifußöl Annakraut wild",
        "origin": "Herzegovina, Bosnia and Herzegovina",
        "regionIds": [
          "production-bosnia-herzegovina"
        ],
        "url": "https://www.sunday.de/en/sweet-wormwood-artemisia-annua-wildcrafted-bosnia-herzegovina.html",
        "extractionOriginal": "Gentle steam distillation of the herb",
        "scentOriginal": "Sweet, spicy, balsamic, green, with a basil-like freshness, and notes of liquorice",
        "provenanceOriginal": "Sourced directly from a farm specialising in native plants with its own distillery in Herzegovina, Bosnia and Herzegovina",
        "harvestOriginal": "Wildcrafted; hand-harvested from June to November",
        "constituentsOriginal": "Artemisia ketone, camphor, 1,8-cineole, ɑ-pinene"
      }
    ],
    "regionIds": [
      "production-bosnia-herzegovina"
    ]
  },
  {
    "id": "sunday-origanum-majorana",
    "name": "Sweet Marjoram",
    "botanicalName": "Origanum majorana",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-egypt",
    "origin": "Egypt",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, spicy, herbal.",
    "sources": [
      {
        "label": "Sunday Natural · Majoranöl Bio",
        "url": "https://www.sunday.de/majoranoel-origanum-majorana-bio-aegypten.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Majoranöl Bio",
        "origin": "Egypt",
        "regionIds": [
          "production-egypt"
        ],
        "url": "https://www.sunday.de/majoranoel-origanum-majorana-bio-aegypten.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischem blühendem Kraut",
        "scentOriginal": "sehr aromatisch, frisch, würzig, krautig, leicht süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2001",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Von April bis Mai",
        "constituentsOriginal": "Terpinene-1, Terpinene-ol-4, γ-Terpinen, Linalool, ɑ-Terpinen, Sabinen, Sabinen cis-Hydrat"
      }
    ],
    "regionIds": [
      "production-egypt"
    ]
  },
  {
    "id": "sunday-citrus-sinensis",
    "name": "Sweet Orange",
    "botanicalName": "Citrus sinensis",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-italy",
    "origin": "Sicily (Reg.) Italy; Andalusien (Reg.), Spain",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, citrus, fruity.",
    "sources": [
      {
        "label": "Sunday Natural · Orangenöl Bio",
        "url": "https://www.sunday.de/orangenoel-citrus-sinensis-bio-italien-natur.html"
      },
      {
        "label": "Sunday Natural · Orangenöl Bio",
        "url": "https://www.sunday.de/orangenoel-citrus-sinensis-bio-spanien-eins.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Orangenöl Bio",
        "origin": "Sicily (Reg.) Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/orangenoel-citrus-sinensis-bio-italien-natur.html",
        "extractionOriginal": "Kaltpressung aus frischen Fruchtschalen",
        "scentOriginal": "sehr aromatisch, spritzig-frisch, fruchtig, orangen-süß",
        "cultivationOriginal": "/ Zertifizierung  | Kontrolliert biologischer Anbau seit 2002",
        "provenanceOriginal": "Direkt von Zitrus-Farm in Sizilien",
        "constituentsOriginal": "Limonen, Myrcen"
      },
      {
        "label": "Orangenöl Bio",
        "origin": "Andalusien (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/orangenoel-citrus-sinensis-bio-spanien-eins.html",
        "extractionOriginal": "Schonende Kaltpressung, aus den frischen Fruchtschalen",
        "scentOriginal": "fruchtig, süß, dezent zitrisch",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "constituentsOriginal": "Limonen, β-Myrcren"
      }
    ],
    "regionIds": [
      "production-italy",
      "production-spain"
    ]
  },
  {
    "id": "sunday-pinus-cembra",
    "name": "Swiss Stone Pine",
    "botanicalName": "Pinus cembra",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-austria",
    "origin": "Tyrol, Austria; South Tyroler Alpen, Italy (1600–2200 m)",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, woody, resinous, earthy.",
    "sources": [
      {
        "label": "Sunday Natural · Zirbelkieferöl2000m Wild",
        "url": "https://www.sunday.de/en/swiss-pine-oil-pinus-cembra-wildcrafted-austria-2000m.html"
      },
      {
        "label": "Sunday Natural · Zirbelkieferöl 2200 Meter wildbio",
        "url": "https://www.sunday.de/zirbelkieferoel-pinus-cembra-wild-bio-suedtirol-2200m.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Zirbelkieferöl2000m Wild",
        "origin": "Tyrol, Austria",
        "regionIds": [
          "production-austria"
        ],
        "url": "https://www.sunday.de/en/swiss-pine-oil-pinus-cembra-wildcrafted-austria-2000m.html",
        "extractionOriginal": "Gentle steam distillation of fresh branches and needles",
        "scentOriginal": "Fresh, woody, resinous, subtly earthy",
        "provenanceOriginal": "Sourced directly from a small family business with an on-site distillery, specialised in Swiss pine",
        "constituentsOriginal": "α-Pinene, β-Pinene, 3-Carene, Limonene/β-Phellandrene"
      },
      {
        "label": "Zirbelkieferöl 2200 Meter wildbio",
        "origin": "South Tyroler Alpen, Italy (1600–2200 m)",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/zirbelkieferoel-pinus-cembra-wild-bio-suedtirol-2200m.html",
        "extractionOriginal": "Wasserdampfdestillation benadelter Zweige",
        "scentOriginal": "Frisch, holzig, harzig, dezent erdig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 1995",
        "provenanceOriginal": "Direkt vom bio-zertifizierten Familienbetrieb mit Tradition",
        "constituentsOriginal": "α-Pinen, β-Phellandren, Limonen, β-Pinen"
      }
    ],
    "regionIds": [
      "production-austria",
      "production-italy"
    ]
  },
  {
    "id": "sunday-zanthoxylum-armatum",
    "name": "Szechuan Pepper",
    "botanicalName": "Zanthoxylum armatum dc",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-nepal",
    "origin": "Western Nepal, Nepal",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Woody, green.",
    "sources": [
      {
        "label": "Sunday Natural · Pfefferöl Szechuan 1600m wild bio",
        "url": "https://www.sunday.de/szechuan-pfefferoel-zanthoxylum-armatum-wild-bio-nepal.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Pfefferöl Szechuan 1600m wild bio",
        "origin": "Western Nepal, Nepal",
        "regionIds": [
          "production-nepal"
        ],
        "url": "https://www.sunday.de/szechuan-pfefferoel-zanthoxylum-armatum-wild-bio-nepal.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den Samen und Borke",
        "scentOriginal": "sehr aromatisch, warm-holzig, grün-pfeffrig, rosenholzartig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung im November & Dezember, reine Handernte seit 2009",
        "constituentsOriginal": "Methylzimtsäureester, β-Caryophyllen, Terpinen-4-0l, Linalool, β-Phellandren"
      }
    ],
    "regionIds": [
      "production-nepal"
    ]
  },
  {
    "id": "sunday-tagetes-minuta",
    "name": "Tagetes",
    "botanicalName": "Tagetes minuta",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-india",
    "origin": "Jammu and Kashmir, India",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, fruity.",
    "sources": [
      {
        "label": "Sunday Natural · Tagetesöl 1800m",
        "url": "https://www.sunday.de/en/tagetes-oil-tagetes-minuta-india.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Tagetesöl 1800m",
        "origin": "Jammu and Kashmir, India",
        "regionIds": [
          "production-india"
        ],
        "url": "https://www.sunday.de/en/tagetes-oil-tagetes-minuta-india.html",
        "extractionOriginal": "Gentle steam distillation of the flowers and shoots",
        "scentOriginal": "Exotic, fruity, sweet, notes of green apple",
        "cultivationOriginal": "Nature-aligned cultivation since 2020",
        "provenanceOriginal": "Regionally grown by a partner network with its own distillery",
        "constituentsOriginal": "trans-β-Ocimene, (E)-Ocimenone, Dihydrotagetone"
      }
    ],
    "regionIds": [
      "production-india"
    ]
  },
  {
    "id": "sunday-larix-laricina",
    "name": "Tamarack",
    "botanicalName": "Larix laricina",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-canada",
    "origin": "Québec Provinz, Canada",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, woody, balsamic, floral, earthy.",
    "sources": [
      {
        "label": "Sunday Natural · Lärchenöl wild bio",
        "url": "https://www.sunday.de/laerchenoel-tamarack-larix-laricina-wild-bio-kanada.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Lärchenöl wild bio",
        "origin": "Québec Provinz, Canada",
        "regionIds": [
          "production-canada"
        ],
        "url": "https://www.sunday.de/laerchenoel-tamarack-larix-laricina-wild-bio-kanada.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Nadeln",
        "scentOriginal": "aromatisch, frisch-nadelholzartig, balsamisch, erdig, mit floralen Noten",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2015",
        "provenanceOriginal": "Direkt von einem auf einheimische Pflanzen des borealen Nadelwaldes spezialisierten Herstellers mit eigener Destille",
        "harvestOriginal": "Zwischen Juli und September"
      }
    ],
    "regionIds": [
      "production-canada"
    ]
  },
  {
    "id": "sunday-artemisia-dracunculus",
    "name": "Tarragon",
    "botanicalName": "Artemisia dracunculus",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "Provence-Alpes-Côte d'Azur, France",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, spicy.",
    "sources": [
      {
        "label": "Sunday Natural · Estragonöl bio",
        "url": "https://www.sunday.de/estragonoel-bio-artemisia-dracunculus-frankreich.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Estragonöl bio",
        "origin": "Provence-Alpes-Côte d'Azur, France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/estragonoel-bio-artemisia-dracunculus-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation (Kraut)",
        "scentOriginal": "Frisch, süß, anis- und basilikumartig, würzig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2020",
        "provenanceOriginal": "Bio-zertifizierter Hersteller mit eigener Destille",
        "constituentsOriginal": "Estragol, Cis-β-Ocimen, Trans-β-Ocimen, Limonen"
      }
    ],
    "regionIds": [
      "production-france"
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
    ],
    "productionVariants": [
      {
        "label": "Teebaumöl bio",
        "origin": "Northern Rivers Region in North South Wales, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/teebaumoel-melaleuca-alternifolia-nsw-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blättern",
        "scentOriginal": "sehr aromatisch, würzig-spitzig, erinnert an Eukalyptus und Menthol",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der auf heimische Aroma-Pflanzen spezialisierten Farm mit überregionalen Kooperationspartnern",
        "harvestOriginal": "Ernte der Blätter und Zweige in den Wintermonaten (Mai-Juni)",
        "constituentsOriginal": "Terpinen-4-Ol, ɣ-Terpinen, α-Terpinen, p-Cymen, α-Terpinolen"
      }
    ],
    "regionIds": [
      "australia",
      "production-australia"
    ]
  },
  {
    "id": "sunday-thymus-vulgaris-linalool",
    "name": "Thyme · linalool",
    "botanicalName": "Thymus vulgaris ct. linalool",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Andalusion (Reg.), Spain",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, spicy, herbal, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Thymianöl 1000M bio",
        "url": "https://www.sunday.de/thymianoel-ct-linalool.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Thymianöl 1000M bio",
        "origin": "Andalusion (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/thymianoel-ct-linalool.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem frischen blühenden Kraut",
        "scentOriginal": "sehr aromatisch, honig-süß, würzig-krautig, frisch, dezent nussig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "constituentsOriginal": "Linalool, Terpinen-4-Ol, ɣ-Terpinen, β-Mycren, p-Cymen"
      }
    ],
    "regionIds": [
      "production-spain"
    ]
  },
  {
    "id": "sunday-thymus-vulgaris-thymol",
    "name": "Thyme · thymol",
    "botanicalName": "Thymus vulgaris ct. thymol",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-italy",
    "origin": "Toskana, Italy",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, spicy, herbal.",
    "sources": [
      {
        "label": "Sunday Natural · Thymianöl bio",
        "url": "https://www.sunday.de/thymianoel-thymus-vulgaris-ct-thymol-bio-italien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Thymianöl bio",
        "origin": "Toskana, Italy",
        "regionIds": [
          "production-italy"
        ],
        "url": "https://www.sunday.de/thymianoel-thymus-vulgaris-ct-thymol-bio-italien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem frischen blühenden Kraut",
        "scentOriginal": "sehr aromatisch, krautig, frisch-würzig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2016",
        "provenanceOriginal": "Direkt von einer auf heimische Aroma-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Im Mai und Juni",
        "constituentsOriginal": "Thymol (37-55%), p-Cymen, ɣ-Terpinen, Linalool, Carvacrol"
      }
    ],
    "regionIds": [
      "production-italy"
    ]
  },
  {
    "id": "sunday-lavandula-angustifolia",
    "name": "True Lavender",
    "botanicalName": "Lavandula angustifolia",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-france",
    "origin": "Alpes-Maritimes (Dep.), Provence-Alpes-Côte d’Azur (Reg.), France; Kazanlak (Reg.), Bulgaria, 500-1500m; Drôme Provençale (Dep.), Auvergne-Rhône-Alpes (Reg.), France; Alpes-Maritimes, Provence-Alpes-Côte d’Azur (Reg.), France, 1400m; Castilla-La Mancha (Reg.), Spain; Jammu and Kashmir, India",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, resinous, spicy, herbal, floral, honey-like.",
    "sources": [
      {
        "label": "Sunday Natural · Echtes Lavendelöl1600m Wild Bio",
        "url": "https://www.sunday.de/echtes-lavendeloel-lavandula-angustifolia-bio-wild-alpes-maritimes-provence-1600m.html"
      },
      {
        "label": "Sunday Natural · Echtes Lavendelöl Bio",
        "url": "https://www.sunday.de/echtes-lavendeloel-lavandula-angustifolia-bio-bulgarien.html"
      },
      {
        "label": "Sunday Natural · Echtes Lavendelöl800m Bio",
        "url": "https://www.sunday.de/echtes-lavendeloel-lavandula-angustifolia-bio-frankreich.html"
      },
      {
        "label": "Sunday Natural · Echtes Lavendelöl1400m Wild Bio",
        "url": "https://www.sunday.de/echtes-lavendeloel-1400m.html"
      },
      {
        "label": "Sunday Natural · Echtes Lavendelöl 1200m Wild Bio",
        "url": "https://www.sunday.de/echtes-lavendeloel-1200m.html"
      },
      {
        "label": "Sunday Natural · Echtes Lavendelöl 1800m Wild Bio",
        "url": "https://www.sunday.de/echtes-lavendeloel-1800m.html"
      },
      {
        "label": "Sunday Natural · Echtes Lavendelöl 900m Bio",
        "url": "https://www.sunday.de/echtes-bio-lavendeloel-lavandula-angustifolia-spanien.html"
      },
      {
        "label": "Sunday Natural · Echtes Lavendelöl Kaschmir 2000m",
        "url": "https://www.sunday.de/en/english-lavenderoil-lavandula-angustifolia-kashmir.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Echtes Lavendelöl1600m Wild Bio",
        "origin": "Alpes-Maritimes (Dep.), Provence-Alpes-Côte d’Azur (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/echtes-lavendeloel-lavandula-angustifolia-bio-wild-alpes-maritimes-provence-1600m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blütenständen",
        "scentOriginal": "blumig, würzig, dezent scharf, süßlich",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 1997",
        "provenanceOriginal": "Direkt von einem auf handgeernteten Lavendel spezialisiertem kleinem Familienbetrieb mit eigener Kleindestille, malerisch gelegen in den Alpes-Maritimes",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Juli bis August",
        "constituentsOriginal": "Linalylacetat, Linalool, Terpinen-4-ol, trans-β-Ocimene, β-Caryophyllen"
      },
      {
        "label": "Echtes Lavendelöl Bio",
        "origin": "Kazanlak (Reg.), Bulgaria, 500-1500m",
        "regionIds": [
          "production-bulgaria"
        ],
        "url": "https://www.sunday.de/echtes-lavendeloel-lavandula-angustifolia-bio-bulgarien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation frischer Blüten",
        "scentOriginal": "aromatisch, blumig, krautig, dezent würzig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2005",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "constituentsOriginal": "Linalylacetat, Linalool, β-Caryophyllen u.a."
      },
      {
        "label": "Echtes Lavendelöl800m Bio",
        "origin": "Drôme Provençale (Dep.), Auvergne-Rhône-Alpes (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/echtes-lavendeloel-lavandula-angustifolia-bio-frankreich.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blütenständen",
        "scentOriginal": "frisch, klar, würzig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2006",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Im Juli"
      },
      {
        "label": "Echtes Lavendelöl1400m Wild Bio",
        "origin": "Alpes-Maritimes, Provence-Alpes-Côte d’Azur (Reg.), France, 1400m",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/echtes-lavendeloel-1400m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation frischer Blüten",
        "scentOriginal": "Blumig, würzig, leicht scharf, süß",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 1997",
        "provenanceOriginal": "Direkt von einem spezialisierten Familienbetrieb mit Destille",
        "constituentsOriginal": "Linalylacetat, Linalool, Terpinen-4-ol"
      },
      {
        "label": "Echtes Lavendelöl 1200m Wild Bio",
        "origin": "Alpes-Maritimes (Dep.), Provence-Alpes-Côte d’Azur (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/echtes-lavendeloel-1200m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blütenständen",
        "scentOriginal": "blumig, würzig, süß, dezent harzig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 1997",
        "provenanceOriginal": "Direkt von einem auf handgeernteten Lavendel spezialisiertem kleinem Familienbetrieb mit eigener Kleindestille, malerisch gelegen in den Alpes-Maritimes",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Juli bis August",
        "constituentsOriginal": "Linalylacetat, Linalool, Terpinen-4-ol, trans-β-Ocimene, β-Ocimene"
      },
      {
        "label": "Echtes Lavendelöl 1800m Wild Bio",
        "origin": "Alpes-Maritimes (Dep.), Provence-Alpes-Côte d’Azur (Reg.), France",
        "regionIds": [
          "production-france"
        ],
        "url": "https://www.sunday.de/echtes-lavendeloel-1800m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blütenständen",
        "scentOriginal": "sehr aromatisch, ausgeprägt blumig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 1997",
        "provenanceOriginal": "Direkt von einem auf handgeernteten Lavendel spezialisiertem kleinem Familienbetrieb mit eigener Kleindestille, malerisch gelegen in den Alpes-Maritimes",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Juli bis August",
        "constituentsOriginal": "Linalylacetat, Linalool, Terpinen-4-ol, Lavanduylacetat, β-Caryophyllen"
      },
      {
        "label": "Echtes Lavendelöl 900m Bio",
        "origin": "Castilla-La Mancha (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/echtes-bio-lavendeloel-lavandula-angustifolia-spanien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blütenständen",
        "scentOriginal": "aromatisch, blumig, krautig, dezent würzig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 1998",
        "provenanceOriginal": "Direkt von dem auf heimische ätherische Öl Pflanzen spezialisierten Familienunternehmen mit eigener Destille",
        "harvestOriginal": "Reine Handernte von Juli bis August",
        "constituentsOriginal": "Linalool, Linalylacetat, Borneol"
      },
      {
        "label": "Echtes Lavendelöl Kaschmir 2000m",
        "origin": "Jammu and Kashmir, India",
        "regionIds": [
          "production-india"
        ],
        "url": "https://www.sunday.de/en/english-lavenderoil-lavandula-angustifolia-kashmir.html",
        "extractionOriginal": "Gentle steam distillation of the inflorescences",
        "scentOriginal": "Floral, honey-sweet, slightly vanilla, creamy",
        "cultivationOriginal": "Nature-aligned cultivation since 2015",
        "provenanceOriginal": "Regionally grown by a partner network with its own distillery",
        "constituentsOriginal": "Linalyl Acetate, Linalool, β-Caryophyllene, α-Terpineol"
      }
    ],
    "regionIds": [
      "production-france",
      "production-bulgaria",
      "production-spain",
      "production-india"
    ]
  },
  {
    "id": "sunday-curcuma-longa",
    "name": "Turmeric",
    "botanicalName": "Curcuma longa",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-sri-lanka",
    "origin": "Regionen der Westküste und Zentral-Sri Lankas",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, spicy.",
    "sources": [
      {
        "label": "Sunday Natural · Kurkumaöl bio",
        "url": "https://www.sunday.de/kurkumaoel-curcuma-longa-bio-sri-lanka.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Kurkumaöl bio",
        "origin": "Regionen der Westküste und Zentral-Sri Lankas",
        "regionIds": [
          "production-sri-lanka"
        ],
        "url": "https://www.sunday.de/kurkumaoel-curcuma-longa-bio-sri-lanka.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus der Wurzel",
        "scentOriginal": "aromatisch, würzig, frisch, wärmend, leicht scharf",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2002",
        "provenanceOriginal": "Direkt von der auf Handernte spezialisierten Farm mit kooperativen Vertragspartnern im tropischen Sri Lanka",
        "harvestOriginal": "Reine Handernte zwischen Januar und März",
        "constituentsOriginal": "Curlon, ar-Tumeron, Tumeron, ar-Curcumen"
      }
    ],
    "regionIds": [
      "production-sri-lanka"
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
    "id": "sunday-vetivera-zizanioides",
    "name": "Vetiver",
    "botanicalName": "Vetivera zizanioides",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-india",
    "origin": "Himalayan Foothills, Uttar Pradesh, India; Diana (Reg.), Madagascar",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, woody, resinous, balsamic, earthy.",
    "sources": [
      {
        "label": "Sunday Natural · Vetiveröl",
        "url": "https://www.sunday.de/en/vetiver-oil-vetiveria-zizanioides-india.html"
      },
      {
        "label": "Sunday Natural · Vetiveröl Bio",
        "url": "https://www.sunday.de/vetiveroel-vetiveria-zizanioides-bio-madagaskar.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Vetiveröl",
        "origin": "Himalayan Foothills, Uttar Pradesh, India",
        "regionIds": [
          "production-india"
        ],
        "url": "https://www.sunday.de/en/vetiver-oil-vetiveria-zizanioides-india.html",
        "extractionOriginal": "Steam distillation of the roots",
        "scentOriginal": "Deep, earthy, woody, balsamic, surprisingly soft, gently sweet",
        "cultivationOriginal": "Nature-aligned cultivation since 2016",
        "provenanceOriginal": "Regionally grown by a partner network with its own distillery",
        "constituentsOriginal": "Khusimol, Rulepidadiene B, Nerolidol, β-Vetivone"
      },
      {
        "label": "Vetiveröl Bio",
        "origin": "Diana (Reg.), Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/vetiveroel-vetiveria-zizanioides-bio-madagaskar.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den Wurzeln",
        "scentOriginal": "aromatisch schwer, erdig, harzig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2008",
        "provenanceOriginal": "Direkt von der Farm im tropischen Madagaskar",
        "harvestOriginal": "Von November bis Mai",
        "constituentsOriginal": "Khusensäure, α-Vetivone, β-Vetivone, Khusimol"
      }
    ],
    "regionIds": [
      "production-india",
      "production-madagascar"
    ]
  },
  {
    "id": "sunday-callitris-glaucophylla",
    "name": "White Cypress Leaf",
    "botanicalName": "Callitris glaucophylla",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-australia",
    "origin": "New South Wales, Australia",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, woody, spicy, citrus.",
    "sources": [
      {
        "label": "Sunday Natural · ZypressenölWeiß Blatt wild",
        "url": "https://www.sunday.de/zypressenoel-weiss-blatt-callitris-glaucophylla-wild-australien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "ZypressenölWeiß Blatt wild",
        "origin": "New South Wales, Australia",
        "regionIds": [
          "production-australia"
        ],
        "url": "https://www.sunday.de/zypressenoel-weiss-blatt-callitris-glaucophylla-wild-australien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Blättern und Zweigen",
        "scentOriginal": "sehr aromatisch frisch, süßer Tannenduft, holzig, zitrisch-würzig",
        "cultivationOriginal": "Kein Zertifikat, Wildsammlung seit 1998",
        "provenanceOriginal": "Direkt von einem auf einheimische Pflanzen spezialisierten Familienbetrieb mit eigener Destille",
        "harvestOriginal": "Ernte aus Wilsdammlung",
        "constituentsOriginal": "Limonen, α-Pinen, β-Caryophyllen, Iso-Bornylacetate, α-Terpineol"
      }
    ],
    "regionIds": [
      "production-australia"
    ]
  },
  {
    "id": "sunday-artemisia-herba-alba",
    "name": "White Mugwort",
    "botanicalName": "Artemisia herba alba",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-morocco",
    "origin": "Hoher Atlas (Reg.), Marokko",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, balsamic, spicy.",
    "sources": [
      {
        "label": "Sunday Natural · Beifußöl (Weiß) Wild Bio",
        "url": "https://www.sunday.de/beifussoel-arthemisia-herba-alba-wild-bio-marokko.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Beifußöl (Weiß) Wild Bio",
        "origin": "Hoher Atlas (Reg.), Marokko",
        "regionIds": [
          "production-morocco"
        ],
        "url": "https://www.sunday.de/beifussoel-arthemisia-herba-alba-wild-bio-marokko.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem Kraut",
        "scentOriginal": "sehr aromatisch, balsamisch-süß, dezent würzig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2007",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Juni bis November"
      }
    ],
    "regionIds": [
      "production-morocco"
    ]
  },
  {
    "id": "sunday-lippia-alba",
    "name": "White Verbena",
    "botanicalName": "Lippia alba mill.",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-angola",
    "origin": "Huila, Humpata, Chibia (Prov.), Angola",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, citrus.",
    "sources": [
      {
        "label": "Sunday Natural · Verbenenöl weiß (Lippia alba) bio",
        "url": "https://www.sunday.de/verbenenoel-weiss-lippia-alba-bio-angola-1200m.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Verbenenöl weiß (Lippia alba) bio",
        "origin": "Huila, Humpata, Chibia (Prov.), Angola",
        "regionIds": [
          "production-angola"
        ],
        "url": "https://www.sunday.de/verbenenoel-weiss-lippia-alba-bio-angola-1200m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den frischen Zweigen und Blättern",
        "scentOriginal": "frisch, kräftig, intensiv zitronenartig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von dem auf heimische ätherische Öl-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "In den Sommermonaten",
        "constituentsOriginal": "Limonen, Citral, Campher, Geraniol"
      }
    ],
    "regionIds": [
      "production-angola"
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
      },
      {
        "label": "Sunday Natural · Ackerminzenöl Bio",
        "url": "https://www.sunday.de/ackerminzenoel-mentha-arvensis-bio-indien.html"
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
    ],
    "productionVariants": [
      {
        "label": "Ackerminzenöl Bio",
        "origin": "India",
        "regionIds": [
          "production-india"
        ],
        "url": "https://www.sunday.de/ackerminzenoel-mentha-arvensis-bio-indien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus der frischen Pflanzen",
        "scentOriginal": "sehr aromatisch frisch, krautig, mentholig, süßlich",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2001",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Von Juli bis August",
        "constituentsOriginal": "Menthol, Menthon, Isomenthon, Menthylacetat"
      }
    ],
    "regionIds": [
      "eurasia",
      "production-india"
    ]
  },
  {
    "id": "sunday-satureja-montana",
    "name": "Winter Savory",
    "botanicalName": "Satureja montana",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Andalusien (Reg.), Spain",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Spicy, herbal, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Bergbohnenkrautöl Wild Bio",
        "url": "https://www.sunday.de/bergbohnenkrautoel-bio.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Bergbohnenkrautöl Wild Bio",
        "origin": "Andalusien (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/bergbohnenkrautoel-bio.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus dem blühenden Kraut",
        "scentOriginal": "aromatisch, würzig-krautig, leicht herb",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Kontrolliert biologischer Anbau",
        "constituentsOriginal": "Carvacrol, p-Cymen, ɣ-Terpinen, Thymol"
      }
    ],
    "regionIds": [
      "production-spain"
    ]
  },
  {
    "id": "sunday-thymus-hyemalis",
    "name": "Winter Thyme",
    "botanicalName": "Thymus hyemalis",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Andalusien (Reg.), Spain",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, woody, spicy, minty.",
    "sources": [
      {
        "label": "Sunday Natural · Thymianöl wild bio",
        "url": "https://www.sunday.de/thymianoel-thymus-hyemalis-wild-bio-spanien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Thymianöl wild bio",
        "origin": "Andalusien (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/thymianoel-thymus-hyemalis-wild-bio-spanien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischem blühendem Kraut",
        "scentOriginal": "sehr aromatisch, würzig-frisch, dezent mentholig-holzig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2017",
        "provenanceOriginal": "Direkt von einer kleinen Kooperative mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte von Februar bis April",
        "constituentsOriginal": "p-Cymen, Thymol, γ-Terpinen, Linalool, Carvacrol"
      }
    ],
    "regionIds": [
      "production-spain"
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
  },
  {
    "id": "sunday-lavandula-lanata",
    "name": "Woolly Lavender",
    "botanicalName": "Lavandula lanata",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-spain",
    "origin": "Sierra de los Filabres, Andalusien (Reg.), Spain",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Sweet, resinous, floral.",
    "sources": [
      {
        "label": "Sunday Natural · Woll-Lavendelöl 1200m wild Bio",
        "url": "https://www.sunday.de/wolllavendeloel-lavandula-lanata-bio-wild-spanien-1200m.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Woll-Lavendelöl 1200m wild Bio",
        "origin": "Sierra de los Filabres, Andalusien (Reg.), Spain",
        "regionIds": [
          "production-spain"
        ],
        "url": "https://www.sunday.de/wolllavendeloel-lavandula-lanata-bio-wild-spanien-1200m.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blütenständen",
        "scentOriginal": "aromatisch, cremig-süß, floral, dezent harzig",
        "cultivationOriginal": "Zertifizierte Bio-Qualität seit 2014",
        "provenanceOriginal": "Direkt von einem auf heimische Pflanzen spezialisierten Unternehmen mit eigener Destille",
        "harvestOriginal": "Wildsammlung durch reine Handernte im August",
        "constituentsOriginal": "Kampher, Lavandulol, β-Bisabolen, Eucalyptol, Linalool"
      }
    ],
    "regionIds": [
      "production-spain"
    ]
  },
  {
    "id": "sunday-achillea-millefolium",
    "name": "Yarrow",
    "botanicalName": "Achillea millefolium",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-bulgaria",
    "origin": "Thrakisches Tal (Reg.), Bulgaria",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, herbal, camphoraceous.",
    "sources": [
      {
        "label": "Sunday Natural · Schafgarbenöl bio",
        "url": "https://www.sunday.de/schafgarbenoel-achillea-millefolium-bio-bulgarien.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Schafgarbenöl bio",
        "origin": "Thrakisches Tal (Reg.), Bulgaria",
        "regionIds": [
          "production-bulgaria"
        ],
        "url": "https://www.sunday.de/schafgarbenoel-achillea-millefolium-bio-bulgarien.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus frischen Blütenständen",
        "scentOriginal": "scharf, frisch-kräuterig, kampferartig, an Rainfarn erinnernd, mit einem süßen, angenehmen Abgang",
        "cultivationOriginal": "Zertifizierte Bio-Qualität",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Kontrolliert Biologischer Anbau, Von Juli bis August",
        "constituentsOriginal": "Sabinen, β-Pinen, Germacren D, β-Caryophyllen, β-Farnesen, Chamazulen, Artemisia-Keton"
      }
    ],
    "regionIds": [
      "production-bulgaria"
    ]
  },
  {
    "id": "sunday-cananga-odorata",
    "name": "Ylang-Ylang",
    "botanicalName": "Cananga odorata",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-madagascar",
    "origin": "Madagascar; Comoros; Nosy Be (Reg.), Madagascar; Nosy Be, Madagascar",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, sweet, spicy, floral, fruity.",
    "sources": [
      {
        "label": "Sunday Natural · Ylang Ylangöl VOP Bio",
        "url": "https://www.sunday.de/ylang-ylang-oel-cananga-odorata-bio-madagaskar.html"
      },
      {
        "label": "Sunday Natural · Ylang Ylangöl Extra Supérieur Bio",
        "url": "https://www.sunday.de/ylang-ylangoel-extrasuperier-cananga-odorata-bio-komoren.html"
      },
      {
        "label": "Sunday Natural · Ylang Ylangöl I Bio",
        "url": "https://www.sunday.de/ylang-ylangoel-i-cananga-odorata-bio-komoren.html"
      },
      {
        "label": "Sunday Natural · Ylang Ylangöl II bio",
        "url": "https://www.sunday.de/ylang-ylangoel-ii-cananga-odorata-bio-madagaskar.html"
      },
      {
        "label": "Sunday Natural · Ylang Ylangöl III Bio",
        "url": "https://www.sunday.de/ylang-ylangoel-iii-cananga-odorata-bio-madagaskar.html"
      },
      {
        "label": "Sunday Natural · Ylang Ylangöl komplett bio",
        "url": "https://www.sunday.de/ylang-ylangol-komplett-bio.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Ylang Ylangöl VOP Bio",
        "origin": "Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/ylang-ylang-oel-cananga-odorata-bio-madagaskar.html",
        "extractionOriginal": "Mischung aus der Extra supérieur und 1. Fraktion, welche durch schonende Wasserdampfdestillation der frischen Blüten gewonnen werden",
        "scentOriginal": "exotisch-frisch, floral, süß",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2008",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Handernte über das ganze Jahr verteilt",
        "constituentsOriginal": "Germacrene D, Linalool, β-Caryophyllen, Geranylacetat, p-Methylanisol, Benzylbenzoat"
      },
      {
        "label": "Ylang Ylangöl Extra Supérieur Bio",
        "origin": "Comoros",
        "regionIds": [
          "production-comoros"
        ],
        "url": "https://www.sunday.de/ylang-ylangoel-extrasuperier-cananga-odorata-bio-komoren.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation innerhalb der ersten 15 Minuten, aus den frischen Blüten",
        "scentOriginal": "sehr aromatisch, blumig-süß, exotisch-fruchtig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Handernte über das ganze Jahr verteilt",
        "constituentsOriginal": "Benzylacetat, Germacrene D, Linalool, p-Methylanisol, Benzylbenzoat, Geranylacetat, Cinnamylacetat"
      },
      {
        "label": "Ylang Ylangöl I Bio",
        "origin": "Madagascar",
        "regionIds": [
          "production-madagascar",
          "production-comoros"
        ],
        "url": "https://www.sunday.de/ylang-ylangoel-i-cananga-odorata-bio-komoren.html",
        "originNote": "The catalogue lists Comoros; the product metadata lists Madagascar.",
        "extractionOriginal": "Schonende Wasserdampfdestillation innerhalb der zwei Stunden, aus den frischen Blüten",
        "scentOriginal": "sehr aromatisch, würzig-süß, intensiv-floral, exotisch-schwer",
        "cultivationOriginal": "Kontrolliert biologischer Anbau",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Handernte über das ganze Jahr verteilt",
        "constituentsOriginal": "β-Farnesene, Benzylacetat, p-Methylanisol, Benzylbenzoat, Linalool, Methylbenzoat, β-Caryophyllene"
      },
      {
        "label": "Ylang Ylangöl II bio",
        "origin": "Nosy Be (Reg.), Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/ylang-ylangoel-ii-cananga-odorata-bio-madagaskar.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation innerhalb der ersten sechs Stunden, aus den frischen Blüten",
        "scentOriginal": "sehr aromatisch, würzig-süß, intensiv-floral, exotisch-schwer",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2019",
        "provenanceOriginal": "Direkt von der Farm mit nachhaltigen Anbau und Verarbeitungsmethoden mit eigener Destille",
        "harvestOriginal": "Handernte über das ganze Jahr verteilt",
        "constituentsOriginal": "Germacren D, β-Caryophyllen, Linalool, (E,E)-α-Farnesen, Geranyl-Acetat, Benzylbenzoat"
      },
      {
        "label": "Ylang Ylangöl III Bio",
        "origin": "Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/ylang-ylangoel-iii-cananga-odorata-bio-madagaskar.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation innerhalb 6 bis 12 Stunden, aus den frischen Blüten",
        "scentOriginal": "aromatisch, floral, dezent süß, mild-würzig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2008",
        "provenanceOriginal": "Direkt von der Farm mit eigener Destille",
        "harvestOriginal": "Handernte über das ganze Jahr verteilt",
        "constituentsOriginal": "Germacren D, β-Caryophyllen, α-Farnesen, Benzylbenzoat, α-Humulen"
      },
      {
        "label": "Ylang Ylangöl komplett bio",
        "origin": "Nosy Be, Madagascar",
        "regionIds": [
          "production-madagascar"
        ],
        "url": "https://www.sunday.de/ylang-ylangol-komplett-bio.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation innerhalb von 24 Stunden, aus frischen Blütenständen",
        "scentOriginal": "aromatisch, blumig-süß, mild-würzig",
        "cultivationOriginal": "Kontrolliert biologischer Anbau seit 2019",
        "provenanceOriginal": "Direkt von einer Kooperative und auf Handernte spezialisierten Farm im tropischen Madagaskar",
        "harvestOriginal": "Reine Handernte über das ganze Jahr verteilt",
        "constituentsOriginal": "Germacren D, β-Caryophyllen, Linalool, Geranyl-Acetat, Benzylbenzoat"
      }
    ],
    "regionIds": [
      "production-madagascar",
      "production-comoros"
    ]
  },
  {
    "id": "sunday-citrus-junos",
    "name": "Yuzu",
    "botanicalName": "Citrus junos",
    "tiers": [],
    "families": [
      "Essential oil"
    ],
    "regionId": "production-japan",
    "origin": "Kōchi (Präf.), Japan",
    "originKind": "Cultivation & distillation",
    "context": "The locations shown here are the production origins listed by Sunday Natural. They do not establish the plant’s wild native range.",
    "scentProfile": "Fresh, citrus, green, dry.",
    "sources": [
      {
        "label": "Sunday Natural · Yuzuöl",
        "url": "https://www.sunday.de/yuzuoel-citrus-junos-wild-japan.html"
      }
    ],
    "productionVariants": [
      {
        "label": "Yuzuöl",
        "origin": "Kōchi (Präf.), Japan",
        "regionIds": [
          "production-japan"
        ],
        "url": "https://www.sunday.de/yuzuoel-citrus-junos-wild-japan.html",
        "extractionOriginal": "Schonende Wasserdampfdestillation, aus den Fruchtschalen",
        "scentOriginal": "sehr aromatisch, zitrisch-frisch, trocken, grün",
        "cultivationOriginal": "Kein Zertifikat",
        "provenanceOriginal": "Direkt von der auf einheimische ätherische Öl-Pflanzen spezialisierten Farm mit eigener Destille",
        "harvestOriginal": "Ernte im November und Dezember",
        "constituentsOriginal": "D-Limonen, γ-Terpinen, β-Phellandren, α-Pinen"
      }
    ],
    "regionIds": [
      "production-japan"
    ]
  }
]
