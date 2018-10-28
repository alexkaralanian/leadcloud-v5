import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { Row, Col } from "reactstrap";

import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";

import { fetchEmail, clearEmail } from "../../actions/email-actions";

import iFrameContainer from "./iFrameContainer";

class SingleEmailContainer extends React.Component {
  componentDidMount() {
    const { fetchEmail, match } = this.props;
    fetchEmail(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { email } = this.props;

    if (email !== nextProps.email) {
      this.iframe.contentWindow.postMessage({ email: nextProps.email }, "*");
    }
  }

  componentWillUnmount() {
    const { clearEmail } = this.props;
    clearEmail();
  }

  render() {
    const { isAuthed, email } = this.props;

    return !isAuthed ? (
      <Redirect to="/auth" />
    ) : (
      <React.Fragment>
        <BreadCrumbs />
        <Row className="animated fadeIn">
          <Col xs={12}>
            <h4>Subject: {email && email.subject}</h4>
            <h4>
              To:{" "}
              {email.to &&
                ReactHtmlParser(
                  email.to.html
                    .replace(/&#x27;/g, "'")
                    .replace(/&lt;/g, "")
                    .replace(/&gt;/g, "")
                )}
            </h4>
            <h4>
              From:{" "}
              {email.from &&
                ReactHtmlParser(
                  email.from.html
                    .replace(/&#x27;/g, "'")
                    .replace(/&lt;/g, "")
                    .replace(/&gt;/g, "")
                )}
            </h4>
          </Col>
        </Row>

        <iframe
          ref={el => (this.iframe = el)}
          title="Email"
          frameBorder={1}
          src="/iframecontainer"
          scrolling="yes"
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  email: state.emailReducer.email,
  isFetching: state.emailReducer.isFetching,
  // error: state.emailReducer.error,
  isAuthed: state.authReducer.isAuthed
});

const mapDispatchToProps = {
  fetchEmail,
  clearEmail
  // clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleEmailContainer
);
