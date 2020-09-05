import { useEffect } from "react";
import { createPortal } from "react-dom";

const ROOT_ELEMENT = document.getElementById("root");

const UIPortal = ({ children }) => {
  const portalElement = document.createElement("div");
  portalElement.className = "ui__portal";

  useEffect(() => {
    ROOT_ELEMENT.insertAdjacentElement("afterEnd", portalElement);

    return () => {
      ROOT_ELEMENT.nextElementSibling.remove(portalElement);
    };
  }, []);

  return createPortal(children, portalElement);
};

export default UIPortal;
