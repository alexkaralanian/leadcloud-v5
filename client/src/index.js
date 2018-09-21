import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// import "flag-icon-css/css/flag-icon.min.css";

// import "font-awesome/css/font-awesome.min.css";

// import "simple-line-icons/css/simple-line-icons.css";

import "./scss/style.scss";
// Temp fix for reactstrap
// import "../scss/core/_dropdown-menu-right.scss";

import store from "./store";
import App from "./routes";

// import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// if (process.env.NODE_ENV === "production") {
//   registerServiceWorker();
// }
