import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Email, Item, Span, A, renderEmail } from "react-html-email";
import { Field, reduxForm } from "redux-form";
import { Button, Form, FormGroup, Grid, Col, Row } from "react-bootstrap";
import { contactValidate } from "../../helpers/redux-form/validate";

import TableRowCheckbox from "../../components/TableRow/TableRow_Checkbox";
import EmailHTML from "../../components/EmailTemplate/EmailTemplate";
import SearchForm from "../../components/SearchForm/SearchForm";
import inputField from "../InputField/InputField";

let CampaignFormB;

CampaignFormB = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  auditClick,
  searchListings,
  campaignListings,
  deleteCampaignListing,
  campaign,
  listings,
  addCampaignListing
}) => (
  <Form>
    <Grid>
      <Row>
        <Col xs={12}>
          <h1>New Campaign 2</h1>
        </Col>
        <Col xs={12}>
          <div>
            <EmailHTML campaignListings={campaignListings} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div>
            <Button
              className="submitButton"
              type="submit"
              bsStyle="primary"
              disabled={pristine || submitting}
            >
              <span>Submit</span>
            </Button>
          </div>
        </Col>
      </Row>
    </Grid>
  </Form>
);

CampaignFormB = reduxForm({
  form: "campaignForm", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate: contactValidate
})(CampaignFormB);

// CampaignForm = connect(
//   state => ({
//     // initialValues: state.campaignReducer.campaign // pull initial values from CONTACT reducer
//   })
//   // { load: fetchCampaign } // bind fetchContact action creator
// )(CampaignForm);

export default CampaignFormB;
