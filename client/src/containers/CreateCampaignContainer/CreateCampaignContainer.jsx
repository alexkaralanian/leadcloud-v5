import React from "react";
import { connect } from "react-redux";
import { Grid } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header";

import CampaignFormA_Container from "../../components/SingleCampaign/CampaignFormA_Container";
import CampaignFormB from "../../components/SingleCampaign/CampaignFormB";
import CampaignFormC from "../../components/SingleCampaign/CampaignFormC";
import SingleCampaign from "../../components/SingleCampaign/SingleCampaign";

import {
  fetchComponent,
  setCount,
  setOffset
} from "../../actions/query-actions";

import { setGroups, clearGroups } from "../../actions/group-actions";

import {
  submitCampaignListings,
  deleteCampaignListing
} from "../../actions/campaign-listings-actions";

import { submitCampaign } from "../../actions/campaign-actions";
import {
  // searchCampaignGroups,
  submitCampaignGroup,
  deleteCampaignGroup
} from "../../actions/campaign-groups-actions";

import { setModalVisibility } from "../../actions/modal-actions";

class CreateCampaignContainer extends React.Component {
  state = {
    page: 1,
    isRecipientsPanelOpen: true,
    isListingPanelOpen: true,
    isListingsModalVisible: false,
    isGroupsModalVisible: false
  };

  componentDidMount() {
    const { fetchComponent, groups } = this.props;
    fetchComponent("groups", [], setGroups, null, null);
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  // displayListingPanel = () => {
  //   this.setState({ isListingPanelOpen: !this.state.isListingPanelOpen });
  // };

  // displayRecipientsPanel = () => {
  //   this.setState({ isRecipientsPanelOpen: !this.state.isRecipientsPanelOpen });
  // };

  // displayModalFuncA = bool => {
  //   const {
  //     setModalVisibility,
  //     isModalVisible,
  //     setCampaignListings
  //   } = this.props;

  //   setModalVisibility(bool);
  // };

  // displayListingsModal = () => {
  //   this.setState({
  //     isListingsModalVisible: true
  //   });
  // };

  // submitListings = (selected, hostId) => {
  //   this.props.submitCampaignListings(selected, hostId);
  //   this.setState({
  //     isListingsModalVisible: false
  //   });
  // };

  // onListingsModalExit = () => {
  //   this.setState({
  //     isListingsModalVisible: false
  //   });
  // };

  // displayGroupsModal = () => {
  //   this.setState({
  //     isGroupsModalVisible: true
  //   });
  // };

  // onGroupsModalExit = () => {
  //   this.setState({
  //     isGroupsModalVisible: false
  //   });
  // };

  // submitGroups = (selected, hostId) => {
  //   this.props.submitCampaignGroups(selected, hostId);
  //   this.setState({
  //     isGroupsModalVisible: false
  //   });
  // };

  render() {
    const {
      campaign,
      campaignListings,
      campaignListingsSearchResults,

      groups,
      campaignGroups,
      // searchCampaignGroups,
      campaignGroupsSearchResults,
      submitCampaign,

      setModalVisibility,
      isModalVisible
    } = this.props;

    const { page } = this.state;

    return (
      <React.Fragment>
        <Navigation />
        <BreadCrumbs />
        <Grid>
          <Header
            isVisible={true}
            componentName="campaigns"
            headerTitle="New Campaign"
            isNew={null}
          />

          {page === 1 && <CampaignFormA_Container nextPage={this.nextPage} />}
        </Grid>
        <div>
          {page === 2 && (
            <CampaignFormB
              campaign={campaign}
              campaignListings={campaignListings}
              nextPage={this.nextPage}
              prevPage={this.previousPage}
            />
          )}
          {page === 3 && (
            <CampaignFormC
              campaign={campaign}
              groups={groups}
              campaignGroups={campaignGroups}
              // searchCampaignGroups={searchCampaignGroups}
              // campaignGroupsSearchResults={campaignGroupsSearchResults}
              submitCampaignGroup={submitCampaignGroup}
              deleteCampaignGroup={deleteCampaignGroup}
              nextPage={this.nextPage}
              prevPage={this.previousPage}
              // onSubmit={values => {
              //   this.submitCampaignForm(values);
              // }}
              onSubmit={values => {
                submitCampaign(values, campaignListings, campaignGroups);
              }}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
  campaignListings: state.campaignReducer.campaignListings,
  campaignGroups: state.campaignReducer.campaignGroups,
  campaignListingsSearchResults:
    state.campaignReducer.campaignListingsSearchResults,
  isModalVisible: state.modalReducer.isModalVisible
  // campaignGroupsSearchResults: state.campaignReducer.campaignGroupsSearchResults
});

const mapDispatchToProps = {
  submitCampaign,
  fetchComponent,
  setModalVisibility,
  setOffset,
  setCount
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateCampaignContainer
);
