import axios from "axios";
import { AUTH_EP, PARAMS } from "../utils/urls";

const axiosInstance = axios.create({ ...PARAMS });

export const requestDeleteAccount = () =>
  axiosInstance.delete(`${AUTH_EP}/delete-account`);
export const requestUserUpdate = (data) =>
  axiosInstance.patch(`${AUTH_EP}/update-user`, data);
export const requestLogout = () => axiosInstance.post(`${AUTH_EP}/logout`);
export const requestLogin = (data) =>
  axiosInstance.post(`${AUTH_EP}/login`, data);
export const requestUserProfile = () => axiosInstance.get(`${AUTH_EP}/me`);
export const requestRegistration = (data) =>
  axiosInstance.post(`${AUTH_EP}/register`, data);
