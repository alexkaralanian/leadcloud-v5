import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import CreateCampaignNav from "./CreateCampaign/CreateCampaignNav";
import Header from "../../components/Header/Header-new";

import InitializeCampaign from "./CreateCampaign/InitializeCampaign";
import EditCampaign from "./CreateCampaign/EditCampaignContainer";
import CampaignWizard from "./CreateCampaign/CampaignWizard";

import { setOffset } from "../../actions/query-actions";

import {
  fetchCampaign,
  setCampaign,
  createCampaign,
  updateCampaign
} from "../../actions/campaign-actions";

class CreateCampaignContainer extends React.Component {
  state = {
    page: 1,
    activeKey: 1
  };

  componentDidMount() {
    const { match, location, fetchCampaign, setCampaign, setOffset } = this.props;

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
      createCampaign,
      updateCampaign,
      submitCampaign,
      isAuthed
    } = this.props;

    const { page } = this.state;
    const isCampaignNew = match.path === "/campaigns/new";

    return (
      <React.Fragment>
        <BreadCrumbs />

        <Header isVisible={true} componentName="Campaign" headerTitle={campaign.title} />

        {!isCampaignNew && <CreateCampaignNav push={push} campaign={campaign} />}

        {/*
          4 steps:
            1. Create campaign (title, save... then add artifacts )
            2. Review and edit content
            3. Preview template
            4. Send

            CREATE ROUTES FOR EACH STEP
        */}

        <Route
          exact
          path={isCampaignNew ? `/campaigns/new` : `/campaigns/:id`}
          render={routeProps => (
            <InitializeCampaign
              {...routeProps}
              campaign={campaign}
              onSubmit={values => {
                createCampaign(values, 2);
              }}
              isCampaignNew={isCampaignNew}
            />
          )}
        />

        <Route
          exact
          path={`/campaigns/:id/edit`}
          render={routeProps => (
            <EditCampaign
              {...routeProps}
              onSubmit={values => {
                updateCampaign(values, 3);
              }}
              campaign={campaign}
            />
          )}
        />

        <Route
          exact
          path={`/campaigns/:id/design`}
          render={routeProps => (
            <CampaignWizard
              {...routeProps}
              onSubmit={values => {
                updateCampaign(values, 3);
              }}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  campaign: state.campaignReducer.campaign
});

const mapDispatchToProps = {
  createCampaign,
  updateCampaign,
  fetchCampaign,
  setCampaign,
  setOffset,
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCampaignContainer);
