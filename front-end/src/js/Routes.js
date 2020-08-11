"use es6";

import React from "react";
import { Route, Switch } from "react-router-dom";

import HomeContainer from "./containers/HomeContainer";
import CreateList from "./components/CreateList";
import Settings from "./components/auth/Settings";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact={true} component={HomeContainer} />
      <Route path="/create-list" component={CreateList} />
      <Route path="/lists/:listId" component={Settings} />
      <Route path="/settings" component={Settings} />
    </Switch>
  );
}
