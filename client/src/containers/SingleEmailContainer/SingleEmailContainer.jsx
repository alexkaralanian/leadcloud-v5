import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Navigation from "../NavContainer/NavContainer";
import SingleEmail from "../../components/SingleEmail/SingleEmail";
import {
  fetchEmail,
  clearEmail,
  clearError
} from "../../actions/email-actions";
// import { Row, Col } from "react-bootstrap";

class SingleEmailContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log("PROPS", props);
    // this.receiveIframeData = this.receiveIframeData.bind(this);
  }

  componentWillMount() {
    this.props.fetchEmail(this.props.match.params.id);
  }

  componentDidMount() {
    // window.addEventListener("message", this.receiveIframeData);
    // this.iframe.contentWindow.postMessage({ email: this.props.email }, "*");
    // this.props.fetchEmail(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log("NEXT PROPS", nextProps);
    console.log("EMAIL PROPS", this.props.email);
    if (this.props.email !== nextProps.email) {
      this.iframe.contentWindow.postMessage({ email: nextProps.email }, "*");
    }
  }

  componentWillUnmount() {
    this.props.clearEmail();
    this.props.clearError();
  }

  render() {
    return this.props.isAuthed ? (
      <div>
        <Navigation />
        <div>
          <iframe
            ref={el => (this.iframe = el)}
            title="Email"
            frameBorder={1}
            src="/iframecontainer"
            scrolling="yes"
          />
          {/*<SingleEmail
            email={this.props.email}
            isFetching={this.props.isFetching}/>*/}
        </div>
      </div>
    ) : (
      <Redirect push to="/" />
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
  clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleEmailContainer
);
