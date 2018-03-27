import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import Navigation from "../NavContainer/NavContainer";
import Profile from "../../components/Profile/Profile";
import { logout } from "../../actions/auth-actions";
import { push } from "react-router-redux";

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    return this.props.isAuthed ? (
      <div>
        {/*<Navigation />*/}
        <Profile logout={this.handleLogout} user={this.props.user} />
      </div>
    ) : (
      <Redirect push to="/" />
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
