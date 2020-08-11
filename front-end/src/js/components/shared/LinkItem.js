import React from "react";
import PropTypes from "prop-types";

const LinkItem = ({ content, clickHandler }) => {
  return (
    <li className="nav__item" onClick={clickHandler}>
      <span>{content}</span>
    </li>
  );
};

LinkItem.propTypes = {
  content: PropTypes.string.isRequired,
  icon: PropTypes.func,
  clickHandler: PropTypes.func,
};

export default LinkItem;
