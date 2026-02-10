# Amazon KDP Export Guide

## Pétanque: The Complete Guide — From Beginner to Pro

This guide explains how to convert `amazon-kdp-book.html` into formats suitable for Amazon KDP (Kindle Direct Publishing).

---

## File Location

```
/Users/matshamberg/CascadeProjects/Petanque-Den-Kompletta-Guiden/en/amazon-kdp-book.html
```

---

## Option 1: PDF for KDP Paperback (B5 — 176 × 250 mm)

### Method A: Print from Browser (Simplest)

1. Open `amazon-kdp-book.html` in **Google Chrome**
2. Press `Cmd + P` (Print)
3. Set these options:
   - **Destination:** Save as PDF
   - **Paper size:** Custom → 176 × 250 mm (B5 format, slightly smaller than A4)
   - **Margins:** Default (the CSS already handles margins)
   - **Scale:** 100%
   - **Background graphics:** ON (to keep colored boxes)
4. Click **Save**
5. Upload the PDF to KDP under **Paperback Content**

### Method B: Using wkhtmltopdf (Better Quality)

```bash
# Install (if not already installed)
brew install wkhtmltopdf

# Convert to PDF
wkhtmltopdf \
  --page-size Custom \
  --page-width 176mm \
  --page-height 250mm \
  --margin-top 20mm \
  --margin-bottom 20mm \
  --margin-left 18mm \
  --margin-right 18mm \
  --encoding UTF-8 \
  --enable-local-file-access \
  amazon-kdp-book.html \
  petanque-complete-guide.pdf
```

### Method C: Using Prince XML (Professional Quality)

```bash
# Install Prince (free for non-commercial use)
# Download from https://www.princexml.com/

prince amazon-kdp-book.html -o petanque-complete-guide.pdf
```

---

## Option 2: EPUB for Kindle

### Method A: Using Calibre (Recommended — Free)

1. Download and install **Calibre**: https://calibre-ebook.com/
2. Open Calibre
3. Click **Add books** → select `amazon-kdp-book.html`
4. Select the book → click **Convert books**
5. Set **Output format:** EPUB (or MOBI for older Kindle)
6. Under **Metadata:**
   - Title: `Pétanque: The Complete Guide`
   - Author: `Mats Hamberg`
   - Publisher: `Independent`
   - Language: `English`
7. Under **Look & Feel:**
   - Check "Remove spacing between paragraphs"
   - Font size: leave default
8. Click **OK** to convert
9. Upload the EPUB to KDP under **Kindle eBook Content**

### Method B: Using Pandoc (Command Line)

```bash
# Install
brew install pandoc

# Convert HTML to EPUB
pandoc amazon-kdp-book.html \
  -o petanque-complete-guide.epub \
  --metadata title="Pétanque: The Complete Guide" \
  --metadata author="Mats Hamberg" \
  --toc \
  --toc-depth=2
```

---

## Option 3: Upload HTML Directly to KDP

Amazon KDP actually accepts HTML files directly for Kindle eBooks:

1. Go to https://kdp.amazon.com/
2. Create a new Kindle eBook
3. Under **Manuscript**, upload `amazon-kdp-book.html`
4. KDP will convert it automatically
5. Use the **Kindle Previewer** to check the result

---

## KDP Upload Checklist

### For Paperback:
- [ ] PDF file (6×9 inch format)
- [ ] Cover image (separate file, 2560×1600 px recommended)
- [ ] ISBN (KDP provides a free one, or use your own)
- [ ] Book description (for the Amazon listing)
- [ ] Categories and keywords

### For Kindle eBook:
- [ ] EPUB or HTML file
- [ ] Cover image (2560×1600 px recommended)
- [ ] Book description
- [ ] Categories and keywords
- [ ] Price (set per marketplace)

---

## Book Details for KDP

| Field | Value |
|-------|-------|
| **Title** | Pétanque: The Complete Guide |
| **Subtitle** | From Beginner to Pro |
| **Author** | Mats Hamberg |
| **Language** | English |
| **Pages** | ~250-300 (estimated) |
| **Trim Size** | B5 (176 × 250 mm) |
| **Categories** | Sports & Outdoors > Other Team Sports; Sports & Outdoors > Coaching |
| **Keywords** | pétanque, boule, bocce, French sport, outdoor games, strategy, technique |

---

## Tips

- **Cover:** KDP has a free Cover Creator tool, or you can use Canva
- **Preview:** Always use Amazon's Kindle Previewer before publishing
- **Pricing:** For paperback, KDP calculates minimum price based on page count
- **Royalties:** 60% for paperback, 35% or 70% for Kindle (depending on price)

---

## Project Info

- **GitHub:** https://github.com/Mats6102hamberg/Petanque-Den-Kompletta-Guiden.git
- **Local path:** `/Users/matshamberg/CascadeProjects/Petanque-Den-Kompletta-Guiden`
