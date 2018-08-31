import React from "react";
import { connect } from "react-redux";

import Emails from "../../components/Emails/Emails";
import { fetchEmailsByContact, clearEmails } from "../../actions/email-actions";

class SingleContactEmailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  onScroll() {
    const {
      fetchEmailsByContact,
      emailsByContact,
      isLoading,
      emailQuery,
      maxResults,
      pageToken
    } = this.props;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      emailsByContact.length &&
      !isLoading
    ) {
      fetchEmailsByContact(emailQuery, maxResults, pageToken, emailsByContact);
    }
  }

  render() {
    const { emailsByContact, isFetching } = this.props;
    return <Emails emails={emailsByContact} isFetching={isFetching} />;
  }
}

const mapStateToProps = state => ({
  isFetching: state.emailReducer.isFetching,
  isLoading: state.emailReducer.isLoading,
  emailsByContact: state.contactReducer.emailsByContact,
  emailQuery: state.emailReducer.emailQuery,
  maxResults: state.emailReducer.maxResults,
  pageToken: state.emailReducer.pageToken
});

const mapDispatchToProps = { fetchEmailsByContact, clearEmails };

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleContactEmailsContainer
);
