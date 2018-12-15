import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";

import LandingPage from "../../components/LandingPage/LandingPage";

class LandingPageContainer extends React.Component {
  render() {
    return <LandingPage />;
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { push })(LandingPageContainer);
