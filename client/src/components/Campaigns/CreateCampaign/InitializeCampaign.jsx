import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Button, Form, FormGroup, Card, CardHeader, CardBody } from "reactstrap";

import InputField from "../../InputField/InputField";

let InitializeCampaign;

InitializeCampaign = ({ handleSubmit, campaign }) => (
  <Form className="margin-top-2" onSubmit={handleSubmit}>
    <Card>
      <CardHeader>
        <i className="fa fa-align-justify" />
        <strong>Initialize Campaign</strong>
      </CardHeader>
      <CardBody>
        <FormGroup>
          <Field type="text" name="title" component={InputField} label="Campaign Title" />
        </FormGroup>
      </CardBody>
    </Card>
    <Button
      type="submit"
      color="primary"
      // disabled={!campaign.title && (pristine || submitting)}
    >
      <span>Next</span>
    </Button>
  </Form>
);

const mapStateToProps = state => ({
  initialValues: state.campaign.campaign,
  campaign: state.campaign.campaign
});

InitializeCampaign = reduxForm({
  form: "campaignTitle", // a unique name for this form
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(InitializeCampaign);

export default connect(
  mapStateToProps,
  null
  // { load: loadAccount } // bind account loading action creator
)(InitializeCampaign);
