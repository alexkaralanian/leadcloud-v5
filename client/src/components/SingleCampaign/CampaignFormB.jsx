import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { Email, Item, Span, A, renderEmail } from "react-html-email";
import { Field, reduxForm } from "redux-form";
import { Button, Form, FormGroup, Grid, Col, Row } from "react-bootstrap";
import { contactValidate } from "../../helpers/redux-form/validate";

import TableRowCheckbox from "../../components/TableRow/TableRow_Checkbox";
// import EmailHTML from "../../components/EmailTemplate/EmailTemplate";
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
  campaignListings,
  nextPage,
  prevPage
}) => (
  <Form>
    <Grid>
      <Row>
        <Col xs={12}>
          <h2>Format Template</h2>
        </Col>

        <Col xs={12}>
          <div>
            {campaignListings.map(listing => (
              <div>
                <h3>{listing.address}</h3>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <div>
            <Button
              onClick={prevPage}
              className="submitButton"
              type="button"
              bsStyle="primary"
              disabled={pristine || submitting}
            >
              <span>Previous</span>
            </Button>
          </div>
        </Col>
        <Col xs={6}>
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
