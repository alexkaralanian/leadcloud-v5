import React from "react";
import Loadable from "react-loadable";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { ConnectedRouter } from "react-router-redux";

import Loading from "./components/Loading/Loading";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import CalendarContainer from "./containers/CalendarContainer/CalendarContainer";

import { fetchUser } from "./actions/auth-actions";
import { history } from "./store";

const LandingPage = Loadable({
  loader: () => import("./containers/LandingPageContainer/LandingPageContainer"),
  loading: Loading
});

const Dashboard = Loadable({
  loader: () => import("./containers/DashboardContainer/DashboardContainer"),
  loading: Loading
});

const Contacts = Loadable({
  loader: () => import("./components/Contacts/ContactsDashboard"),
  loading: Loading
});

const Contact = Loadable({
  loader: () => import("./components/Contacts/ContactDashboard"),
  loading: Loading
});

const Groups = Loadable({
  loader: () => import("./components/Groups/GroupsDashboard"),
  loading: Loading
});

const Group = Loadable({
  loader: () => import("./components/Groups/GroupDashboard"),
  loading: Loading
});

const Listings = Loadable({
  loader: () => import("./components/Listings/ListingsDashboard"),
  loading: Loading
});

const Listing = Loadable({
  loader: () => import("./components/Listings/ListingDashboard"),
  loading: Loading
});

const OpenHouse = Loadable({
  loader: () => import("./components/Listings/OpenHouse/OpenHouseContainer"),
  loading: Loading
});

import Events from "./components/Events/Events";

// const Events = Loadable({
//   loader: () => import("./components/Events/Events"),
//   loading: Loading
// });

const Profile = Loadable({
  loader: () => import("./containers/ProfileContainer/ProfileContainer"),
  loading: Loading
});

const Emails = Loadable({
  loader: () => import("./containers/EmailsContainer/EmailsContainer"),
  loading: Loading
});

const Campaigns = Loadable({
  loader: () => import("./components/Campaigns/CampaignsDashboard"),
  loading: Loading
});

const CreateCampaign = Loadable({
  loader: () => import("./components/Campaigns/CreateCampaignContainer"),
  loading: Loading
});

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { isAuthed } = this.props;
    return (
      <div>
        <ConnectedRouter history={history}>
          <div className="app">
            {isAuthed && <Header />}
            <div className="app-body">
              {isAuthed && <Sidebar {...this.props} />}
              <main className="main">
                <Container fluid>
                  <Switch>
                    <Route path="/auth" component={LandingPage} />
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/calendar" component={CalendarContainer} />
                    <Route path="/emails" component={Emails} />
                    <Route exact path="/contacts" component={Contacts} />
                    <Route path="/contacts/new" component={Contact} />
                    <Route path="/contacts/:id" component={Contact} />
                    <Route exact path="/listings" component={Listings} />
                    <Route path="/listings/new" component={Listing} />
                    <Route path="/listings/:id" component={Listing} />
                    <Route exact path="/listings/:id/openhouse" component={OpenHouse} />
                    <Route exact path="/groups" component={Groups} />
                    <Route path="/groups/new" component={Group} />
                    <Route path="/groups/:id" component={Group} />
                    <Route exact path="/events" component={Events} />
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
        </ConnectedRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  isFetching: state.authReducer.isFetching
});

const mapDispatchToProps = {
  fetchUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

App.propTypes = {
  fetchUser: PropTypes.func.isRequired
};
