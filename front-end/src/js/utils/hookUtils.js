import { useContext } from "react";
import { MainContext, TaskContext } from "./contextUtils";

export const useMainContent = () => useContext(MainContext);
export const useTaskContent = () => useContext(TaskContext);
