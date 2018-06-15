import React from "react";
import { connect } from "react-redux";

import Navigation from "../NavContainer/NavContainer";
import CampaignFormA from "../../components/SingleCampaign/CampaignFormA";
import CampaignFormB from "../../components/SingleCampaign/CampaignFormB";
import CampaignFormC from "../../components/SingleCampaign/CampaignFormC";

import {
  searchCampaignListings,
  submitCampaignListing,
  deleteCampaignListing
} from "../../actions/campaign-listings-actions";

class SingleCampaignContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.submitCampaignForm = this.submitCampaignForm.bind(this);
  }

  componentDidMount() {}

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
  submitCampaignForm(values) {
    // console.log("VALUES", values);
    // console.log("LISTINGS", this.props.campaignListings);
  }

  render() {
    const {
      campaign,
      campaignListings,
      searchCampaignListings,
      campaignListingsSearchResults
    } = this.props;

    const { page } = this.state;
    return (
      <div>
        <Navigation />
        <div>
          {page === 1 && (
            <CampaignFormA
              campaign={campaign}
              searchCampaignListings={searchCampaignListings}
              campaignListings={campaignListings}
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
              // groups={groups}
              // listings={listings}
              campaign={campaign}
              // campaignGroups={campaignGroups}
              // campaignGroupsSearchResults={campaignGroupsSearchResults}
              // addCampaignGroup={addCampaignGroup}
              // deleteCampaignGroup={deleteCampaignGroup}
              nextPage={this.nextPage}
              prevPage={this.previousPage}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
  listings: state.listingReducer.listings,
  campaignListings: state.campaignReducer.campaignListings,
  campaignGroups: state.campaignReducer.campaignGroups,
  campaignListingsSearchResults:
    state.campaignReducer.campaignListingsSearchResults,
  campaignGroupsSearchResults: state.campaignReducer.campaignGroupsSearchResults
});

const mapDispatchToProps = {
  searchCampaignListings
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleCampaignContainer
);
