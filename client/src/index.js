import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-table/react-table.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead-bs4.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-table/react-table.css";
import "flag-icon-css/css/flag-icon.min.css";
import "font-awesome/css/font-awesome.min.css";
import "simple-line-icons/css/simple-line-icons.css";
import "./scss/style.scss";

import App from "./routes";

import "./index.css";

import store from "./store";
// Temp fix for reactstrap
import "./scss/core/_dropdown-menu-right.scss";

// import registerServiceWorker from "./registerServiceWorker";

const client = new ApolloClient({});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// if (process.env.NODE_ENV === "production") {
//   registerServiceWorker();
// }
