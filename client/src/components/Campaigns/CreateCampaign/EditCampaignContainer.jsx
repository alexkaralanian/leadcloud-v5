import React from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";
import CampaignContent from "./CampaignContent";
import CampaignRecipients from "./CampaignRecipients";
import CampaignSender from "./CampaignSender";
import CampaignSubject from "./CampaignSubject";

class EditCampaignContainer extends React.Component {
  render() {
    return (
      <Row className="margin-top-2">
        <CampaignRecipients match={this.props.match} />
        <CampaignSender />
        <CampaignSubject />
        <CampaignContent match={this.props.match} />
      </Row>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditCampaignContainer);
