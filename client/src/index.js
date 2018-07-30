import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import "materialize-css/dist/css/materialize.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import store from "./store";
import App from "./routes";

// import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// registerServiceWorker();
