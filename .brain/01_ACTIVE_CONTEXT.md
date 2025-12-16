# 01_ACTIVE_CONTEXT

## 🎯 AKTUELLT FOKUS: AGENT MEMORY VAULT

Vi har säkrat filstrukturen, installerat hjärnan och integrerat Petanque-guiden.

## 📋 ATT GÖRA
- [x] Klona Guld-staketet
- [x] Säkra package.json
- [x] Skapa .brain-struktur
- [x] Importera Petanque-guiden (16 kapitel, 5 språk)
- [x] Skapa isolerad Legacy-layout för bokens design
- [ ] Konfigurera 6:e språket (om det behövs)
- [ ] Koppla riktig DATABASE_URL till Neon

## 📁 PROJEKTSTRUKTUR
```
agent-memory-vault/
├── .brain/                    # Agent-konstitution
├── src/
│   ├── app/
│   │   ├── (petanque)/        # Isolerad layout för boken
│   │   │   └── guide/         # Petanque-guiden routes
│   │   └── ...                # Övriga app-routes
│   └── content/
│       └── petanque-guide/    # Bokens källfiler (16 kap, 5 språk)
├── prisma/                    # Databasschema
└── public/                    # Statiska filer
```

## 🔒 DESIGN-PRINCIP
Petanque-guidens originaldesign är bevarad i en isolerad layout som inte påverkas av Tailwind 4.
