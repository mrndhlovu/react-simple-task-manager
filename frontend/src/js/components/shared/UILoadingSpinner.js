import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

const UILoadingSpinner = () => (
  <div data-testid="loading-spinner" className="loading__spinner__container">
    <CircularProgress />
  </div>
);

export default UILoadingSpinner;
