import React from "react";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";
import CampaignFormA from "../../components/SingleCampaign/CampaignFormA";
import CampaignFormB from "../../components/SingleCampaign/CampaignFormB";
import CampaignFormC from "../../components/SingleCampaign/CampaignFormC";

import { fetchGroups } from "../../actions/group-actions";
import { fetchListings, searchListings } from "../../actions/listing-actions";

import {
  addCampaignListing,
  deleteCampaignListing
} from "../../actions/campaign-actions";

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

  componentDidMount() {
    this.props.fetchGroups();
    this.props.fetchListings();
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
  submitCampaignForm(values) {
    console.log("VALUES", values);
    console.log("LISTINGS", this.props.campaignListings);
  }

  render() {
    const {
      groups,
      listings,
      campaign,
      campaignListings,
      addCampaignListing,
      deleteCampaignListing,
      searchListings,
      searchListingsResults
    } = this.props;

    const { page } = this.state;
    return (
      <div>
        <Navigation />
        <div>
          {page === 1 && (
            <CampaignFormA
              // onSubmit={values => {
              //   this.submitCampaignForm(values);
              // }}
              groups={groups}
              listings={listings}
              campaign={campaign}
              campaignListings={campaignListings}
              addCampaignListing={addCampaignListing}
              deleteCampaignListing={deleteCampaignListing}
              searchListings={searchListings}
              searchListingsResults={searchListingsResults}
              nextPage={this.nextPage}
            />
          )}

          {page === 2 && (
            <CampaignFormB
              groups={groups}
              listings={listings}
              campaign={campaign}
              campaignListings={campaignListings}
              addCampaignListing={addCampaignListing}
              deleteCampaignListing={deleteCampaignListing}
              searchListings={searchListings}
              searchListingsResults={searchListingsResults}
              nextPage={this.nextPage}
              previousPage={this.previousPage}
            />
          )}

          {page === 3 && (
            <CampaignFormC
              groups={groups}
              listings={listings}
              campaign={campaign}
              campaignListings={campaignListings}
              addCampaignListing={addCampaignListing}
              deleteCampaignListing={deleteCampaignListing}
              searchListings={searchListings}
              searchListingsResults={searchListingsResults}
              nextPage={this.nextPage}
              previousPage={this.previousPage}
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
  campaignListings: state.campaignReducer.campaignListings
});

const mapDispatchToProps = {
  fetchGroups,
  fetchListings,
  addCampaignListing,
  deleteCampaignListing,
  searchListings
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleCampaignContainer
);
