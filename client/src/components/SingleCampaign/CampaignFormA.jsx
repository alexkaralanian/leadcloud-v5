import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Row, Col, Button } from "react-bootstrap";

import InputField from "../InputField/InputField";
import TextAreaField from "../InputField/TextAreaField";
import CampaignFormA_Container from "./CampaignFormA_Container";

let CampaignFormA;

CampaignFormA = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  auditClick,
  children
  // campaignListings,
  // campaignGroups
}) => (
  <Form onSubmit={handleSubmit}>
    <FormGroup>
      <Field type="text" name="title" component={InputField} label="Title" />
      {/*<Field
        type="text"
        name="subject"
        component={InputField}
        label="Subject"
      />*/}
    </FormGroup>
    <CampaignFormA_Container />
    <Row>
      <Col xs={12}>
        <div className="button_footer-container">
          <Button
            className="button-lg"
            type="submit"
            bsStyle="primary"
            bsSize="large"
            disabled={pristine || submitting}
          >
            <span className="button_inner-text">Next</span>
          </Button>
        </div>
      </Col>
    </Row>
  </Form>
);

CampaignFormA = reduxForm({
  form: "campaignForm", // a unique name for this form
  enableReinitialize: true
  // keepDirtyOnReinitialize: true,
})(CampaignFormA);

CampaignFormA = connect(
  state => ({
    initialValues: state.campaignReducer.campaign // pull initial values from account reducer
  })
  // { load: loadAccount } // bind account loading action creator
)(CampaignFormA);

export default CampaignFormA;
