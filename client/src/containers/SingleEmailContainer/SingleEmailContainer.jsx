import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import ReactHtmlParser from "react-html-parser";
import { Grid, Row, Col } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";

import {
  fetchEmail,
  clearEmail,
  clearError
} from "../../actions/email-actions";

class SingleEmailContainer extends React.Component {
  componentWillMount() {
    this.props.fetchEmail(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.email !== nextProps.email) {
      this.iframe.contentWindow.postMessage({ email: nextProps.email }, "*");
    }
  }

  componentWillUnmount() {
    this.props.clearEmail();
    this.props.clearError();
  }

  render() {
    const { email } = this.props;

    return this.props.isAuthed ? (
      <div>
        <Navigation />
        <Grid>
          <Row>
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
        </Grid>
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
