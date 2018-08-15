import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Form,
  FormGroup,
  Grid,
  Col,
  Row,
  Panel,
  Glyphicon
} from "react-bootstrap";

import InputField from "../InputField/InputField";
import TextAreaField from "../InputField/TextAreaField";
import Header from "../Header/Header";
import Modal from "../../components/Modal/Modal";
import SearchListingsContainer from "../../containers/SearchListingsContainer/SearchListingsContainer";
import TableRow from "../TableRow/TableRow";
import ButtonFooter from "../ButtonFooter/ButtonFooter";

import { contactValidate } from "../../helpers/redux-form/validate";

import { searchListings, setListings } from "../../actions/listing-actions";

let CampaignFormA;

CampaignFormA = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  auditClick,
  campaign,
  campaignListings,
  searchCampaignListings,
  campaignListingsSearchResults,
  submitCampaignListings,
  deleteCampaignListing,

  displayModalFuncA,
  isModalVisible,
  setModalVisibility,
  isListingPanelOpen,
  displayListingPanel,
  isRecipientsPanelOpen,
  displayRecipientsPanel,
  nextPage
}) => (
  <Form>
    <Grid>
      <Header
        isVisible={true}
        componentName="campaigns"
        headerTitle="New Campaign"
        isNew={null}
      />
      <Row className="margin-top-2">
        <Col xs={12}>
          <FormGroup className="formGroup">
            <Field
              type="text"
              name="title"
              component={InputField}
              label="Title"
            />
          </FormGroup>
          <FormGroup className="formGroup">
            <Field
              type="text"
              name="subject"
              component={InputField}
              label="Subject"
            />
          </FormGroup>
          <FormGroup className="formGroup">
            <Field
              type="text"
              name="subject"
              component={TextAreaField}
              label="Body"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Button bsSize="xsmall" onClick={() => displayRecipientsPanel()}>
            Collapse
          </Button>
          <div className="header_secondary">
            <div className="header_3">Recipients</div>

            <Button
              className="button_width"
              // bsStyle="primary"
              onClick={evt => {
                evt.stopPropagation();
                console.log("ADD");
              }}
            >
              <span>Add Groups</span>
            </Button>
          </div>
          <Panel
            id="collapsible-panel-example-1"
            expanded={isRecipientsPanelOpen}
          >
            <Panel.Collapse>
              <Panel.Body>
                <TableRow
                  componentName="groups"
                  rowText="title"
                  collection={null}
                  submitFunction={null}
                  hostComponent={campaign}
                  buttonText="Remove Group"
                  hostComponent={null}
                  buttonStyle="danger"
                />
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Button bsSize="xsmall" onClick={() => displayListingPanel()}>
            Collapse
          </Button>
          <div className="header_secondary">
            <div className="header_3">Listings</div>
            <Button
              className="button_width"
              // bsStyle="primary"
              onClick={evt => {
                evt.stopPropagation();
                setModalVisibility(true);
              }}
            >
              <span>Add Listings</span>
            </Button>
            <Modal
              displayModal={displayModalFuncA}
              isModalVisible={isModalVisible}
              title={"Campaign Listings"}
              hostComponent={null}
              // isModal={true}
              Container={
                <SearchListingsContainer
                  submitFunction={submitCampaignListings}
                  setFunction={setListings}
                  searchFunction={searchListings}
                />
              }
            />
          </div>
          <Panel id="collapsible-panel-example-1" expanded={isListingPanelOpen}>
            <Panel.Collapse>
              <Panel.Body>
                <TableRow
                  componentName="listings"
                  rowText="address"
                  collection={campaignListings}
                  submitFunction={deleteCampaignListing}
                  hostComponent={campaign}
                  buttonText="Remove Listing"
                  hostComponent={null}
                  buttonStyle="danger"
                />
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
        </Col>
      </Row>

      {/* *** BUTTONS *** */}
      <Row>
        <Col xs={12}>
          <ButtonFooter
            pristine={pristine}
            submitting={submitting}
            primaryButtonText="Next"
            component={campaign}
          />
        </Col>
      </Row>
    </Grid>
  </Form>
);

CampaignFormA = reduxForm({
  form: "campaignForm", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate: contactValidate
})(CampaignFormA);

// CampaignForm = connect(
//   state => ({
//     // initialValues: state.campaignReducer.campaign // pull initial values from CONTACT reducer
//   })
//   // { load: fetchCampaign } // bind fetchContact action creator
// )(CampaignForm);

export default CampaignFormA;
