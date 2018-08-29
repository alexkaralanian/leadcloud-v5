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
  auditClick
}) => (
  <Form className="margin-top-2" onSubmit={handleSubmit}>
    <FormGroup>
      <Field type="text" name="title" component={InputField} label="Title" />
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

const mapStateToProps = state => ({
  initialValues: state.campaignReducer.campaign
});

CampaignFormA = connect(
  mapStateToProps
  // { load: loadAccount } // bind account loading action creator
)(CampaignFormA);

export default CampaignFormA;
