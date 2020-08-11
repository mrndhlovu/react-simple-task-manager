import React from "react";

import styled from "styled-components";
import NavBar from "../components/navigation/NavBar";
import NavigationBar from "../components/navigation/NavigationBar";

const AppContainer = ({ children }) => {
  return (
    <div data-test-id="appContainer" className="app__container">
      <NavBar />
      <NavigationBar className="lg__screen__menu" />

      {children}
    </div>
  );
};

export default AppContainer;
