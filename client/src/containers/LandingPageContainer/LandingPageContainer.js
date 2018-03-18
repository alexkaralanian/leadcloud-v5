import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import LandingPage from "../../components/LandingPage/LandingPage";

class LandingPageContainer extends React.Component {
  render() {
    return <LandingPage isAuthed={this.props.isAuthed} />;
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed
});

export default connect(mapStateToProps, null)(LandingPageContainer);
