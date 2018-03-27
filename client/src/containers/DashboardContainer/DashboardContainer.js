import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import axios from "axios";
import PropTypes from "prop-types";
import Dashboard from "../../components/Dashboard/Dashboard";
import Navigation from "../NavContainer/NavContainer";
import { fetchUser } from "../../actions/auth-actions";

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.isAuthed ? (
      <div>
        {/*<Navigation />*/}
        <Dashboard />
      </div>
    ) : (
      <Redirect push to="/" />
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed
});

const mapDispatchToProps = {
  fetchUser
};

DashboardContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  fetchUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
