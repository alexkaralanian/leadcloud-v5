import React from "react";
import { connect } from "react-redux";

import Emails from "../../components/Emails/Emails";
import Placeholder from "../../components/Placeholder/Placeholder";

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
    const { emailsByContact, contact, isFetching } = this.props;
    return emailsByContact.length > 0 ? (
      <Emails emails={emailsByContact} isFetching={isFetching} />
    ) : (
      <Placeholder
        headerText={`You and ${contact.fullName} don't have any emails yet...`}
        ctaText="Create email"
        ctaFunc={() => console.log("hi")}
      />
    );
  }
}

const mapStateToProps = state => ({
  contact: state.contactReducer.contact,
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
