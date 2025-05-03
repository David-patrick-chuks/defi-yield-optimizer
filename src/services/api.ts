
import { API_ENDPOINTS } from "@/config/api";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatResponse {
  response: string;
  timestamp: string;
  chatHistory: ChatMessage[];
}




// src/services/openai.ts
export const sendMessage = async (message: string, chatHistory: ChatMessage[]) => {
  const response = await fetch(API_ENDPOINTS.sendMessage, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, chatHistory }),
  });

  if (!response.ok) {
    throw new Error("Failed to get comparison from AI.");
  }

  return await response.json();
};

