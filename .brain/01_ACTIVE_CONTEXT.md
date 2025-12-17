# 01_ACTIVE_CONTEXT

## 🎯 AKTUELLT FOKUS: PÉTANQUE AMAZON-EXPORT

### Session 2025-12-16 avslutad ✅

**Sammanfattning:** Amazon-export för 4 språk förberedd och pushad till GitHub. Alla kapitel städade från webb-element (Arkiv, Nyheter, Mr Boule, navigeringsknappar, språkväljare).

## 📊 AMAZON-EXPORT STATUS

| Språk | Kapitel | Status | Redo för Amazon |
|-------|---------|--------|-----------------|
| 🇸🇪 SV | 16/16 | ✅ Komplett | ✅ JA |
| 🇬🇧 EN | 16/16 | ✅ Komplett | ✅ JA |
| 🇫🇷 FR | 16/16 | ✅ Komplett | ✅ JA |
| 🇪🇸 ES | 0/16 | ⚠️ Alla placeholder | ❌ Väntar |

**Filer:** `src/content/exports/amazon/[lang]/chapters/`

### Städat bort (ej i bokfilerna):
- ❌ Arkiv / Archives Historiques
- ❌ Nyheter / Actualités
- ❌ Mr Boule
- ❌ Premium-sektioner
- ❌ Navigeringsknappar
- ❌ Språkväljare

## 🚀 NÄSTA STEG

1. **ES Alla kapitel:** Väntar på spanska översättningar

2. **Amazon-publicering:** SV, EN och FR kan laddas upp direkt (48/64 kapitel klara)

## 📋 SLUTFÖRDA UPPGIFTER
- [x] Klona Guld-staketet
- [x] Säkra package.json
- [x] Skapa .brain-struktur
- [x] Importera Petanque-guiden (16 kapitel, 5 språk)
- [x] Skapa isolerad Legacy-layout för bokens design
- [x] Skapa dynamiska routes för [lang] och [chapter]
- [x] Förbereda Amazon-exportstruktur (SV, EN, FR, ES)
- [x] Paketera alla kapitel för Amazon (script: fetch-amazon-chapters.mjs)
- [x] Konfigurera GitHub remote och pusha
- [x] Städa bort webb-element (Arkiv, Nyheter, Mr Boule, etc.)

## 📋 KVARSTÅENDE UPPGIFTER
- [ ] Koppla riktig DATABASE_URL till Neon
- [x] Komplettera FR kapitel 11-14 ✅ (2025-12-17)
- [ ] Komplettera ES alla kapitel (väntar på översättning)
- [ ] Skapa Amazon-manuskript (manuscript_fr.html, manuscript_es.html)

## 📁 PROJEKTSTRUKTUR
```
agent-memory-vault/
├── .brain/                    # Agent-konstitution
├── scripts/                   # Automation (fetch-amazon-chapters.mjs)
├── src/
│   ├── app/
│   │   ├── (petanque)/        # Isolerad layout för boken
│   │   │   └── guide/         # Petanque-guiden routes
│   │   │       ├── [lang]/    # Språkspecifik TOC
│   │   │       └── [lang]/[chapter]/ # Kapitelvisning
│   │   └── ...                # Övriga app-routes
│   ├── content/
│   │   ├── petanque-guide/    # Bokens källfiler (web)
│   │   └── exports/amazon/    # Amazon-paketerade kapitel
│   │       ├── sv/chapters/   # 16 kapitel ✅
│   │       ├── en/chapters/   # 16 kapitel ✅
│   │       ├── fr/chapters/   # 16 kapitel ✅
│   │       └── es/            # Placeholders
│   └── lib/
│       └── petanque-content.ts # Utility för innehållsläsning
├── prisma/                    # Databasschema
└── public/                    # Statiska filer
```

## 🔗 GITHUB REPO
https://github.com/Mats6102hamberg/Petanque-Den-Kompletta-Guiden

## 🔒 DESIGN-PRINCIP
Petanque-guidens originaldesign är bevarad i en isolerad layout som inte påverkas av Tailwind 4.

## 📅 SENAST UPPDATERAD
2025-12-17 04:10 – FR bok 100% komplett (16/16 kapitel), pushat till GitHub
