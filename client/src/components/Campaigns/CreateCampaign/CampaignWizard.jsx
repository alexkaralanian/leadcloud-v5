import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import EmailEditor from "react-email-editor";
import { Button, Col, Row, Collapse, Card, CardTitle, CardHeader, CardBody } from "reactstrap";
import "./Campaign.scss";

import { updateCampaign, sendCampaign } from "../../../actions/campaign-actions";

class CampaignWizard extends React.Component {
  state = { campaign: null };

  exportHtml = () => {
    this.editor.exportHtml(data => {
      const { sendCampaign, updateCampaign, campaign } = this.props;
      const { design, html } = data;
      sendCampaign(html, campaign);
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
      // Need to inject listings into campaign template. Need help with this step.
      // if (this.state.campaign.listings[0].images[0])
      //   this.state.campaign.template.body.rows[0].columns[0].contents[0].values.src.url = this.state.campaign.listings[0].images[0];
      this.editor.loadDesign(this.state.campaign.template);
    } catch (err) {
      console.error("Error Loading Campaign", err);
    }
  };

  render() {
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
  updateCampaign,
  sendCampaign
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignWizard);
