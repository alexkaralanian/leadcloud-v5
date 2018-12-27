import React from "react";
import { connect } from "react-redux";
import EmailEditor from "react-email-editor";
import { Button, Col, Row, Collapse, Card, CardTitle, CardHeader, CardBody } from "reactstrap";
import "./Campaign.scss";

// import { setOffset, fetchComponent } from "../../actions/query-actions";
// import { setListings } from "../../actions/listing-actions";
// import { createCampaign, updateCampaign } from "../../actions/campaign-actions";

// import {
//   setDiffedCampaignListings,
//   searchDiffedCampaignListings,
//   submitCampaignListings,
//   deleteCampaignListing
// } from "../../actions/campaign-listings-actions";

class CampaignWizard extends React.Component {
  exportHtml = () => {
    this.editor.exportHtml(data => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };

  // state = {
  //   isListingsPanelOpen: false,
  //   isListingsModalVisible: false
  // };

  // componentDidMount() {
  //   this.props.setOffset(0);
  //   this.props.fetchComponent("listings", [], setListings, null, null);
  // }

  // LISTINGS
  // displayListingsPanel = () => {
  //   this.setState({ isListingsPanelOpen: !this.state.isListingsPanelOpen });
  // };

  // submitListings = selected => {
  //   this.props.submitCampaignListings(selected);
  // };

  render() {
    return (
      <Row>
        <Col xs={12} className="email-editor__container">
          <EmailEditor className="email-editor" ref={editor => (this.editor = editor)} />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  // listings: state.listingReducer.listings,
  // campaign: state.campaignReducer.campaign
});

const mapDispatchToProps = {
  // fetchComponent,
  // createCampaign,
  // updateCampaign,
  // setOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignWizard);
