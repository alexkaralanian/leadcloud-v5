import React from "react";
import { connect } from "react-redux";

import Navigation from "../NavContainer/NavContainer";
import CampaignFormA from "../../components/SingleCampaign/CampaignFormA";
import CampaignFormB from "../../components/SingleCampaign/CampaignFormB";
import CampaignFormC from "../../components/SingleCampaign/CampaignFormC";
import SingleCampaign from "../../components/SingleCampaign/SingleCampaign";

import {
  searchCampaignListings,
  submitCampaignListing,
  deleteCampaignListing
} from "../../actions/campaign-listings-actions";

import { fetchGroups } from "../../actions/group-actions";

import { submitCampaign } from "../../actions/campaign-actions";

import {
  // searchCampaignGroups,
  submitCampaignGroup,
  deleteCampaignGroup
} from "../../actions/campaign-groups-actions";

class CreateCampaignContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    // this.submitCampaignForm = this.submitCampaignForm.bind(this);
  }

  componentDidMount() {
    const { fetchGroups, groups, limit, offset, query } = this.props;
    fetchGroups(groups, limit, offset, query);
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

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
      searchCampaignListings,
      campaignListingsSearchResults,

      groups,
      campaignGroups,
      // searchCampaignGroups,
      campaignGroupsSearchResults,
      submitCampaign
    } = this.props;

    const { page } = this.state;

    return (
      <React.Fragment>
        <Navigation />
        <div>
          {page === 1 && (
            <CampaignFormA
              campaignListings={campaignListings}
              campaign={campaign}
              searchCampaignListings={searchCampaignListings}
              campaignListingsSearchResults={campaignListingsSearchResults}
              submitCampaignListing={submitCampaignListing}
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
        )
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
  limit: state.groupReducer.limit,
  offset: state.groupReducer.offset,
  query: state.groupReducer.query,

  campaignListings: state.campaignReducer.campaignListings,
  campaignGroups: state.campaignReducer.campaignGroups,
  campaignListingsSearchResults:
    state.campaignReducer.campaignListingsSearchResults
  // campaignGroupsSearchResults: state.campaignReducer.campaignGroupsSearchResults
});

const mapDispatchToProps = {
  fetchGroups,
  searchCampaignListings,
  submitCampaign
  // searchCampaignGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateCampaignContainer
);
