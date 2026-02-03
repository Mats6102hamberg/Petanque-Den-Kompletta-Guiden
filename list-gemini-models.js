const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function listModels() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const models = await genAI.listModels();
    
    console.log('Tillgängliga modeller:');
    models.forEach(model => {
      console.log(`- ${model.name}`);
    });
    
  } catch (error) {
    console.error('Kunde inte lista modeller:', error);
  }
}

listModels();
