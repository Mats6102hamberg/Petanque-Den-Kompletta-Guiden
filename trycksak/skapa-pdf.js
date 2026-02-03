const puppeteer = require('puppeteer');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Ge laddningen mer tid och använd enklare "waitUntil" för statisk HTML
  page.setDefaultNavigationTimeout(120000);

  const htmlPath = path.join(__dirname, 'petanque-trycksak.html');
  await page.goto('file://' + htmlPath, { waitUntil: 'load' });

  await page.pdf({
    path: path.join(__dirname, 'Petanque-Den-Kompletta-Guiden.pdf'),
    format: 'A5',
    printBackground: true,
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
  });

  await browser.close();
  console.log('Skapade PDF: Petanque-Den-Kompletta-Guiden.pdf');
}

main().catch(err => {
  console.error('Fel vid PDF-generering:', err);
  process.exit(1);
});
