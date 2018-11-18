import React from "react";
import { connect } from "react-redux";

import Navigation from "../NavContainer/NavContainer";
import SingleCampaign from "../../components/SingleCampaign/SingleCampaign";
import CampaignStats from "../../components/SingleCampaign/CampaignFormB";

import { fetchCampaign } from "../../actions/campaign-actions";

class SingleCampaignContainer extends React.Component {
  componentDidMount() {
    const { fetchCampaign, match } = this.props;
    fetchCampaign(match.params.id);

    if (match.path !== "/campaigns/new") {
      fetchCampaign(match.params.id);
    }
  }

  render() {
    const { campaign } = this.props;
    return (
      <React.Fragment>
        <Navigation />
        <SingleCampaign campaign={campaign} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  campaign: state.campaignReducer.campaign
});

const mapDispatchToProps = {
  fetchCampaign
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleCampaignContainer
);
