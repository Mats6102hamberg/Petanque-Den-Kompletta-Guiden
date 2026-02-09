const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILD = __dirname;
const IMG_DIR = path.join(BUILD, 'images');

// Book chapter order (all files to include)
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

// SVG-to-PNG mapping: which file has which diagram PNGs (in order of appearance)
const SVG_MAP = {
  'del1-kapitel1.html':   ['diagram-1.png', 'diagram-2.png'],
  'del1-kapitel3.html':   ['diagram-3.png', 'diagram-4.png'],
  'del1-kapitel4.html':   ['diagram-5.png'],
  'del2-kapitel6.html':   ['diagram-6.png'],
  'del4-kapitel16.html':  ['diagram-7.png'],
  'bilaga-boulebana.html': ['diagram-8.png'],
};

function extractBodyContent(html) {
  // Remove everything before and after the main content
  // Try to find <body> content
  let content = html;

  // Remove <!DOCTYPE>, <html>, <head>...</head>
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

  // Remove navigation links (prev/next chapter links)
  content = content.replace(/<div[^>]*class="[^"]*nav[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

  // Remove language switcher
  content = content.replace(/<div[^>]*class="[^"]*language[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

  // Remove premium/license related elements
  content = content.replace(/<div[^>]*id="premium[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

  return content.trim();
}

function replaceSvgWithPng(html, pngFiles) {
  let pngIndex = 0;
  return html.replace(/<svg[\s\S]*?<\/svg>/gi, (match) => {
    if (pngIndex < pngFiles.length) {
      const pngFile = pngFiles[pngIndex];
      pngIndex++;
      return `<img src="images/${pngFile}" alt="Illustration" style="max-width: 100%; height: auto; display: block; margin: 10px auto;" />`;
    }
    return match; // fallback: keep SVG if no PNG available
  });
}

function buildBook() {
  let chapters = [];

  for (const ch of CHAPTERS) {
    const filePath = path.join(ROOT, ch.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`SKIP: ${ch.file} not found`);
      continue;
    }

    let html = fs.readFileSync(filePath, 'utf-8');
    let content = extractBodyContent(html);

    // Replace inline SVGs with PNG images
    if (SVG_MAP[ch.file]) {
      content = replaceSvgWithPng(content, SVG_MAP[ch.file]);
    }

    // Remove any remaining <style> blocks (we'll have our own)
    content = content.replace(/<style[\s\S]*?<\/style>/gi, '');

    chapters.push({
      id: ch.file.replace('.html', ''),
      title: ch.title,
      content: content
    });
  }

  // Build the complete HTML
  const bookHtml = `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<title>Pétanque – Den Kompletta Guiden</title>
<style>
  body {
    font-family: Georgia, 'Times New Roman', serif;
    line-height: 1.7;
    color: #1a1a1a;
    margin: 0;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  h1 {
    font-size: 2em;
    color: #4a2f22;
    border-bottom: 2px solid #b1784c;
    padding-bottom: 10px;
    margin-top: 60px;
    page-break-before: always;
  }
  h2 {
    font-size: 1.5em;
    color: #5a3a2a;
    margin-top: 30px;
  }
  h3 {
    font-size: 1.2em;
    color: #6a4a3a;
  }
  p {
    margin: 12px 0;
    text-align: justify;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 15px auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 0.9em;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 8px 12px;
    text-align: left;
  }
  th {
    background: #f0e6d6;
    color: #4a2f22;
    font-weight: bold;
  }
  tr:nth-child(even) {
    background: #faf7f3;
  }
  .highlight-box {
    background: #f5efe6;
    border-left: 4px solid #b1784c;
    padding: 15px 20px;
    margin: 20px 0;
    border-radius: 4px;
  }
  .chapter-separator {
    text-align: center;
    margin: 40px 0;
    color: #b1784c;
    font-size: 1.5em;
  }
  .title-page {
    text-align: center;
    padding: 100px 20px;
    page-break-after: always;
  }
  .title-page h1 {
    font-size: 3em;
    border: none;
    margin-top: 0;
    page-break-before: auto;
  }
  .title-page h2 {
    font-size: 1.5em;
    font-weight: normal;
    color: #666;
  }
  .title-page .author {
    font-size: 1.3em;
    margin-top: 40px;
    color: #4a2f22;
  }
  .back-page {
    page-break-before: always;
    padding: 40px 20px;
  }
  .back-page h2 {
    color: #4a2f22;
    border-bottom: 1px solid #b1784c;
    padding-bottom: 8px;
  }
  .about-author {
    margin-top: 40px;
    padding: 20px;
    background: #f5efe6;
    border-radius: 8px;
  }
  ul, ol {
    margin: 10px 0;
    padding-left: 25px;
  }
  li {
    margin: 5px 0;
  }
</style>
</head>
<body>

<!-- TITELSIDA -->
<div class="title-page">
  <h1>PÉTANQUE</h1>
  <h2>Den kompletta guiden – teknik, taktik &amp; träning</h2>
  <p class="author">Mats Hamberg</p>
</div>

<!-- INNEHÅLLSFÖRTECKNING -->
<h1>Innehåll</h1>
<nav>
<ol>
${chapters.map(ch => `  <li><a href="#${ch.id}">${ch.title}</a></li>`).join('\n')}
</ol>
</nav>

<!-- KAPITEL -->
${chapters.map(ch => `
<div id="${ch.id}">
<h1>${ch.title}</h1>
${ch.content}
</div>
`).join('\n')}

<!-- BAKSIDA -->
<div class="back-page">
  <h2>Om boken</h2>
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

  <div class="about-author">
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
  console.log(`Chapter list:`);
  chapters.forEach(ch => console.log(`  - ${ch.title}`));
}

buildBook();
