import React from "react";
import { connect } from "react-redux";
import { Button, Col, Row, Collapse, Card, CardTitle, CardHeader, CardBody } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015

import { setOffset, fetchComponent } from "../../actions/query-actions";
import { setListings } from "../../actions/listing-actions";
import { createCampaign, updateCampaign } from "../../actions/campaign-actions";

import {
  setDiffedCampaignListings,
  searchDiffedCampaignListings,
  submitCampaignListings,
  deleteCampaignListing
} from "../../actions/campaign-listings-actions";

import "./CreateCampaign.scss";

class CampaignContent extends React.Component {
  state = {
    isListingsPanelOpen: false,
    isListingsModalVisible: false
  };

  componentDidMount() {
    this.props.setOffset(0);
    this.props.fetchComponent("listings", [], setListings, null, null);
  }

  // LISTINGS
  displayListingsPanel = () => {
    this.setState({ isListingsPanelOpen: !this.state.isListingsPanelOpen });
  };

  submitListings = selected => {
    this.props.submitCampaignListings(selected);
  };

  render() {
    const { campaign, listings, campaignGroups, campaignListings } = this.props;
    return (
      <Col sm={12} md={12}>
        <Card>
          <CardBody>
            <CardTitle className="mb-0">
              <i className="fa fa-users mr-2" />
              <span>CONTENT:</span>
              <Button className="floatRight" color="primary" onClick={this.displayListingsPanel}>
                Add Content
              </Button>
            </CardTitle>
            <Collapse isOpen={this.state.isListingsPanelOpen}>
              <div className="margin-top-2">
                <Typeahead
                  clearButton
                  multiple
                  placeholder="Choose listing(s)..."
                  onChange={selected => {
                    console.log("SELECTED", selected);
                  }}
                  options={listings}
                  labelKey="address"
                />
              </div>
              <Button className="margin-top-2 floatRight">Save</Button>
            </Collapse>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  listings: state.listingReducer.listings,
  campaign: state.campaignReducer.campaign,
  campaignListings: state.campaignReducer.campaignListings
});

const mapDispatchToProps = {
  createCampaign,
  submitCampaignListings,
  deleteCampaignListing,
  searchDiffedCampaignListings,
  setOffset,
  fetchComponent
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignContent);
