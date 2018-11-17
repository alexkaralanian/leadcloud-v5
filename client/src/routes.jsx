import React from "react";
import Loadable from "react-loadable";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { Container } from "reactstrap";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { history } from "./store";
import { fetchUser } from "./actions/auth-actions";

// import iFrameContainer from "./containers/SingleEmailContainer/iFrameContainer";

import CalendarContainer from "./containers/CalendarContainer/CalendarContainer";

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

const Calendar = Loadable({
  loader: () => import("./containers/CalendarContainer/CalendarContainer"),
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
    const { isAuthed } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div>
          <Route path="/iframecontainer" component={iFrameContainer} />
          <div className="app">
            <Header />
            <div className="app-body">
              <Sidebar {...this.props} />
              <main className="main">
                <Container fluid>
                  <Switch>
                    <Route path="/auth" component={LandingPage} />
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/calendar" component={CalendarContainer} />
                    <Route exact path="/emails" component={Emails} />
                    <Route path="/emails/:id" component={SingleEmail} />
                    <Route exact path="/contacts" component={Contacts} />
                    <Route path="/contacts/new" component={SingleContact} />
                    <Route path="/contacts/:id" component={SingleContact} />
                    <Route exact path="/listings" component={Listings} />
                    <Route path="/listings/new" component={SingleListing} />
                    <Route path="/listings/:id" component={SingleListing} />
                    <Route
                      exact
                      path="/listings/:id/openhouse"
                      component={OpenHouse}
                    />
                    <Route exact path="/groups" component={Groups} />
                    <Route path="/groups/new" component={SingleGroup} />
                    <Route path="/groups/:id" component={SingleGroup} />
                    <Route exact path="/campaigns" component={Campaigns} />
                    <Route path="/campaigns/new" component={CreateCampaign} />
                    <Route path="/campaigns/:id" component={CreateCampaign} />
                    )
                    <Route
                      render={() => (
                        <div>
                          <p>NOT FOUND!</p>
                        </div>
                      )}
                    />
                  </Switch>
                </Container>
              </main>
            </div>
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed
});

const mapDispatchToProps = {
  fetchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  fetchUser: PropTypes.func.isRequired
};
