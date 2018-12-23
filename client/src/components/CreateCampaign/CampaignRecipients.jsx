import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Col, Row, Collapse, Card, CardTitle, CardHeader, CardBody } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import { setOffset, fetchComponent } from "../../actions/query-actions";
import { setGroups } from "../../actions/group-actions";

import { createCampaign, updateCampaign } from "../../actions/campaign-actions";

class RecipientsContainer extends React.Component {
  state = {
    isRecipientsPanelOpen: false,
    isGroupsModalVisible: false
  };

  componentDidMount() {
    this.props.setOffset(0);
    this.props.fetchComponent("groups", [], setGroups, null, null);
  }

  displayRecipientsPanel = () => {
    this.setState({ isRecipientsPanelOpen: !this.state.isRecipientsPanelOpen });
  };

  render() {
    const { campaign, groups, updateCampaign } = this.props;
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
                  selected={this.state.selected}
                  defaultSelected={campaign.groups || []}
                  onChange={selected => {
                    this.setState({ selected });
                  }}
                  options={groups}
                  labelKey="title"
                />
                <Button
                  className="margin-top-2 floatRight"
                  onClick={() => {
                    campaign.groups = this.state.selected;
                    updateCampaign(campaign);
                    this.setState({
                      isRecipientsPanelOpen: false
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
  groups: state.groupReducer.groups,
  campaign: state.campaignReducer.campaign
});

const mapDispatchToProps = {
  fetchComponent,
  createCampaign,
  updateCampaign,
  setOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipientsContainer);
