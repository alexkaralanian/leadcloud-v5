import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header-old";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Emails from "../../components/Emails/Emails";
import Errors from "../../components/Error/Error";
import Navigation from "../NavContainer/NavContainer";
import { fetchEmails, clearEmails } from "../../actions/email-actions";
// import { clearError } from "../../actions/common-actions";

class EmailsContainer extends React.Component {
  componentDidMount() {
    const { fetchEmails, maxResults, pageToken, emails } = this.props;
    fetchEmails(maxResults, pageToken, emails);
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    // this.props.clearError();
    // this.props.clearEmails();
  }

  onScroll = () => {
    const {
      fetchEmails,
      maxResults,
      pageToken,
      emails,
      isLoading
    } = this.props;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      emails.length &&
      !isLoading
    ) {
      fetchEmails(maxResults, pageToken, emails);
    }
  };

  // Still working??? //  MOVE TO CONTACT REDUCER...
  createContact = (email, name) => {
    return axios
      .post("api/email/gmail/fetchcontact", {
        email,
        name
      })
      .then(res => {
        this.props.history.push(`contact/${res.data.id}`);
      });
  };

  render() {
    const { isAuthed, emails, isFetching, error } = this.props;
    return !isAuthed ? (
      <Redirect to="/auth" />
    ) : (
      <React.Fragment>
        <BreadCrumbs />
        <div className="animated fadeIn">
          <Header
            isVisible={true}
            componentName="emails"
            headerTitle="Emails"
            isNew={null}
            primaryText="Create New"
            primaryFunc={() => push("/contacts/new")}
          />
          <Emails
            emails={emails}
            isFetching={isFetching}
            createContact={this.createContact}
          />
          <Errors errorText={error} />
        </div>
      </React.Fragment>
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
  fetchEmails: PropTypes.func.isRequired
  // clearEmails: PropTypes.func.isRequired,
  // clearError: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailsContainer);
