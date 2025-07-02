
import { GoogleGenAI } from "@google/genai";
import type { User, Skill } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const generateSampleUsersPrompt = `
You are a data generator for a time-banking platform called "TimeBridge".
Your task is to create a realistic and diverse set of 5 sample user profiles.
Each user needs a unique name, a short bio, skills they can offer, and skills they need.
Ensure the skills are varied, covering categories like 'Creative', 'Technical', 'Household', 'Wellness', and 'Professional'.
Each user should start with a random number of time credits between 5 and 50.
Give them a verified badge randomly.

Please return the data as a JSON array, where each object matches the following TypeScript interface:

interface Skill {
  id: string; // a unique slug-like id, e.g., 'web-development'
  name: string; // 'Web Development'
}

interface User {
  id: string; // a unique id
  name: string;
  email: string; // a fake email address
  avatarUrl: string; // use picsum.photos, e.g., https://picsum.photos/seed/{random_string}/200
  bio: string;
  skillsOffered: Skill[];
  skillsNeeded: Skill[];
  timeCredits: number;
  isVerified: boolean;
}

Do not include any explanation, just the raw JSON array.
`;

export const generateSampleUsers = async (): Promise<User[]> => {
  if (!process.env.API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: generateSampleUsersPrompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr);

    if (Array.isArray(parsedData)) {
      // Basic validation
      return parsedData.filter(item => item.id && item.name && item.skillsOffered);
    }

    return [];
  } catch (error) {
    console.error("Failed to generate sample users with Gemini:", error);
    throw new Error("Could not fetch data from AI. Please check the console for details.");
  }
};
