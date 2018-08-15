import React from "react";
import { Redirect } from "react-router-dom";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Grid } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header";
import Campaigns from "../../components/Campaigns/Campaigns";

import { fetchCampaigns } from "../../actions/campaign-actions";

class CampaignsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchCampaigns();
  }

  render() {
    return !this.props.isAuthed ? (
      <Redirect path="/" />
    ) : (
      <React.Fragment>
        <Navigation />
        <BreadCrumbs />
        <Grid>
          <Header
            isVisible={true}
            componentName="campaigns"
            headerTitle="Campaigns"
            isNew={null}
            primaryText="Create Campaign"
            primaryFunc={() => this.props.push("/campaign/new")}
            primaryGlyph="plus"
          />
        </Grid>
        <Campaigns
          campaigns={this.props.campaigns}
          createNewCampaign={this.createNewCampaign}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  campaigns: state.campaignReducer.campaigns
});

const mapDispatchToProps = {
  fetchCampaigns,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsContainer);
