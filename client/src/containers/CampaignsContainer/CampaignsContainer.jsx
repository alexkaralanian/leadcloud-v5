import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "../NavContainer/NavContainer";
import Campaigns from "../../components/Campaigns/Campaigns";

class CampaignsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.createNewCampaign = this.createNewCampaign.bind(this);
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
        <Campaigns createNewCampaign={this.createNewCampaign} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed
});

export default connect(mapStateToProps, null)(CampaignsContainer);
