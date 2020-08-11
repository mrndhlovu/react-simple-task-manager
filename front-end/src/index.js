import App from "./js/App";
import "./assets/scss/styles.scss";
import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
