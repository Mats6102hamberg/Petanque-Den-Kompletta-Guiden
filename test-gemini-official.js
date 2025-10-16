const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGeminiAPI() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'din_gemini_api_nyckel_här') {
      throw new Error('API-nyckel saknas eller är inte uppdaterad i .env-filen');
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent("Testa API-nyckel - svara med 'API-nyckel verifierad!' om detta fungerar");
    const response = await result.response;
    const text = response.text();
    
    if (text.includes('API-nyckel verifierad!')) {
      console.log('✅ API-nyckel fungerar korrekt!');
      return true;
    }
    
    console.log('⏳ API-svar mottaget:', text);
    return true;
    
  } catch (error) {
    console.error('❌ Test misslyckades:', error.message);
    return false;
  }
}

testGeminiAPI();
