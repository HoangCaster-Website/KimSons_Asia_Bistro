# Kim Son's Asia Bistro

Statische, responsive Website für Kim Son's Asia Bistro in Hanau. Die Website verwendet HTML5, CSS3 und JavaScript ohne Framework und kann direkt auf GitHub Pages, Vercel oder einem klassischen Webspace bereitgestellt werden.

## Lokal starten

Öffnen Sie `index.html` direkt im Browser oder starten Sie einen kleinen lokalen Webserver, zum Beispiel:

```powershell
python -m http.server 8000
```

Danach: `http://localhost:8000`

## Inhalte pflegen

- `js/menu-data.js`: Kategorien, Gerichte, Varianten und Preise
- `js/config.js`: Adresse, Links, optionale Kontaktdaten, WhatsApp-Zielnummer und Bildpfade
- `assets/images/`: Bildmaterial
- `css/style.css`: Farben, Layout, Animationen und Responsive Design
- `css/bistro.css`: Boutique-Design für Hero, Food-Galerie, Menü und Besuchsbereich
- `css/menu.css`: Menü-Navigation, mobile Kategorieauswahl, Gerichte und Mengensteuerung

Die Speisekarte besitzt einen lokalen Warenkorb für Abholbestellungen. Ohne hinterlegte WhatsApp-Nummer öffnet die fertige Nachricht die WhatsApp-Empfängerauswahl. Für die direkte Übergabe an das Restaurant tragen Sie die bestätigte internationale Nummer ohne `+`, Leerzeichen oder Trennzeichen in `restaurant.whatsapp` in `js/config.js` ein (Beispiel: `4961811234567`). Telefon und E-Mail bleiben optional.

## Vor Veröffentlichung

1. Betreiberangaben im Impressum ergänzen und rechtlich prüfen.
2. Datenschutzerklärung an Hosting und tatsächliche Dienste anpassen.
3. Bestätigte Allergene und Zusatzstoffe ergänzen.
4. Optional Google Fonts lokal bereitstellen. Die Wegbeschreibung öffnet OpenStreetMap; eine Karte wird nicht eingebettet.

## Bildmaterial

Die Food-Fotografien wurden speziell für diese Website als stimmige Illustrationsbilder erstellt. Sie dienen der visuellen Präsentation und können in `js/config.js` zentral ersetzt werden.

Die ursprünglichen Sushi-Bilder in `assets/images/sushi/` sind Ausschnitte der am 17.11.2026 gelieferten gedruckten Speisekarte. Die 6 Dateien enthalten 5 unterschiedliche Fotos; `23.13.42` und `23.15.28` sind identisch. Die Ausschnitte lassen sich mit `python evidence/extract-sushi-images.py` (Pillow erforderlich) erneut erstellen. Die Originaldateien und ursprünglichen Ausschnitte bleiben unverändert.

Die Website zeigt die überarbeiteten Sushi-Illustrationsbilder in `assets/images/sushi-hd/`: 46 einzelne, mit dem eingebauten Imagegen-Werkzeug anhand der ursprünglichen Ausschnitte aufbereitete Motive mit besserer Schärfe, hellerem Licht und einheitlichem elfenbeinfarbenem Hintergrund. Feine Details wurden dabei KI-gestützt rekonstruiert; die Ergebnisse sind Serviervorschläge, keine neuen Originalaufnahmen des Restaurants. Alle 48 Sushi-Einträge verwenden diese Motive; C2 und C3 teilen sich weiterhin das beschriftete C1-Beispielfoto. Die 320 × 320 Pixel großen WebP-Dateien sind für hochauflösende Displays optimiert und werden verzögert geladen (zusammen rund 601 KiB). Die verwendeten Prompts und Pfade zu den generierten Vorlagen stehen in `evidence/sushi-restoration-manifest.json`. Solange diese Vorlagen lokal vorhanden sind, erstellt `python evidence/prepare-sushi-hd.py` die WebP-Dateien erneut. Der Vorher-Nachher-Vergleich liegt unter `evidence/sushi-quality-comparison.jpg`.

Die 48 neuen Sushi-Gerichte inklusive Beilagen, Sashimi und Menüs werden in `js/menu-data.js` gepflegt und lassen sich über „Sushi & Sashimi“ gemeinsam filtern. Nummer 96 (Unagi Nigiri, 3,50 €) und 104 (Kanpyo Maki, 3,80 €) bleiben trotz Durchstreichung auf der Vorlage auf ausdrücklichen Wunsch des Auftraggebers zu den gedruckten Preisen erhältlich. Für C2 und C3 enthält die Vorlage kein eigenes Foto: Beide verwenden vorläufig das Bild von C1 mit der sichtbaren Beschriftung „Beispielfoto: Magic Avocado“. Sobald eigene Fotos vorliegen, `image` ersetzen und `imageNote` entfernen. Angaben zu Stückzahlen werden nur übernommen, wenn sie auf der Vorlage stehen.

Design by HoangCaster
