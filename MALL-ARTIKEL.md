# Mall för att lägga till nya artiklar

## Steg 1: Kopiera denna HTML-kod

```html
<!-- ARTIKEL MALL - Kopiera och klistra in i aktuellt.html -->
<div class="article-card">
    <div class="article-header">
        <span class="article-date">DD MÅNAD ÅÅÅÅ</span>
        <span class="article-category">🎤 KATEGORI</span>
    </div>
    <h2 class="article-title">DIN ARTIKEL TITEL HÄR</h2>
    <div class="article-excerpt">
        <p>Din artikel sammanfattning här. Skriv 2-3 meningar som beskriver vad artikeln handlar om...</p>
    </div>
    <a href="#" class="read-more">Läs mer →</a>
</div>
```

## Steg 2: Anpassa innehållet

### Datum
Ändra `DD MÅNAD ÅÅÅÅ` till aktuellt datum, t.ex. "15 oktober 2025"

### Kategori
Välj en av dessa kategorier och ersätt `🎤 KATEGORI`:
- `🎤 Intervju` - för intervjuer med spelare
- `📋 Nya Regler` - för regeländringar
- `🏆 Turnering` - för turneringsrapporter
- `📰 Nyheter` - för allmänna nyheter
- `🎓 Teknik` - för tekniska artiklar

### Titel
Skriv en fängslande titel som beskriver artikeln

### Sammanfattning
Skriv 2-3 meningar som sammanfattar artikeln

### Länk (valfritt)
Om du har en fullständig artikel på en separat sida, ändra `href="#"` till rätt länk

## Steg 3: Lägg in i aktuellt.html

1. Öppna `aktuellt.html`
2. Hitta sektionen med andra artiklar (efter månadsbadgen)
3. Klistra in din nya artikel-kod
4. Spara filen

## Steg 4: I slutet av månaden - flytta till arkiv

### Kopiera från aktuellt.html till arkiv.html

```html
<!-- ARKIV MALL - För att flytta artikel till arkiv -->
<div class="archive-article" data-category="KATEGORI_UTAN_EMOJI">
    <div class="archive-article-header">
        <span class="archive-article-date">DD MÅNAD ÅÅÅÅ</span>
        <span class="archive-article-category">🎤 KATEGORI</span>
    </div>
    <h3 class="archive-article-title">
        <span class="language-badge">🇸🇪</span>
        DIN ARTIKEL TITEL HÄR
    </h3>
    <p class="archive-article-excerpt">
        Din artikel sammanfattning här...
    </p>
</div>
```

### Kategorier för data-category (utan emoji):
- `intervju`
- `regler`
- `turnering`
- `nyheter`
- `teknik`

### Språkbadges:
- 🇸🇪 Svenska
- 🇬🇧 English
- 🇫🇷 Français
- 🇪🇸 Español
- 🇩🇪 Deutsch
- 🇹🇭 ไทย

## Steg 5: Uppdatera arkivstatistik

I `arkiv.html`, hitta `.archive-stats` och uppdatera siffrorna:
- Antal månader
- Antal artiklar
- Antal intervjuer

## Tips för att skriva bra artiklar

### Intervjuer
- Börja med en kort introduktion av personen
- Inkludera 3-5 intressanta citat
- Avsluta med vad läsaren kan lära sig

### Regeländringar
- Förklara VARFÖR regeln ändrades
- Ge konkreta exempel
- Inkludera datum när regeln träder i kraft

### Turneringsrapporter
- Höjdpunkter från matchen
- Taktiska insikter
- Resultat och placeringar

### Tekniska artiklar
- Steg-för-steg instruktioner
- Bilder eller diagram (om möjligt)
- Vanliga misstag att undvika

## Exempel på bra titlar

✅ BRA:
- "Dylan Rocher: 'Mentala spelet är 80% av framgången'"
- "FIPJP:s nya mätregler 2025: Vad du behöver veta"
- "VM i Thailand: De 5 mest dramatiska matcherna"

❌ UNDVIK:
- "Intervju med spelare"
- "Nya regler"
- "Turnering"

## Snabbguide: Månadsrutin

1. **Under månaden**: Lägg till artiklar i `aktuellt.html`
2. **Sista dagen**: 
   - Skapa ny month-section i `arkiv.html`
   - Kopiera alla artiklar från `aktuellt.html`
   - Konvertera till arkiv-format
   - Uppdatera statistik
3. **Första dagen nästa månad**:
   - Töm `aktuellt.html` (behåll bara mallen)
   - Uppdatera månadsbadgen
   - Börja lägga till nya artiklar
