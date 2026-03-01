const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, language } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on Vercel environment' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are "Spotlight Coach", a world-class AI English Tutor specialized in the "Spotlight 2" Moroccan curriculum (8th Grade). 

Your objective:
1. Help students with 9 main units: Jobs, Health, Food, Technology, Fashion, Nature, Leisure, School, and Travel.
2. If they ask about Unit 1, focus on jobs like Nurse, Mechanic, Journalist. 
3. If they ask about Unit 2, focus on Moroccan food like Harira, Tagine, and countables/uncountables.
4. Keep answers encouraging, visual (use some emojis), and concise.
5. Provide translations if requested.
6. Current UI language is ${language === 'ar' ? 'Arabic' : 'English'}. Respond in a way that matches their context. If they speak Arabic, answer primarily in Arabic with English examples.

The student asks: "${message}"`;

    try {
        const result = await model.generateContent(systemPrompt);
        const responseText = result.response.text();
        res.status(200).json({ text: responseText });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: 'The AI Brain is a bit tired. Check your API key or try again later.' });
    }
};
