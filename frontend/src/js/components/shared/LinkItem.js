/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import PropTypes from "prop-types";

const LinkItem = ({ content, clickHandler, active }) => (
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

LinkItem.defaultProps = {
  active: PropTypes.oneOf([PropTypes.string, PropTypes.func]),
};

LinkItem.propTypes = {
  content: PropTypes.string.isRequired,
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  clickHandler: PropTypes.func.isRequired,
};

export default LinkItem;
