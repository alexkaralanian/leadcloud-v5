import React from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Col, Row, Collapse, Card, CardTitle, CardHeader, CardBody } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import { setOffset, fetchComponent } from "../../actions/query-actions";
import { setGroups } from "../../actions/group-actions";

import { createCampaign, updateCampaign } from "../../actions/campaign-actions";

class RecipientsContainer extends React.Component {
  constructor(props) {
    super(mapDispatchToProps);
  }
  state = {
    isRecipientsPanelOpen: false,
    isGroupsModalVisible: false,
    selected: []
  };

  async componentDidMount() {
    const { match } = this.props;
    try {
      const res = await axios.get(`/api/campaigns/${match.params.id}`);
      this.setState({
        selected: res.data.groups || []
      });
    } catch (err) {
      console.error("Fetching Campaign Groups Unsuccessful", err);
    }

    this.props.setOffset(0);
    this.props.fetchComponent("groups", [], setGroups, null, null);
  }

  displayRecipientsPanel = () => {
    this.setState({ isRecipientsPanelOpen: !this.state.isRecipientsPanelOpen });
  };

  concat = groups => {
    let string = "";
    groups.forEach(group => {
      string += group.title + ", ";
    });
    return string.trim().slice(0, string.length - 2);
  };

  render() {
    const { campaign, groups, updateCampaign } = this.props;
    return (
      <Col sm={12} md={12}>
        <Card>
          <CardBody>
            <CardTitle className="mb-0">
              <i className="fa fa-users mr-2" />
              <span>TO: {campaign.groups && this.concat(campaign.groups)}</span>
              {!this.state.isRecipientsPanelOpen && (
                <div>
                  <Button
                    className="floatRight"
                    color="primary"
                    onClick={this.displayRecipientsPanel}
                  >
                    Add Recipients
                  </Button>
                </div>
              )}
            </CardTitle>

            <Collapse isOpen={this.state.isRecipientsPanelOpen}>
              <div className="margin-top-2">
                <Typeahead
                  clearButton
                  multiple
                  placeholder="Choose group(s)..."
                  selected={this.state.selected}
                  defaultSelected={this.state.selected}
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
