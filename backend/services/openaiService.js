require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const analyzeSearchResults = async (query, searchData) => {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a digital footprint analyzer. Analyze the search results and provide insights about the person's online presence, potential risks, and notable patterns. Be specific and detailed in your analysis."
      },
      {
        role: "user",
        content: `Analyze these search results about "${query}": ${JSON.stringify(searchData, null, 2)}`
      }
    ],
    temperature: 0.7,
    max_tokens: 1000
  });
  console.log("chat complitation",chatCompletion.choices[0].message.content);

  return chatCompletion.choices[0].message.content;
};

module.exports = {
  analyzeSearchResults
};