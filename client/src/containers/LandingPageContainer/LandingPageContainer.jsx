import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import LandingPage from "../../components/LandingPage/LandingPage";

class LandingPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthed) this.props.history.push("/");
  }

  componentDidMount() {
    if (this.props.isAuthed) this.props.history.push("/");
  }

  render() {
    return <LandingPage />;
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed
});

export default connect(mapStateToProps, null)(LandingPageContainer);
