import { useEffect } from "react";
import { createPortal } from "react-dom";

const portalRoot = document.getElementById("root");

const UIPortal = ({ children }) => {
  const portal = document.createElement("div");

  useEffect(() => {
    portalRoot.insertAdjacentElement("afterEnd", portal);

    return () => {
      portalRoot.removeChild(portal);
    };
  }, []);

  return createPortal(children, portal);
};

export default UIPortal;
