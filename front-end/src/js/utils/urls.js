export const baseURL = "http://localhost:5000";

export const LISTS_EP = `/v1/api/boards`;
export const TASKS_EP = `/v1/api/cards`;
export const AUTH_EP = `/v1/api/auth`;

export const params = {
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  credentials: "same-origin",
  withCredentials: true,
};

export const parseUrl = (search) => {
  const searchParams = search.replace(/^\?/, "").split("&");
  let result = {};
  searchParams.map((query) => {
    const data = query.split("=");
    return (result = {
      ...result,
      [`${data.shift()}`]: data.shift(),
    });
  });

  return result;
};

export const getQueryString = (location) => location.search.slice(1);

// export const getSearchQueryString = (query) =>
