/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import { useMainContent } from "../../utils/hookUtils";
import UILoadingSpinner from "../shared/UILoadingSpinner";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: ComposedComponent, ...rest }) => {
  const { auth, isLoading } = useMainContent();
  const location = useLocation();

  const via = location.pathname.slice(1).split("/")[0];

  class Authentication extends Component {
    handleRender(props) {
      if (!auth.authenticated) {
        if (isLoading) return <UILoadingSpinner />;
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location, via },
            }}
          />
        );
      }
      return <ComposedComponent key={location.pathname} {...props} />;
    }

    render() {
      // eslint-disable-next-line react/no-this-in-sfc
      return <Route render={this.handleRender} {...rest} />;
    }
  }

  return <Authentication />;
};

export default ProtectedRoute;
