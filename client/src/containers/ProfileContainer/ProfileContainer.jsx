import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import Navigation from "../NavContainer/NavContainer";
import Profile from "../../components/Profile/Profile";
import { logout } from "../../actions/auth-actions";

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    const { isAuthed } = this.props;
    return !isAuthed ? (
      <Redirect to="/auth" />
    ) : (
      <Profile logout={this.handleLogout} user={this.props.user} />
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  isAuthed: state.authReducer.isAuthed
});

ProfileContainer.propTypes = {
  user: PropTypes.object,
  isAuthed: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { logout })(ProfileContainer);
