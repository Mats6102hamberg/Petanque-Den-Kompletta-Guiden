# Email-mall för Licensaktivering Påminnelse

## När ska denna email skickas?
- **11 månader** efter senaste aktivering
- Via Gumroad eller ditt email-system

---

## Email 1: Första påminnelsen (11 månader)

**Ämne:** 🔔 Dags att aktivera din Pétanque Guide-licens

**Innehåll:**

```
Hej [Namn],

Det har nu gått 11 månader sedan du senast aktiverade din licens för Pétanque: Den Kompletta Guiden.

För att fortsätta använda boken behöver du aktivera din licens inom de närmaste 7 månaderna.

🔑 Aktivera din licens här:
https://petanque-den-kompletta-guiden.vercel.app/aktivera-licens.html

VARFÖR MÅSTE JAG AKTIVERA?
För att förhindra obehörig delning av licenser kräver vi årlig aktivering. 
Detta tar bara 30 sekunder och säkerställer att din licens förblir aktiv.

VIKTIGT ATT VETA:
✓ Aktiveringen är gratis och tar bara några sekunder
✓ Du behöver aktivera minst en gång per år
✓ Efter 18 månader utan aktivering går licensen ut permanent
✓ Du har nu 7 månader kvar att aktivera

Din licensnyckel: [LICENSE_KEY]

Tack för att du använder Pétanque Guiden!

Med vänliga hälsningar,
Mats Hamberg
Författare, Pétanque: Den Kompletta Guiden

---
Frågor? Kontakta mig på mats@petanqueguiden.se
```

---

## Email 2: Andra påminnelsen (15 månader)

**Ämne:** ⚠️ VIKTIGT: Aktivera din licens inom 3 månader

**Innehåll:**

```
Hej [Namn],

VIKTIGT MEDDELANDE om din Pétanque Guide-licens.

Det har nu gått 15 månader sedan din senaste aktivering.
Du har 3 månader kvar att aktivera innan licensen går ut permanent.

⚠️ AKTIVERA NU:
https://petanque-den-kompletta-guiden.vercel.app/aktivera-licens.html

VAD HÄNDER OM JAG INTE AKTIVERAR?
Om licensen inte aktiveras inom 18 månader går den ut permanent och du måste köpa boken igen.

TIDSLINJE:
• Månad 0: Första aktivering
• Månad 11: Första påminnelsen (du fick denna för 4 månader sedan)
• Månad 15: DU ÄR HÄR NU ⚠️
• Månad 18: Licensen går ut permanent

AKTIVERA NU - DET TAR 30 SEKUNDER:
1. Klicka på länken ovan
2. Klicka på "Aktivera Licens Nu"
3. Klart! Din licens är giltig i 12 månader till

Din licensnyckel: [LICENSE_KEY]

Behöver du hjälp? Kontakta mig direkt på mats@petanqueguiden.se

Med vänliga hälsningar,
Mats Hamberg
```

---

## Email 3: Sista varningen (17 månader)

**Ämne:** 🚨 SISTA VARNINGEN: Din licens går ut om 30 dagar

**Innehåll:**

```
Hej [Namn],

SISTA VARNINGEN - Din licens går ut om 30 dagar!

Det har nu gått 17 månader sedan din senaste aktivering.
Om du inte aktiverar inom 30 dagar går licensen ut PERMANENT.

🚨 AKTIVERA OMEDELBART:
https://petanque-den-kompletta-guiden.vercel.app/aktivera-licens.html

DETTA ÄR ALLVARLIGT:
• Du har 30 dagar kvar
• Efter det går licensen ut permanent
• Du kommer att behöva köpa boken igen
• Alla dina arkivtillgångar försvinner också

VARFÖR HAR JAG INTE AKTIVERAT?
Om du har missat våra tidigare påminnelser, kontrollera din skräppost.
Vi har skickat påminnelser vid månad 11 och 15.

AKTIVERA NU - SISTA CHANSEN:
Klicka här: https://petanque-den-kompletta-guiden.vercel.app/aktivera-licens.html

Din licensnyckel: [LICENSE_KEY]

Behöver du hjälp? Kontakta mig OMEDELBART på mats@petanqueguiden.se

Med vänliga hälsningar,
Mats Hamberg

P.S. Detta är din sista påminnelse. Efter 30 dagar går licensen ut permanent.
```

---

## Email 4: Licensen har gått ut (18+ månader)

**Ämne:** ❌ Din Pétanque Guide-licens har gått ut

**Innehåll:**

```
Hej [Namn],

Din licens för Pétanque: Den Kompletta Guiden har nu gått ut.

Det har gått över 18 månader sedan din senaste aktivering, och trots våra påminnelser har licensen inte aktiverats.

VAD BETYDER DETTA?
• Din licens är nu permanent utgången
• Du har inte längre tillgång till boken
• Alla arkivtillgångar är också borta
• Licensen kan inte återaktiveras

VARFÖR HÄNDE DETTA?
För att förhindra obehörig delning av licenser kräver vi årlig aktivering.
Vi skickade påminnelser vid månad 11, 15 och 17, men ingen aktivering skedde.

VILL DU FORTSÄTTA ANVÄNDA BOKEN?
Du kan köpa en ny licens här:
https://mhg10.gumroad.com/l/qfwmvg

RABATT FÖR ÅTERKÖP:
Kontakta mig på mats@petanqueguiden.se med din gamla licensnyckel 
så kan vi diskutera en rabatt för återköp.

Tack för din förståelse.

Med vänliga hälsningar,
Mats Hamberg

---
Frågor? mats@petanqueguiden.se
```

---

## Teknisk Implementation

### Gumroad Webhooks
Du kan använda Gumroad's webhooks för att automatiskt skicka påminnelser:

1. **Sätt upp webhook i Gumroad:**
   - Gå till Settings → Advanced → Webhooks
   - Lägg till din webhook URL

2. **Skapa en server som:**
   - Tar emot köp-events från Gumroad
   - Sparar licensnyckel och email
   - Schemalägger påminnelser efter 11, 15, 17 månader

3. **Alternativ: Manuell hantering**
   - Exportera kundlista från Gumroad varje månad
   - Filtrera kunder som köpte för 11, 15, 17 månader sedan
   - Skicka manuella emails

### Email-tjänster
- **Mailchimp** - Automatiska kampanjer
- **SendGrid** - Transaktionella emails
- **ConvertKit** - Email-automation
- **Gumroad Email** - Inbyggd email-funktion

---

## Checklist för Implementation

- [ ] Sätt upp email-tjänst (Mailchimp/SendGrid)
- [ ] Skapa email-mallar i tjänsten
- [ ] Konfigurera Gumroad webhook (om automatisk)
- [ ] Testa email-flödet med test-licens
- [ ] Dokumentera processen för framtida användning
- [ ] Sätt upp påminnelse för dig själv att kolla systemet månadsvis

---

## Tips

1. **Testa systemet:** Skapa en test-licens och sätt aktiveringsdatum till 11 månader sedan
2. **Personalisering:** Använd kundens namn i emailen
3. **Tydlig CTA:** Gör aktiveringslänken stor och tydlig
4. **Support:** Var tillgänglig för frågor när påminnelser skickas
5. **Statistik:** Följ hur många som aktiverar efter varje påminnelse
