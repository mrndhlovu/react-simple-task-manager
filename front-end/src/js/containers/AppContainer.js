import React from "react";

import NavBar from "../components/navigation/NavBar";
import NavigationBar from "../components/navigation/NavigationBar";
import { MainContext } from "../utils/contextUtils";

const AppContainer = ({ children }) => {
  const handleLogout = () => {};

  const CONTEXT = {
    handleLogout,
  };

  return (
    <MainContext.Provider value={CONTEXT}>
      <div data-test-id="appContainer" className="app__container">
        <NavBar />
        <NavigationBar className="lg__screen__menu" />
        <div className="content__container">{children}</div>
      </div>
    </MainContext.Provider>
  );
};

export default AppContainer;
