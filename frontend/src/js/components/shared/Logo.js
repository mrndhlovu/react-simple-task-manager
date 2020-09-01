import React from "react";
import PropTypes from "prop-types";

const Logo = ({ history }) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div className="logo" onClick={() => {}} onKeyDown={() => history.push("/")}>
    <h1 data-testid="logo-name" className="logo__text">
      Checklists
    </h1>
  </div>
);

Logo.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Logo;
