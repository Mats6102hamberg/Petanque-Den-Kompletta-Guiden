const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILD = __dirname;
const IMG_DIR = path.join(BUILD, 'images');

// Book chapter order
const CHAPTERS = [
  { file: 'del1-kapitel1.html',   title: 'Kapitel 1 – Vad är boule pétanque?' },
  { file: 'del1-kapitel2.html',   title: 'Kapitel 2 – Utrustning – välj rätt klot' },
  { file: 'del1-kapitel3.html',   title: 'Kapitel 3 – Grundtekniker' },
  { file: 'del1-kapitel4.html',   title: 'Kapitel 4 – Spelstrategi för nybörjare' },
  { file: 'del2-kapitel5.html',   title: 'Kapitel 5 – Förbättra din point' },
  { file: 'del2-kapitel6.html',   title: 'Kapitel 6 – Mästerskapsskjutning' },
  { file: 'del2-kapitel7.html',   title: 'Kapitel 7 – Taktik på hög nivå' },
  { file: 'del2-kapitel8.html',   title: 'Kapitel 8 – Träna smartare' },
  { file: 'del3-kapitel9.html',   title: 'Kapitel 9 – Tävlingsspel vs. socialt spel' },
  { file: 'del3-kapitel10.html',  title: 'Kapitel 10 – Pétanque runt om i världen' },
  { file: 'fordjupning.html',     title: 'Kapitel 11–14 – Fördjupning och utveckling' },
  { file: 'del4-kapitel15.html',  title: 'Kapitel 15 – Lagspel och ledarskap' },
  { file: 'del4-kapitel16.html',  title: 'Kapitel 16 – Klotfysik och baneläsning' },
  { file: 'utrustning.html',      title: 'Bilaga A – Utrustningsguide' },
  { file: 'regler.html',          title: 'Bilaga B – Regler' },
  { file: 'ordlista.html',        title: 'Bilaga C – Ordlista' },
  { file: 'bilaga-boulebana.html', title: 'Bilaga D – Bygga en boulebana' },
  { file: 'fusklapp.html',        title: 'Fusklapp' },
  { file: 'traningsjournal.html', title: 'Träningsjournal' },
  { file: 'matchprotokoll.html',  title: 'Matchprotokoll' },
];

// SVG-to-PNG mapping
const SVG_MAP = {
  'del1-kapitel1.html':   ['diagram-1.png', 'diagram-2.png'],
  'del1-kapitel3.html':   ['diagram-3.png', 'diagram-4.png'],
  'del1-kapitel4.html':   ['diagram-5.png'],
  'del2-kapitel6.html':   ['diagram-6.png'],
  'del4-kapitel16.html':  ['diagram-7.png'],
  'bilaga-boulebana.html': ['diagram-8.png'],
};

function extractBodyContent(html) {
  let content = html;

  // Remove DOCTYPE, html tags
  content = content.replace(/<!DOCTYPE[^>]*>/i, '');
  content = content.replace(/<html[^>]*>/i, '');
  content = content.replace(/<\/html>/i, '');

  // Remove <head>...</head>
  content = content.replace(/<head[\s\S]*?<\/head>/i, '');

  // Remove <body> and </body> tags but keep content
  content = content.replace(/<body[^>]*>/i, '');
  content = content.replace(/<\/body>/i, '');

  // Remove <script>...</script> blocks
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Remove language switcher divs
  content = content.replace(/<div[^>]*class="language-switcher"[^>]*>[\s\S]*?<\/div>\s*/gi, '');

  // Remove toc-button links
  content = content.replace(/<a[^>]*class="toc-button"[^>]*>[^<]*<\/a>/gi, '');

  // Remove navigation divs at the bottom
  content = content.replace(/<div[^>]*class="navigation"[^>]*>[\s\S]*?<\/div>/gi, '');

  // Remove back-to-top buttons
  content = content.replace(/<button[^>]*class="back-to-top"[^>]*>[\s\S]*?<\/button>/gi, '');

  // Remove dark-mode-toggle buttons
  content = content.replace(/<button[^>]*class="dark-mode-toggle"[^>]*>[\s\S]*?<\/button>/gi, '');

  // Remove premium/license overlay divs
  content = content.replace(/<div[^>]*id="premium-overlay"[^>]*>[\s\S]*?<\/div>/gi, '');

  // Remove print buttons
  content = content.replace(/<button[^>]*onclick="[^"]*print[^"]*"[^>]*>[\s\S]*?<\/button>/gi, '');
  content = content.replace(/<button[^>]*class="[^"]*print[^"]*"[^>]*>[\s\S]*?<\/button>/gi, '');

  return content.trim();
}

function unwrapContainer(html) {
  // Remove the .container wrapper div to avoid overflow:hidden issues
  // Replace <div class="container"> ... </div> with just the inner content
  // We do this carefully to preserve the inner structure
  let result = html;
  result = result.replace(/<div class="container">\s*/gi, '');
  // Remove the matching closing </div> — we count from the end
  // Since we removed one opening div, we need to remove one closing div too
  // Find the last </div> and remove it
  const lastDivIdx = result.lastIndexOf('</div>');
  if (lastDivIdx !== -1) {
    result = result.substring(0, lastDivIdx) + result.substring(lastDivIdx + 6);
  }
  return result;
}

function replaceSvgWithPng(html, pngFiles) {
  let pngIndex = 0;
  return html.replace(/<svg[\s\S]*?<\/svg>/gi, (match) => {
    if (pngIndex < pngFiles.length) {
      const pngFile = pngFiles[pngIndex];
      pngIndex++;
      return `<div style="text-align: center; margin: 20px 0;"><img src="images/${pngFile}" alt="Illustration" style="max-width: 100%; height: auto; border: 1px solid #ccc; border-radius: 5px;" /></div>`;
    }
    return match;
  });
}

function buildBook() {
  // Read the original styles.css
  const originalCSS = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf-8');

  let chapters = [];

  for (const ch of CHAPTERS) {
    const filePath = path.join(ROOT, ch.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`SKIP: ${ch.file} not found`);
      continue;
    }

    let html = fs.readFileSync(filePath, 'utf-8');

    // Extract any inline <style> blocks from the file (keep them for chapter-specific styling)
    let inlineStyles = '';
    const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    if (styleMatches) {
      for (const sm of styleMatches) {
        const inner = sm.replace(/<style[^>]*>/i, '').replace(/<\/style>/i, '');
        // Skip language-switcher styles (not needed for ebook)
        if (!inner.includes('language-switcher')) {
          inlineStyles += inner + '\n';
        }
      }
    }

    let content = extractBodyContent(html);

    // Replace inline SVGs with PNG images
    if (SVG_MAP[ch.file]) {
      content = replaceSvgWithPng(content, SVG_MAP[ch.file]);
    }

    // Remove remaining <style> blocks from content (already extracted)
    content = content.replace(/<style[\s\S]*?<\/style>/gi, '');

    // Force overflow:visible on all .container divs via inline style
    content = content.replace(/<div class="container">/gi, '<div class="container" style="overflow:visible !important; max-height:none !important;">');

    chapters.push({
      id: ch.file.replace('.html', ''),
      title: ch.title,
      content: content,
      inlineStyles: inlineStyles
    });
  }

  // Collect all inline styles
  let allInlineStyles = '';
  for (const ch of chapters) {
    if (ch.inlineStyles) {
      allInlineStyles += `/* ${ch.id} */\n${ch.inlineStyles}\n`;
    }
  }

  // Build the complete HTML
  const bookHtml = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<title>Pétanque – Den Kompletta Guiden</title>
<style>
/* === Original styles.css === */
${originalCSS}

/* === Kindle/EPUB overrides === */
body {
  background: white;
  padding: 20px;
  min-height: auto;
}

/* Kindle-safe chapter headers: no gradients, no text-shadow */
.header, .header-small {
  background: none !important;
  background-color: white !important;
  border-top: 5px solid #8B4513 !important;
  border-bottom: 3px solid #D2691E !important;
  padding: 20px 30px !important;
  text-align: center !important;
}

.chapter-number {
  color: #8B4513 !important;
  font-weight: 700 !important;
  font-size: 14px !important;
  letter-spacing: 2px !important;
  text-transform: uppercase !important;
}

.chapter-title {
  color: #5a2d0c !important;
  font-size: 28px !important;
  font-weight: 900 !important;
  margin: 5px 0 !important;
}

.chapter-subtitle {
  color: #8B4513 !important;
  font-style: italic !important;
  font-size: 16px !important;
  opacity: 1 !important;
}

.container {
  box-shadow: none;
  border-radius: 0;
  max-width: 100%;
  overflow: visible !important;
}

.toc-button,
.language-switcher,
.back-to-top,
.dark-mode-toggle,
.navigation {
  display: none !important;
}

/* TOC styling */
.kindle-toc {
  padding: 20px 40px;
}

.kindle-toc h1 {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  color: #8B4513;
  margin-bottom: 20px;
  border-bottom: 2px solid #D2691E;
  padding-bottom: 10px;
}

.kindle-toc ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

.kindle-toc li {
  margin: 8px 0;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.kindle-toc a {
  color: #8B4513;
  text-decoration: none;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
}

.kindle-toc a:hover {
  color: #D2691E;
}

/* Chapter separator */
.chapter-break {
  page-break-before: always;
  margin-top: 40px;
}

/* Title page */
.kindle-title-page {
  text-align: center;
  padding: 100px 40px;
  page-break-after: always;
}

.kindle-title-page h1 {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  color: #8B4513;
  margin-bottom: 20px;
  text-shadow: none;
  border: none;
}

.kindle-title-page h2 {
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  color: #D2691E;
  font-weight: 400;
  border: none;
  margin-bottom: 40px;
}

.kindle-title-page .author {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  color: #333;
}

/* Back page */
.kindle-back-page {
  page-break-before: always;
  padding: 40px;
}

.kindle-back-page h2 {
  font-family: 'Playfair Display', serif;
  color: #8B4513;
  border-bottom: 2px solid #D2691E;
  padding-bottom: 10px;
}

.kindle-about-author {
  margin-top: 40px;
  padding: 25px;
  background: #f9f9f9;
  border-left: 4px solid #D2691E;
  border-radius: 5px;
}

/* Image styling for diagrams */
img {
  max-width: 100%;
  height: auto;
}

/* Print button removal for fusklapp etc */
.print-btn,
button[onclick*="print"],
.button-group,
.btn {
  display: none !important;
}

/* === Fusklapp: Kindle-safe header === */
#fusklapp .header {
  background: none !important;
  background-color: white !important;
  border-top: 5px solid #8B4513 !important;
  border-bottom: 3px solid #D2691E !important;
  padding: 15px !important;
}

#fusklapp .header h1 {
  color: #5a2d0c !important;
  font-size: 24px !important;
}

#fusklapp .header p {
  color: #8B4513 !important;
  font-style: italic !important;
}

/* === Träningsjournal: Kindle-safe header === */
#traningsjournal .header {
  background: none !important;
  background-color: white !important;
  border-top: 5px solid #8B4513 !important;
  border-bottom: 3px solid #D2691E !important;
  padding: 15px !important;
}

#traningsjournal .header h1 {
  color: #5a2d0c !important;
  font-size: 24px !important;
}

#traningsjournal .header p {
  color: #8B4513 !important;
  font-style: italic !important;
}

/* === Matchprotokoll: Kindle-safe header === */
#matchprotokoll .protocol-header h1 {
  color: #5a2d0c !important;
  font-size: 28px !important;
  font-weight: 900 !important;
  border-bottom: 3px solid #D2691E !important;
  padding-bottom: 10px !important;
}

/* === Bilaga D: ensure visibility === */
#bilaga-boulebana {
  display: block !important;
  visibility: visible !important;
}

${allInlineStyles}
</style>
</head>
<body>

<!-- TITELSIDA -->
<div class="kindle-title-page">
  <h1>PÉTANQUE</h1>
  <h2>Den kompletta guiden – teknik, taktik &amp; träning</h2>
  <p class="author">Mats Hamberg</p>
</div>

<!-- INNEHÅLLSFÖRTECKNING -->
<div class="kindle-toc chapter-break">
  <h1>Innehåll</h1>
  <ol>
${chapters.map(ch => `    <li><a href="#${ch.id}">${ch.title}</a></li>`).join('\n')}
  </ol>
</div>

<!-- KAPITEL -->
${chapters.map(ch => `
<div id="${ch.id}" class="chapter-break">
${ch.content}
</div>
`).join('\n')}

<!-- BAKSIDA -->
<div class="kindle-back-page">
  <h2>Om boken</h2>
  <div class="content">
    <p><strong>Pétanque – Den Kompletta Guiden</strong> är en praktisk, pedagogisk och spelarnära bok för dig som vill utvecklas — från dina första kast till avancerad taktik och träning.</p>
    <p>Boken ger dig verktygen att förstå spelet på djupet och spela med större säkerhet, lugn och precision.</p>
    <p>Du får bland annat:</p>
    <ul>
      <li><strong>Tydliga grunder:</strong> grepp, ställning, point och skytte</li>
      <li><strong>Taktik som fungerar i match:</strong> beslut, roller och strategi</li>
      <li><strong>Smart träning:</strong> upplägg, övningar och rutiner</li>
      <li><strong>Fördjupning:</strong> underlag, friktion, rotation och baneläsning</li>
      <li><strong>Praktiska bilagor och verktyg</strong> att använda direkt på banan</li>
    </ul>
    <p>Oavsett om du spelar socialt eller satsar på tävling är målet detsamma: <strong>ett säkrare, smartare och mer förutsägbart spel.</strong></p>
  </div>

  <div class="kindle-about-author">
    <h2>Om författaren</h2>
    <p><strong>Mats Hamberg</strong> har spelat boule sedan 1993 och är utbildad Steg 2-tränare i Boule Pétanque.</p>
    <p>Han brinner för att göra pétanque begriplig, rolig och utvecklande för både nybörjare och tävlingsspelare.</p>
  </div>
</div>

</body>
</html>`;

  const outPath = path.join(BUILD, 'petanque-kindle.html');
  fs.writeFileSync(outPath, bookHtml, 'utf-8');
  console.log(`Book HTML written to: ${outPath}`);
  console.log(`Chapters included: ${chapters.length}`);
}

buildBook();
