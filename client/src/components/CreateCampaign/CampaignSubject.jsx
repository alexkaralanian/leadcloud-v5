import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { Formik } from "formik";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Form,
  FormGroup,
  Col,
  Row,
  Collapse,
  Card,
  CardTitle,
  CardHeader,
  CardBody
} from "reactstrap";

import InputField from "../InputField/InputField";

import { createCampaign, updateCampaign, fetchCampaign } from "../../actions/campaign-actions";

let InnerForm = props => {
  const { handleSubmit, pristine, reset, submitting, campaign } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Field type="text" name="subject" component={InputField} />
      </FormGroup>
      <Button className="margin-top-2 floatRight" type="submit">
        Save
      </Button>
    </Form>
  );
};

class CampaignSubject extends React.Component {
  state = {
    isPanelOpen: false,
    isModalVisible: false
  };

  displayPanel = () => {
    this.setState({ isPanelOpen: !this.state.isPanelOpen });
  };

  render() {
    const { campaign, updateCampaign } = this.props;
    return (
      <Col sm={12} md={12}>
        <Card>
          <CardBody>
            <CardTitle className="mb-0">
              <i className="fa fa-users mr-2" />
              <span>SUBJECT: {campaign.subject && campaign.subject}</span>
              {!this.state.isPanelOpen && (
                <div>
                  <Button className="floatRight" color="primary" onClick={this.displayPanel}>
                    Add Subject
                  </Button>
                </div>
              )}
            </CardTitle>
            <Collapse isOpen={this.state.isPanelOpen}>
              <InnerForm
                campaign={campaign}
                onSubmit={values => {
                  campaign.subject = values.subject;
                  updateCampaign(campaign);
                  this.setState({
                    isPanelOpen: false
                  });
                }}
              />
            </Collapse>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  campaign: state.campaignReducer.campaign
});

const mapDispatchToProps = {
  createCampaign,
  updateCampaign
};

InnerForm = reduxForm({
  form: "campaignSubject", // a unique name for this form
  enableReinitialize: true
  // keepDirtyOnReinitialize: true
})(InnerForm);

InnerForm = connect(state => ({
  initialValues: state.campaignReducer.campaign
}))(InnerForm);

export default connect(mapStateToProps, mapDispatchToProps)(CampaignSubject);
