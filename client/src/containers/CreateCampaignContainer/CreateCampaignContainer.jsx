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
import CampaignFormA from "../../components/CreateCampaign/CampaignFormA";
import CampaignFormAContainer from "../../components/CreateCampaign/CampaignFormA_Container";
import CampaignFormB from "../../components/CreateCampaign/CampaignFormB";
import CampaignFormC from "../../components/CreateCampaign/CampaignFormC";

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

  // stepOne = values => {
  //   const { createCampaign } = this.props;
  //   createCampaign(values, 2);
  // };

  // createCampaign = values => {
  //   const { createCampaign, push } = this.props;
  //   updateCampaign(values, 2);
  //   push;
  // };

  // submit = (...args) => {
  //   console.log("SUBMIT CALLED");
  //   const { page } = this.state;
  //   if (page === 1) this.stepOne(...args);
  //   // if (page === 2) this.stepTwo(...args);
  // };

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
    console.log("CAMPAIGN", campaign);

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

        {// Create email title....
        !campaign.step && (
          <CampaignFormA
            campaign={campaign}
            onSubmit={values => {
              createCampaign(values, 2);
            }}
            isCampaignNew={isCampaignNew}
          />
        )}

        {// Create email title....
        campaign.step >= 2 && (
          <CampaignFormAContainer
            onSubmit={values => {
              updateCampaign(values, 3);
            }}
            campaign={campaign}
          />
        )}

        {/*campaign.step >= 3 && (
          <CampaignFormC
            onSubmit={values => {
              updateCampaign(values, 3);
            }}
            campaign={campaign}
          />
        )*/}

        {/*
            4 steps:
              1. Create campaign (title, save... then add artifacts )
              2. Review and edit content
              3. Preview template
              4. Send
          */}

        {/*<Route
            exact
            path={isCampaignNew ? `/campaigns/new` : `/campaigns/${campaign.id}`}
            render={routeProps => (

            )}
          />*/}

        {/*<Route
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
          />*/}
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
