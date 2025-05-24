const fs = require('fs').promises;
require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Upload image and perform reverse search (stubbed for now)
 * @param {Object} file
 * @returns {Promise<Array>} Array of possible matches/URLs
 */
async function performReverseImageSearch(file) {
  // TODO: Integrate with an actual reverse image API like Pimeyes, Berify, or Google Vision + SERP
  return [`[Reverse search results not implemented: ${file.originalname}]`];
}

/**
 * Search aliases/usernames on the web using a search API
 * @param {Array<string>} aliases
 * @returns {Promise<Object>} Key-value pairs of alias and URLs found
 */
async function searchAliasesOnline(aliases = []) {
  const results = {};
  for (const alias of aliases) {
    const response = await fetch('https://api.bing.microsoft.com/v7.0/search', {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.BING_SEARCH_API_KEY
      },
      params: {
        q: alias,
        count: 5
      }
    });
    results[alias] = response.data.webPages?.value?.map(item => item.url) || [];
  }
  return results;
}


async function analyzeSearchResults(aliases = [], files = []) {
  const promptText = `
  You are an expert in OSINT (Open Source Intelligence) and digital forensics.

  I need you to analyze public information based on the provided aliases and images. Please return:
  1. A clear, structured JSON object with findings (for programmatic use) and narrative analysis (for human-readable reports).

  ### ALIASES / USERNAMES
  ${JSON.stringify(aliases)}

  ### ANALYSIS INSTRUCTIONS
  1. Check if the aliases suggest links to public profiles or exposure (Instagram, LinkedIn, Facebook, OnlyFans, etc.).
  2. Examine the attached images for identifying features (faces, tattoos, license plates, usernames), and if similar images appear publicly online.
  3. Determine traceability or privacy risks.

  ### RESPONSE FORMAT
  Respond with:

    A narrative report of your findings in clear sections:
  - Social Media and Public Profiles
  - Image Analysis
  - Privacy and Traceability Risks
  - Summary

  #### "structured":
  A valid JSON object in the following format:
  {
    "aliases": [
      {
        "alias": string,
        "foundProfiles": [
          {
            "platform": string,
            "url": string,
            "description": string,
            "matchConfidence": "high" | "medium" | "low"
          }
        ],
        "privacyRisk": {
          "traceabilityRisk": "high" | "medium" | "low",
          "notes": string
        }
      }
    ],
    "images": [
      {
        "filename": string,
        "detectedFeatures": string[],
        "reverseImageSearchMatches": [
          {
            "url": string,
            "description": string,
            "matchConfidence": "high" | "medium" | "low"
          }
        ],
        "privacyRisk": {
          "traceabilityRisk": "high" | "medium" | "low",
          "notes": string
        }
      }
    ],
    "narrativeReport": string
  }

  Do not skip anything in the prompt.
  `;

  // Convert image files to base64 and format as image_url objects
  const imageMessages = await Promise.all(files.map(async file => {
    const imageBuffer = await fs.readFile(file.path);
    const base64Image = imageBuffer.toString('base64');
    return {
      type: "image_url",
      image_url: {
        url: `data:${file.mimetype};base64,${base64Image}`
      }
    };
  }));

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "You are a digital forensics and OSINT expert. Analyze digital footprints based on aliases and image files."
      },
      {
        role: "user",
        content: [
          { type: "text", text: promptText },
          ...imageMessages
        ]
      }
    ],
    temperature: 0.7,
    max_tokens: 3000
  });

  return chatCompletion.choices[0].message.content;
}


module.exports = {
  performReverseImageSearch,
  searchAliasesOnline,
  analyzeSearchResults
};
