import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const Span = styled.span`
  ${({ icon }) => css`
    &::before {
      content: '${icon}';
    }
  `}
`;

const LinkItem = ({ content, icon }) => {
  const Icon = icon && icon();
  return (
    <li className="nav__item">
      <Span icon={icon && <Icon />}>{content}</Span>
    </li>
  );
};

LinkItem.propTypes = {
  content: PropTypes.string.isRequired,
  icon: PropTypes.func,
};

export default LinkItem;
