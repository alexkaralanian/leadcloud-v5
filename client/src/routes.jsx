import React from "react";
import Loadable from "react-loadable";
import Loading from "./components/Loading/Loading";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import { ConnectedRouter } from "react-router-redux";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { fetchUser } from "./actions/auth-actions";
import CalendarContainer from "./containers/CalendarContainer/CalendarContainer";
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

const Profile = Loadable({
  loader: () => import("./containers/ProfileContainer/ProfileContainer"),
  loading: Loading
});

const Emails = Loadable({
  loader: () => import("./containers/EmailsContainer/EmailsContainer"),
  loading: Loading
});

const Listings = Loadable({
  loader: () => import("./containers/ListingsContainer/ListingsContainer"),
  loading: Loading
});

const SingleListing = Loadable({
  loader: () => import("./containers/SingleListingContainer/SingleListingContainer"),
  loading: Loading
});

const OpenHouse = Loadable({
  loader: () => import("./containers/OpenHouseContainer/OpenHouseContainer"),
  loading: Loading
});

const Campaigns = Loadable({
  loader: () => import("./containers/CampaignsContainer/CampaignsContainer"),
  loading: Loading
});

const CreateCampaign = Loadable({
  loader: () => import("./containers/CreateCampaignContainer/CreateCampaignContainer"),
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
                    <Route path="/listings/new" component={SingleListing} />
                    <Route path="/listings/:id" component={SingleListing} />
                    <Route exact path="/listings/:id/openhouse" component={OpenHouse} />
                    <Route exact path="/groups" component={Groups} />
                    <Route path="/groups/new" component={Group} />
                    <Route path="/groups/:id" component={Group} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  fetchUser: PropTypes.func.isRequired
};
