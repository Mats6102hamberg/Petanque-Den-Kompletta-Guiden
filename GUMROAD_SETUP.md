# Gumroad License Key Integration Guide

## 📋 Översikt
Detta dokument förklarar hur du aktiverar riktig Gumroad-licensverifiering för din bok.

## 🎯 Nuvarande Status
Just nu accepterar systemet **vilken licensnyckel som helst med minst 10 tecken** (demo-läge). För produktion behöver du koppla till Gumroad's API.

## 🔑 Steg 1: Aktivera License Keys i Gumroad

1. Logga in på [Gumroad](https://gumroad.com)
2. Gå till din produkt "Pétanque: Den Kompletta Guiden"
3. Klicka på **Settings** → **Advanced**
4. Aktivera **"Generate a unique license key per sale"**
5. Spara inställningarna

Nu kommer varje köpare automatiskt få en unik licensnyckel i sitt köpmail!

## 🌐 Steg 2: Få dina API-uppgifter

### Alternativ A: Använd Gumroad's License API (Rekommenderat)
Gumroad har ett enkelt License Verification API som inte kräver autentisering:

**Endpoint:** `https://api.gumroad.com/v2/licenses/verify`

**Parametrar:**
- `product_id` - Din produkts ID (hittas i Gumroad dashboard)
- `license_key` - Licensnyckeln som kunden anger
- `increment_uses_count` - false (för att inte räkna varje verifiering som en användning)

### Alternativ B: Använd Gumroad API med Application Token
1. Gå till https://app.gumroad.com/settings/advanced#application-form
2. Skapa en ny Application
3. Kopiera din **Application Token**

## 💻 Steg 3: Uppdatera koden

Öppna `upload.html` och hitta funktionen `verifyLicense()` (rad ~384).

### För Alternativ A (License API - Enklast):

Ersätt funktionen med:

```javascript
async function verifyLicense(license) {
    try {
        const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'product_id': 'DIN_PRODUKT_ID_HÄR', // Byt ut mot din riktiga produkt-ID
                'license_key': license,
                'increment_uses_count': 'false'
            })
        });
        
        const data = await response.json();
        
        // Kontrollera om licensnyckeln är giltig
        return data.success === true;
        
    } catch (error) {
        console.error('License verification error:', error);
        return false;
    }
}
```

### För Alternativ B (Full API):

```javascript
async function verifyLicense(license) {
    try {
        const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer DIN_ACCESS_TOKEN_HÄR'
            },
            body: new URLSearchParams({
                'product_permalink': 'qfwmvg', // Din produkts permalink
                'license_key': license,
                'increment_uses_count': 'false'
            })
        });
        
        const data = await response.json();
        
        if (data.success && data.purchase) {
            // Extra validering: Kolla att köpet är för rätt produkt
            return data.purchase.product_name.includes('Pétanque');
        }
        
        return false;
        
    } catch (error) {
        console.error('License verification error:', error);
        return false;
    }
}
```

## 🔍 Hitta din Produkt-ID

1. Gå till din produkt på Gumroad
2. Titta i URL:en: `https://app.gumroad.com/products/PRODUKT_ID/edit`
3. Eller använd produktens permalink (i ditt fall: `qfwmvg`)

## 🛡️ Säkerhetsöverväganden

### CORS-problem?
Om du får CORS-fel kan du behöva:

1. **Använd en serverless function** (rekommenderat för produktion):
   - Skapa en Netlify/Vercel function som verifierar licensnyckeln
   - Din frontend kallar din function istället för Gumroad direkt
   - Funktionen gör API-anropet till Gumroad med din API-nyckel

2. **Exempel på Netlify Function** (`netlify/functions/verify-license.js`):

```javascript
const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { license } = JSON.parse(event.body);
    
    const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'product_id': process.env.GUMROAD_PRODUCT_ID,
            'license_key': license,
            'increment_uses_count': 'false'
        })
    });
    
    const data = await response.json();
    
    return {
        statusCode: 200,
        body: JSON.stringify({ valid: data.success === true })
    };
};
```

Uppdatera sedan `verifyLicense()` i `upload.html`:

```javascript
async function verifyLicense(license) {
    try {
        const response = await fetch('/.netlify/functions/verify-license', {
            method: 'POST',
            body: JSON.stringify({ license })
        });
        
        const data = await response.json();
        return data.valid;
        
    } catch (error) {
        console.error('License verification error:', error);
        return false;
    }
}
```

## 📊 Testning

1. Gör ett testköp på Gumroad (använd test-läge om tillgängligt)
2. Kopiera licensnyckeln från köpmailet
3. Gå till `upload.html`
4. Klistra in licensnyckeln
5. Verifiera att den accepteras

## 🎁 Bonusfunktioner

### Visa köparens namn
När licensnyckeln verifieras får du tillbaka köpinformation:

```javascript
if (data.success && data.purchase) {
    const buyerName = data.purchase.email;
    localStorage.setItem('petanque_buyer_email', buyerName);
    // Visa personligt välkomstmeddelande
}
```

### Begränsa antal enheter
Om du vill begränsa hur många enheter som kan använda samma licens:

```javascript
body: new URLSearchParams({
    'product_id': 'DIN_PRODUKT_ID',
    'license_key': license,
    'increment_uses_count': 'true' // Räkna användningar
})
```

Sätt sedan en gräns i Gumroad-inställningarna.

## 📚 Resurser

- [Gumroad License API Documentation](https://help.gumroad.com/article/76-license-keys)
- [Gumroad API Reference](https://app.gumroad.com/api)
- [Netlify Functions Guide](https://docs.netlify.com/functions/overview/)

## ⚠️ Viktigt

- **Spara aldrig API-nycklar i frontend-kod** - Använd environment variables eller serverless functions
- **Testa grundligt** innan du går live
- **Ha en backup-plan** om API:et är nere (t.ex. manuell verifiering via email)

## 🆘 Support

Om du stöter på problem:
1. Kolla Gumroad's API-status
2. Verifiera att din produkt har license keys aktiverat
3. Testa med en riktig licensnyckel från ett testköp
4. Kontakta Gumroad support om API-problem
