import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";

import LandingPage from "../../components/LandingPage/LandingPage";

class LandingPageContainer extends React.Component {
  componentDidMount() {
    const { isAuthed, push } = this.props;
    if (isAuthed) push("/");
  }

  componentWillReceiveProps(nextProps) {
    const { push } = this.props;
    if (nextProps.isAuthed) push("/");
  }

  render() {
    return <LandingPage />;
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed
});

export default connect(mapStateToProps, { push })(LandingPageContainer);
