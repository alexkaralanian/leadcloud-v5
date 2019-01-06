import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
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

import { createCampaign, updateCampaign } from "../../actions/campaign-actions";

class CampaignSender extends React.Component {
  state = {
    isPanelOpen: false,
    isModalVisible: false
  };

  componentDidMount() {
    // this.props.setOffset(0);
    // this.props.fetchComponent("groups", [], setGroups, null, null);
  }

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
              <span>FROM:</span>
              {!this.state.isPanelOpen && (
                <Button className="floatRight" color="primary" onClick={this.displayPanel}>
                  Add Sender
                </Button>
              )}
            </CardTitle>

            <Collapse isOpen={this.state.isPanelOpen}>
              <div className="margin-top-2">
                <FormGroup>
                  <Field
                    type="text"
                    name="sender_name"
                    label="Sender Name"
                    component={InputField}
                  />
                  <Field
                    type="text"
                    name="sender_email"
                    label="Sender Email"
                    component={InputField}
                  />
                </FormGroup>
                <Button
                  className="margin-top-2 floatRight"
                  onClick={() => {
                    // stuff...
                    updateCampaign(campaign);
                    this.setState({
                      isPanelOpen: false
                    });
                  }}
                >
                  Save
                </Button>
              </div>
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

CampaignSender = reduxForm({
  form: "campaignFormA", // a unique name for this form
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(CampaignSender);

export default connect(mapStateToProps, mapDispatchToProps)(CampaignSender);
