import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Button, Form, FormGroup, Grid, Col, Row } from "react-bootstrap";
import { contactValidate } from "../../helpers/redux-form/validate";

import TableRowCheckbox from "../../components/TableRow/TableRow_Checkbox";
import SearchForm from "../../components/SearchForm/SearchForm";
import inputField from "../InputField/InputField";

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
  submitCampaignListing,
  deleteCampaignListing,
  nextPage
}) => (
  <Form>
    <Grid>
      <Row>
        <Col xs={12}>
          <h2>New Campaign</h2>
        </Col>
        <Col xs={12}>
          <FormGroup className="formGroup">
            <Field
              type="text"
              name="title"
              component={inputField}
              label="Title"
            />
          </FormGroup>
          <FormGroup className="formGroup">
            <Field
              type="text"
              name="subject"
              component={inputField}
              label="Subject"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <h3>Search Listings</h3>
          <SearchForm searchFunction={searchCampaignListings} />
        </Col>

        <Col xs={12}>
          <TableRowCheckbox
            componentName="listings"
            rowText="address"
            collection={campaignListings}
            submitFunction={deleteCampaignListing}
            hostComponent={campaign}
            buttonText="Delete Listing"
            buttonStyle="danger"
          />
        </Col>

        <Col xs={12}>
          <TableRowCheckbox
            componentName="listings"
            rowText="address"
            collection={campaignListingsSearchResults}
            submitFunction={submitCampaignListing}
            hostComponent={campaign}
            buttonText="Add Listing"
            buttonStyle="warning"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <div>
            <Button
              onClick={nextPage}
              className="submitButton"
              type="button"
              bsStyle="primary"
              disabled={pristine || submitting}
            >
              <span>Next</span>
            </Button>
          </div>
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
