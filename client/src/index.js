import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./routes";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("main")
);

// NEED TO GET REACT TO READ YOUR ENV VARIABLES...
console.log("STRIPE KEY", process.env.STRIPE_PUBLISHABLE_KEY);
console.log("ENVIRONMENT", process.env.NODE_ENV);
