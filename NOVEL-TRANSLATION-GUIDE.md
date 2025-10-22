# 📖 Automatisk Översättning av Romankapitel

## 🎯 Översikt

Detta system låter dig skriva romankapitel på svenska och automatiskt översätta dem till alla språk (English, Français, Español, Deutsch, ไทย).

---

## 🚀 Snabbstart

### Metod 1: Node.js-script (Rekommenderat)

**1. Öppna `translate-novel-chapter.js`**

**2. Klistra in din text:**
```javascript
const CHAPTER_CONFIG = {
    chapterNumber: 2,  // Ändra till ditt kapitelnummer
    chapterTitle_sv: "Den Unga Utmanaren",  // Ändra titel
    releaseDate: "November 2025",
    readTime: "~15 minuter",
    
    swedishText: `
    // KLISTRA IN DIN SVENSKA TEXT HÄR
    Det var en torsdagskväll...
    
    [SCENE_BREAK]  // Använd detta för scenbyten
    
    Mer text...
    `.trim()
};
```

**3. Kör scriptet:**
```bash
node translate-novel-chapter.js
```

**4. Klart!** Filer skapas automatiskt:
- `mr-boule-kapitel2.html` (Svenska)
- `en/mr-boule-kapitel2.html` (English)
- `fr/mr-boule-kapitel2.html` (Français)
- `es/mr-boule-kapitel2.html` (Español)

---

## 🔑 Aktivera Riktiga Översättningar

### Alternativ A: OpenAI API (Högst kvalitet, kostar ~$0.10 per kapitel)

**1. Skaffa API-nyckel:**
- Gå till https://platform.openai.com/api-keys
- Skapa ny nyckel

**2. Sätt miljövariabel:**
```bash
export OPENAI_API_KEY="sk-..."
```

**3. Uppdatera `translate-novel-chapter.js`:**

Kommentera bort mock-koden och aktivera OpenAI-koden:

```javascript
async function translateText(text, targetLang) {
    console.log(`🔄 Översätter till ${LANGUAGES[targetLang].name}...`);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4-turbo-preview',  // eller 'gpt-4' för högsta kvalitet
            messages: [{
                role: 'system',
                content: `You are a professional literary translator specializing in fiction about pétanque. 
                         Translate the following Swedish text to ${LANGUAGES[targetLang].name}. 
                         Maintain the literary style, emotional depth, and cultural nuances. 
                         Keep character names unchanged. 
                         Keep [SCENE_BREAK] markers as-is.`
            }, {
                role: 'user',
                content: text
            }],
            temperature: 0.3  // Låg för konsistens
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
}
```

### Alternativ B: DeepL API (Bäst kvalitet, gratis upp till 500k tecken/månad)

**1. Skaffa API-nyckel:**
- Gå till https://www.deepl.com/pro-api
- Registrera för free tier

**2. Installera DeepL Node.js-klient:**
```bash
npm install deepl-node
```

**3. Uppdatera scriptet:**
```javascript
const deepl = require('deepl-node');
const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

async function translateText(text, targetLang) {
    const langMap = {
        'en': 'EN-GB',
        'fr': 'FR',
        'es': 'ES',
        'de': 'DE'
    };
    
    const result = await translator.translateText(
        text, 
        'SV',  // Från svenska
        langMap[targetLang]
    );
    
    return result.text;
}
```

### Alternativ C: Google Translate API (Billigast, ~$20 per 1M tecken)

**1. Sätt upp Google Cloud:**
- Gå till https://console.cloud.google.com
- Aktivera Translation API
- Skapa service account och ladda ner JSON-nyckel

**2. Installera klient:**
```bash
npm install @google-cloud/translate
```

**3. Uppdatera scriptet:**
```javascript
const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate({
    keyFilename: './google-credentials.json'
});

async function translateText(text, targetLang) {
    const [translation] = await translate.translate(text, targetLang);
    return translation;
}
```

---

## 📝 Användningsexempel

### Exempel 1: Skapa Kapitel 2

```javascript
const CHAPTER_CONFIG = {
    chapterNumber: 2,
    chapterTitle_sv: "Den Unga Utmanaren",
    releaseDate: "November 2025",
    readTime: "~15 minuter",
    
    swedishText: `
Amélie Rousseau var 19 år och spelade petanque som om hennes liv hängde på det – för det gjorde det. Från de trånga gränderna i Toulouse till den nationella scenen hade hon kämpat sig fram med en precision och passion som få kunde matcha.

[SCENE_BREAK]

Det första mötet med Jean-Pierre skulle förändra allt.
    `.trim()
};
```

Kör: `node translate-novel-chapter.js`

Resultat: 4 HTML-filer skapas automatiskt!

---

## 🎨 Special-markeringar

### Scene Breaks (Scenbyten)
```javascript
swedishText: `
Text före...

[SCENE_BREAK]

Text efter...
`
```
Blir automatiskt: `<div class="scene-break">* * *</div>`

### Kapitel-länkar
Scriptet hanterar automatiskt:
- Navigation mellan kapitel
- "Nästa kapitel släpps X datum"
- Breadcrumbs (Innehåll > Roman > Kapitel X)

---

## 🔧 Avancerad Användning

### Översätt även kapitel-titlar

Lägg till i `translateText`:
```javascript
// Översätt titel separat för högre kvalitet
async function translateChapterTitle(title, targetLang) {
    // Använd samma API som translateText
    // men med kortare prompt för titlar
}
```

### Batch-översättning (flera kapitel samtidigt)

```javascript
const CHAPTERS = [
    { number: 2, title: "Den Unga Utmanaren", text: "..." },
    { number: 3, title: "Första Mötet", text: "..." },
    { number: 4, title: "Tränaren och Eleven", text: "..." }
];

for (const chapter of CHAPTERS) {
    CHAPTER_CONFIG.chapterNumber = chapter.number;
    CHAPTER_CONFIG.chapterTitle_sv = chapter.title;
    CHAPTER_CONFIG.swedishText = chapter.text;
    await main();
}
```

---

## 💰 Kostnadsjämförelse

| Tjänst | Kostnad | Kvalitet | Språk | Rekommendation |
|--------|---------|----------|-------|----------------|
| **OpenAI GPT-4** | ~$0.10/kapitel | ⭐⭐⭐⭐⭐ | Alla | Bäst för litteratur |
| **DeepL** | Gratis (500k/mån) | ⭐⭐⭐⭐⭐ | 4 av 5 | Bäst value |
| **Google Translate** | ~$0.02/kapitel | ⭐⭐⭐ | Alla | Billigast |

**Rekommendation:** Använd **DeepL** för Engelsk, Fransk, Spansk och Tysk. Använd **OpenAI GPT-4** för Thailändska.

---

## 📋 Checklista för Nytt Kapitel

- [ ] Skriv kapitlet på svenska
- [ ] Uppdatera `CHAPTER_CONFIG` i scriptet
- [ ] Kör: `node translate-novel-chapter.js`
- [ ] Granska översättningar (särskilt namn och termer)
- [ ] Uppdatera `mr-boule-petanque.html` (ta bort "locked" från kapitlet)
- [ ] Uppdatera `innehall.html` (ändra "Kapitel X tillgängligt"-badge)
- [ ] Commit och push:
  ```bash
  git add .
  git commit -m "Add Chapter X: [Title]"
  git push
  ```

---

## 🐛 Felsökning

### "API key not found"
```bash
# Kontrollera att miljövariabeln är satt:
echo $OPENAI_API_KEY

# Om tom, sätt den:
export OPENAI_API_KEY="sk-..."
```

### "Rate limit exceeded"
- DeepL free tier: Max 500k tecken/månad
- OpenAI: Köp mer credits på platform.openai.com

### "Permission denied"
```bash
# Gör scriptet körbart:
chmod +x translate-novel-chapter.js
```

---

## 📧 Support

Om du stöter på problem:
- Email: mats@petanqueguiden.se
- Kolla [Node.js-dokumentation](https://nodejs.org/docs)
- DeepL support: https://support.deepl.com
- OpenAI docs: https://platform.openai.com/docs

---

**🎉 Lycka till med skrivandet! Varje månad kommer läsarna längta efter nästa kapitel!**
