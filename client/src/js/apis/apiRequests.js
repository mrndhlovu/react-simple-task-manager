import axios from "axios";
import { AUTH_EP } from "../utils/urls";

export const authQueryParams = {
  headers: {
    Authorization: ``,
    "Content-Type": "application/json",
  },
};

export const requestUserProfile = () => {
  return axios.get(`${AUTH_EP}/me`);
};
