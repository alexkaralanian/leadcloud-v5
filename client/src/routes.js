import React from "react";
import { connect } from "react-redux";
import { BroweserRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

import { ConnectedRouter } from "react-router-redux";
import { fetchUser } from "./actions/auth-actions";
import { history } from "./store";
import "./index.css";

import iFrameContainer from "./containers/SingleEmailContainer/iFrameContainer";
import Email from "./components/SingleEmail/SingleEmail";
import Loading from "./components/Loading/Loading";

const LandingPage = Loadable({
  loader: () =>
    import("./containers/LandingPageContainer/LandingPageContainer"),
  loading: Loading
});

const Dashboard = Loadable({
  loader: () => import("./containers/DashboardContainer/DashboardContainer"),
  loading: Loading
});

const Profile = Loadable({
  loader: () => import("./containers/ProfileContainer/ProfileContainer"),
  loading: Loading
});

const Emails = Loadable({
  loader: () => import("./containers/EmailsContainer/EmailsContainer"),
  loading: Loading
});

const SingleEmail = Loadable({
  loader: () =>
    import("./containers/SingleEmailContainer/SingleEmailContainer"),
  loading: Loading
});

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route path="/emails" component={Emails} />
            <Route path="/email/:id" component={SingleEmail} />
            <Route path="/iframecontainer" component={iFrameContainer} />
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
