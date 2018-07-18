import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "../NavContainer/NavContainer";
import Campaigns from "../../components/Campaigns/Campaigns";
import { fetchCampaigns } from "../../actions/campaign-actions";

class CampaignsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.createNewCampaign = this.createNewCampaign.bind(this);
  }

  componentDidMount() {
    this.props.fetchCampaigns();
  }

  createNewCampaign() {
    this.props.history.push("/campaign/new");
  }

  render() {
    return !this.props.isAuthed ? (
      <Redirect path="/" />
    ) : (
      <div>
        <Navigation />
        <Campaigns
          campaigns={this.props.campaigns}
          createNewCampaign={this.createNewCampaign}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  campaigns: state.campaignReducer.campaigns
});

const mapDispatchToProps = {
  fetchCampaigns
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsContainer);
