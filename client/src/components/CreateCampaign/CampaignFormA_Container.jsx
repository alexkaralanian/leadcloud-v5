import React from "react";
import { connect } from "react-redux";
import { Button, Col, Row, Collapse } from "reactstrap";

import Modal from "../../components/Modal/Modal";
import SearchListingsContainer from "../../containers/SearchListingsContainer/SearchListingsContainer";
import SearchGroupsContainer from "../../containers/SearchGroupsContainer/SearchGroupsContainer";
import TableRow2 from "../TableRow/TableRow2";

import { setOffset } from "../../actions/query-actions";

import { createCampaign } from "../../actions/campaign-actions";

import {
  setDiffedCampaignListings,
  searchDiffedCampaignListings,
  submitCampaignListings,
  deleteCampaignListing
} from "../../actions/campaign-listings-actions";

import {
  setDiffedCampaignGroups,
  searchDiffedCampaignGroups,
  submitCampaignGroups,
  deleteCampaignGroup
} from "../../actions/campaign-groups-actions";

class CampaignFormA_Container extends React.Component {
  state = {
    isListingsPanelOpen: true,
    isRecipientsPanelOpen: true,
    isListingsModalVisible: false,
    isGroupsModalVisible: false
  };

  componentDidMount() {
    this.props.setOffset(0);
  }

  // RECIPIENTS
  displayRecipientsPanel = () => {
    this.setState({ isRecipientsPanelOpen: !this.state.isRecipientsPanelOpen });
  };

  displayGroupsModal = () => {
    this.setState({
      isGroupsModalVisible: true
    });
  };

  submitGroups = selected => {
    this.props.submitCampaignGroups(selected);
    this.setState({
      isGroupsModalVisible: false,
      isRecipientsPanelOpen: true
    });
  };

  onGroupsModalExit = () => {
    this.setState({
      isGroupsModalVisible: false
    });
  };

  // LISTINGS
  displayListingPanel = () => {
    this.setState({ isListingsPanelOpen: !this.state.isListingsPanelOpen });
  };

  displayListingsModal = () => {
    this.setState({
      isListingsModalVisible: true
    });
  };

  submitListings = selected => {
    this.props.submitCampaignListings(selected);
    this.setState({
      isListingsModalVisible: false,
      isListingsPanelOpen: true
    });
  };

  onListingsModalExit = () => {
    this.setState({
      isListingsModalVisible: false
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    console.log("EVENT", evt);
  };

  render() {
    const { campaignListings, campaignGroups } = this.props;

    return (
      <React.Fragment>
        {/* CAMPAIGN GROUPS / RECIPIENTS */}
        <Row>
          <Col sm={12} md={12}>
            <Modal
              displayModal={this.displayGroupsModal}
              onExit={this.onGroupsModalExit}
              isModalVisible={this.state.isGroupsModalVisible}
              title={"Campaign Listings"}
              Container={
                <SearchGroupsContainer
                  displayModal={this.displayGroupsModal}
                  submitFunction={this.submitGroups}
                  setFunction={setDiffedCampaignGroups}
                  searchFunction={searchDiffedCampaignGroups}
                />
              }
            />
            <TableRow2
              CardHeaderCta={
                <Button
                  color="primary"
                  onClick={evt => {
                    evt.stopPropagation();
                    this.displayGroupsModal();
                  }}
                >
                  <span>Add</span>
                </Button>
              }
              cardHeaderText="Campaign Groups"
              componentName="groups"
              rowText="title"
              collection={campaignGroups}
              submitFunction={deleteCampaignGroup}
              hostComponent={null}
              buttonText="Remove"
              buttonStyle="danger"
              icon="fa fa-users"
            />
          </Col>

          {/* CAMPAIGN LISTINGS */}
          <Col sm={12} md={12}>
            <Modal
              displayModal={this.displayListingsModal}
              onExit={this.onListingsModalExit}
              isModalVisible={this.state.isListingsModalVisible}
              title={"Campaign Listings"}
              Container={
                <SearchListingsContainer
                  displayModal={this.displayListingsModal}
                  submitFunction={this.submitListings}
                  hostComponent={null}
                  setFunction={setDiffedCampaignListings}
                  searchFunction={searchDiffedCampaignListings}
                />
              }
            />

            <TableRow2
              CardHeaderCta={
                <Button
                  color="primary"
                  onClick={evt => {
                    evt.stopPropagation();
                    this.displayListingsModal();
                  }}
                >
                  <span>Add</span>
                </Button>
              }
              cardHeaderText="Campaign Listings"
              componentName="listings"
              rowText="address"
              collection={campaignListings}
              submitFunction={deleteCampaignListing}
              hostComponent={null}
              buttonText="Remove"
              buttonStyle="danger"
              icon="fa fa-building"
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  campaignListings: state.campaignReducer.campaignListings,
  campaignGroups: state.campaignReducer.campaignGroups
});

const mapDispatchToProps = {
  createCampaign,
  submitCampaignListings,
  submitCampaignGroups,
  deleteCampaignListing,
  deleteCampaignGroup,
  searchDiffedCampaignListings,
  searchDiffedCampaignGroups,
  setOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignFormA_Container);
