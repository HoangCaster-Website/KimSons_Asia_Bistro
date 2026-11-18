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
  { id: "ramen", label: "Ramen Menü", note: "" },
  { id: "sushi-nigiri", group: "sushi", label: "Nigiri", note: "Je 1 Stück." },
  { id: "sushi-beilagen", group: "sushi", label: "Sushi-Beilagen", note: "" },
  { id: "sushi-hoso-maki", group: "sushi", label: "Hoso Maki", note: "8 Stück, Shake Kawa Maki: 5 Stück." },
  { id: "sushi-magic", group: "sushi", label: "Magic Maki", note: "Paniert, mit Haus-Dip · 8 Stück." },
  { id: "sushi-inside-out", group: "sushi", label: "Inside-Out Rolls", note: "" },
  { id: "sushi-sashimi", group: "sushi", label: "Sashimi", note: "" },
  { id: "sushi-menue", group: "sushi", label: "Sushi-Menü", note: "Unsere zusammengestellten Sushi-Menüs." }
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
  { code: "", id: "ramen-gemischt", category: "ramen", name: "Ramen gemischt", description: "Ramen Nudeln, Garnele, Rindfleisch, Hähnchen, Ei und Gemüse.", price: 17.00 },

  // Sushi transcribed from the supplied printed menu (17 November 2026).
  // Dishes 96 and 104 remain available at the printed prices, as confirmed by the owner.
  ...[
    { code: "90", category: "sushi-nigiri", name: "Ebi Nigiri", description: "Gekochte Garnele (1 Stück).", price: 3.20 },
    { code: "91", category: "sushi-nigiri", name: "Maguro Nigiri", description: "Thunfisch (1 Stück).", price: 3.20 },
    { code: "92", category: "sushi-nigiri", name: "Shake Nigiri", description: "Lachs (1 Stück).", price: 3.00 },
    { code: "93", category: "sushi-nigiri", name: "Saba Nigiri", description: "Makrele (1 Stück).", price: 3.20 },
    { code: "94", category: "sushi-nigiri", name: "Tamago Nigiri", description: "Eierstich (1 Stück).", price: 3.00 },
    { code: "95", category: "sushi-nigiri", name: "Avocado Nigiri", description: "Avocado (1 Stück).", price: 3.00 },
    { code: "96", category: "sushi-nigiri", name: "Unagi Nigiri", description: "Marinierter Aal (1 Stück).", price: 3.50 },
    { code: "97", category: "sushi-nigiri", name: "Tofu Nigiri", description: "Hausgemachter Tofu (1 Stück).", price: 3.00 },
    { code: "98", category: "sushi-nigiri", name: "Gurke Nigiri", description: "Gurke (1 Stück).", price: 2.20 },
    { code: "99", category: "sushi-nigiri", name: "Shinko Nigiri", description: "Rettich (1 Stück).", price: 2.50 },

    { code: "100", category: "sushi-beilagen", name: "Edamame", description: "Japanische Sojabohnen.", price: 5.00 },
    { code: "101", category: "sushi-beilagen", name: "Goma Wakame", description: "Marinierter Seetangsalat mit Sesam.", price: 5.50 },

    { code: "102", category: "sushi-hoso-maki", name: "Tekka Maki", description: "Thunfisch (8 Stück).", price: 5.30 },
    { code: "103", category: "sushi-hoso-maki", name: "Shake Maki", description: "Lachs (8 Stück).", price: 4.80 },
    { code: "104", category: "sushi-hoso-maki", name: "Kanpyo Maki", description: "Eingelegter japanischer Kürbis (8 Stück).", price: 3.80 },
    { code: "105", category: "sushi-hoso-maki", name: "Kappa Maki", description: "Gurke, Sesam (8 Stück).", price: 4.00 },
    { code: "106", category: "sushi-hoso-maki", name: "Avocado Maki", description: "Avocado (8 Stück).", price: 4.50 },
    { code: "107", category: "sushi-hoso-maki", name: "Takuwan Maki", description: "Eingelegter Rettich (8 Stück).", price: 4.20 },
    { code: "108", category: "sushi-hoso-maki", name: "Kani Maki", description: "Krabben (8 Stück).", price: 4.30 },
    { code: "109", category: "sushi-hoso-maki", name: "Tobiko Maki", description: "Gekochte Garnele, Kaviar (8 Stück).", price: 5.50 },
    { code: "110", category: "sushi-hoso-maki", name: "Shake Kawa Maki", description: "Knusprige Lachshaut, Gurke, Sesam (5 Stück).", price: 4.50 },
    { code: "111", category: "sushi-hoso-maki", name: "Tofu Maki", description: "Hausgemachter Tofu (8 Stück).", price: 4.50 },

    { code: "C1", category: "sushi-magic", name: "Magic Avocado", description: "Panierte Avocado Maki mit Haus-Dip (8 Stück).", price: 5.50 },
    { code: "C2", category: "sushi-magic", name: "Magic Lachs", description: "Panierte Lachs Maki mit Haus-Dip (8 Stück).", price: 6.00, image: "assets/images/sushi-hd/c1.webp", imageNote: "Beispielfoto: Magic Avocado" },
    { code: "C3", category: "sushi-magic", name: "Magic Thunfisch", description: "Panierte Thunfisch Maki mit Haus-Dip (8 Stück).", price: 6.50, image: "assets/images/sushi-hd/c1.webp", imageNote: "Beispielfoto: Magic Avocado" },

    { code: "112", category: "sushi-inside-out", name: "Avocado Roll", description: "Avocado, Frischkäse und Sesam (8 Stück).", price: 6.50 },
    { code: "113", category: "sushi-inside-out", name: "Gurke Roll", description: "Gurke, Frischkäse und Sesam (8 Stück).", price: 5.50 },
    { code: "114", category: "sushi-inside-out", name: "Salada Roll", description: "Gurke, Paprika, Frischkäse und Sesam (8 Stück).", price: 5.50 },
    { code: "115", category: "sushi-inside-out", name: "Negi Tekka Roll", description: "Gehackter Thunfisch, Frühlingszwiebeln, Avocado, Sesam (8 Stück).", price: 9.50 },
    { code: "116", category: "sushi-inside-out", name: "Shake Roll", description: "Lachs, Avocado, Frischkäse, Sesam (8 Stück).", price: 7.50 },
    { code: "117", category: "sushi-inside-out", name: "California Roll", description: "Gekochte Garnele, Avocado, Mayo, Gurke und Kaviar (8 Stück).", price: 10.00 },
    { code: "118", category: "sushi-inside-out", name: "Alaska Roll", description: "Lachs, Gurke, Sesam (8 Stück).", price: 7.00 },
    { code: "119", category: "sushi-inside-out", name: "Negi Shake Roll", description: "Gehackter Lachs, Avocado, Sesam (8 Stück).", price: 7.50 },
    { code: "120", category: "sushi-inside-out", name: "Tofu Roll", description: "Hausgemachter Tofu, Avocado, Gurke, Sesam (8 Stück).", price: 5.50 },
    { code: "121", category: "sushi-inside-out", name: "Crispy Chicken Roll", description: "Paniertes Hühnchen, Salat, Mayo, Gurke, Sesam (8 Stück).", price: 8.00 },
    { code: "122", category: "sushi-inside-out", name: "Rainbow Roll", description: "Avocado, Gurke, Garnele, Lachs, Thunfisch, Sesam, Kaviar, Frühlingszwiebeln (8 Stück).", price: 16.00 },
    { code: "123", category: "sushi-inside-out", name: "Dragon Roll", description: "Avocado, Gurke, Lachs, Rettich, Kaviar, scharfe Mayo (8 Stück).", price: 14.50 },
    { code: "124", category: "sushi-inside-out", name: "Tokyo Roll", description: "Thunfisch, Avocado, Gurke, Frischkäse, Lachs, Kaviar, Sesam (8 Stück).", price: 15.50 },
    { code: "125", category: "sushi-inside-out", name: "Valentin’s Roll", description: "Panierte Garnele, Avocado, Gurke, Kaviar (8 Stück).", price: 13.50 },
    { code: "126", category: "sushi-inside-out", name: "Crunchy Roll", description: "Panierte Rolle mit Lachs, Thunfisch, Avocado, Gurke, Frühlingszwiebeln, Kaviar, darüber unsere Haus-Soße.", price: 15.50 },
    { code: "127", category: "sushi-inside-out", name: "Shake Kyuri", description: "Gurkerolle mit Lachs, Avocado, Ei, Sesam.", price: 12.00 },

    { code: "A1", category: "sushi-sashimi", name: "Shake Sashimi", description: "Roher Lachs.", price: 20.00 },
    { code: "A2", category: "sushi-sashimi", name: "Maguro Sashimi", description: "Roher Thunfisch.", price: 22.00 },
    { code: "A3", category: "sushi-sashimi", name: "Maguro Shake Sashimi", description: "Roher Thunfisch und Lachs.", price: 22.90 },

    { code: "M1", category: "sushi-menue", name: "Veggie Menü", description: "Rettich Maki, Avocado Maki, Gurke Roll, Salada Roll.", price: 17.90 },
    { code: "M2", category: "sushi-menue", name: "Narita Menü", description: "8 Stück California Roll, 4 Stück Kappa Maki, 4 Stück Lachs Maki, 3 Nigiri.", price: 20.00 },
    { code: "M3", category: "sushi-menue", name: "Daikoku Menü", description: "Avocado Maki, Lachs Maki, Thunfisch Maki.", price: 13.90 },
    { code: "M4", category: "sushi-menue", name: "Kim Sons Menü", description: "2 Nigiri, Lachs Maki, Avocado Maki.", price: 14.50 }
  ].map((item) => ({ ...item, image: item.image || `assets/images/sushi-hd/${item.code.toLowerCase()}.webp` }))
];
