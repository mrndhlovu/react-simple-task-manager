import React from "react";
import PropTypes from "prop-types";

const Logo = ({ history }) => {
  return (
    <div className="logo">
      <h1 className="logo__text" onClick={() => history.push("/")}>
        Checklists
      </h1>
    </div>
  );
};

Logo.propTypes = {
  history: PropTypes.object,
};

export default Logo;
