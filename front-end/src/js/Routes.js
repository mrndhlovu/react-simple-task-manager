"use es6";

import React from "react";
import { Route, Switch } from "react-router-dom";

import CreateList from "./components/CreateList";
import EditTask from "./components/tasks/EditTask";
import HomeContainer from "./containers/HomeContainer";
import Settings from "./components/auth/Settings";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact={true} component={HomeContainer} />
      <Route path="/create-list" component={CreateList} />
      <Route path="/lists/:listId" component={Settings} />
      <Route path="/edit-task/:taskId" component={EditTask} />
      <Route path="/settings" component={Settings} />
    </Switch>
  );
}
