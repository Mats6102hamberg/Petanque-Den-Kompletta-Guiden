const fs = require('fs');
const path = require('path');

// Configuration
const MIN_WORD_COUNT = 500; // Minimum words per chapter
const CHAPTER_DIRS = [
  '/',               // Swedish
  '/en/',            // English
  '/fr/',            // French
  '/es/',            // Spanish
  '/de/',            // German
  '/th/'             // Thai
];

async function checkChapters() {
  try {
    const baseDir = path.join(__dirname);
    const missingContent = [];

    for (const dir of CHAPTER_DIRS) {
      const chapterDir = path.join(baseDir, dir);
      if (!fs.existsSync(chapterDir)) continue;
      
      const files = fs.readdirSync(chapterDir);
      const chapterFiles = files.filter(file => file.match(/del\d+-kapitel\d+\.html$/));
      
      for (const file of chapterFiles) {
        const filePath = path.join(chapterDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Remove HTML tags to count words
        const textContent = content.replace(/<[^>]*>/g, ' ');
        const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
        
        if (wordCount < MIN_WORD_COUNT) {
          missingContent.push({
            file: path.join(dir, file),
            wordCount
          });
        }
      }
    }

    if (missingContent.length === 0) {
      console.log('✅ All chapters meet the minimum word count');
      return;
    }

    console.log('❌ Chapters with low word count:');
    missingContent.forEach(chapter => {
      console.log(`- ${chapter.file}: ${chapter.wordCount} words`);
    });

  } catch (error) {
    console.error('Error checking chapters:', error);
  }
}

checkChapters();
