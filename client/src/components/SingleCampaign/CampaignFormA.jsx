import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import {
  Form,
  FormGroup,
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";

import InputField from "../InputField/InputField";
import TextAreaField from "../InputField/TextAreaField";
import CampaignFormAContainer from "./CampaignFormA_Container";

let CampaignFormA;

CampaignFormA = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  auditClick,
  campaign
}) => (
  <Form className="margin-top-2" onSubmit={handleSubmit}>
    <Card>
      <CardHeader>
        <i className="fa fa-align-justify" />
        <strong>Initialze Campaign</strong>
      </CardHeader>
      <CardBody>
        <FormGroup>
          <Field
            type="text"
            name="title"
            component={InputField}
            label="Campaign Title"
          />
        </FormGroup>
      </CardBody>
    </Card>
    <CampaignFormAContainer />
    <div className="button_footer-container">
      <ButtonGroup>
        <Button
          type="submit"
          color="primary"
          // disabled={!campaign.title && (pristine || submitting)}
        >
          <span>Next</span>
        </Button>
      </ButtonGroup>
    </div>
  </Form>
);

CampaignFormA = reduxForm({
  form: "campaignFormA", // a unique name for this form
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(CampaignFormA);

const mapStateToProps = state => ({
  initialValues: state.campaignReducer.campaign,
  campaign: state.campaignReducer.campaign
});

CampaignFormA = connect(
  mapStateToProps,
  null
  // { load: loadAccount } // bind account loading action creator
)(CampaignFormA);

export default CampaignFormA;
