/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Switch } from "react-router-dom";

import CreateList from "./components/lists/CreateList";
import EditTask from "./components/tasks/EditTask";
import HomeContainer from "./containers/HomeContainer";
import Settings from "./components/auth/Settings";
import List from "./components/lists/List";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function Routes() {
  return (
    <Switch>
      <ProtectedRoute
        path="/"
        exact
        component={(props) => <HomeContainer {...props} />}
      />

      <ProtectedRoute
        key="/create-list"
        path="/create-list"
        component={(props) => <CreateList {...props} />}
      />
      <ProtectedRoute
        ket="/list-item"
        path="/:listId/lists"
        component={(props) => <List {...props} />}
      />
      <ProtectedRoute
        key="/edit-task"
        path="/:taskId/edit-task"
        component={(props) => <EditTask {...props} />}
      />

      <ProtectedRoute
        key="/settings"
        path="/settings"
        component={(props) => <Settings {...props} />}
      />

      <Route path="/register" render={(props) => <Register {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
    </Switch>
  );
}
