import React from "react";
import Loadable from "react-loadable";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { fetchUser } from "./actions/auth-actions";
import { history } from "./store";
import "./index.css";

// import iFrameContainer from "./containers/SingleEmailContainer/iFrameContainer";

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

const iFrameContainer = Loadable({
  loader: () => import("./containers/SingleEmailContainer/iFrameContainer"),
  loading: Loading
});

const Contacts = Loadable({
  loader: () => import("./containers/ContactsContainer/ContactsContainer"),
  loading: Loading
});

const SingleContact = Loadable({
  loader: () =>
    import("./containers/SingleContactContainer/SingleContactContainer"),
  loading: Loading
});

const Listings = Loadable({
  loader: () => import("./containers/ListingsContainer/ListingsContainer"),
  loading: Loading
});

const SingleListing = Loadable({
  loader: () =>
    import("./containers/SingleListingContainer/SingleListingContainer"),
  loading: Loading
});

const OpenHouse = Loadable({
  loader: () => import("./containers/OpenHouseContainer/OpenHouseContainer"),
  loading: Loading
});

const Groups = Loadable({
  loader: () =>
    import("./containers/GroupsDashboardContainer/GroupsDashboardContainer"),
  loading: Loading
});

const SingleGroup = Loadable({
  loader: () =>
    import("./containers/SingleGroupContainer/SingleGroupContainer"),
  loading: Loading
});

const GroupContacts = Loadable({
  loader: () =>
    import("./containers/GroupContactsContainer/GroupContactsContainer"),
  loading: Loading
});

const Campaigns = Loadable({
  loader: () => import("./containers/CampaignsContainer/CampaignsContainer"),
  loading: Loading
});

const CreateCampaign = Loadable({
  loader: () =>
    import("./containers/CreateCampaignContainer/CreateCampaignContainer"),
  loading: Loading
});

const SingleCampaign = Loadable({
  loader: () =>
    import("./containers/SingleCampaignContainer/SingleCampaignContainer"),
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
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route path="/emails" component={Emails} />
            <Route path="/email/:id" component={SingleEmail} />
            <Route path="/iframecontainer" component={iFrameContainer} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/contact/:id" component={SingleContact} />
            <Route path="/contact/new" component={SingleContact} />
            <Route path="/listings" component={Listings} />
            <Route path="/listing/:id" component={SingleListing} />
            <Route path="/openhouse/:listingId" component={OpenHouse} />
            <Route path="/groups" component={Groups} />
            <Route path="/group/:id" component={SingleGroup} />
            {/*<Route exact path="/group/:id/contacts" component={GroupContacts} />*/}
            <Route exact path="/group/new" component={SingleGroup} />
            <Route path="/campaigns" component={Campaigns} />
            {/*<Route path="/campaign/:id" component={SingleCampaign} />*/}
            <Route path="/campaign/new" component={CreateCampaign} />
            <Route path="/campaign/:id" component={SingleCampaign} />
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
