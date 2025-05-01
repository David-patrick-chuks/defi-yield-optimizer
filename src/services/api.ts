
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

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  }

  // Send chat message
  async sendMessage(message: string, chatHistory: ChatMessage[]): Promise<ChatResponse> {
    return this.request<ChatResponse>(API_ENDPOINTS.sendMessage, {
      method: "POST",
      body: JSON.stringify({ message, chatHistory }),
    });
  }
}

export const api = new ApiService();
