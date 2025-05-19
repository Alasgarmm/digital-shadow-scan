export interface SearchResult {
  url: string;
  title: string;
  snippet: string;
  risk: "high" | "medium" | "low";
  type: string;
}

export const exampleSearchResults: SearchResult[] = [
  {
    url: "https://www.google.com",
    title: "Google",
    snippet: "Google is a search engine",
    risk: "high",
    type: "Adult Content"
  },
];


export const searchPerson = async (name: string): Promise<SearchResult[]> => {
  try {
    const response = await fetch(`http://localhost:3001/api/search?query=${encodeURIComponent(name)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};