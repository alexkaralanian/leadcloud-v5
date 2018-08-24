import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Form,
  FormGroup,
  Grid,
  Col,
  Row,
  Panel
} from "react-bootstrap";

import InputField from "../InputField/InputField";
import TextAreaField from "../InputField/TextAreaField";
import Modal from "../../components/Modal/Modal";
import SearchListingsContainer from "../../containers/SearchListingsContainer/SearchListingsContainer";
import SearchGroupsContainer from "../../containers/SearchGroupsContainer/SearchGroupsContainer";
import TableRow from "../TableRow/TableRow";
import ButtonFooter from "../ButtonFooter/ButtonFooter";
import CampaignFormA from "./CampaignFormA";

import {
  fetchComponent,
  setCount,
  setOffset,
  setQuery
} from "../../actions/query-actions";

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
      isListingsModalVisible: false
    });
  };

  onListingsModalExit = () => {
    this.setState({
      isListingsModalVisible: false
    });
  };

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
      isGroupsModalVisible: false
    });
  };

  onGroupsModalExit = () => {
    this.setState({
      isGroupsModalVisible: false
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    console.log("EVENT", evt);
  };

  render() {
    const {
      createCampaign,
      campaignListings,
      campaignGroups,
      pristine,
      submitting
    } = this.props;

    const { page } = this.state;

    return (
      <React.Fragment>
        {/* CAMPAIGN GROUPS / RECIPIENTS */}
        <Row>
          <Col xs={12}>
            <Button
              bsSize="xsmall"
              onClick={() => this.displayRecipientsPanel()}
            >
              Collapse
            </Button>
            <div className="header_secondary">
              <div className="header_3">Recipients</div>

              <Button
                className="button_width"
                // bsStyle="primary"
                onClick={evt => {
                  evt.stopPropagation();
                  this.displayGroupsModal();
                }}
              >
                <span>Add Groups</span>
              </Button>

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
            </div>
            <Panel
              id="collapsible-panel-example-1"
              expanded={this.state.isRecipientsPanelOpen}
            >
              <Panel.Collapse>
                <Panel.Body>
                  <TableRow
                    componentName="groups"
                    rowText="title"
                    collection={campaignGroups}
                    submitFunction={deleteCampaignGroup}
                    hostComponent={null}
                    buttonText="Remove"
                    buttonStyle="danger"
                  />
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
          </Col>
        </Row>

        {/* CAMPAIGN LISTINGS */}
        <Row>
          <Col xs={12}>
            <Button bsSize="xsmall" onClick={() => this.displayListingPanel()}>
              Collapse
            </Button>
            <div className="header_secondary">
              <div className="header_3">Listings</div>
              <Button
                className="button_width"
                onClick={evt => {
                  evt.stopPropagation();
                  this.displayListingsModal();
                }}
              >
                <span>Add Listings</span>
              </Button>

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
            </div>
            <Panel
              id="collapsible-panel-example-1"
              expanded={this.state.isListingsPanelOpen}
            >
              <Panel.Collapse>
                <Panel.Body>
                  <TableRow
                    componentName="listings"
                    rowText="address"
                    collection={campaignListings}
                    submitFunction={deleteCampaignListing}
                    hostComponent={null}
                    buttonText="Remove"
                    buttonStyle="danger"
                  />
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
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
  setOffset,
  setQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CampaignFormA_Container
);
