#!/usr/bin/env node

// Ladda miljövariabler från .env-fil
require('dotenv').config();

/**
 * AUTOMATIC NOVEL CHAPTER TRANSLATOR
 * 
 * Översätter automatiskt romankapitel från svenska till alla språk
 * och genererar HTML-filer för varje språkversion.
 * 
 * ANVÄNDNING:
 * 1. Klistra in din svenska text i denna fil (se SWEDISH_TEXT nedan)
 * 2. Kör: node translate-novel-chapter.js
 * 3. Filer genereras automatiskt i rätt mappar!
 * 
 * KRAV: 
 * - Node.js installerat
 * - OpenAI API-nyckel (sätt env: OPENAI_API_KEY)
 *   eller använd Google Translate API (gratis för små volymer)
 */

const fs = require('fs').promises;
const path = require('path');
const OpenAI = require('openai');

// ===========================================
// KONFIGURERA DITT KAPITEL HÄR
// ===========================================

const CHAPTER_CONFIG = {
    chapterNumber: 0,
    chapterTitle_sv: "Introduktion - Mr Boule Pétanque",
    releaseDate: "Oktober 2025",
    readTime: "~5 minuter",
    
    // KLISTRA IN DIN SVENSKA TEXT HÄR:
    swedishText: `
Hej alla, hoppas att jag kan förmedla en ovanlig sida av boule pétanque nämligen en romanfigur vid namn Mr Boule Pétanque. Ovanligt duktig i petanque, vilket har fått konsekvenser för hans privatliv. Han är inte lika aktiv som han var tidigare men dyker upp här och där för att spela matcher. Boule Pétanque är viktigt för honom och händelser som har att göra med sporten tar han sig en titt på. Det händer även att folk från den stora petanque-världen vänder sig till honom för att få stöd och hjälp eller bara Mr BP:s reflektioner.

[SCENE_BREAK]

Snart kommer första avsnittet att finnas här. Kanske det blir en gång i månaden.

Vänligen Mats Hamberg, författare till Pétanque - Den Kompletta Guiden och romanen Mr Boule Pétanque.
    `.trim()
};

// ===========================================
// SPRÅK-KONFIGURATION
// ===========================================

const LANGUAGES = {
    sv: {
        name: 'Svenska',
        flag: '🇸🇪',
        folder: '',
        translations: {
            chapter: 'Kapitel',
            published: 'Publicerad',
            readTime: 'Läslängd',
            contents: 'Innehåll',
            novel: 'Roman',
            previous: 'Föregående',
            next: 'Nästa',
            backToOverview: 'Tillbaka till översikt',
            releasesOn: 'släpps',
            feedback: 'Din feedback är viktig!',
            feedbackText: 'Vad tyckte du om detta kapitel? Din feedback hjälper mig att göra romanen ännu bättre. Skicka gärna dina tankar till:',
            continuation: 'Fortsättning följer i'
        }
    },
    en: {
        name: 'English',
        flag: '🇬🇧',
        folder: 'en/',
        translations: {
            chapter: 'Chapter',
            published: 'Published',
            readTime: 'Reading time',
            contents: 'Contents',
            novel: 'Novel',
            previous: 'Previous',
            next: 'Next',
            backToOverview: 'Back to overview',
            releasesOn: 'releases',
            feedback: 'Your feedback matters!',
            feedbackText: 'What did you think of this chapter? Your feedback helps me make the novel even better. Feel free to send your thoughts to:',
            continuation: 'Continued in'
        }
    },
    fr: {
        name: 'Français',
        flag: '🇫🇷',
        folder: 'fr/',
        translations: {
            chapter: 'Chapitre',
            published: 'Publié',
            readTime: 'Temps de lecture',
            contents: 'Sommaire',
            novel: 'Roman',
            previous: 'Précédent',
            next: 'Suivant',
            backToOverview: 'Retour à l\'aperçu',
            releasesOn: 'sort le',
            feedback: 'Vos commentaires comptent!',
            feedbackText: 'Qu\'avez-vous pensé de ce chapitre? Vos commentaires m\'aident à améliorer le roman. N\'hésitez pas à envoyer vos réflexions à:',
            continuation: 'Suite dans'
        }
    },
    es: {
        name: 'Español',
        flag: '🇪🇸',
        folder: 'es/',
        translations: {
            chapter: 'Capítulo',
            published: 'Publicado',
            readTime: 'Tiempo de lectura',
            contents: 'Contenido',
            novel: 'Novela',
            previous: 'Anterior',
            next: 'Siguiente',
            backToOverview: 'Volver a la vista general',
            releasesOn: 'se publica',
            feedback: '¡Tu opinión importa!',
            feedbackText: '¿Qué te pareció este capítulo? Tus comentarios me ayudan a mejorar la novela. No dudes en enviar tus pensamientos a:',
            continuation: 'Continúa en'
        }
    }
};

// ===========================================
// ÖVERSÄTTNINGSFUNKTION (MOCK - Använd riktig API)
// ===========================================

async function translateText(text, targetLang) {
    console.log(`🔄 Översätter till ${LANGUAGES[targetLang].name}...`);
    
    // Kontrollera om API-nyckel finns
    if (!process.env.OPENAI_API_KEY) {
        console.warn('⚠️  OPENAI_API_KEY saknas - använder mock-översättning');
        return `[MOCK-ÖVERSÄTTNING TILL ${LANGUAGES[targetLang].name.toUpperCase()}]\n\n${text}\n\n[Sätt OPENAI_API_KEY för riktiga översättningar]`;
    }
    
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        
        const systemPrompt = `You are a professional literary translator specializing in fiction about pétanque (French boules). 

Task: Translate the following Swedish text to ${LANGUAGES[targetLang].name}.

IMPORTANT RULES:
1. Maintain the literary style, tone, and emotional depth
2. Keep character names UNCHANGED (e.g., Jean-Pierre, Amélie, Marseille, Toulouse)
3. Keep pétanque terms in French (e.g., boules, carreau, boulodrome, cochonnet)
4. Keep [SCENE_BREAK] markers exactly as-is
5. Preserve paragraph structure and formatting
6. Translate dialogue naturally for the target language
7. Keep the same literary register (formal/informal)
8. Maintain cultural nuances and emotions

Translate naturally and beautifully - this is literary fiction, not technical text.`;
        
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: text
                }
            ],
            temperature: 0.3,  // Låg för konsistens mellan kapitel
            max_tokens: 4000
        });
        
        const translatedText = response.choices[0].message.content;
        console.log(`✅ Översättning klar (${translatedText.length} tecken)`);
        return translatedText;
        
    } catch (error) {
        console.error(`❌ Översättningsfel: ${error.message}`);
        throw error;
    }
}

// ===========================================
// HTML-GENERERING
// ===========================================

function generateChapterHTML(lang, chapterTitle, translatedText, config) {
    const t = LANGUAGES[lang].translations;
    const folderPrefix = lang === 'sv' ? '' : '../';
    
    // Konvertera [SCENE_BREAK] till HTML
    const formattedText = translatedText
        .split('\n\n')
        .map(para => {
            if (para.trim() === '[SCENE_BREAK]') {
                return '<div class="scene-break">* * *</div>';
            }
            return `<p>${para.trim()}</p>`;
        })
        .join('\n                ');
    
    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.chapter} ${config.chapterNumber}: ${chapterTitle} - Mr. Boule Pétanque</title>
    <link rel="stylesheet" href="${folderPrefix}styles.css">
    <script src="${folderPrefix}simple-license.js"></script>
    <style>
        .chapter-header-novel {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
            margin: -40px -40px 40px -40px;
            border-radius: 10px 10px 0 0;
        }
        .chapter-breadcrumb {
            font-size: 14px;
            color: #bdc3c7;
            margin-bottom: 15px;
        }
        .chapter-breadcrumb a {
            color: #ecf0f1;
            text-decoration: none;
            transition: color 0.3s;
        }
        .chapter-breadcrumb a:hover {
            color: white;
        }
        .chapter-number-novel {
            font-size: 16px;
            color: #D2691E;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 10px;
        }
        .chapter-title-novel {
            font-family: 'Playfair Display', serif;
            font-size: 48px;
            font-weight: 900;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .chapter-meta {
            font-size: 16px;
            color: #bdc3c7;
        }
        .novel-text {
            font-size: 18px;
            line-height: 2;
            color: #2c3e50;
            margin-bottom: 30px;
        }
        .novel-text p {
            margin-bottom: 25px;
            text-indent: 40px;
        }
        .novel-text p:first-of-type {
            text-indent: 0;
        }
        .novel-text p:first-of-type::first-letter {
            font-size: 72px;
            font-family: 'Playfair Display', serif;
            float: left;
            line-height: 60px;
            padding-right: 10px;
            margin-top: 5px;
            color: #D2691E;
        }
        .scene-break {
            text-align: center;
            margin: 50px 0;
            font-size: 24px;
            color: #D2691E;
        }
        .chapter-nav {
            display: flex;
            justify-content: space-between;
            margin-top: 60px;
            padding-top: 40px;
            border-top: 2px solid #e0e0e0;
            gap: 20px;
            flex-wrap: wrap;
        }
        .chapter-nav-btn {
            flex: 1;
            min-width: 200px;
            padding: 20px;
            background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            text-align: center;
            font-weight: 700;
            transition: all 0.3s ease;
        }
        .chapter-nav-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(139,69,19,0.3);
        }
        .chapter-nav-btn.disabled {
            background: #ccc;
            cursor: not-allowed;
            opacity: 0.6;
        }
        .chapter-nav-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
            opacity: 0.8;
        }
    </style>
    <script>
        window.addEventListener('DOMContentLoaded', function() {
            PetanqueLicense.requirePremium();
        });
    </script>
</head>
<body>
    <a href="${LANGUAGES[lang].folder}mr-boule-petanque.html" class="toc-button">← ${t.novel}</a>

    <div class="container">
        <div class="chapter-header-novel">
            <div class="chapter-breadcrumb">
                <a href="${LANGUAGES[lang].folder}innehall.html">${t.contents}</a> / <a href="${LANGUAGES[lang].folder}mr-boule-petanque.html">Mr. Boule Pétanque</a>
            </div>
            <div class="chapter-number-novel">${t.chapter} ${config.chapterNumber}</div>
            <h1 class="chapter-title-novel">${chapterTitle}</h1>
            <div class="chapter-meta">${t.published}: ${config.releaseDate} | ${t.readTime}: ${config.readTime}</div>
        </div>

        <div class="content">
            <div class="novel-text">
                ${formattedText}
                
                <p><em>${t.continuation} ${t.chapter} ${config.chapterNumber + 1} (${t.releasesOn} 15 november 2025)</em></p>
            </div>

            <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin: 40px 0;">
                <h3 style="font-family: 'Playfair Display', serif; color: #8B4513; margin-bottom: 15px;">💭 ${t.feedback}</h3>
                <p>${t.feedbackText}</p>
                <p style="margin-top: 15px;">
                    <strong>📧</strong> <a href="mailto:mats@petanqueguiden.se?subject=Feedback%20-%20Mr.%20Boule%20Pétanque%20${t.chapter}%20${config.chapterNumber}" style="color: #D2691E; text-decoration: none; font-weight: 700;">mats@petanqueguiden.se</a>
                </p>
            </div>

            <div class="chapter-nav">
                <a href="${LANGUAGES[lang].folder}mr-boule-petanque.html" class="chapter-nav-btn">
                    <div class="chapter-nav-label">← ${t.previous}</div>
                    <div class="chapter-nav-title">${t.backToOverview}</div>
                </a>
                <a href="#" class="chapter-nav-btn disabled" onclick="return false;">
                    <div class="chapter-nav-label">${t.next} →</div>
                    <div class="chapter-nav-title">${t.chapter} ${config.chapterNumber + 1} ${t.releasesOn} 15 nov</div>
                </a>
            </div>
        </div>
    </div>

    <script src="${folderPrefix}script.js"></script>
</body>
</html>`;
}

// ===========================================
// HUVUD-FUNKTION
// ===========================================

async function main() {
    console.log('🚀 AUTOMATISK KAPITEL-ÖVERSÄTTARE\n');
    console.log(`📖 Kapitel ${CHAPTER_CONFIG.chapterNumber}: ${CHAPTER_CONFIG.chapterTitle_sv}\n`);
    
    const results = [];
    
    for (const [langCode, langData] of Object.entries(LANGUAGES)) {
        try {
            console.log(`\n${'='.repeat(50)}`);
            console.log(`${langData.flag} ${langData.name}`);
            console.log('='.repeat(50));
            
            // Översätt text (hoppa över svenska - använd original)
            let translatedText = CHAPTER_CONFIG.swedishText;
            let chapterTitle = CHAPTER_CONFIG.chapterTitle_sv;
            
            if (langCode !== 'sv') {
                translatedText = await translateText(CHAPTER_CONFIG.swedishText, langCode);
                // I produktion, översätt även titeln
                chapterTitle = `${CHAPTER_CONFIG.chapterTitle_sv} [${langData.name}]`;
            }
            
            // Generera HTML
            const html = generateChapterHTML(langCode, chapterTitle, translatedText, CHAPTER_CONFIG);
            
            // Spara fil
            const folderPath = path.join(__dirname, langData.folder);
            const filename = `mr-boule-kapitel${CHAPTER_CONFIG.chapterNumber}.html`;
            const filepath = path.join(folderPath, filename);
            
            await fs.writeFile(filepath, html, 'utf-8');
            
            console.log(`✅ Skapad: ${langData.folder}${filename}`);
            results.push({
                lang: langData.name,
                flag: langData.flag,
                file: `${langData.folder}${filename}`,
                success: true
            });
            
        } catch (error) {
            console.error(`❌ Fel för ${langData.name}:`, error.message);
            results.push({
                lang: langData.name,
                flag: langData.flag,
                error: error.message,
                success: false
            });
        }
    }
    
    // Sammanfattning
    console.log(`\n${'='.repeat(50)}`);
    console.log('📊 SAMMANFATTNING');
    console.log('='.repeat(50));
    
    results.forEach(r => {
        if (r.success) {
            console.log(`✅ ${r.flag} ${r.lang}: ${r.file}`);
        } else {
            console.log(`❌ ${r.flag} ${r.lang}: ${r.error}`);
        }
    });
    
    const successCount = results.filter(r => r.success).length;
    console.log(`\n🎉 ${successCount}/${results.length} språk klara!`);
    console.log('\n💡 TIP: För riktiga översättningar, aktivera API i translateText()-funktionen\n');
}

// Kör scriptet
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { translateText, generateChapterHTML };
