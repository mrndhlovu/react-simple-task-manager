import React from "react";
import PropTypes from "prop-types";

const LinkItem = ({ content, clickHandler, active }) => {
  return (
    <li
      className={`nav__item ${
        active === content.toLowerCase() ? "menu__item__active" : ""
      }`}
      onClick={clickHandler}
    >
      <span
        className={`nav__item ${
          active === content.toLowerCase() ? "active__link__text" : ""
        }`}
      >
        {content}
      </span>
    </li>
  );
};

LinkItem.propTypes = {
  content: PropTypes.string.isRequired,
  icon: PropTypes.func,
  clickHandler: PropTypes.func,
};

export default LinkItem;
