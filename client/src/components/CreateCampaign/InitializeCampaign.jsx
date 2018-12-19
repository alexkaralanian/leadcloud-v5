import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Card, CardHeader, CardBody } from "reactstrap";

import InputField from "../InputField/InputField";
import FooterNav from "./CreateCampaignFooterNav";

let InitializeCampaign;

InitializeCampaign = ({ handleSubmit, campaign }) => (
  <div>
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
      {!campaign.step && <FooterNav />}
    </Form>
  </div>
);

InitializeCampaign = reduxForm({
  form: "campaignFormA", // a unique name for this form
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(InitializeCampaign);

const mapStateToProps = state => ({
  initialValues: state.campaignReducer.campaign,
  campaign: state.campaignReducer.campaign
});

InitializeCampaign = connect(
  mapStateToProps,
  null
  // { load: loadAccount } // bind account loading action creator
)(InitializeCampaign);

export default InitializeCampaign;
