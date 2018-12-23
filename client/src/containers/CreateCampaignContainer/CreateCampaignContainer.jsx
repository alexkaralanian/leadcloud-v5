import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import {
  Form,
  FormGroup,
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";

import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import CreateCampaignNav from "../../components/CreateCampaign/CreateCampaignNav";
import Header from "../../components/Header/Header-old";

import InitializeCampaign from "../../components/CreateCampaign/InitializeCampaign";
import EditCampaign from "../../components/CreateCampaign/EditCampaignContainer";

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
    const isCampaignNew = match.path === "/campaigns/new";

    return (
      <React.Fragment>
        <BreadCrumbs />

        <Header
          isVisible={true}
          componentName="Campaign"
          headerTitle={campaign.title}
          isNew={!campaign.step}
        />

        {!campaign.step && <CreateCampaignNav push={push} campaign={campaign} />}

        {/*
          4 steps:
            1. Create campaign (title, save... then add artifacts )
            2. Review and edit content
            3. Preview template
            4. Send

            CREATE ROUTES FOR EACH STEP
        */}

        {// Create Campaign / persist initial data
        !campaign.step && (
          <InitializeCampaign
            campaign={campaign}
            onSubmit={values => {
              createCampaign(values, 2);
            }}
            isCampaignNew={isCampaignNew}
          />
        )}

        {// Add Sender, Recipients, Subject, Content...
        campaign.step === 2 && (
          <EditCampaign
            onSubmit={values => {
              updateCampaign(values, 3);
            }}
            campaign={campaign}
          />
        )}

        {/*<Route
            exact
            path={isCampaignNew ? `/campaigns/new` : `/campaigns/${campaign.id}`}
            render={routeProps => (

            )}
          />*/}
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
  submitCampaign,
  fetchComponent,
  fetchCampaign,
  setOffset,
  setCount,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCampaignContainer);
