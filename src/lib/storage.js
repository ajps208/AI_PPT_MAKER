export const STORAGE_KEY = "ai_ppt_chat_history";

export const saveSession = (session) => {
  let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  history.unshift(session); 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 15))); 
};

export const getSessions = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
