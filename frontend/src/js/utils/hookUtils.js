import { useContext } from "react";
import { MainContext } from "./contextUtils";

// eslint-disable-next-line import/prefer-default-export
export const useMainContent = () => useContext(MainContext);
