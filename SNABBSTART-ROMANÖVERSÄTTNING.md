# 🚀 Snabbstart: Översätt Romankapitel

## ⚡ Enkel 3-stegs Process

### Steg 1: Skriv din svenska text

Öppna `translate-novel-chapter.js` och klistra in din text här:

```javascript
const CHAPTER_CONFIG = {
    chapterNumber: 2,  // ← Ändra detta
    chapterTitle_sv: "Din titel här",  // ← Ändra detta
    releaseDate: "November 2025",
    readTime: "~15 minuter",
    
    swedishText: `
KLISTRA IN DIN SVENSKA TEXT HÄR!

Använd [SCENE_BREAK] för scenbyten.

Det är allt!
    `.trim()
};
```

### Steg 2: Kör översättaren

```bash
npm run translate:novel
```

### Steg 3: Klart! 🎉

Filer skapas automatiskt i alla språkmappar:
- ✅ `mr-boule-kapitel2.html`
- ✅ `en/mr-boule-kapitel2.html`
- ✅ `fr/mr-boule-kapitel2.html`
- ✅ `es/mr-boule-kapitel2.html`

---

## 🔑 Aktivera Riktig Översättning (Valfritt)

Standard: Mock-översättningar (för test)
Upgradea: Riktiga AI-översättningar

### Alternativ A: DeepL (Gratis, Högkvalitativ)

1. Skaffa gratis API-nyckel: https://www.deepl.com/pro-api
2. Installera: `npm run setup:deepl`
3. Sätt nyckel: `export DEEPL_API_KEY="din-nyckel"`
4. Kör: `npm run translate:novel`

**Kostnad:** 0 kr/månad (upp till 500k tecken)

### Alternativ B: OpenAI GPT-4 (Bäst för litteratur)

1. Skaffa API-nyckel: https://platform.openai.com/api-keys
2. Installera: `npm run setup:openai`
3. Sätt nyckel: `export OPENAI_API_KEY="sk-..."`
4. Kör: `npm run translate:novel`

**Kostnad:** ~1 kr per kapitel

---

## 📋 Checklista

**Före varje nytt kapitel:**
- [ ] Skriv kapitlet på svenska
- [ ] Uppdatera `chapterNumber` och `chapterTitle_sv`
- [ ] Klistra in texten i `swedishText`

**Kör:**
- [ ] `npm run translate:novel`

**Efter:**
- [ ] Granska översättningarna
- [ ] Uppdatera `mr-boule-petanque.html` (ta bort "locked")
- [ ] Git commit och push

---

## 💡 Tips

**För scenbyten:**
```javascript
Text...

[SCENE_BREAK]

Mer text...
```

**För dialog:**
```javascript
"Jag älskar petanque," sa Jean-Pierre.

Amélie log. "Det märks."
```

**För betoning:**
```javascript
Han var *verkligen* bra på att spela.
```

---

## 📞 Hjälp?

- 📧 Email: mats@petanqueguiden.se
- 📖 Fullständig guide: Se `NOVEL-TRANSLATION-GUIDE.md`

---

**🎉 Lycka till med skrivandet!**

Varje månad när du släpper ett nytt kapitel kommer läsarna på ALLA språk automatiskt få det översatt! 🌍📚
