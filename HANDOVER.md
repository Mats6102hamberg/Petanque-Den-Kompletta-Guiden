# Pétanque-boken: Handover för nästa agent

**Senast uppdaterad:** 2026-02-11 03:15 UTC+01:00

---

## VIKTIGA LÄNKAR

| Resurs | Länk/Plats |
|--------|-----------|
| **Lokal mapp** | `/Users/matshamberg/CascadeProjects/Petanque-Den-Kompletta-Guiden` |
| **GitHub** | https://github.com/Mats6102hamberg/Petanque-Den-Kompletta-Guiden.git |
| **Vercel** | Ej konfigurerad för detta projekt |
| **Amazon KDP** | https://kdp.amazon.com (logga in med Mats konto) |

---

## AMAZON KDP STATUS (2026-02-11)

| Format | Pris | Status | ISBN |
|--------|------|--------|------|
| **Kindle eBook** | $9.99 USD | In review | — |
| **Paperback** | $24.95 USD | In review | 9798247830016 |

### ⚠️ KRITISKT: Stavfel att fixa
**Författarnamnet står "Nats Hamberg" — ska vara "Mats Hamberg"**
- Kan INTE ändras förrän review är klar
- Gå till KDP Bookshelf → klicka på boktiteln → ändra Author → spara
- Måste fixas för BÅDE eBook och Paperback

### Paperback-inställningar
- **Ink and Paper Type:** Standard color interior with white paper
- **Trim Size:** 6.93 x 9.84 in (17.6 × 24.99 cm)
- **Bleed:** No Bleed
- **Cover finish:** Matte
- **Page Count:** 137
- **Printing Cost:** $6.51/bok (Amazon.com)

---

## FILER PÅ SKRIVBORDET (`/Users/matshamberg/Desktop/`)

| Fil | Beskrivning |
|-----|-------------|
| `kindle-cover-en.jpg` | Engelskt omslag (Gemini AI), 1600×2560 px — använd för KDP |
| `kindle-cover-1600x2560` | Svenskt omslag (med svensk text) — ANVÄND EJ för engelska |
| `kindle-cover-en-1600x2560.png` | CSS-genererat omslag (ej foto) — backup |
| `kindle-cover-en-1600x2560.jpg` | Misslyckad pixel-redigering — ANVÄND EJ |
| `author-photo.jpg.jpeg` | Författarfoto (Mats Hamberg) — används på paperback-baksida |
| `petanque-complete-guide.pdf` | Senaste PDF (fontfix, inga LucidaGrande) |
| `petanque-complete-guide.epub` | EPUB för Kindle eBook |
| `Petanque dkg/` | Mapp med 2 objekt |

---

## PROJEKTETS ENGELSKA KDP-FILER

| Fil | Sökväg | Beskrivning |
|-----|--------|-------------|
| **HTML-källa** | `en/amazon-kdp-book.html` | Huvudfil med all boktext + 8 SVG-illustrationer |
| **PDF** | `en/kdp-output/petanque-complete-guide.pdf` | Genererad med Calibre, uppladdad till KDP |
| **EPUB** | `en/kdp-output/petanque-complete-guide.epub` | Genererad med Calibre, uppladdad till KDP |
| **Omslags-HTML** | `en/kdp-output/cover-en.html` | CSS-baserat omslag (ej använt) |
| **Omslags-HTML (foto)** | `en/kdp-output/cover-en-photo.html` | HTML med foto-bakgrund (ej använt) |

### Generera ny PDF/EPUB
```bash
# PDF (paperback)
ebook-convert en/amazon-kdp-book.html en/kdp-output/petanque-complete-guide.pdf \
  --paper-size b5 --pdf-page-margin-top 72 --pdf-page-margin-bottom 72 \
  --pdf-page-margin-left 60 --pdf-page-margin-right 60 \
  --pdf-serif-family Georgia --pdf-sans-family Arial \
  --pdf-default-font-size 12 --pdf-mono-font-size 10 \
  --embed-font-family Georgia --page-breaks-before "/"

# EPUB (Kindle)
ebook-convert en/amazon-kdp-book.html en/kdp-output/petanque-complete-guide.epub
```

### SVG-illustrationer i amazon-kdp-book.html (8 st)
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

| Mapp | Språk | Status |
|------|-------|--------|
| `/` (rot) | Svenska | ✅ Original/komplett |
| `/de/` | Tyska | ✅ Komplett |
| `/en/` | Engelska | ✅ Komplett + KDP publicerad |
| `/fr/` | Franska | ✅ Komplett |
| `/es/` | Spanska | ✅ Komplett |
| `/th/` | Thailändska | ⚠️ Ej granskad |

### Engelska kapitel-filer (individuella)
```
en/part1-chapter1.html till en/part1-chapter4.html  (Del 1: Grunder)
en/part2-chapter5.html till en/part2-chapter8.html  (Del 2: Avancerat)
en/part3-chapter9.html, en/part3-chapter10.html     (Del 3: Livsstil)
en/part4-indepth.html, en/part4-chapter15.html, en/part4-chapter16.html (Del 4)
en/equipment-guide.html (Bilaga A)
en/rules.html (Bilaga B)
en/glossary.html (Bilaga C)
en/appendix-court.html (Bilaga D)
en/cheat-sheet.html, en/training-journal.html, en/match-protocol.html
```

---

## FONTREGLER FÖR KDP

**VIKTIGT:** KDP stöder INTE LucidaGrande. Använd:
- **Brödtext:** Georgia, 'Times New Roman', serif
- **SVG-text:** Arial, Helvetica, sans-serif
- **Undvik Unicode-pilar/symboler** (✓✗←→↑↓) — de triggar LucidaGrande som fallback

---

## KVARSTÅENDE UPPGIFTER

1. **KRITISKT:** Fixa stavfel "Nats" → "Mats Hamberg" i KDP (väntar på review)
2. **Commit + push** senaste ändringar (fontfix) till GitHub
3. **Slutkontroll** av boken efter publicering
4. **Granska thailändska versionen** (`/th/`)
5. **Överväg svensk KDP-publicering** (samma process som engelska)

---

## TEKNISKA DETALJER

- **Calibre** (`ebook-convert`) används för PDF/EPUB-generering
- **Python venv** för bildbearbetning: `/tmp/coverenv` (Pillow installerat)
- **Chrome headless** för HTML→PNG-konvertering av omslag
- Mats pratar **svenska** — svara ALLTID på svenska
- Författare: **Mats Hamberg**
