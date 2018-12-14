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
    return (
      <React.Fragment>
        <BreadCrumbs />
        <div>
          <div className="email-app mb-4">
            <EmailNav />
            {/* INBOX */}
            <Route exact path="/emails" render={routeProps => <Inbox {...routeProps} />} />
            {/* EMAIL MESSAGE */}
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EmailsContainer);
