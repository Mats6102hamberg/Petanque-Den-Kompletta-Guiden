const puppeteer = require('puppeteer');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlPath = path.join(__dirname, '..', 'pdf-utkast', 'illustrationspaket-petanque.html');
  await page.goto('file://' + htmlPath, { waitUntil: 'load' });

  const pdfPath = path.join(__dirname, '..', 'pdf-utkast', 'Illustrationspaket-Petanque.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '25mm', right: '25mm', bottom: '25mm', left: '25mm' }
  });

  await browser.close();
  console.log('Skapade PDF:', pdfPath);
}

main().catch(err => {
  console.error('Fel vid generering av illustrations-PDF:', err);
  process.exit(1);
});
