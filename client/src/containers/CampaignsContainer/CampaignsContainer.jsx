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
    const { fetchCampaigns, match } = this.props;
    fetchCampaigns();
  }

  render() {
    const { isAuthed, push, campaigns, createNewCampaign } = this.props;
    return !isAuthed ? (
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
            primaryFunc={() => push("/campaigns/new")}
            primaryGlyph="plus"
          />
        </Grid>
        <Campaigns campaigns={campaigns} />
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
