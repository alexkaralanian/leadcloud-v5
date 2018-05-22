import React from "react";
import { connect } from "react-redux";

import Emails from "../../components/Emails/Emails";

class SingleContactEmailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
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

export default connect(null, null)(SingleContactEmailsContainer);
