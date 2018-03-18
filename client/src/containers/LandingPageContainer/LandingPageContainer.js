import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "../../actions/auth-actions";

import LandingPage from "../../components/LandingPage/LandingPage";

class LandingPageContainer extends React.Component {
  render() {
    return (
      <LandingPage isAuthed={this.props.isAuthed} logout={this.props.logout} />
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed
});

export default connect(mapStateToProps, { logout })(LandingPageContainer);
