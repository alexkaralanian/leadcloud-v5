import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import EmailEditor from "react-email-editor";
import { Button, Col, Row, Collapse, Card, CardTitle, CardHeader, CardBody } from "reactstrap";
import "./Campaign.scss";

import { fetchCampaign, updateCampaign, setCampaign } from "../../actions/campaign-actions";

class CampaignWizard extends React.Component {
  state = { campaign: null };

  exportHtml = () => {
    this.editor.exportHtml(data => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };

  saveDesign = () => {
    const { campaign, updateCampaign } = this.props;
    this.editor.saveDesign(design => {
      console.log("saveDesign", design);
      campaign.template = design;
      updateCampaign(campaign);
    });
  };

  onLoad = async () => {
    const { match } = this.props;
    try {
      const res = await axios.get(`/api/campaigns/${match.params.id}`);
      await this.setState({ campaign: res.data });
      this.editor.loadDesign(this.state.campaign.template);
    } catch (err) {
      console.error("Error Loading Campaign", err);
    }
  };

  render() {
    const { campaign, fetchCampaign, match } = this.props;
    return (
      <Row>
        <Col xs={12} className="email-editor__container">
          <div>
            <button onClick={this.exportHtml}>Export HTML</button>
            <button onClick={this.saveDesign}>Save Design</button>
          </div>
          <EmailEditor
            className="email-editor"
            onLoad={this.onLoad}
            ref={editor => (this.editor = editor)}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  campaign: state.campaignReducer.campaign
});

const mapDispatchToProps = {
  updateCampaign
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignWizard);
