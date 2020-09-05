/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import PropTypes from "prop-types";

import Alert from "@material-ui/lab/Alert";

import UIPortal from "./UIPortal";

const UIAlert = ({ message, notify }) =>
  message ? (
    <UIPortal>
      <Alert
        onClose={() => notify()}
        data-testid="ui-alert"
        className="ui__alert"
        severity="info"
      >
        {message}
      </Alert>
    </UIPortal>
  ) : null;

UIAlert.defaultProps = {
  message: "",
};

UIAlert.propTypes = {
  message: PropTypes.string,
  notify: PropTypes.func.isRequired,
};

export default UIAlert;
