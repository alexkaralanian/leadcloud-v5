import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Dashboard from "../../components/Dashboard/Dashboard";
import Navigation from "../NavContainer/NavContainer";

class DashboardContainer extends React.Component {
  render() {
    return this.props.isAuthed ? (
      <div>
        <Navigation />
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

DashboardContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired
};

export const Unwrapped = DashboardContainer;

export default connect(mapStateToProps, null)(DashboardContainer);
