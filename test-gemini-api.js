const fetch = require('node-fetch').default;
require('dotenv').config();

async function testGeminiAPI() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'din_gemini_api_nyckel_här') {
      throw new Error('API-nyckel saknas eller är inte uppdaterad i .env-filen');
    }
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Testa API-nyckel - svara med 'API-nyckel verifierad!' om detta fungerar"
          }]
        }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('API-fel:', data.error);
      return false;
    }
    
    if (data.candidates && data.candidates[0].content.parts[0].text.includes('API-nyckel verifierad!')) {
      console.log('✅ API-nyckel fungerar korrekt!');
      return true;
    }
    
    console.log('⏳ API-svar mottaget:', JSON.stringify(data, null, 2));
    return true;
    
  } catch (error) {
    console.error('❌ Test misslyckades:', error.message);
    return false;
  }
}

testGeminiAPI();
