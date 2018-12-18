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
import FooterNav from "./CreateCampaignFooterNav";

let CampaignFormA;

CampaignFormA = ({ handleSubmit, page, campaign, isCampaignNew }) => (
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
