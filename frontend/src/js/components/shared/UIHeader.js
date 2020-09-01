import React from "react";
import PropTypes from "prop-types";

const UIHeader = ({ content, className = "content__header", dataTestId }) => (
  <h1 data-testid={dataTestId} className={`${className}`}>
    {content}
  </h1>
);

UIHeader.defaultProps = {
  className: "content__header",
  dataTestId: "",
};

UIHeader.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
};

export default UIHeader;
