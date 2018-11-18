import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Dashboard from "../../components/Dashboard/Dashboard";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header-old";

class DashboardContainer extends React.Component {
  render() {
    const { isAuthed } = this.props;
    return !isAuthed ? (
      <Redirect to="/auth" />
    ) : (
      <React.Fragment>
        <BreadCrumbs />
        {/*<Header
          isVisible={true}
          componentName="dashboard"
          headerTitle="Dashboard"
          isNew={null}
          // primaryText="Create New"
          // primaryFunc={() => push("/contacts/new")}
          // primaryGlyph="plus"
        />*/}
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
