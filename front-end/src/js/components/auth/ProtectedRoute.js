import React, { Component } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

import { useMainContent } from "../../utils/hookUtils";

const ProtectedRoute = ({ component: ComposedComponent, ...rest }) => {
  const { auth, isLoading } = useMainContent();
  const location = useLocation();

  const via = location.pathname.slice(1).split("/")[0];

  class Authentication extends Component {
    handleRender = (props) => {
      if (!auth.authenticated) {
        if (isLoading) return <div>Loading...</div>;
        return (
          <Redirect
            to={{
              pathname: `/login`,
              state: { from: location, via: via },
            }}
          />
        );
      } else return <ComposedComponent key={location.pathname} {...props} />;
    };

    render() {
      return <Route {...rest} render={this.handleRender} />;
    }
  }

  return <Authentication />;
};

export default ProtectedRoute;
