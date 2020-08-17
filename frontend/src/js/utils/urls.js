export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000"
    : "http://172.31.33.194";

export const TASKS_EP = "/v1/api/tasks";
export const AUTH_EP = "/v1/api/auth";

export const PARAMS = {
  baseURL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
  credentials: "same-origin",
  withCredentials: true,
};
