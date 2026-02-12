# Pétanque-boken: Sessionsammanfattning

**Senaste uppdatering:** 2026-02-12 01:50 UTC+01:00

## Projektöversikt

Detta är ett flerspråkigt digitalt bokprojekt om Pétanque (boule). Boken finns i flera språkversioner och innehåller kapitel, bilagor och interaktiva verktyg. Boken publiceras på Amazon KDP i tre språk.

### VIKTIGA LÄNKAR

| Resurs | Länk/Plats |
|--------|-----------|
| **Lokal mapp** | `/Users/matshamberg/CascadeProjects/Petanque-Den-Kompletta-Guiden` |
| **GitHub** | https://github.com/Mats6102hamberg/Petanque-Den-Kompletta-Guiden.git |
| **Vercel** | Ej konfigurerad för detta projekt |
| **Amazon KDP** | https://kdp.amazon.com/bookshelf |

### Git & Deployment Status

**Lokalt:**
- `/Users/matshamberg/CascadeProjects/Petanque-Den-Kompletta-Guiden`
- Git-repository: ✅ Fungerande

**GitHub:**
- Repository: `https://github.com/Mats6102hamberg/Petanque-Den-Kompletta-Guiden.git`
- Branch: `main`
- Status: ⚠️ Behöver commit + push (senaste ändringar ej pushade)

**Vercel:**
- Konfiguration: `vercel.json` finns
- Status: Ej konfigurerad

### Mappstruktur

```
/Users/matshamberg/CascadeProjects/Petanque-Den-Kompletta-Guiden/
├── index.html              # Svensk startsida
├── innehall.html           # Svensk innehållsförteckning
├── styles.css              # Gemensam CSS
├── script.js               # Gemensamt JavaScript
├── del1-kapitel1.html      # Kapitel 1-4 (Del 1: Grunderna)
├── del2-kapitel5.html      # Kapitel 5-8 (Del 2: Avancerat)
├── del3-kapitel9.html      # Kapitel 9-10 (Del 3: Livsstil)
├── del4-kapitel11.html     # Kapitel 11-16 (Del 4: Fördjupning)
├── utrustning.html         # Bilaga A: Utrustningsguide
├── regler.html             # Bilaga B: Regelboken
├── ordlista.html           # Bilaga C: Ordlista
├── anhang-bouleplatz.html  # Bilaga D: Bygga boulebana
├── fusklapp.html           # Verktyg: Fusklapp (1 sida)
├── traningsjournal.html    # Verktyg: Träningsjournal
├── matchprotokoll.html     # Verktyg: Matchprotokoll (interaktivt)
├── fordjupning.html        # Fördjupningssida
│
├── de/                     # TYSK VERSION (huvudarbete denna session)
│   ├── index.html          # Tysk startsida
│   ├── inhalt.html         # Tysk innehållsförteckning
│   ├── innehall.html       # Omdirigering → inhalt.html
│   ├── styles.css          # Kopierad från huvudmappen
│   ├── script.js           # Kopierad från huvudmappen
│   ├── del1-kapitel1.html  # Kapitel 1-16 (översatta)
│   ├── ...
│   ├── utrustning.html     # Anhang A: Ausrüstungsleitfaden
│   ├── regler.html         # Anhang B: Vollständiges Regelbuch
│   ├── ordlista.html       # Anhang C: Glossar
│   ├── anhang-bouleplatz.html  # Anhang D: Einen Bouleplatz Bauen
│   ├── fusklapp.html       # Spickzettel
│   ├── traningsjournal.html    # Trainingstagebuch
│   ├── matchprotokoll.html     # Matchprotokoll
│   └── fordjupning.html    # Vertiefung und Entwicklung
│
├── en/                     # Engelsk version ✅ Komplett
├── fr/                     # Fransk version ✅ Komplett
├── es/                     # Spansk version ✅ Komplett
└── th/                     # Thailändsk version (ej granskad)
```

## Utfört arbete

### Session 2026-02-11/12: KDP-uppdateringar — Svenska, Engelska & Franska

#### Vad som gjordes

1. **Lade till författarboxar (author-note)** i alla tre böcker (SV, EN, FR) — 9 st per bok
2. **Tog bort spelarcitat** — Dylan Rocher och Philippe Quintais citat ersatta med författarens egna citat
3. **Ändrade "psykologisk krigföring"** → **"mentalt schackspel på grus"** i alla tre språk:
   - SV: "Mentalt schackspel på grus"
   - EN: "A Mental Chess Game on Gravel"
   - FR: "Jeu d'Échecs Mental sur Gravier"
4. **Skapade ren svensk KDP-fil** (`amazon-kdp-book-sv.html`) — extraherade bara bokkapitlen, exkluderade nyheter, Mr Boule-roman, Premium Arkiv, fusklapp, träningsjournal, matchprotokoll
5. **Genererade tre EPUB-filer** med Calibre:
   - 🇸🇪 `petanque-bok-komplett-kdp.epub` (76 KB)
   - 🇬🇧 `petanque-complete-guide-kdp.epub` (86 KB)
   - 🇫🇷 `petanque-guide-complet-kdp.epub` (82 KB)
6. **Skapade franskt bokomslag** (`kindle-cover-fr-1600x2560.jpg`) med Pillow — baserat på svenska omslaget med fransk text
7. **Publicerade fransk Kindle eBook** på Amazon KDP — $9.99 USD
8. **Laddade upp svensk EPUB** till KDP (uppdaterat manuskript)
9. **Engelsk EPUB redo** — väntar på att "In review" blir klar

#### Amazon KDP Status (2026-02-12)

| Bok | Format | Pris | Status |
|-----|--------|------|--------|
| 🇬🇧 Engelska | Kindle eBook | $9.99 USD | In review |
| 🇬🇧 Engelska | Paperback | $24.95 USD | In review |
| 🇫🇷 Franska | Kindle eBook | $9.99 USD | Submitted (ny!) |
| 🇫🇷 Franska | Paperback | — | Live |
| 🇸🇪 Svenska | Kindle eBook | — | EPUB uppladdad |

#### Filer på Skrivbordet (`/Users/matshamberg/Desktop/`)

| Fil | Beskrivning |
|-----|-------------|
| `petanque-bok-komplett-kdp.epub` | 🇸🇪 Svensk KDP EPUB (ren, utan webbinnehåll) |
| `petanque-complete-guide-kdp.epub` | 🇬🇧 Engelsk KDP EPUB (uppdaterad) |
| `petanque-guide-complet-kdp.epub` | 🇫🇷 Fransk KDP EPUB |
| `kindle-cover-fr-1600x2560.jpg` | 🇫🇷 Franskt bokomslag (1600×2560) |
| `kindle-cover-fr.jpg` | 🇫🇷 Franskt omslag (ren JPG, ingen EXIF) |
| `kindle-cover-1600x2560.jpeg` | 🇸🇪 Svenskt omslag |
| `kindle-cover-en.jpg` | 🇬🇧 Engelskt omslag |
| `author-photo.jpg.jpeg` | Författarfoto (Mats Hamberg) |

#### KDP-filer i projektet

| Fil | Sökväg | Beskrivning |
|-----|--------|-------------|
| **SV KDP HTML** | `amazon-kdp-book-sv.html` | Ren svensk KDP-fil (3602 rader) |
| **EN KDP HTML** | `en/amazon-kdp-book.html` | Engelsk KDP-fil (3335 rader) |
| **FR KDP HTML** | `fr/amazon-kdp-book.html` | Fransk KDP-fil (3002 rader) |

#### Kvarstående uppgifter

1. **Fixa dubbelt författarnamn** på FR-boken ("Mats Hamberg, Mats Hamberg" → "Mats Hamberg")
2. **Fixa stavfel** "Nats" → "Mats Hamberg" på EN-boken (väntar på review klar)
3. **Ladda upp EN EPUB** (`petanque-complete-guide-kdp.epub`) när EN-boken blir redigerbar
4. **Author Central** — ladda upp författarfoto + biografi (https://author.amazon.com)
5. **Commit + push** alla ändringar till GitHub

---

### Session 2026-02-10/11: Amazon KDP Publicering (Engelsk version)

#### Vad som gjordes
1. **Integrerade 8 SVG-illustrationer** i `en/amazon-kdp-book.html` från individuella kapitel-filer
2. **Genererade EPUB + PDF** med Calibre (`ebook-convert`)
3. **Publicerade Kindle eBook** — $9.99 USD, 70% royalty, "In review"
4. **Publicerade Paperback** — $24.95 USD, 60% royalty, Standard color, "In review"
5. **Skapade engelskt omslag** med Gemini AI (porträttformat 1600×2560)
6. **Designade paperback-omslag** i KDP Cover Creator (framsida + baksida + rygg)
7. **Fixade fontfel** — bytte LucidaGrande-Bold → Arial/Georgia för KDP-kompatibilitet
8. **Bytte Unicode-tecken** (✓✗←→↑↓) till ASCII-alternativ för att undvika fontproblem
9. **AI-Generated Content deklarerat** — Text: ChatGPT, Bilder: Gemini, Översättning: ChatGPT

#### Kvarstående problem
- **STAVFEL I FÖRFATTARNAMN:** "Nats Hamberg" istället för "Mats Hamberg" — kan inte ändras förrän review är klar
- Gå till KDP Bookshelf → klicka på titeln → ändra Author till "Mats Hamberg" → spara

#### Amazon KDP Status
| Format | Pris | Status | ISBN |
|--------|------|--------|------|
| Kindle eBook | $9.99 USD | In review | — |
| Paperback | $24.95 USD | In review | 9798247830016 |

#### Paperback-inställningar
- **Ink and Paper Type:** Standard color interior with white paper
- **Trim Size:** 6.93 x 9.84 in (17.6 × 24.99 cm)
- **Bleed:** No Bleed
- **Cover finish:** Matte
- **Page Count:** 137
- **Printing Cost:** $6.51/bok (Amazon.com)

---

## Tidigare sessioner

### Session 2026-02-03 (14:40): Borttagning av spelarfoton

#### Problem som identifierades
1. **Upphovsrättsproblem**: Spelarfoton i boken saknar publiceringsrättigheter
2. **5 spelarfoton** användes i flera filer: dawson.jpg, foyot.jpg, quintais.jpg, rocher.jpg, sangkaew.jpg

#### Åtgärder
1. **Identifierade alla filer** med spelarfoton:
   - `del3-kapitel10.html` (4 foton)
   - `aktuellt.html` (1 foto)
   - `petanque-bok-komplett.html` (5 foton)
   - `trycksak/petanque-trycksak.html` (4 foton)
2. **Tog bort `<img>`-taggar** men behöll all text om spelarna
3. **Raderade bildfiler** från `/images/players/`
4. **Verifierade språkversioner** - inga foton där

#### Resultat
- ✅ Alla spelarfoton borttagna (5 filer raderade)
- ✅ Text om spelare och deras meriter kvar
- ✅ 4 HTML-filer uppdaterade
- ✅ Commit: `3720427` - "Ta bort spelarfoton pga upphovsrättsskäl"
- ✅ Pushad till GitHub och Vercel

**Spelare som fortfarande omnämns (utan foto):**
- Philippe Quintais (15 världstitlar)
- Marco Foyot (6 VM-titlar)
- Dylan Rocher (5 VM-titlar)
- Thanakorn Sangkaew (VM-guld 2019)
- Dawson Herleman (14-årig fenomen)

---

### Session 2026-02-03 (14:18): Git-återställning och GitHub-synkronisering

#### Problem som identifierades
1. **Trasigt Git-repository**: `.git/`-mappen var tom (0 items), vilket gjorde att Git inte fungerade
2. **Ingen koppling till GitHub**: Projektet kunde inte pushas trots att remote-URL fanns konfigurerad
3. **Boken "försvunnen"**: Användaren kunde inte hitta projektet på GitHub eller Vercel

#### Åtgärder
1. **Tog bort trasig `.git/`-mapp** och initialiserade nytt Git-repository
2. **Lade till alla filer** (284 objekt, 4.16 MB) och skapade initial commit
3. **Kopplade till GitHub-repo**: `https://github.com/Mats6102hamberg/Petanque-Den-Kompletta-Guiden.git`
4. **Löste merge-konflikter** mellan lokal version och GitHub-version (använde lokala filer som är kompletta)
5. **Ökade Git buffer** (`http.postBuffer 524288000`) för att hantera stora filer
6. **Pushade framgångsrikt** till GitHub (commit: `e19045f`)

#### Resultat
- ✅ Git-repository återställt och fungerande
- ✅ Alla filer pushade till GitHub
- ✅ Projektet synkroniserat mellan lokal dator och GitHub
- ⏳ Vercel-deployment behöver verifieras

---

### Session (tidigare): Tysk översättning

#### Problem som identifierades
1. **Saknade CSS/JS-filer**: Den tyska versionen saknade styles.css och script.js, vilket gjorde att sidorna visades utan formatering
2. **Svensk text i tyska filer**: Många kapitel var helt på svenska eller hade blandad svensk/tysk text trots `lang="de"`
3. **Felaktiga navigationslänkar**: Filer pekade till "innehall.html" (svenska) istället för "inhalt.html" (tyska)

### Åtgärder

#### 1. Fixade styling
- Kopierade `styles.css` och `script.js` från huvudmappen till `/de/`

#### 2. Översatte alla kapitel (1-16)
- **del1-kapitel1.html** - Fixade svenska rester och länkar
- **del1-kapitel2.html** - Helt omskriven till tyska
- **del1-kapitel3.html** - Helt omskriven till tyska
- **del1-kapitel4.html** - Helt omskriven till tyska
- **del2-kapitel5.html** - Helt omskriven till tyska
- **del2-kapitel6.html** - Helt omskriven till tyska
- **del2-kapitel7.html** - Verifierad (redan på tyska med MGP-metoden)
- **del2-kapitel8.html** - Helt omskriven till tyska
- **del3-kapitel9.html** - Helt omskriven till tyska
- **del3-kapitel10.html** - Helt omskriven till tyska
- **del4-kapitel11.html till del4-kapitel16.html** - Verifierade (redan på tyska)

#### 3. Översatte alla bilagor
- **utrustning.html** → Anhang A: Ausrüstungsleitfaden
- **regler.html** → Anhang B: Vollständiges Regelbuch
- **ordlista.html** → Anhang C: Glossar
- **anhang-bouleplatz.html** - Verifierad (redan på tyska)

#### 4. Översatte verktyg och resurser
- **fusklapp.html** → Spickzettel (var blandad text)
- **traningsjournal.html** → Trainingstagebuch (var helt på svenska)
- **matchprotokoll.html** → Matchprotokoll (var ofullständig)
- **fordjupning.html** → Vertiefung und Entwicklung (var helt på svenska)

#### 5. Fixade navigering
- Skapade omdirigering från `innehall.html` → `inhalt.html`
- Uppdaterade alla navigationslänkar i översatta filer

## Resultat

Den tyska versionen av Pétanque-boken är nu **100% översatt** med:
- ✅ 16 kapitel
- ✅ 4 bilagor
- ✅ 3 interaktiva verktyg
- ✅ Fördjupningssida
- ✅ Korrekt styling (CSS/JS)
- ✅ Fungerande navigering

## Tekniska detaljer

### Filnamnkonventioner
- Kapitel: `del{del}-kapitel{nr}.html` (t.ex. `del1-kapitel1.html`)
- Innehållsförteckning: `innehall.html` (sv), `inhalt.html` (de), `contents.html` (en)
- Bilagor: Svenska filnamn används i alla versioner (t.ex. `utrustning.html`, `regler.html`)

### Viktiga termer
- **Pétanque-terminologi**: Franska facktermer används genomgående (carreau, cochonnet, donnée, mène, pointeur, tireur, etc.)
- **MGP-metoden**: Matematik, Geografi, Plan - mental checklista för pétanque
- **Spielformate**: Tête-à-tête (1v1), Doublette (2v2), Triplette (3v3)
