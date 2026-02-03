#!/usr/bin/env node
/**
 * build-book.js
 * Kombinerar alla svenska kapitel till en komplett bokfil (petanque-bok-komplett.html).
 * Kör: `node build-book.js`
 */

const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const outputFile = path.join(projectRoot, 'petanque-bok-komplett.html');

const chapters = [
  { file: 'innehall.html', slug: 'forord', label: 'Förord', title: 'Förord & interaktiva verktyg' },
  { file: 'aktuellt.html', slug: 'aktuellt', label: 'Aktuellt', title: 'Månadens nyheter' },
  { file: 'mr-boule-petanque.html', slug: 'roman-oversikt', label: 'Roman', title: 'Mr. Boule Pétanque – översikt' },
  { file: 'mr-boule-kapitel0.html', slug: 'roman-kapitel0', label: 'Roman • Kapitel 0', title: 'Introduktion – Mr Boule Pétanque' },
  { file: 'mr-boule-kapitel1.html', slug: 'roman-kapitel1', label: 'Roman • Kapitel 1', title: 'Boulodromens hjälte' },
  { file: 'del1-kapitel1.html', slug: 'del1-kapitel1' },
  { file: 'del1-kapitel2.html', slug: 'del1-kapitel2' },
  { file: 'del1-kapitel3.html', slug: 'del1-kapitel3' },
  { file: 'del1-kapitel4.html', slug: 'del1-kapitel4' },
  { file: 'del2-kapitel5.html', slug: 'del2-kapitel5' },
  { file: 'del2-kapitel6.html', slug: 'del2-kapitel6' },
  { file: 'del2-kapitel7.html', slug: 'del2-kapitel7' },
  { file: 'del2-kapitel8.html', slug: 'del2-kapitel8' },
  { file: 'del3-kapitel9.html', slug: 'del3-kapitel9' },
  { file: 'del3-kapitel10.html', slug: 'del3-kapitel10' },
  { file: 'fordjupning.html', slug: 'del4-kapitel11-14', label: 'Del 4 • Kapitel 11-14' },
  { file: 'del4-kapitel15.html', slug: 'del4-kapitel15' },
  { file: 'del4-kapitel16.html', slug: 'del4-kapitel16' },
  { file: 'utrustning.html', slug: 'bilaga-utrustning', label: 'Bilaga A', title: 'Utrustningsguide' },
  { file: 'regler.html', slug: 'bilaga-regler', label: 'Bilaga B', title: 'Komplett regelbok' },
  { file: 'ordlista.html', slug: 'bilaga-ordlista', label: 'Bilaga C', title: 'Ordförklaringar' },
  { file: 'arkiv.html', slug: 'premium-arkiv', label: 'Premiumarkiv', title: 'Historiskt arkiv' },
  { file: 'fusklapp.html', slug: 'resurs-fusklapp', label: 'Resurs', title: 'Fusklapp' },
  { file: 'traningsjournal.html', slug: 'resurs-traningsjournal', label: 'Resurs', title: 'Träningsjournal' },
  { file: 'matchprotokoll.html', slug: 'resurs-matchprotokoll', label: 'Resurs', title: 'Matchprotokoll' }
];

const extractBody = (html) => {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1].trim() : html.trim();
};

const stripScripts = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, '');
const stripHtml = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const extractChapterMeta = (html) => {
  const numberMatch = html.match(/<div[^>]*class="[^"']*chapter-number[^"']*"[^>]*>([\s\S]*?)<\/div>/i);
  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);

  return {
    label: numberMatch ? stripHtml(numberMatch[1]) : null,
    title: titleMatch ? stripHtml(titleMatch[1]) : null
  };
};

const sections = chapters.map((chapter) => {
  const chapterPath = path.join(projectRoot, chapter.file);

  if (!fs.existsSync(chapterPath)) {
    throw new Error(`Hittar inte filen ${chapter.file}`);
  }

  const raw = fs.readFileSync(chapterPath, 'utf8');
  const body = extractBody(raw);
  const cleanedBody = stripScripts(body);
  const meta = extractChapterMeta(body);

  return {
    ...chapter,
    label: chapter.label || meta.label || null,
    title: chapter.title || meta.title || path.basename(chapter.file, '.html'),
    content: cleanedBody.trim()
  };
});

const tocItems = sections
  .map(
    (section, index) => `
        <li>
            <a href="#${section.slug}">
                <span class="toc-index">${String(index + 1).padStart(2, '0')}</span>
                <div class="toc-text">
                    ${section.label ? `<span class="toc-label">${section.label}</span>` : ''}
                    <span class="toc-title">${section.title}</span>
                </div>
            </a>
        </li>`
  )
  .join('\n');

const chapterHtml = sections
  .map(
    (section) => `
    <section class="book-chapter" id="${section.slug}">
        <div class="book-chapter-inner">
            ${section.content}
        </div>
    </section>`
  )
  .join('\n');

const template = `<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pétanque – Den kompletta boken</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        :root {
            --brown-900: #4a2f22;
            --brown-500: #b1784c;
            --sand-100: #f5efe6;
            --text: #1f1c1a;
        }
        body {
            font-family: 'Georgia', 'Times New Roman', serif;
            background: #faf7f3;
            color: var(--text);
            margin: 0;
            line-height: 1.7;
        }
        .book-cover {
            min-height: 90vh;
            padding: 80px 20px;
            background: linear-gradient(135deg, #45210e, #b56a2a);
            color: white;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .book-cover h1 {
            font-size: clamp(42px, 6vw, 84px);
            letter-spacing: 6px;
            margin-bottom: 16px;
        }
        .book-cover h2 {
            font-size: clamp(20px, 3vw, 36px);
            font-weight: 400;
            margin-bottom: 48px;
            opacity: 0.9;
        }
        .book-cover p {
            max-width: 640px;
            margin: 0 auto;
            font-size: 20px;
            opacity: 0.85;
        }
        .book-toc {
            background: white;
            margin: -80px auto 40px;
            padding: 40px;
            border-radius: 24px;
            max-width: 960px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }
        .book-toc h3 {
            margin-top: 0;
            font-size: 26px;
            color: var(--brown-900);
        }
        .book-toc ul {
            list-style: none;
            padding: 0;
            margin: 24px 0 0;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 20px;
        }
        .book-toc li a {
            display: flex;
            gap: 16px;
            text-decoration: none;
            color: inherit;
            padding: 16px;
            border-radius: 16px;
            border: 1px solid rgba(0,0,0,0.08);
            background: var(--sand-100);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .book-toc li a:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }
        .toc-index {
            font-weight: 700;
            font-size: 32px;
            color: var(--brown-500);
            min-width: 48px;
        }
        .toc-label {
            font-size: 13px;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: #7a6a5a;
        }
        .toc-title {
            font-size: 18px;
            font-weight: 600;
        }
        .book-chapter {
            max-width: 900px;
            margin: 60px auto;
            padding: 0 20px;
        }
        .book-chapter-inner {
            background: white;
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.06);
        }
        .book-chapter:not(:last-of-type) {
            page-break-after: always;
        }
        .book-chapter .toc-button,
        .book-chapter .language-switcher,
        .book-chapter .navigation {
            display: none;
        }
        @media print {
            body {
                background: #fff;
            }
            .book-cover,
            .book-toc,
            .book-chapter-inner {
                box-shadow: none;
            }
            .book-toc {
                margin: 0;
                padding: 20px;
            }
            .book-chapter {
                margin: 20px auto;
            }
        }
    </style>
</head>
<body>
    <section class="book-cover">
        <h1>PÉTANQUE</h1>
        <h2>Den kompletta guiden</h2>
        <p>Alla delar, kapitel och fördjupningar samlade i en läs- och utskriftsvänlig version.\n        <br>Mats Hamberg</p>
    </section>

    <section class="book-toc">
        <h3>Innehåll</h3>
        <ul>
${tocItems}
        </ul>
    </section>

${chapterHtml}

</body>
</html>`;

fs.writeFileSync(outputFile, template, 'utf8');
console.log(`✅ Skapade ${outputFile}`);
