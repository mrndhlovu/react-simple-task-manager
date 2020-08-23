import axios from "axios";
import { TASKS_EP, PARAMS } from "../utils/urls";

const axiosInstance = axios.create({ ...PARAMS });

export const requestCreateTask = (data) => axiosInstance.post(`${TASKS_EP}/create-task`, data);

export const requestCreateList = (data) => axiosInstance.post(`${TASKS_EP}/create-list`, data);

export const requestUpdateTask = (data, id) => axiosInstance.patch(`${TASKS_EP}/id/${id}/update-task`, data);

export const requestTask = (id) => axiosInstance.get(`${TASKS_EP}/id/${id}`);
export const requestList = (id) => axiosInstance.get(`${TASKS_EP}/id/${id}/list`);

export const requestUpdateList = (data, id) => axiosInstance.patch(`${TASKS_EP}/id/${id}/update-list`, data);

export const requestDeleteTask = (id) => axiosInstance.delete(`${TASKS_EP}/id/${id}/delete-task`);

export const requestDeleteList = (id) => axiosInstance.delete(`${TASKS_EP}/id/${id}/delete-list`);

export const requestAllTasks = () => axiosInstance.get(`${TASKS_EP}/all`);
export const requestLists = () => axiosInstance.get(`${TASKS_EP}/all-lists`);
