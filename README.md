# Pétanque - The Complete Guide
## Multi-Language Book Project

### 📚 Available Languages:
- 🇸🇪 **Svenska** (Swedish) - Complete
- 🇬🇧 **English** - In Progress
- 🇫🇷 **Français** (French) - In Progress

### 📁 Project Structure:

```
Petanque första sidan/
│
├── index.html              # Swedish cover page
├── upload.html             # License activation page (Swedish)
├── access.html             # Full access page (Swedish)
├── innehall.html           # Swedish table of contents
├── del1-kapitel1.html      # Swedish Chapter 1
├── ... (all Swedish chapters)
├── styles.css              # Shared stylesheet
├── GUMROAD_SETUP.md        # Guide for Gumroad integration
│
├── en/                     # English version
│   ├── index.html          # English cover
│   ├── upload.html         # License activation page (English)
│   ├── access.html         # Full access page (English)
│   ├── contents.html       # English table of contents
│   ├── part1-chapter1.html # English Chapter 1
│   └── styles.css
│
└── fr/                     # French version
    ├── index.html          # French cover
    ├── upload.html         # License activation page (French)
    ├── access.html         # Full access page (French)
    ├── sommaire.html       # French table of contents
    ├── partie1-chapitre1.html # French Chapter 1
    └── styles.css
```

### 🌐 Language Switcher:
All pages include a language switcher in the top-right corner allowing seamless navigation between:
- 🇸🇪 Svenska
- 🇬🇧 English
- 🇫🇷 Français

### ✅ Completed:
- Swedish version: All 16 chapters + interactive tools
- English: Cover page, table of contents, multiple chapters
- French: Cover page, table of contents, multiple chapters
- Spanish: Complete translation with all chapters
- German & Thai: Partial translations
- Interactive tools: Match protocol, training journal, cheat sheet
- Language switcher on all pages
- Responsive design
- Professional typography
- License system with localStorage

### 🚀 To View:
1. Open `index.html` in your web browser
2. Click the language flags to switch between versions
3. Click "Köp Boken" to purchase via Gumroad
4. After purchase, click "Redan köpt? Aktivera här"
5. Enter your Gumroad license key to activate lifetime access
6. Access all content via `access.html` with automatic updates

### 🔐 License Key System:
The site includes a license key activation system for lifetime access:
- **upload.html**: Activation page where buyers enter their Gumroad license key
- **access.html**: Protected page with all chapters and resources (requires valid license)
- Uses localStorage to remember license key and activation status
- **Lifetime access**: Once activated, buyers have permanent access
- **Automatic updates**: When you update content, all buyers see the latest version
- **No downloads needed**: Everything is web-based and always up-to-date

### 📝 How It Works:

**Automatic Activation (Recommended):**
1. Customer purchases book on Gumroad
2. Gumroad sends email with link: `access.html?license={license_key}`
3. Customer clicks link → license automatically verified and saved
4. Customer immediately sees all content (no manual copying needed!)
5. Link can be bookmarked for future access

**Manual Activation (Fallback):**
1. Customer can also go to `upload.html`
2. Enter license key manually
3. System verifies and grants access

**Benefits:**
- ✅ No manual copying of license keys needed
- ✅ One-click access from purchase email
- ✅ Bookmarkable link for lifetime access
- ✅ Automatic updates when you publish new content

### 🔧 Production Setup (TODO):
To enable real Gumroad license verification, you need to:
1. Get your Gumroad API credentials
2. Update the `verifyLicense()` function in `upload.html` to call Gumroad's License API
3. Replace the demo validation with actual API verification
4. See: https://help.gumroad.com/article/76-license-keys

### 📖 Book Structure:
**Part 1: Basics for Beginners** (Chapters 1-4)
- Chapter 1: What is Pétanque?
- Chapter 2: Equipment – Choosing the Right Boules
- Chapter 3: Basic Techniques
- Chapter 4: Game Strategy for Beginners

**Part 2: Advanced Techniques for Pros** (Chapters 5-8)
- Chapter 5-8: Advanced techniques and tactics

**Part 3: Pétanque as a Lifestyle** (Chapters 9-10)
- Chapter 9-10: Culture and community

**Part 4: In-Depth Study and Development** (Chapters 11-16)
- Chapters 11-14: In fordjupning.html
- Chapter 15: Leading a Pétanque Team (del4-kapitel15.html)
- Chapter 16: Ball Physics and Court Reading (del4-kapitel16.html)

**Interactive Tools:**
- matchprotokoll.html – Match protocol with automatic statistics (FREE)
- traningsjournal.html – Training journal (FREE)
- fusklapp.html – Quick reference cheat sheet
- ordlista.html – Glossary
- regler.html – Official rules
- utrustning.html – Equipment guide

### 🎨 Features:
- Beautiful book cover design
- Professional chapter layout
- Highlight boxes for important information
- Tables for comparisons
- Navigation between chapters
- Mobile-responsive design

---
**Author:** Mats Hamberg
**Design & Development:** 2025
