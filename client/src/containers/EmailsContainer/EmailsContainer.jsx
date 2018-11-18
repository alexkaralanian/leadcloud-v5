import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import EmailNav from "../../components/Email/EmailNav";
import SingleEmailContainer from "../SingleEmailContainer/SingleEmailContainer";
import Inbox from "../../components/Email/Inbox";

class EmailsContainer extends React.Component {
  render() {
    const { isAuthed } = this.props;
    return !isAuthed ? (
      <Redirect to="/auth" />
    ) : (
      <React.Fragment>
        <BreadCrumbs />
        <div className="animated fadeIn">
          <div className="email-app mb-4">
            <EmailNav />
            <Route
              exact
              path="/emails"
              render={routeProps => <Inbox {...routeProps} />}
            />

            {/* SINGLE EMAIL */}
            <Route
              path="/emails/:id"
              render={routeProps => <SingleEmailContainer {...routeProps} />}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed
});

const mapDispatchToProps = {};

EmailsContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailsContainer);
