import React from "react";
import { connect } from "react-redux";
import { BroweserRouter, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { fetchUser } from "./actions/auth-actions";
import { history } from "./store";
import "./index.css";

import LandingPageContainer from "./containers/LandingPageContainer/LandingPageContainer";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPageContainer} />
            <Route
              render={() => (
                <div>
                  <p>NOT FOUND!</p>
                </div>
              )}
            />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
