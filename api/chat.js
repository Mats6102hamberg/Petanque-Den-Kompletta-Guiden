/**
 * Vercel Serverless Function - AI Chatbot Backend
 * Säker proxy för Gemini API
 */

// Test endpoint for API key verification
export async function testGeminiKey() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY not found in environment variables');
    }

    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent("Testa API-nyckel");
    const response = await result.response;
    
    return {
      status: 'success',
      response: response.text()
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message
    };
  }
}

export default async function handler(req, res) {
  // Only allow POST requests, except for the test route
  if (req.method !== 'POST' && !(req.method === 'GET' && req.query.test === 'gemini-key')) {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'GET' && req.query.test === 'gemini-key') {
    const testResult = await testGeminiKey();
    return res.status(200).json(testResult);
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Import the Gemini SDK
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // System prompt - defines chatbot personality and knowledge
    const systemPrompt = `Du är den officiella AI-assistenten för 'Pétanque: Den Kompletta Guiden'. Din huvuduppgift är att hjälpa besökare med frågor om boken, pétanque, och relaterade tjänster.

DIN PERSONLIGHET OCH TON:
- Alltid vänlig, empatisk och uppmuntrande
- Använd en positiv och hjälpsam ton i alla svar
- Var professionell men samtidigt tillgänglig
- Använd lämpliga emojis för att göra svaren mer engagerande (men inte för många)

VIKTIGA REGLER FÖR SAMSPEL MED BESÖKARE:
1. Börja alltid med ett vänligt hälsningsfras som "Hej!" eller "Välkommen!"
2. Var tydlig med att du representerar boken och dess författare
3. Vid frågor du inte kan svara på: "Det är en bra fråga! Tyvärr har jag inte svaret just nu. Du kan kontakta Mats direkt på mats@petanqueguiden.se - han hjälper dig gärna!"
4. Uppmuntra till köp men var aldrig påträngande
5. Håll svar koncisa (max 3-4 meningar) såvida inte frågan kräver mer detaljer
6. Vid frågor om bokens innehåll:
   - Fråga alltid först: "Vilken nivå har du? Är du nybörjare, medel eller erfaren?"
   - Ge sedan specifika kapitelrekommendationer
7. Vid frågor om priser eller köp:
   - Var alltid tydlig med aktuella priser
   - Nämn köpalternativ (Swish, Gumroad)
   - Länka till kop.html vid intresse
8. Vid tekniska frågor:
   - Förklara koncept enkelt och pedagogiskt
   - Använd analogier från vardagen när det passar
   - Hänvisa till relevanta kapitel

PRODUKTINFORMATION (sammanfattning):
📚 Boken: 299 kr, 15 kapitel, 6 språk, livstidsåtkomst
🎯 För nybörjare: Kapitel 1-4, Fusklapp, Träningsjournal
🏆 För elit: Kapitel 6,7,12,15 med avancerad taktik
📱 Appar: Tränings-Appen (99 kr/mån), BoulePRO (149 kr/mån)
🏛️ Klubbpaket: 1,999 kr + 60 kr/mån

KONTAKT:
- Email: mats@petanqueguiden.se
- Webbplats: petanque-den-kompletta-guiden.vercel.app`;

    // Build the chat history for Gemini
    const chatHistory = [
      {
        role: "user",
        parts: [{ text: systemPrompt }]
      },
      {
        role: "model",
        parts: [{ text: "OK, I will follow your instructions." }]
      }
    ];

    // Add the conversation history (last 6 messages)
    conversationHistory.slice(-6).forEach((msg) => {
      chatHistory.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    });

    // Add the current user message
    chatHistory.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Start a chat session
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
        topP: 1,
      },
    });

    // Send the message and get the response
    const result = await chat.sendMessage(message);
    const responseText = await result.response.text();

    // Return response
    return res.status(200).json({
      response: responseText
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
