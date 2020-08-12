"use es6";

import React from "react";
import { Route, Switch } from "react-router-dom";

import CreateList from "./components/lists/CreateList";
import EditTask from "./components/tasks/EditTask";
import HomeContainer from "./containers/HomeContainer";
import Settings from "./components/auth/Settings";
import List from "./components/lists/List";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact={true} component={HomeContainer} />
      <Route path="/create-list" component={CreateList} />
      <Route path="/edit-task/:taskId" component={EditTask} />
      <Route path="/lists/:listId" component={List} />
      <Route path="/settings" component={Settings} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
}
