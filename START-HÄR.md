# ⚡ STARTA HÄR - Översätt Romankapitel

## 🔑 Steg 1: Sätt API-nyckel (Gör EN GÅNG)

### Alternativ A: Automatiskt script (Enklast)
```bash
./set-api-key.sh
```

### Alternativ B: Manuellt
```bash
export OPENAI_API_KEY="sk-din-nyckel-här"
```

---

## ✍️ Steg 2: Skriv ditt kapitel

Öppna `translate-novel-chapter.js` och ändra:

```javascript
const CHAPTER_CONFIG = {
    chapterNumber: 2,  // ← DIN KAPITELNUMMER
    chapterTitle_sv: "Din Titel",  // ← DIN TITEL
    
    swedishText: `
KLISTRA IN DIN SVENSKA TEXT HÄR

[SCENE_BREAK]

Mer text...
    `.trim()
};
```

---

## 🚀 Steg 3: Översätt!

```bash
npm run translate:novel
```

**KLART!** Filer skapas automatiskt i alla språk! 🎉

---

## 📋 Filer som skapas:

- ✅ `mr-boule-kapitel2.html` (Svenska)
- ✅ `en/mr-boule-kapitel2.html` (English)  
- ✅ `fr/mr-boule-kapitel2.html` (Français)
- ✅ `es/mr-boule-kapitel2.html` (Español)

---

## 💡 Tips

**För scenbyten:**
```
[SCENE_BREAK]
```

**Kostnad:** ~1-2 kr per kapitel per språk

**Tid:** ~30 sekunder per språk

---

## 🆘 Problem?

Se `SÄTT-API-NYCKEL.md` för detaljerad hjälp.

**Eller:**
📧 mats@petanqueguiden.se

---

**🎉 Lycka till med skrivandet!**
