import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Dashboard from "../../components/Dashboard/Dashboard";
import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";

class DashboardContainer extends React.Component {
  render() {
    const { isAuthed } = this.props;
    return !isAuthed ? (
      <Redirect to="/auth" />
    ) : (
      <React.Fragment>
        <BreadCrumbs />
        <Dashboard />
      </React.Fragment>
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
