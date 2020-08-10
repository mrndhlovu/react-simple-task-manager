"use es6";

import React from "react";
import { Route, Switch } from "react-router-dom";

import HomeContainer from "./containers/HomeContainer";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact={true} component={HomeContainer} />
    </Switch>
  );
}
