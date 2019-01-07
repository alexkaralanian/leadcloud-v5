import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Col, Row, Collapse, Card, CardTitle, CardHeader, CardBody } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { push } from "react-router-redux";

import { setOffset, fetchComponent } from "../../actions/query-actions";
import { setListings } from "../../actions/listing-actions";
import { createCampaign, updateCampaign } from "../../actions/campaign-actions";

class CampaignContent extends React.Component {
  state = {
    isListingsPanelOpen: false,
    isListingsModalVisible: false,
    selected: []
  };

  async componentDidMount() {
    const { match } = this.props;
    try {
      const res = await axios.get(`/api/campaigns/${match.params.id}`);
      this.setState({
        selected: res.data.listings || []
      });
    } catch (err) {
      console.error("Fetching Campaign Listings Unsuccessful", err);
    }

    this.props.setOffset(0);
    this.props.fetchComponent("listings", [], setListings, null, null);
  }

  // LISTINGS
  displayListingsPanel = () => {
    this.setState({ isListingsPanelOpen: !this.state.isListingsPanelOpen });
  };

  concat = listings => {
    let string = "";
    listings.forEach(listing => {
      string += listing.address + ", ";
    });
    return string.trim().slice(0, string.length - 2);
  };

  render() {
    const { campaign, listings, updateCampaign, push } = this.props;
    return (
      <Col sm={12} md={12}>
        <Card>
          <CardBody>
            <CardTitle className="mb-0">
              <i className="fa fa-users mr-2" />
              <span>CONTENT: {campaign.listings && this.concat(campaign.listings)}</span>
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
                  defaultSelected={this.state.selected}
                  onChange={selected => {
                    this.setState({ selected });
                  }}
                  options={listings}
                  labelKey="address"
                />
              </div>
              <div className="margin-top-2 floatRight">
                <Button
                  onClick={() => {
                    campaign.listings = this.state.selected;
                    updateCampaign(campaign);
                    // this.setState({
                    //   isListingsPanelOpen: false
                    // });
                  }}
                >
                  Save
                </Button>{" "}
                <Button href={`/campaigns/${campaign.id}/design`}>Design</Button>
              </div>
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
