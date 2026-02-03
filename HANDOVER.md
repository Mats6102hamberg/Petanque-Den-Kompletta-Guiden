# Pétanque-boken: Handover & Framtida arbete

## Snabbstart för nästa session

### Projektplats
```
/Users/admin/Petanque första sidan/
```

### Viktiga mappar
| Mapp | Språk | Status |
|------|-------|--------|
| `/` (rot) | Svenska | ✅ Original/komplett |
| `/de/` | Tyska | ✅ Komplett |
| `/en/` | Engelska | ✅ Komplett |
| `/fr/` | Franska | ✅ Komplett |
| `/es/` | Spanska | ✅ Komplett |
| `/th/` | Thailändska | ⚠️ Ej granskad |

### Öppna boken
```bash
# Svenska versionen
open "/Users/admin/Petanque första sidan/innehall.html"

# Tyska versionen
open "/Users/admin/Petanque första sidan/de/inhalt.html"
```

---

## Troligt framtida arbete

### 1. Granska thailändska versionen
Den thailändska versionen (`/th/`) har INTE granskats. Den kan ha samma problem som den tyska versionen hade:

**Kontrollera:**
- Saknas `styles.css` och `script.js` i språkmappen?
- Är texten på rätt språk eller blandat?
- Fungerar navigationslänkarna?

### 2. Eventuella nya kapitel eller uppdateringar
Om nya kapitel läggs till i svenska versionen måste de översättas till alla språk.

### 3. Interaktiva verktyg
De interaktiva verktygen (matchprotokoll, träningsjournal) sparar data i localStorage med språkspecifika nycklar:
- Svenska: `matchProtocol_sv`
- Tyska: `matchProtocol_de`

Om nya språk läggs till, uppdatera localStorage-nycklarna.

### 4. Möjliga förbättringar
- **PDF-export**: Verktygen har utskriftsstöd men ingen PDF-knapp
- **Synkronisering**: Data sparas lokalt, ingen molnsynk
- **Bilder/illustrationer**: Inga bilder i nuvarande version

---

## Vanliga problem och lösningar

### Problem: Sidan visas utan styling
**Orsak:** CSS-filen saknas i språkmappen
**Lösning:** Kopiera från huvudmappen
```bash
cp "/Users/admin/Petanque första sidan/styles.css" "/Users/admin/Petanque första sidan/[språk]/"
cp "/Users/admin/Petanque första sidan/script.js" "/Users/admin/Petanque första sidan/[språk]/"
```

### Problem: Text på fel språk
**Orsak:** Filen kopierades men översattes aldrig
**Lösning:** Läs svenska originalet och skriv om filen på rätt språk

### Problem: Navigationslänkar fungerar inte
**Orsak:** Länkar pekar till svenska filnamn (t.ex. `innehall.html` istället för `inhalt.html`)
**Lösning:** Uppdatera alla `href`-attribut i filen

---

## Filstruktur per kapitel

Varje kapitel följer samma HTML-struktur:

```html
<!DOCTYPE html>
<html lang="[språkkod]">
<head>
    <meta charset="UTF-8">
    <title>[Kapiteltitel] - Pétanque [Leitfaden/Guide/etc]</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>
<body>
    <a href="[innehållsförteckning].html" class="toc-button">[Innehåll]</a>
    <div class="container">
        <div class="header">
            <div class="chapter-number">[Del X • Kapitel Y]</div>
            <h1 class="chapter-title">[Titel]</h1>
            <p class="chapter-subtitle">[Undertitel]</p>
        </div>
        <div class="content">
            <!-- Kapitelinnehåll -->
        </div>
        <div class="navigation">
            <a href="[förra].html" class="nav-btn secondary">← [Förra]</a>
            <a href="[nästa].html" class="nav-btn">[Nästa] →</a>
        </div>
    </div>
</body>
</html>
```

---

## Kontaktinformation i projektet

Författare: Mats Hamberg
E-post: mats@petanqueguiden.se (nämns i index.html)

---

## Senast uppdaterad

**Datum:** 2026-02-03
**Åtgärd:** Verifierat att engelska, franska och spanska versionerna är kompletta
