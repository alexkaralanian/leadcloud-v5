import React from "react";
import { connect } from "react-redux";
import { Button, Col, Row, Collapse, Card, CardTitle, CardHeader, CardBody } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015

import CampaignContent from "./CampaignContent";
import CampaignRecipients from "./CampaignRecipients";
// import CampaignSender from "./campaignSender";
// import CampaignSubject from "./campaignSubject";

// import Modal from "../../components/Modal/Modal";
// import SearchListingsContainer from "../../containers/SearchListingsContainer/SearchListingsContainer";
// import SearchGroupsContainer from "../../containers/SearchGroupsContainer/SearchGroupsContainer";
// import CampaignFormB from "./CampaignFormB";
// import TableRow2 from "../TableRow/TableRow2";

import { setOffset, fetchComponent } from "../../actions/query-actions";
import { setGroups } from "../../actions/group-actions";
import { setListings } from "../../actions/listing-actions";

import { createCampaign, updateCampaign } from "../../actions/campaign-actions";

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

import "./CreateCampaign.scss";

class EditCampaignContainer extends React.Component {
  state = {
    isListingsPanelOpen: false,
    isRecipientsPanelOpen: false,
    isListingsModalVisible: false,
    isGroupsModalVisible: false
  };

  componentDidMount() {
    this.props.setOffset(0);
    this.props.fetchComponent("groups", [], setGroups, null, null);
    this.props.fetchComponent("listings", [], setListings, null, null);
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
  displayListingsPanel = () => {
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
    const { campaign, groups, listings, campaignGroups, campaignListings } = this.props;
    return (
      <React.Fragment>
        {/* CAMPAIGN GROUPS / RECIPIENTS */}
        <Row className="margin-top-2">
          <CampaignRecipients />
          <CampaignContent />

          {/*<CampaignSubject />
            <CampaignSender />
          */}
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
  listings: state.listingReducer.listings,
  campaign: state.campaignReducer.campaign,
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
  setOffset,
  fetchComponent
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCampaignContainer);

{
  /*

                  <SearchGroupsContainer
                      displayModal={this.displayGroupsModal}
                      submitFunction={this.submitGroups}
                      setFunction={setDiffedCampaignGroups}
                      searchFunction={searchDiffedCampaignGroups}
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
                    cardHeaderText="TO:"
                    componentName="groups"
                    rowText="title"
                    collection={campaignGroups}
                    submitFunction={deleteCampaignGroup}
                    hostComponent={null}
                    buttonText="Remove"
                    buttonStyle="danger"
                    icon="fa fa-users"
                  />*/
}

{
  /*} <Col sm={12} md={12}>
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
              cardHeaderText="FROM:"
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

          <Col sm={12} md={12}>
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
              cardHeaderText="SUBJECT:"
              componentName="groups"
              rowText="title"
              collection={campaignGroups}
              submitFunction={deleteCampaignGroup}
              hostComponent={null}
              buttonText="Remove"
              buttonStyle="danger"
              icon="fa fa-users"
            />
          </Col>*/
}

{
  /* CONTENT */
}
{
  /*<Col sm={12} md={12}>
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
              cardHeaderText="CONTENT:"
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

         <Col sm={12} md={12}>
            <CampaignFormB
              campaign={campaign}
              onSubmit={values => {
                createCampaign(values, 2);
              }}
            />
          </Col>*/
}
