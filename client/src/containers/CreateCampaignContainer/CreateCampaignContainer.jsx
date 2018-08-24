import React from "react";
import { connect } from "react-redux";
import { Grid } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";

import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header";
import CampaignFormA from "../../components/SingleCampaign/CampaignFormA";

import {
  fetchComponent,
  setQuery,
  setOffset,
  setCount
} from "../../actions/query-actions";

import {
  fetchCampaign,
  setCampaign,
  createCampaign,
  submitCampaign
} from "../../actions/campaign-actions";

class CreateCampaignContainer extends React.Component {
  state = {
    page: 1,
    activeKey: 1,
    isRecipientsPanelOpen: true,
    isListingPanelOpen: true,
    isListingsModalVisible: false,
    isGroupsModalVisible: false
  };

  componentDidMount() {
    const {
      match,
      location,
      fetchComponent,
      fetchCampaign,
      setContact,
      setOffset
    } = this.props;

    setCampaign({});
    setOffset(0);

    if (match.path !== "/campaigns/new") {
      fetchCampaign(match.params.id);
    }
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  render() {
    const {
      match,
      campaign,
      campaignListings,
      campaignGroups,
      createCampaign
    } = this.props;

    const { page } = this.state;

    return (
      <div>
        <Navigation />
        <BreadCrumbs />
        <Grid>
          <Header
            isVisible={true}
            componentName="Campaigns"
            headerTitle={campaign.title}
            isNew={match.path === "/contacts/new"}
          />

          <Route
            exact
            path={
              match.path === "/campaigns/new"
                ? `/campaigns/new`
                : `/campaigns/${campaign && campaign.id}`
            }
            render={routeProps => (
              <CampaignFormA
                onSubmit={values => {
                  createCampaign(values, campaignListings, campaignGroups);
                }}
              />
            )}
          />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  campaign: state.campaignReducer.campaign,
  campaignListings: state.campaignReducer.campaignListings,
  campaignGroups: state.campaignReducer.campaignGroups
});

const mapDispatchToProps = {
  createCampaign,
  submitCampaign,
  fetchComponent,
  fetchCampaign,
  setOffset,
  setCount
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateCampaignContainer
);
