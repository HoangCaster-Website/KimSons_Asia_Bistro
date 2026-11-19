window.SITE_CONFIG = {
  restaurant: {
    name: "Kim Son's Asia Bistro",
    addressLines: ["Nürnberger Str. 11", "63450 Hanau, Deutschland"],
    phone: "06181 4279277",
    email: "",
    // Internationale Nummer nur mit Ziffern, z. B. "4961811234567".
    // Leer lassen: WhatsApp öffnet die Nachricht und der Gast wählt den Empfänger.
    whatsapp: "",
    openingHours: [
      { days: "Montag–Samstag", opens: "11:30", closes: "21:30" },
      { days: "Sonntag", closed: true }
    ]
  },
  links: {
    instagram: "https://www.instagram.com/kim.sons.asia.bistro/",
    directions: "https://www.google.com/maps/search/?api=1&query=Kim+Son%27s+Asia+Bistro+N%C3%BCrnberger+Str.+11+63450+Hanau",
    mapEmbed: "https://maps.google.com/maps?q=N%C3%BCrnberger%20Str.%2011,%2063450%20Hanau,%20Deutschland&t=&z=16&ie=UTF8&iwloc=&output=embed"
  },
  images: {
    hero: "assets/images/hero-asian-table.jpg",
    ramen: "assets/images/ramen-chicken.jpg",
    springRolls: "assets/images/fruehlingsrollen.jpg",
    udon: "assets/images/udon.jpg",
    curry: "assets/images/thai-curry.jpg"
  }
};
