export const getRootUrl = () =>
  process.env.NODE_ENV === "production"
    ? "http://moneat.herokuapp.com"
    : "http://localhost:3000";

export const AUTH_EP = `${getRootUrl()}/v1/api/auth`;
console.log("getRootUrl()", getRootUrl());
