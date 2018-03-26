import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Navigation from "../NavContainer/NavContainer";
import SingleEmail from "../../components/SingleEmail/SingleEmail";
import {
  fetchEmail,
  clearEmail,
  clearError,
  fetchSingleEmailId
} from "../../actions/email-actions";
import { Row, Col } from "react-bootstrap";

class SingleEmailContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchEmail(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearEmail();
    this.props.clearError();
  }

  render() {
    return !this.props.isAuthed ? (
      <Redirect push to="/" />
    ) : (
      <div>
        {/*<Navigation />*/}
        <SingleEmail
          email={this.props.email}
          isFetching={this.props.isFetching}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.emailReducer.email,
  isFetching: state.emailReducer.isFetching,
  error: state.emailReducer.error,
  isAuthed: state.authReducer.isAuthed
});

const mapDispatchToProps = {
  fetchEmail,
  clearEmail,
  fetchSingleEmailId,
  clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleEmailContainer
);
