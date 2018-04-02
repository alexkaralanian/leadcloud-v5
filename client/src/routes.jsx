import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import PropTypes from "prop-types";
import { fetchUser } from "./actions/auth-actions";
import { history } from "./store";
import "./index.css";

import LandingPageContainer from "./containers/LandingPageContainer/LandingPageContainer";
import DashboardContainer from "./containers/DashboardContainer/DashboardContainer";
import ProfileContainer from "./containers/ProfileContainer/ProfileContainer";
import EmailsContainer from "./containers/EmailsContainer/EmailsContainer";
import SingleEmailContainer from "./containers/SingleEmailContainer/SingleEmailContainer";
import ContactsContainer from "./containers/ContactsContainer/ContactsContainer";
import SingleContactContainer from "./containers/SingleContactContainer/SingleContactContainer";

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
            <Route exact path="/dashboard" component={DashboardContainer} />
            <Route path="/profile" component={ProfileContainer} />
            <Route path="/emails" component={EmailsContainer} />
            <Route path="/email/:id" component={SingleEmailContainer} />
            <Route path="/contacts" component={ContactsContainer} />
            <Route path="/contact/:id" component={SingleContactContainer} />
            <Route path="/contact/new" component={SingleContactContainer} />
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

App.propTypes = {
  fetchUser: PropTypes.func.isRequired
};
