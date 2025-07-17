
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API_KEY is available in the environment.
// In a real app, this would be handled by the deployment environment.
if (!process.env.API_KEY) {
  // In a real app, you would have a more robust way of handling this.
  // For this example, we'll log a warning, but the app will fail if the key is not set.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || " " });

const parseJsonFromMarkdown = (text: string): any => {
    let jsonStr = text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      throw new Error("Invalid JSON format received from AI.");
    }
}


export const generatePostContent = async (prompt: string): Promise<string> => {
    try {
        const fullPrompt = `You are a social media manager for a friendly, local cafe. Write a short, engaging business post (around 3-4 sentences) about the following topic: "${prompt}". Use a warm and inviting tone. Include 2-3 relevant hashtags.`;
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullPrompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating post content:", error);
        return "Sorry, I couldn't generate a post right now. Please try again.";
    }
};

export const generateReviewReply = async (reviewText: string, rating: number): Promise<string> => {
    try {
        const systemInstruction = `You are the owner of a cafe, replying to customer reviews. Your tone should be professional, appreciative, and empathetic. 
- If the rating is 4 or 5 stars, be thankful and positive.
- If the rating is 3 stars, be appreciative of the feedback and acknowledge areas for improvement.
- If the rating is 1 or 2 stars, be very apologetic, empathetic, and offer to make things right. Do not be defensive.
Keep replies concise (2-3 sentences).`;

        const userPrompt = `Generate a reply for a customer review with a ${rating}/5 star rating. The review is: "${reviewText}"`;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error generating review reply:", error);
        return "Sorry, I couldn't generate a reply right now. Please try again.";
    }
};