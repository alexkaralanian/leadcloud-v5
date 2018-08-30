import React from "react";
import { Redirect } from "react-router-dom";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Grid } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header";
import Campaigns from "../../components/Campaigns/Campaigns";

import { fetchCampaigns, setCampaign } from "../../actions/campaign-actions";
import { setCampaignListings } from "../../actions/campaign-listings-actions";
import { setCampaignGroups } from "../../actions/campaign-groups-actions";

class CampaignsContainer extends React.Component {
  componentDidMount() {
    const { fetchCampaigns, match } = this.props;
    fetchCampaigns();
  }

  createNewCampaign = () => {
    const {
      setCampaign,
      setCampaignListings,
      setCampaignGroups,
      push
    } = this.props;

    setCampaign({});
    setCampaignListings([]);
    setCampaignGroups([]);

    this.props.push("/campaigns/new");
  };

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
            primaryFunc={this.createNewCampaign}
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
  setCampaign,
  setCampaignListings,
  setCampaignGroups,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsContainer);
