import React from "react";
import { connect } from "react-redux";
import { Grid } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header";

import CampaignFormA from "../../components/SingleCampaign/CampaignFormA";
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

  displayListingPanel = () => {
    this.setState({ isListingPanelOpen: !this.state.isListingPanelOpen });
  };

  displayRecipientsPanel = () => {
    this.setState({ isRecipientsPanelOpen: !this.state.isRecipientsPanelOpen });
  };

  displayModalFuncA = bool => {
    const {
      setModalVisibility,
      isModalVisible,
      setCampaignListings
    } = this.props;

    setModalVisibility(bool);
  };

  // submitCampaignForm(values) {
  //   this.props.submitCampaign(
  //     values,
  //     this.props.campaignListings,
  //     this.props.campaignGroups
  //   );
  // }

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
        <div>
          {page === 1 && (
            <CampaignFormA
              displayModalFuncA={this.displayModalFuncA}
              setModalVisibility={setModalVisibility}
              isModalVisible={isModalVisible}
              isListingPanelOpen={this.state.isListingPanelOpen}
              isRecipientsPanelOpen={this.state.isRecipientsPanelOpen}
              displayListingPanel={this.displayListingPanel}
              displayRecipientsPanel={this.displayRecipientsPanel}
              campaignListings={campaignListings}
              campaign={campaign}
              submitCampaignListings={submitCampaignListings}
              deleteCampaignListing={deleteCampaignListing}
              nextPage={this.nextPage}
            />
          )}
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
