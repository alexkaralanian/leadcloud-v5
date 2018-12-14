import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Grid } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";

import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import CreateCampaignNav from "../../components/SingleCampaign/CreateCampaignNav";
import Header from "../../components/Header/Header-old";
import CampaignFormA from "../../components/SingleCampaign/CampaignFormA";
import CampaignFormB from "../../components/SingleCampaign/CampaignFormB";
import CampaignFormC from "../../components/SingleCampaign/CampaignFormC";

import { fetchComponent, setQuery, setOffset, setCount } from "../../actions/query-actions";

import {
  fetchCampaign,
  setCampaign,
  createCampaign,
  updateCampaign,
  submitCampaign
} from "../../actions/campaign-actions";

class CreateCampaignContainer extends React.Component {
  state = {
    page: 1,
    activeKey: 1
  };

  componentDidMount() {
    const { match, location, fetchComponent, fetchCampaign, setContact, setOffset } = this.props;

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
      push,
      campaign,
      campaignListings,
      campaignGroups,
      createCampaign,
      updateCampaign,
      submitCampaign,
      isAuthed
    } = this.props;

    const { page } = this.state;

    return (
      <React.Fragment>
        <BreadCrumbs />
        <div>
          <Header
            isVisible={true}
            componentName="Campaigns"
            headerTitle={campaign.title}
            isNew={match.path === "/campaigns/new"}
          />

          {match.path !== "/campaigns/new" && <CreateCampaignNav push={push} campaign={campaign} />}

          <Route
            exact
            path={match.path === "/campaigns/new" ? `/campaigns/new` : `/campaigns/${campaign.id}`}
            render={routeProps => (
              <CampaignFormA
                onSubmit={values => {
                  match.path === "/campaigns/new"
                    ? createCampaign(values, campaignListings, campaignGroups)
                    : updateCampaign(values, campaignListings, campaignGroups, 2);
                }}
              />
            )}
          />

          <Route
            exact
            path={`/campaigns/${campaign.id}/edit`}
            render={routeProps => (
              <CampaignFormB
                onSubmit={values => {
                  submitCampaign(values);
                }}
                updateCampaign={updateCampaign}
                campaign={campaign}
                prevPage={this.previousPage}
              />
            )}
          />

          {/*<Route
            exact
            path={`/campaigns/${campaign.id}/review`}
            render={routeProps => (
              <CampaignFormC
                onSubmit={values => {
                  createCampaign(values, campaignListings, campaignGroups);
                }}
                campaign={campaign}
                prevPage={this.previousPage}
                onSubmit={values => {
                  console.log("CAMPAIGN FORM C SUBMITTED", values);
                }}
              />
            )}
          />*/}
        </div>
      </React.Fragment>
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
  updateCampaign,
  submitCampaign,
  fetchComponent,
  fetchCampaign,
  setOffset,
  setCount,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampaignContainer);
