import React from "react";
import { connect } from "react-redux";

import Navigation from "../NavContainer/NavContainer";

import SingleCampaign from "../../components/SingleCampaign/SingleCampaign";

import { fetchCampaign } from "../../actions/campaign-actions";

class SingleCampaignContainer extends React.Component {
  componentDidMount() {
    this.props.fetchCampaign(this.props.match.params.id);
  }

  render() {
    return (
      <React.Fragment>
        <Navigation />
        <SingleCampaign campaign={this.props.campaign} />
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
