const OpenAI = require('openai');
const { parseCSV } = require('../utils/csvParser');
const fs = require('fs');

const handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
      return res.json(mockAIResponse(message));
    }

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "StockSense AI",
      }
    });

    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3-8b-instruct:free",
      messages: [
        {
          role: "system",
          content: "You are StockSense AI, a data-driven financial assistant specializing in the Indian Stock Market (NSE/BSE).\n\nRules:\n- Focus your analysis on Indian equities (NIFTY, Sensex, etc.).\n- Explain stock concepts in simple, clear language\n- Do NOT give direct financial advice (adhere to basic SEBI compliance by adding a small disclaimer if necessary)\n- Always include reasoning\n- Use bullet points when helpful\n- Be concise but insightful\n- Output stock trends specifically with [BULLISH] or [BEARISH] tags when appropriate so the frontend can style them."
        },
        { role: "user", content: message }
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ reply: "An error occurred while analyzing the data." });
  }
};

const handleCSVUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ reply: "No file uploaded." });
    }

    const data = await parseCSV(req.file.path);
    fs.unlinkSync(req.file.path); // cleanup

    const summaryPrompt = `Analyze the following dataset context. Identify trends, anomalies, and insights. Provide a structured explanation.\n\nData preview:\n${JSON.stringify(data.slice(0, 5))}`;

    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
      return res.json(mockCSVResponse(summaryPrompt));
    }

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "StockSense AI",
      }
    });

    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3-8b-instruct:free",
      messages: [
        {
          role: "system",
          content: "You are StockSense AI, a data-driven financial assistant analyzing CSV datasets with a focus on Indian markets."
        },
        { role: "user", content: summaryPrompt }
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("CSV Upload Error:", error);
    res.status(500).json({ reply: "An error occurred while processing the CSV data." });
  }
};

function mockAIResponse(message) {
  const lowercaseMessage = message.toLowerCase();
  let reply = "I am a mock response because the OpenRouter API key is missing. ";

  if (lowercaseMessage.includes("tcs")) {
    reply += "\n\n**Company Overview:** Tata Consultancy Services (TCS) is a global IT services, consulting, and business solutions leader.\n\n**Trend:** [BULLISH]\n\n**Key Indicators:**\n- Revenue Growth: Steady\n- Margins: Strong\n\n**Simple Explanation:** TCS is showing consistent growth thanks to strong demand in digital transition services.";
  } else if (lowercaseMessage.includes("trend") || lowercaseMessage.includes("market")) {
    reply += "\n\nThe broader market is showing a [BULLISH] pattern. Recovery in consumer spending and stabilized interest rates suggest positive momentum.";
  } else {
    reply += "\n\nI can analyze stocks, trends, or datasets. For example, try asking 'Analyze TCS'.";
  }

  return { reply };
}

function mockCSVResponse(prompt) {
  return { reply: "Based on the uploaded dataset preview: The dataset contains several rows with financial metrics. \n\n**Trends:** The values show a steady upward trajectory.\n**Anomalies:** No major anomalies were detected in the first 5 records.\n**Insights:** This data represents a [BULLISH] outcome due to positive growth." };
}

module.exports = {
  handleChat,
  handleCSVUpload
};
