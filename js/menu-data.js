/* Zentrale Speisekarten-Daten. Preise sind in Euro hinterlegt. */
window.MENU_CATEGORIES = [
  { id: "vorspeisen", label: "Vorspeisen", note: "" },
  { id: "salate", label: "Salatgerichte", note: "" },
  { id: "nudelsuppen", label: "Nudelsuppen", note: "" },
  { id: "reis-nudeln", label: "Gebratener Reis & Nudeln", note: "" },
  { id: "fleisch", label: "Hühner-, Rind- & Entengerichte", note: "Reis als Beilage." },
  { id: "paniertes-huhn", label: "Paniertes Hühnerfleisch", note: "Reis als Beilage." },
  { id: "vegetarisch", label: "Vegetarische Gerichte", note: "Reis als Beilage, sofern zutreffend." },
  { id: "meeresfruechte", label: "Meeresfrüchte", note: "Reis als Beilage." },
  { id: "vietnamesisch", label: "Vietnamesische Spezialitäten", note: "" },
  { id: "udon", label: "Gebratene Udon Nudeln", note: "" },
  { id: "ramen", label: "Ramen Menü", note: "" }
];

window.MENU_ITEMS = [
  { code: "1", category: "vorspeisen", name: "Pekingsuppe", description: "Sauerscharfe Suppe.", price: 4.50 },
  { code: "2", category: "vorspeisen", name: "Wan-Tan-Suppe", description: "Teigtaschen mit Hühnerfleisch und Gemüse.", price: 4.50 },
  { code: "3", category: "vorspeisen", name: "Kung-fu-Suppe", description: "Mit Hühnerfleisch und Gemüse (scharf).", price: 4.00 },
  { code: "4", category: "vorspeisen", name: "Tom-Kha-Gai-Suppe", description: "Thai-Suppe mit Hühnerfleisch, Gemüse und Kokosmilch (scharf).", price: 5.00 },
  { code: "5", category: "vorspeisen", name: "Tom-Yam-Goong-Suppe", description: "Thai-Suppe mit Garnelen, Gemüse und Champignons (scharf).", price: 5.50 },
  { code: "6", category: "vorspeisen", name: "Vietnamesische Frühlingsrollen", description: "Mit Hühnerfleisch, Glasnudeln & Gemüse.", price: 5.00 },
  { code: "7", category: "vorspeisen", name: "Sommerrolle", description: "Mit Hühnerfleisch, gekochten Garnelen, Salat, Reisnudeln und Basilikum.", price: 4.50 },
  { code: "8", category: "vorspeisen", name: "Vegetarische Frühlingsrollen (6 Stück)", description: "Mit süßsaurer Soße.", price: 4.50 },
  { code: "9", category: "vorspeisen", name: "Gebackene Wan-Tan (6 Stück)", description: "Mit süßsaurer Soße.", price: 4.50 },
  { code: "10", category: "vorspeisen", name: "Krabbenchips", description: "", price: 2.50 },
  { code: "11", category: "vorspeisen", name: "Sateh Gai (2 Stück)", description: "Mit Erdnusssoße.", price: 4.50 },

  { code: "13", category: "salate", name: "Yam-Pak", description: "Pikanter Gemüsesalat mit Gewürzen & Chili (scharf).", price: 7.50 },
  { code: "14", category: "salate", name: "Yam-Ta-Lac", description: "Pikanter Meeresfrüchtesalat mit Garnelen, Tintenfisch, Tomaten, Gurken, Zwiebeln & Chili (scharf).", price: 14.00 },
  { code: "15", category: "salate", name: "Glasnudel Salat", description: "Mit Hühnerfleisch, Krabben, Zwiebeln & Koriander.", price: 12.00 },
  { code: "16", category: "salate", name: "Sojakeime Salat", description: "", price: 6.50 },
  { code: "17", category: "salate", name: "Hähnchen Salat", description: "Gemischter Salat mit paniertem Hühnerfleisch.", price: 12.00 },
  { code: "18", category: "salate", name: "Enten Salat", description: "Gemischter Salat mit knusprigem Entenfleisch und hausgemachtem Dressing.", price: 13.00 },
  { code: "19", category: "salate", name: "Meeresfrüchtesalat", description: "Gemischter Salat mit Riesengarnelen und hausgemachtem Dressing.", price: 16.00 },
  { code: "19a", category: "salate", name: "Rindfleischsalat", description: "Gemischter Salat mit gebratenem Rindfleisch, Zwiebeln und hausgemachtem Dressing.", price: 14.00 },

  { code: "20", category: "nudelsuppen", name: "Pho-Bo oder Pho-Ga", description: "Vietnamesische Suppe mit Reisbandnudeln, Rindfleisch oder Hühnerfleisch, Koriander & Lauchzwiebeln.", price: 14.00 },
  { code: "21", category: "nudelsuppen", name: "Udon Japanische Nudelsuppe", description: "Japanische Nudeln mit Algen, Tofu & Frühlingszwiebeln.", variants: [
    { label: "a. Mit Garnelen", price: 15.00 },
    { label: "b. Mit knusprigen Lachsstreifen", price: 15.00 }
  ]},
  { code: "22", category: "nudelsuppen", name: "Shanghai Suppe", description: "", variants: [
    { label: "a. Mit Hühnerfleisch & Gemüse", price: 12.00 },
    { label: "b. Mit Tofu & Gemüse", price: 12.00 },
    { label: "c. Mit Garnelen & Gemüse", price: 15.00 }
  ]},

  { code: "30", category: "reis-nudeln", name: "Gebratener Reis oder Nudeln", description: "Mit Hühnerfleisch & Gemüse.", price: 9.50 },
  { code: "31", category: "reis-nudeln", name: "Gebratener Reis oder Nudeln", description: "Mit Rindfleisch & Gemüse.", price: 12.00 },
  { code: "32", category: "reis-nudeln", name: "Gebratener Reis oder Nudeln", description: "Mit Krabben & Gemüse.", price: 11.00 },
  { code: "33", category: "reis-nudeln", name: "Gebratener Reis oder Nudeln", description: "Mit Ente & Gemüse.", price: 13.00 },
  { code: "34", category: "reis-nudeln", name: "Gebratener Reis oder Nudeln", description: "Mit Hühnerfleisch, Rindfleisch, Krabben & Gemüse.", price: 13.00 },
  { code: "35", category: "reis-nudeln", name: "Gebratener Reis oder Nudeln", description: "Mit panierter Hühnerbrust & Gemüse.", price: 12.00 },
  { code: "36", category: "reis-nudeln", name: "Gebratene Nudeln Bami-Goreng oder Nasi-Goreng", description: "Mit Hühnerfleisch oder Krabben & Gemüse.", price: 11.00 },
  { code: "37", category: "reis-nudeln", name: "Gebratene Nudeln", description: "Mit Hühnerfleisch, rotem oder gelbem Thai-Curry, Kokosmilch & Gemüse (scharf).", price: 12.00 },
  { code: "38", category: "reis-nudeln", name: "Gebratene Thai Reisbandnudeln", description: "Mit Hühnerfleisch, Rindfleisch, Krabben & Gemüse.", price: 13.00 },
  { code: "39", category: "reis-nudeln", name: "Gebratene Glasnudeln", description: "Mit Hühnerfleisch, Rindfleisch, Krabben & Gemüse.", price: 13.00 },

  ...[
    ["40", "Chop Suey Soße", "Mit verschiedenen Gemüse."],
    ["41", "Knoblauch in Pfeffersoße", "Mit verschiedenen Gemüse (scharf)."],
    ["42", "Rotes oder Gelbes Thai-Curry", "Mit Kokosmilch & verschiedenen Gemüse (scharf)."],
    ["43", "Kung-Pao Soße", "Mit verschiedenen Gemüse."],
    ["44", "Ingwer & Basilikum Soße", "Mit verschiedenen Gemüse (scharf)."],
    ["45", "Sa-Cha Soße", "Mit verschiedenen Gemüse."]
  ].map(([code, name, description]) => ({ code, category: "fleisch", name, description, variants: [
    { label: "a. Hühnerfleisch", price: 10.50 },
    { label: "b. Rindfleisch", price: 12.00 },
    { label: "c. Entenfleisch", price: 13.00 }
  ]})),
  { code: "46", category: "fleisch", name: "Hühnerfleischspieße", description: "Sate-Gai nach Thaiart mit Erdnusssoße & Gemüse.", price: 13.00 },
  { code: "47", category: "fleisch", name: "Hühnerfleischspieße", description: "Sate-Gai mit rotem oder gelbem Thai-Curry & Gemüse (scharf).", price: 13.00 },

  { code: "50", category: "paniertes-huhn", name: "Paniertes Hühnerfleisch", description: "Mit rotem oder gelbem Thai-Curry, Kokosmilch & Gemüse (scharf).", price: 12.00 },
  { code: "51", category: "paniertes-huhn", name: "Paniertes Hühnerfleisch in Chop Suey Soße", description: "Mit verschiedenen Gemüse.", price: 12.00 },
  { code: "52", category: "paniertes-huhn", name: "Paniertes Hühnerfleisch", description: "Mit süßsaurer Soße & Gemüse.", price: 12.00 },
  { code: "53", category: "paniertes-huhn", name: "Paniertes Hühnerfleisch", description: "Mit Erdnusssoße & Gemüse.", price: 12.00 },
  { code: "54", category: "paniertes-huhn", name: "Paniertes Hühnerfleisch", description: "Mit Sa-Cha-Soße & Gemüse.", price: 12.00 },
  { code: "55", category: "paniertes-huhn", name: "Paniertes Hühnerfleisch", description: "Mit Ingwer, Basilikum & Gemüse (scharf).", price: 12.00 },
  { code: "56", category: "paniertes-huhn", name: "Paniertes Hühnerfleisch", description: "Mit Pfeffersoße, Knoblauch & Gemüse (scharf).", price: 12.00 },

  { code: "60", category: "vegetarisch", name: "Gebratenes Gemüse", description: "Mit Sojakeimen.", price: 9.00 },
  { code: "61", category: "vegetarisch", name: "Gebratenes Gemüse", description: "Mit rotem oder gelbem Thai-Curry, Kokosmilch (scharf).", price: 9.50 },
  { code: "62", category: "vegetarisch", name: "Gebratenes Gemüse mit Tofu", description: "Mit rotem oder gelbem Thai-Curry & Kokosmilch (scharf).", price: 10.50 },
  { code: "63", category: "vegetarisch", name: "Gebratenes Gemüse mit Tofu", description: "In Chop Suey Soße.", price: 9.50 },
  { code: "64", category: "vegetarisch", name: "Gebratener Tofu", description: "Mit frischer Tomatensoße, Koriander & Lauchzwiebeln.", price: 11.00 },
  { code: "65", category: "vegetarisch", name: "Gebratener Reis", description: "Mit verschiedenen Gemüse.", price: 8.50 },
  { code: "66", category: "vegetarisch", name: "Gebratene Nudeln", description: "Mit verschiedenen Gemüse.", price: 8.50 },
  { code: "67", category: "vegetarisch", name: "Gebratenes Pak Choi Gemüse mit Tofu", description: "", price: 12.00 },

  { code: "70", category: "meeresfruechte", name: "Geb. Tintenfisch", description: "Mit verschiedenem Gemüse & Chili (scharf).", price: 12.00 },
  { code: "71", category: "meeresfruechte", name: "Geb. Fischfilet", description: "Mit rotem oder gelbem Thai-Curry, Kokosmilch & verschiedenen Gemüse (scharf).", price: 13.00 },
  { code: "72", category: "meeresfruechte", name: "Geb. Garnelen", description: "Mit rotem oder gelbem Thai-Curry, Kokosmilch & verschiedenen Gemüse.", price: 15.00 },
  { code: "73", category: "meeresfruechte", name: "Panierte Garnelen", description: "Mit süßsaurer Soße & Gemüse.", price: 14.00 },
  { code: "74", category: "meeresfruechte", name: "Geb. Garnelen", description: "Mit Sa-Cha-Soße & Gemüse.", price: 15.00 },
  { code: "75", category: "meeresfruechte", name: "Geb. Fischfilet", description: "Mit süßsaurer Soße & Gemüse.", price: 13.00 },

  { code: "76", category: "vietnamesisch", name: "Bun Nem (Vietnamesische Frühlingsrollen)", description: "Reisnudeln mit Salat, Gurke, Koriander und einer Spezialsoße.", price: 14.00 },
  { code: "77", category: "vietnamesisch", name: "Bun Bo Nuong Xa (Gegrilltes Rindfleisch)", description: "Reisnudeln mit Salat, Gurke, Koriander und einer Spezialsoße.", price: 14.00 },

  { code: "U.1", category: "udon", name: "Gebratene Udon Nudeln", description: "Mit Hühnerfleisch und Gemüse.", price: 11.00 },
  { code: "U.2", category: "udon", name: "Gebratene Udon Nudeln", description: "Mit Rindfleisch und Gemüse.", price: 13.00 },
  { code: "U.3", category: "udon", name: "Gebratene Udon Nudeln", description: "Mit Krabben und Gemüse.", price: 13.00 },
  { code: "U.4", category: "udon", name: "Gebratene Udon Nudeln", description: "Mit Hühnerfleisch, Krabben, Rindfleisch und Gemüse.", price: 14.00 },
  { code: "U.5", category: "udon", name: "Gebratene Udon Nudeln", description: "Mit panierter Hühnerbrust und Gemüse.", price: 13.00 },
  { code: "U.6", category: "udon", name: "Gebratene Udon Nudeln", description: "Mit knuspriger Ente und Gemüse.", price: 14.00 },
  { code: "U.7", category: "udon", name: "Gebratene Udon Nudeln", description: "Mit Tofu und Gemüse.", price: 11.00 },
  { code: "U.8", category: "udon", name: "Gebratene Udon Nudeln", description: "Mit knusprigem Fischfilet und Gemüse.", price: 13.00 },
  { code: "U.9", category: "udon", name: "Gebratene Udon Nudeln", description: "Mit Garnelen und Gemüse.", price: 15.00 },

  { code: "", id: "ramen-chicken", category: "ramen", name: "Ramen Chicken", description: "Ramen Nudeln, Hähnchen, Ei und Gemüse.", price: 13.90 },
  { code: "", id: "ramen-shoyu", category: "ramen", name: "Ramen Shoyu", description: "Ramen Nudeln, Garnele, Ei und Gemüse.", price: 14.90 },
  { code: "", id: "ramen-tofu", category: "ramen", name: "Ramen Tofu", description: "Ramen Nudeln, Tofu, Ei und Gemüse.", price: 12.90 },
  { code: "", id: "ramen-beef", category: "ramen", name: "Ramen Beef", description: "Ramen Nudeln, Rindfleisch, Ei & Gemüse.", price: 14.90 },
  { code: "", id: "ramen-duck", category: "ramen", name: "Ramen Duck", description: "Ramen Nudeln, Ente, Ei & Gemüse.", price: 14.90 },
  { code: "", id: "ramen-gemischt", category: "ramen", name: "Ramen gemischt", description: "Ramen Nudeln, Garnele, Rindfleisch, Hähnchen, Ei und Gemüse.", price: 17.00 }
];
