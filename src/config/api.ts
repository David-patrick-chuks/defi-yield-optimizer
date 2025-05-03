
export const API_URL = "https://safesage-backend.onrender.com";

export const API_ENDPOINTS = {
  sendMessage: `${API_URL}/api/support`,  
  compareTokens: `${API_URL}/api/compare`,  

} as const;
