import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import Navigation from "../NavContainer/NavContainer";
import Profile from "../../components/Profile/Profile";
import { logout } from "../../actions/auth-actions";
import { syncContacts } from "../../actions/contact-actions";

class ProfileContainer extends React.Component {
  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };

  handleSync = () => {
    const { syncContacts, push } = this.props;
    syncContacts();
    push("/contacts");
  };

  render() {
    return (
      <Profile logout={this.handleLogout} syncContacts={this.handleSync} user={this.props.user} />
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  isAuthed: state.authReducer.isAuthed
});

const mapDispatchToProps = {
  push,
  logout,
  syncContacts
};

ProfileContainer.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
