const { getJson } = require('serpapi');

const SERP_API_KEY = "a9b5bb17126c4173d9243ba1f71184546668d7c96c6598f3d9ff69ed2b1e9a0a";

const processSearchResults = (organicResults) => {
  return organicResults.map((result) => {
    let risk = "low";
    let type = "General Result";

    const url = result.link.toLowerCase();
    const snippet = result.snippet.toLowerCase();

    if (url.includes("adult") || url.includes("xxx") || snippet.includes("adult")) {
      risk = "high";
      type = "Adult Content";
    } else if (url.includes("forum") || url.includes("social") || url.includes("profile")) {
      risk = "medium";
      type = "Social Media/Forum";
    }

    return {
      url: result.link,
      title: result.title,
      snippet: result.snippet,
      risk,
      type,
    };
  });
};

const searchGoogle = async (query) => {
  const results = await getJson({
    engine: "google",
    q: query,
    api_key: SERP_API_KEY
  });

  const organicResults = results.organic_results || [];
  return processSearchResults(organicResults);
};

module.exports = {
  searchGoogle
};