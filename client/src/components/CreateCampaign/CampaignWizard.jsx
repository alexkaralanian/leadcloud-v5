import React from "react";
import { connect } from "react-redux";
import EmailEditor from "react-email-editor";
import { Button, Col, Row, Collapse, Card, CardTitle, CardHeader, CardBody } from "reactstrap";
import "./Campaign.scss";

import { fetchCampaign, updateCampaign } from "../../actions/campaign-actions";

class CampaignWizard extends React.Component {
  componentDidMount() {
    // const { fetchCampaign } = this.props;
    // fetchCampaign();
  }

  exportHtml = () => {
    this.editor.exportHtml(data => {
      const { design, html } = data;
      console.log("exportHtml", html);
      // console.log("DESIGN", design);
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

  onLoad = () => {
    const { campaign } = this.props;
    this.editor.loadDesign(campaign.template);
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
  updateCampaign
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignWizard);
