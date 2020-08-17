import { useContext } from "react";
import { MainContext } from "./contextUtils";

export const useMainContent = () => useContext(MainContext);
