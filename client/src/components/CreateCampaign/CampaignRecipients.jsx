import React from "react";
import { connect } from "react-redux";
import { Button, Col, Row, Collapse, Card, CardTitle, CardHeader, CardBody } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import { setOffset, fetchComponent } from "../../actions/query-actions";
import { setGroups } from "../../actions/group-actions";

import { createCampaign, updateCampaign } from "../../actions/campaign-actions";

import {
  setDiffedCampaignGroups,
  searchDiffedCampaignGroups,
  submitCampaignGroups,
  deleteCampaignGroup
} from "../../actions/campaign-groups-actions";

import "./CreateCampaign.scss";

class RecipientsContainer extends React.Component {
  state = {
    isRecipientsPanelOpen: false,
    isGroupsModalVisible: false
  };

  componentDidMount() {
    this.props.setOffset(0);
    this.props.fetchComponent("groups", [], setGroups, null, null);
  }

  // RECIPIENTS
  displayRecipientsPanel = () => {
    this.setState({ isRecipientsPanelOpen: !this.state.isRecipientsPanelOpen });
  };

  submitGroups = selected => {
    this.props.submitCampaignGroups(selected);
    this.setState({
      isGroupsModalVisible: false,
      isRecipientsPanelOpen: true,
      selectedRecipients: []
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    console.log("EVENT", evt);
  };

  render() {
    const { campaign, groups, campaignGroups } = this.props;
    return (
      <Col sm={12} md={12}>
        <Card>
          <CardBody>
            <CardTitle className="mb-0">
              <i className="fa fa-users mr-2" />
              <span>TO:</span>
              {!this.state.isRecipientsPanelOpen && (
                <Button
                  className="floatRight"
                  color="primary"
                  onClick={this.displayRecipientsPanel}
                >
                  Add Recipients
                </Button>
              )}
            </CardTitle>

            <Collapse isOpen={this.state.isRecipientsPanelOpen}>
              <div className="margin-top-2">
                <Typeahead
                  clearButton
                  multiple
                  placeholder="Choose group(s)..."
                  onChange={selected => {
                    this.setState({ selected });
                    console.log("SELECTED", this.state.selected);
                  }}
                  options={groups}
                  labelKey="title"
                />
                <Button
                  className="margin-top-2 floatRight"
                  onClick={() => this.setState({ isRecipientsPanelOpen: false })}
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
  groups: state.groupReducer.groups,
  campaign: state.campaignReducer.campaign,
  campaignGroups: state.campaignReducer.campaignGroups
});

const mapDispatchToProps = {
  createCampaign,
  submitCampaignGroups,
  deleteCampaignGroup,
  searchDiffedCampaignGroups,
  setOffset,
  fetchComponent
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipientsContainer);
