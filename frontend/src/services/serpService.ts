export enum PrivacyRisk {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

export type PrivacyRiskLevel = PrivacyRisk.HIGH | PrivacyRisk.MEDIUM | PrivacyRisk.LOW;
export interface SearchResult {
  data: {
    aliases: [
      {
        alias: string,
        foundProfiles: [
          {
            platform: string,
            url: string,
            description: string,
            matchConfidence:PrivacyRiskLevel
          }
        ],
        privacyRisk: {
          traceabilityRisk:PrivacyRiskLevel
          notes: string
        }
      }
    ],
    images: [
      {
        filename: string,
        detectedFeatures: string[],
        reverseImageSearchMatches: [
          {
            url: string,
            description: string,
            matchConfidence: PrivacyRiskLevel
          }
        ],
        privacyRisk: {
          traceabilityRisk:PrivacyRiskLevel
          notes: string
        }
      }
    ],
    narrativeReport: string
  };
  success: boolean;
}




export const searchPerson = async (formData:FormData)=> {
  try {
    const response = await fetch(`http://localhost:3001/api/search`, {
      method: "POST",
      body: formData
    }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching search results:", error);
    return null;
  }
};