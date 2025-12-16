# 01_ACTIVE_CONTEXT

## 🎯 AKTUELLT FOKUS: AGENT MEMORY VAULT

Amazon-export för SV, EN, FR, ES förberedd. SV/EN kompletta. FR/ES kräver innehåll på vissa kapitel.

## 📋 ATT GÖRA
- [x] Klona Guld-staketet
- [x] Säkra package.json
- [x] Skapa .brain-struktur
- [x] Importera Petanque-guiden (16 kapitel, 5 språk)
- [x] Skapa isolerad Legacy-layout för bokens design
- [x] Skapa dynamiska routes för [lang] och [chapter]
- [x] Förbereda Amazon-exportstruktur (SV, EN, FR, ES)
- [x] Paketera alla kapitel för Amazon (script: fetch-amazon-chapters.mjs)
- [ ] Konfigurera GitHub remote och pusha
- [ ] Koppla riktig DATABASE_URL till Neon
- [ ] Komplettera FR kapitel 11-14 (väntar på översättning)
- [ ] Komplettera ES alla kapitel (väntar på översättning)

## 📊 AMAZON-EXPORT STATUS

| Språk | Kapitel | Status |
|-------|---------|--------|
| 🇸🇪 SV | 16/16 | ✅ Komplett |
| 🇬🇧 EN | 16/16 | ✅ Komplett |
| 🇫🇷 FR | 12/16 | ⚠️ Kap 11-14 placeholder |
| 🇪🇸 ES | 0/16 | ⚠️ Alla placeholder |

**Filer:** `src/content/exports/amazon/[lang]/chapters/`

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
│   └── lib/
│       └── petanque-content.ts # Utility för innehållsläsning
├── prisma/                    # Databasschema
└── public/                    # Statiska filer
```

## 🔒 DESIGN-PRINCIP
Petanque-guidens originaldesign är bevarad i en isolerad layout som inte påverkas av Tailwind 4.

## 📅 SENAST UPPDATERAD
2025-12-16 – Amazon-export förberedd för 4 språk
