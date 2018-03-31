import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { Button, Grid, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import axios from "axios";
import Emails from "../../components/Emails/Emails";
// import Navigation from "../NavContainer/NavContainer";
import { fetchEmails, clearEmails } from "../../actions/email-actions";
// import { clearError } from "../../actions/common-actions";
// import { submitButton } from "../../sharedStyles/styles.css";

class EmailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.createContact = this.createContact.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.props.fetchEmails(
      this.props.maxResults,
      this.props.pageToken,
      this.props.emails
    );
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    // this.props.clearError();
    // this.props.clearEmails();
  }

  onScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.props.emails.length &&
      !this.props.isLoading
    ) {
      this.props.fetchEmails(
        this.props.maxResults,
        this.props.pageToken,
        this.props.emails
      );
    }
  }

  // Still working??? //  MOVE TO CONTACT REDUCER...
  createContact(email, name) {
    return axios
      .post("api/email/gmail/fetchcontact", {
        email,
        name
      })
      .then(res => {
        this.props.history.push(`contact/${res.data.id}`); // ??
      });
  }

  render() {
    return this.props.isAuthed ? (
      <div>
        {/*<Navigation />*/}
        <Emails
          emails={this.props.emails}
          isFetching={this.props.isFetching}
          createContact={this.createContact}
          emailerror={this.props.error}
        />
      </div>
    ) : (
      <Redirect push to="/" />
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  emails: state.emailReducer.emails,
  maxResults: state.emailReducer.maxResults,
  pageToken: state.emailReducer.pageToken,
  isFetching: state.emailReducer.isFetching,
  isLoading: state.emailReducer.isLoading,
  error: state.emailReducer.error
});

const mapDispatchToProps = { fetchEmails, clearEmails };

EmailsContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  emails: PropTypes.array.isRequired,
  maxResults: PropTypes.number.isRequired,
  pageToken: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchEmails: PropTypes.func.isRequired,
  clearEmails: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailsContainer);
