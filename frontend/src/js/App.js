import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import AppContainer from "./containers/AppContainer";
import BaseRouter from "./Routes";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer>
        <BaseRouter />
      </AppContainer>
    </BrowserRouter>
  </Provider>
);

export default App;
