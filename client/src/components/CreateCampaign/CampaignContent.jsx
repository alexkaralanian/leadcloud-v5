import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Col, Row, Collapse, Card, CardTitle, CardHeader, CardBody } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import { push } from "react-router-redux";

import { setOffset, fetchComponent } from "../../actions/query-actions";
import { setListings } from "../../actions/listing-actions";
import { createCampaign, updateCampaign } from "../../actions/campaign-actions";

import {
  setDiffedCampaignListings,
  searchDiffedCampaignListings,
  submitCampaignListings,
  deleteCampaignListing
} from "../../actions/campaign-listings-actions";

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
    const { campaign, listings, updateCampaign, push } = this.props;
    return (
      <Col sm={12} md={12}>
        <Card>
          <CardBody>
            <CardTitle className="mb-0">
              <i className="fa fa-users mr-2" />
              <span>CONTENT:</span>
              {!this.state.isListingsPanelOpen && (
                <Button className="floatRight" color="primary" onClick={this.displayListingsPanel}>
                  Add Content
                </Button>
              )}
            </CardTitle>
            <Collapse isOpen={this.state.isListingsPanelOpen}>
              <div className="margin-top-2">
                <h5>Add Listings</h5>
                <div>Listings content will automatically generate in your email template</div>
                <Typeahead
                  clearButton
                  multiple
                  placeholder="Choose listing(s)..."
                  selected={this.state.selected}
                  defaultSelected={campaign.listings || []}
                  onChange={selected => {
                    this.setState({ selected });
                  }}
                  options={listings}
                  labelKey="address"
                />
              </div>
              <Button
                className="margin-top-2 floatRight"
                onClick={() => {
                  campaign.listings = this.state.selected;
                  updateCampaign(campaign);
                  // this.setState({
                  //   isListingsPanelOpen: false
                  // });
                }}
              >
                Save
              </Button>
              <Button href={`/campaigns/${campaign.id}/design`}>Design
               </Button>
            </Collapse>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  listings: state.listingReducer.listings,
  campaign: state.campaignReducer.campaign
});

const mapDispatchToProps = {
  fetchComponent,
  createCampaign,
  updateCampaign,
  setOffset,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignContent);
