import React from "react";
import { Redirect } from "react-router-dom";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import Header from "../Header/Header-new";
import Loading from "../Loading/Loading";
import Placeholder from "../Placeholder/Placeholder";
import Campaigns from "./Campaigns/Campaigns";

import { fetchCampaigns, setCampaign } from "../../actions/campaign-actions";

class CampaignsContainer extends React.Component {
  componentDidMount() {
    const { fetchCampaigns } = this.props;
    fetchCampaigns();
  }

  createNewCampaign = () => {
    const { setCampaign, push } = this.props;
    setCampaign({});
    push("/campaigns/new");
  };

  render() {
    const { campaigns, isFetching } = this.props;
    console.log("CAMPAIGNS", campaigns);
    return (
      <React.Fragment>
        <BreadCrumbs />
        <Header>
          <h1>Campaigns</h1>
          <Button onClick={this.createNewCampaign} color="primary">
            Create Campaign
          </Button>
        </Header>

        {isFetching ? (
          <Loading />
        ) : campaigns.length > 0 ? (
          <Campaigns campaigns={campaigns} />
        ) : (
          <Placeholder
            headerText="You Dont Have Any Campaigns Yet..."
            ctaText="Create New Campaign"
            ctaFunc={this.createNewCampaign}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  campaigns: state.campaign.campaigns
});

const mapDispatchToProps = {
  fetchCampaigns,
  setCampaign,
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignsContainer);
