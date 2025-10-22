# 🔑 Sätt din OpenAI API-nyckel

## 🚀 Supersnabb Start (3 steg)

### Metod 1: Terminal (Snabbast för test)

**Öppna terminal och kör:**
```bash
export OPENAI_API_KEY="sk-din-riktiga-nyckel-här"
```

**Testa direkt:**
```bash
npm run translate:novel
```

⚠️ **OBS:** Denna metod fungerar bara i nuvarande terminal-session. När du stänger terminalen försvinner nyckeln.

---

### Metod 2: .env-fil (Rekommenderat för permanent användning)

**1. Skapa .env-fil:**
```bash
cp .env.example .env
```

**2. Öppna .env och klistra in din nyckel:**
```bash
nano .env
```

Eller öppna filen i din editor och ändra:
```
OPENAI_API_KEY=sk-din-riktiga-nyckel-här
```

**3. Spara och stäng**

**4. Installera dotenv:**
```bash
npm install dotenv
```

**5. Uppdatera translate-novel-chapter.js** (lägg till högst upp):
```javascript
require('dotenv').config();
```

**6. Kör översättningen:**
```bash
npm run translate:novel
```

---

### Metod 3: Lägg till i din .zshrc / .bashrc (Permanent global)

**1. Öppna din shell-config:**
```bash
nano ~/.zshrc
```

**2. Lägg till längst ner:**
```bash
export OPENAI_API_KEY="sk-din-riktiga-nyckel-här"
```

**3. Ladda om:**
```bash
source ~/.zshrc
```

**4. Testa:**
```bash
echo $OPENAI_API_KEY
```

**5. Kör översättningen:**
```bash
npm run translate:novel
```

---

## 🧪 Testa att det fungerar

**1. Kolla att nyckeln är satt:**
```bash
echo $OPENAI_API_KEY
```

Du ska se din nyckel (börjar med `sk-...`)

**2. Kör ett test:**
```bash
npm run translate:novel
```

Om allt fungerar ser du:
```
🚀 AUTOMATISK KAPITEL-ÖVERSÄTTARE
📖 Kapitel 1: Boulodromens Hjälte

==================================================
🇬🇧 English
==================================================
🔄 Översätter till English...
✅ Översättning klar (1234 tecken)
✅ Skapad: en/mr-boule-kapitel1.html
```

---

## ❌ Felsökning

### "API key not found"

**Problem:** Nyckeln är inte satt

**Lösning:**
```bash
# Kolla om den finns:
echo $OPENAI_API_KEY

# Om tom, sätt den:
export OPENAI_API_KEY="sk-..."
```

---

### "Invalid API key"

**Problem:** Fel nyckel eller den har gått ut

**Lösning:**
1. Gå till https://platform.openai.com/api-keys
2. Skapa ny nyckel
3. Kopiera den nya nyckeln
4. Uppdatera din .env eller export

---

### "Rate limit exceeded"

**Problem:** Du har gjort för många API-anrop

**Lösning:**
1. Vänta några minuter
2. Eller lägg till credits på OpenAI: https://platform.openai.com/account/billing

---

### "Module not found: openai"

**Problem:** OpenAI-paketet är inte installerat

**Lösning:**
```bash
npm install openai
```

---

## 💰 Kostnad

Varje kapitel-översättning kostar ca:
- **GPT-4 Turbo:** ~1-2 kr per kapitel per språk
- **GPT-4:** ~3-5 kr per kapitel per språk

**Exempel:** Översätt 1 kapitel till 4 språk = ~4-8 kr

**Rekommendation:** Använd GPT-4 Turbo (bästa pris/kvalitet)

---

## 🔒 Säkerhet

**VIKTIGT:**
- ❌ Lägg ALDRIG din API-nyckel i Git
- ✅ .env är redan i .gitignore
- ✅ Dela ALDRIG din nyckel med någon
- ✅ Om nyckeln läcker, radera den direkt på OpenAI

---

## ✅ Klart!

Nu kan du översätta romankapitel automatiskt!

**Nästa steg:**
1. Skriv ditt nästa kapitel på svenska
2. Klistra in i `translate-novel-chapter.js`
3. Kör: `npm run translate:novel`
4. KLART! Alla språk är översatta! 🎉

---

**📧 Problem? Kontakta: mats@petanqueguiden.se**
