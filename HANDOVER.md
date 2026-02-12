# Pétanque-boken: Handover för nästa agent

**Senast uppdaterad:** 2026-02-12 01:50 UTC+01:00

---

## VIKTIGA LÄNKAR

| Resurs | Länk/Plats |
|--------|-----------|
| **Lokal mapp** | `/Users/matshamberg/CascadeProjects/Petanque-Den-Kompletta-Guiden` |
| **GitHub** | https://github.com/Mats6102hamberg/Petanque-Den-Kompletta-Guiden.git |
| **Vercel** | Ej konfigurerad för detta projekt |
| **Amazon KDP** | https://kdp.amazon.com/bookshelf |
| **Author Central** | https://author.amazon.com |

---

## AMAZON KDP STATUS (2026-02-12)

### Engelska boken
| Format | Pris | Status | ISBN |
|--------|------|--------|------|
| Kindle eBook | $9.99 USD | In review | — |
| Paperback | $24.95 USD | In review | 9798247830016 |

### Franska boken (NY!)
| Format | Pris | Status |
|--------|------|--------|
| Kindle eBook | $9.99 USD | Submitted |
| Paperback | — | Live |

### Svenska boken
| Format | Status |
|--------|--------|
| Kindle eBook | EPUB uppladdad (uppdaterat manuskript) |

### ⚠️ KRITISKT: Saker att fixa

1. **Stavfel EN-boken:** Författarnamnet står "Nats Hamberg" — ska vara "Mats Hamberg"
   - Kan INTE ändras förrän review är klar
   - Gå till KDP Bookshelf → klicka på boktiteln → ändra Author → spara
   - Måste fixas för BÅDE eBook och Paperback

2. **Dubbelt författarnamn FR-boken:** Står "Mats Hamberg, Mats Hamberg"
   - Gå till KDP Bookshelf → franska boken → Book Details → ta bort extra författarnamn

3. **Ladda upp EN EPUB:** Filen `petanque-complete-guide-kdp.epub` ligger redo på Skrivbordet
   - Väntar på att EN-boken blir redigerbar (efter review)
   - Innehåller: author-notes, inga spelarcitat, "mental chess game" istället för "warfare"

### Engelska Paperback-inställningar
- **Ink and Paper Type:** Standard color interior with white paper
- **Trim Size:** 6.93 x 9.84 in (17.6 × 24.99 cm)
- **Bleed:** No Bleed
- **Cover finish:** Matte
- **Page Count:** 137
- **Printing Cost:** $6.51/bok (Amazon.com)

---

## FILER PÅ SKRIVBORDET (`/Users/matshamberg/Desktop/`)

### EPUB-filer (för KDP-uppladdning)
| Fil | Språk | Storlek | Beskrivning |
|-----|-------|---------|-------------|
| `petanque-bok-komplett-kdp.epub` | 🇸🇪 Svenska | 76 KB | Ren KDP EPUB (utan webbinnehåll) |
| `petanque-complete-guide-kdp.epub` | 🇬🇧 Engelska | 86 KB | Uppdaterad med author-notes |
| `petanque-guide-complet-kdp.epub` | 🇫🇷 Franska | 82 KB | Uppladdad till KDP |

### Omslagsbilder
| Fil | Språk | Storlek | Beskrivning |
|-----|-------|---------|-------------|
| `kindle-cover-1600x2560.jpeg` | 🇸🇪 Svenska | 2.3 MB | Svenskt omslag (original) |
| `kindle-cover-en.jpg` | 🇬🇧 Engelska | 876 KB | Engelskt omslag (Gemini AI) |
| `kindle-cover-fr-1600x2560.jpg` | 🇫🇷 Franska | 903 KB | Franskt omslag (Pillow-genererat) |
| `kindle-cover-fr.jpg` | 🇫🇷 Franska | 853 KB | Franskt omslag (ren JPG, ingen EXIF) |
| `author-photo.jpg.jpeg` | — | — | Författarfoto (Mats Hamberg) |

### Gamla filer (kan ignoreras)
| Fil | Beskrivning |
|-----|-------------|
| `petanque-bok-komplett.epub` | GAMMAL svensk EPUB (innehåller Mr Boule etc.) — ANVÄND EJ |
| `kindle-cover-en-1600x2560.jpg` | Misslyckad pixel-redigering — ANVÄND EJ |

---

## KDP-FILER I PROJEKTET

| Fil | Sökväg | Beskrivning |
|-----|--------|-------------|
| **SV KDP HTML** | `amazon-kdp-book-sv.html` | Ren svensk KDP-fil (3602 rader) |
| **EN KDP HTML** | `en/amazon-kdp-book.html` | Engelsk KDP-fil (3335 rader) + 8 SVG |
| **FR KDP HTML** | `fr/amazon-kdp-book.html` | Fransk KDP-fil (3002 rader) |
| **SV Original** | `petanque-bok-komplett.html` | Komplett svensk webbsida (alla kapitel + extras) |

### Generera ny EPUB
```bash
# Svenska
ebook-convert amazon-kdp-book-sv.html ~/Desktop/petanque-bok-komplett-kdp.epub \
  --title "Pétanque: Den kompletta guiden" --authors "Mats Hamberg" --language sv \
  --no-default-epub-cover --chapter "//h:div[@class='chapter']" \
  --page-breaks-before "//h:div[@class='part-header']"

# Engelska
ebook-convert en/amazon-kdp-book.html ~/Desktop/petanque-complete-guide-kdp.epub \
  --title "Pétanque: The Complete Guide" --authors "Mats Hamberg" --language en \
  --no-default-epub-cover --chapter "//h:div[@class='chapter']" \
  --page-breaks-before "//h:div[@class='part-header']"

# Franska
ebook-convert fr/amazon-kdp-book.html ~/Desktop/petanque-guide-complet-kdp.epub \
  --title "Pétanque: Le Guide Complet" --authors "Mats Hamberg" --language fr \
  --no-default-epub-cover --chapter "//h:div[@class='chapter']" \
  --page-breaks-before "//h:div[@class='part-header']"
```

### SVG-illustrationer i en/amazon-kdp-book.html (8 st)
1. **Kapitel 1** (rad ~535): Pétanque-plan ovanifrån med kastering, jack och boules
2. **Kapitel 1** (rad ~587): Korrekt vs felaktig fotställning i kastering
3. **Kapitel 3** (rad ~829): Jack, Parking Spot och Donnée
4. **Kapitel 3** (rad ~882): Tre kastbanor — rullande, halv-lob och hög lob
5. **Kapitel 4** (rad ~1041): Tre grundtaktiker — boule framför, backstop, promotion
6. **Kapitel 6** (rad ~1352): Direkt skott (carreau) vs rullande skott (raser)
7. **Kapitel 16** (rad ~2329): Backspin-bromseffekt jämförelse
8. **Bilaga D** (rad ~2975): Tvärsnitt av boulebana med lager

---

## SPRÅKVERSIONER

| Mapp | Språk | KDP-status | Webbversion |
|------|-------|------------|-------------|
| `/` (rot) | Svenska | EPUB uppladdad | ✅ Komplett |
| `/de/` | Tyska | Ej publicerad | ✅ Komplett |
| `/en/` | Engelska | In review ($9.99 + $24.95) | ✅ Komplett |
| `/fr/` | Franska | Submitted ($9.99) | ✅ Komplett |
| `/es/` | Spanska | Ej publicerad | ✅ Komplett |
| `/th/` | Thailändska | Ej publicerad | ⚠️ Ej granskad |

---

## SENASTE TEXTÄNDRINGAR (2026-02-11/12)

### 1. Författarboxar (author-note)
- Lagt till 9 st `<div class="author-note">` per bok (SV, EN, FR)
- CSS-klass `.author-note` tillagd i alla tre böckers `<style>`-block

### 2. Borttagna spelarcitat
- Dylan Rocher-citat i kapitel 15 → ersatt med författarens eget citat
- Philippe Quintais-citat i kapitel 16 → ersatt med författarens eget citat
- Gäller alla tre språk

### 3. "Psykologisk krigföring" borttaget
- SV: "Psykologisk krigföring" → "Mentalt schackspel på grus"
- EN: "Psychological Warfare" → "A Mental Chess Game on Gravel"
- FR: "Guerre Psychologique" → "Jeu d'Échecs Mental sur Gravier"
- Ändrat i kapitel 7 (rubrik + underrubrik) i alla tre böcker + svenska originalet

---

## FONTREGLER FÖR KDP

**VIKTIGT:** KDP stöder INTE LucidaGrande. Använd:
- **Brödtext:** Georgia, 'Times New Roman', serif
- **SVG-text:** Arial, Helvetica, sans-serif
- **Undvik Unicode-pilar/symboler** (✓✗←→↑↓) — de triggar LucidaGrande som fallback

---

## KVARSTÅENDE UPPGIFTER

1. **KRITISKT:** Fixa stavfel "Nats" → "Mats Hamberg" i EN-boken (väntar på review)
2. **KRITISKT:** Fixa dubbelt författarnamn på FR-boken
3. **Ladda upp EN EPUB** när review klar (`petanque-complete-guide-kdp.epub`)
4. **Author Central** — ladda upp författarfoto + biografi (https://author.amazon.com)
5. **Commit + push** alla ändringar till GitHub
6. **Granska thailändska versionen** (`/th/`)
7. **Överväg KDP-publicering** av tyska och spanska versionerna

---

## TEKNISKA DETALJER

- **Calibre** (`ebook-convert`) används för EPUB-generering
- **Pillow** (Python) för omslagsredigering — installerat via `pip3 install --break-system-packages Pillow`
- Mats pratar **svenska** — svara ALLTID på svenska
- Författare: **Mats Hamberg**
