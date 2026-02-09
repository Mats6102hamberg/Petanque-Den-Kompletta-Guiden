const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const IMG_DIR = path.join(__dirname, 'images');

// Files that contain inline SVGs, in book order
const FILES_WITH_SVG = [
  'del1-kapitel1.html',   // 2 SVGs (Bild 1 + Bild 2)
  'del1-kapitel3.html',   // 2 SVGs (Bild 3 + Bild 4)
  'del1-kapitel4.html',   // 1 SVG  (Bild 6)
  'del2-kapitel6.html',   // 1 SVG  (Bild 5)
  'del4-kapitel16.html',  // 1 SVG  (Bild 7)
  'bilaga-boulebana.html' // 1 SVG  (Bild 8)
];

async function extractAndConvert() {
  let imgIndex = 0;
  const results = [];

  for (const file of FILES_WITH_SVG) {
    const filePath = path.join(ROOT, file);
    const html = fs.readFileSync(filePath, 'utf-8');

    // Find all <svg ...>...</svg> blocks (greedy within each match)
    const svgRegex = /<svg[\s\S]*?<\/svg>/gi;
    let match;
    while ((match = svgRegex.exec(html)) !== null) {
      imgIndex++;
      const svgContent = match[0];
      const svgFileName = `diagram-${imgIndex}.svg`;
      const pngFileName = `diagram-${imgIndex}.png`;
      const svgPath = path.join(IMG_DIR, svgFileName);
      const pngPath = path.join(IMG_DIR, pngFileName);

      // Extract viewBox to determine aspect ratio
      const vbMatch = svgContent.match(/viewBox="([^"]+)"/);
      let width = 800; // default render width
      let height = 600;
      if (vbMatch) {
        const parts = vbMatch[1].split(/[\s,]+/).map(Number);
        if (parts.length === 4) {
          const vbW = parts[2];
          const vbH = parts[3];
          // Render at 2x for good quality
          width = Math.round(vbW * 2);
          height = Math.round(vbH * 2);
        }
      }

      // Clean up SVG for standalone rendering:
      // 1. Add width/height attributes (needed for sharp/rsvg)
      // 2. Don't duplicate xmlns if already present
      // 3. Fix bare & characters that break XML parsing
      let cleanSvg = svgContent;

      // Remove inline style attributes that are HTML-specific
      cleanSvg = cleanSvg.replace(/style="[^"]*"/g, '');

      // Add width/height if not present
      if (!cleanSvg.match(/\bwidth="/)) {
        cleanSvg = cleanSvg.replace(/<svg/, `<svg width="${width}"`);
      }
      if (!cleanSvg.match(/\bheight="/)) {
        cleanSvg = cleanSvg.replace(/<svg/, `<svg height="${height}"`);
      }

      // Add xmlns if not present
      if (!cleanSvg.includes('xmlns=')) {
        cleanSvg = cleanSvg.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      // Fix bare & that aren't already &amp; &lt; etc.
      cleanSvg = cleanSvg.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#)/g, '&amp;');

      // Improve contrast: make ALL text fills very dark / black
      cleanSvg = cleanSvg.replace(/fill="#333"/g, 'fill="#000"');
      cleanSvg = cleanSvg.replace(/fill="#444"/g, 'fill="#000"');
      cleanSvg = cleanSvg.replace(/fill="#555"/g, 'fill="#111"');
      cleanSvg = cleanSvg.replace(/fill="#666"/g, 'fill="#000"');
      cleanSvg = cleanSvg.replace(/fill="#777"/g, 'fill="#000"');
      cleanSvg = cleanSvg.replace(/fill="#888"/g, 'fill="#111"');
      cleanSvg = cleanSvg.replace(/fill="#999"/g, 'fill="#111"');
      cleanSvg = cleanSvg.replace(/fill="#aaa"/g, 'fill="#222"');
      cleanSvg = cleanSvg.replace(/fill="#bbb"/g, 'fill="#333"');
      cleanSvg = cleanSvg.replace(/fill="#ccc"/g, 'fill="#444"');
      cleanSvg = cleanSvg.replace(/fill="#222"/g, 'fill="#000"');
      cleanSvg = cleanSvg.replace(/stroke="#bbb"/g, 'stroke="#666"');
      cleanSvg = cleanSvg.replace(/stroke="#ccc"/g, 'stroke="#777"');
      cleanSvg = cleanSvg.replace(/stroke="#999"/g, 'stroke="#555"');
      cleanSvg = cleanSvg.replace(/stroke="#ddd"/g, 'stroke="#999"');

      // Increase small font sizes for better readability
      cleanSvg = cleanSvg.replace(/font-size="9"/g, 'font-size="12"');
      cleanSvg = cleanSvg.replace(/font-size="10"/g, 'font-size="13"');
      cleanSvg = cleanSvg.replace(/font-size="11"/g, 'font-size="14"');
      cleanSvg = cleanSvg.replace(/font-size="12"/g, 'font-size="14"');

      // Make all text bold for better readability
      cleanSvg = cleanSvg.replace(/font-weight="600"/g, 'font-weight="700"');
      cleanSvg = cleanSvg.replace(/font-weight="400"/g, 'font-weight="600"');

      // Add a light gray background rect for better contrast
      cleanSvg = cleanSvg.replace(
        /(<svg[^>]*>)/,
        '$1\n<rect width="100%" height="100%" fill="#f5f5f5"/>'
      );

      const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>\n${cleanSvg}`;

      fs.writeFileSync(svgPath, fullSvg, 'utf-8');

      try {
        await sharp(Buffer.from(fullSvg))
          .png()
          .toFile(pngPath);
        console.log(`OK: ${file} → ${pngFileName} (${width}x${height})`);
        results.push({ file, svgFileName, pngFileName, width, height, ok: true });
      } catch (err) {
        console.error(`FAIL: ${file} → ${pngFileName}: ${err.message}`);
        results.push({ file, svgFileName, pngFileName, width, height, ok: false, error: err.message });
      }
    }
  }

  console.log(`\nTotal: ${results.length} diagrams processed`);
  console.log(`Success: ${results.filter(r => r.ok).length}`);
  console.log(`Failed: ${results.filter(r => !r.ok).length}`);

  // Write manifest
  fs.writeFileSync(path.join(IMG_DIR, 'manifest.json'), JSON.stringify(results, null, 2));
}

extractAndConvert().catch(console.error);
