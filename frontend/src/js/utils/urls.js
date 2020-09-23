export const baseURL = process.env.NODE_ENV === "development"
  ? "http://localhost:6000"
  : "https://checklists.ndhlovu.com";

export const TASKS_EP = "/api/tasks";
export const AUTH_EP = "/api/auth";

export const PARAMS = {
  baseURL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
  credentials: "same-origin",
  withCredentials: true,
};
