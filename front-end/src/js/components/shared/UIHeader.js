import React from "react";
import PropTypes from "prop-types";

const UIHeader = ({ content, className = "content__header" }) => {
  return <h1 className={`${className}`}>{content}</h1>;
};

UIHeader.propTypes = {
  content: PropTypes.string.isRequired,
};

export default UIHeader;
