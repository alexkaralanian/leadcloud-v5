import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Navigation from "../NavContainer/NavContainer";
import ContactHeader from "../../components/SingleContact/ContactHeader";
import ContactNav from "../../components/SingleContact/ContactNav";
import SingleContact from "../../components/SingleContact/SingleContact";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import SearchListings from "../../components/SingleContact/SearchListings";
import Emails from "../../components/Emails/Emails";
import Groups from "../../components/Groups/Groups";

import {
  fetchContact,
  fetchImages,
  submitNewContact,
  updateContact,
  deleteContact,
  clearContact,
  fetchGroups,
  fetchGoogleImages,
  onDrop,
  deleteContactImage,
  fetchContactListings,
  clearError
} from "../../actions/contact-actions";

import {
  fetchEmailsByContact,
  setEmailQuery
} from "../../actions/email-actions";

class SingleContactContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.fetchContact(this.props.match.params.id);
      this.props.fetchContactListings(this.props.match.params.id);
    }
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.contact !== nextProps.contact) {
      if (nextProps.contact.email) {
        // Map over all contacts email addresses + create query string...
        let request = "";
        nextProps.contact.email.forEach(email => {
          request += `from: ${email.value.trim()} OR `;
        });
        request = request.slice(0, request.length - 4);

        this.props.setEmailQuery(request);
        this.props.fetchEmailsByContact(
          // args: query, maxResults, pageToken, emailsArray
          request,
          this.props.maxResults,
          0, // reset page token on new contact
          this.props.emailsByContact
        );
      }
      this.props.fetchGroups(nextProps.contact.membership);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    this.props.clearContact();
    this.props.clearError();
  }

  onScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.props.emailsByContact.length &&
      !this.props.isLoading
    ) {
      this.props.fetchEmailsByContact(
        this.props.emailQuery,
        this.props.maxResults,
        this.props.pageToken,
        this.props.emailsByContact
      );
    }
  }

  render() {
    return !this.props.isAuthed ? (
      <Redirect path="/" />
    ) : (
      <div>
        <Navigation />

        {/* CONTACT HEADER */}
        <ContactHeader
          contact={this.props.contact}
          isContactNew={this.props.match.params.id === "new"}
          images={this.props.contact.images}
        />

        {/* CONTACT NESTED NAV */}
        {this.props.match.params.id === "new" ? null : (
          <ContactNav contactId={this.props.contact.id} />
        )}

        {/* CONTACT FORM */}
        <Route
          exact
          path={
            this.props.match.params.id === "new"
              ? `/contact/new`
              : `/contact/${this.props.contact.id}`
          }
          render={routeProps => (
            <SingleContact
              {...routeProps}
              contact={this.props.contact}
              isContactNew={this.props.match.params.id === "new"}
              submitNewContact={this.props.submitNewContact}
              updateContact={this.props.updateContact}
              deleteContact={this.props.deleteContact}
              groups={this.props.groups}
            />
          )}
        />

        {/* CONTACT LISTINGS */}
        <Route
          path={`/contact/${this.props.contact.id}/listings`}
          render={routeProps => (
            <SearchListings
              contact={this.props.contact}
              contactListings={this.props.contactListings}
            />
          )}
        />

        {/* CONTACT EMAILS */}
        <Route
          path={`/contact/${this.props.contact.id}/emails`}
          render={routeProps => (
            <Emails
              {...routeProps}
              emails={this.props.emailsByContact}
              isFetching={this.props.isFetching}
            />
          )}
        />

        {/* CONTACT GROUPS */}
        <Route
          path={`/contact/${this.props.contact.id}/groups`}
          render={routeProps => (
            <Groups {...routeProps} groups={this.props.groups} />
          )}
        />

        {/* CONTACT MEDIA */}
        <Route
          path={`/contact/${this.props.contact.id}/media`}
          render={routeProps => (
            <ImageCarousel
              {...routeProps}
              onDrop={this.props.onDrop}
              component={this.props.contact}
              images={this.props.contact.images}
              deleteImg={this.props.deleteContactImage}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contact: state.contactReducer.contact,
  googleImages: state.contactReducer.googleImages,
  emailsByContact: state.contactReducer.emailsByContact,
  maxResults: state.contactReducer.maxResults,
  pageToken: state.contactReducer.pageToken,
  groups: state.contactReducer.groups,
  isFetching: state.contactReducer.isFetching,
  isLoading: state.contactReducer.isLoading,
  error: state.contactReducer.error,
  contactListings: state.contactReducer.contactListings,
  isAuthed: state.authReducer.isAuthed,
  emailQuery: state.emailReducer.emailQuery
});

const mapDispatchToProps = {
  fetchContact,
  fetchImages,
  fetchGoogleImages,
  submitNewContact,
  updateContact,
  deleteContact,
  fetchEmailsByContact,
  fetchGroups,
  clearContact,
  clearError,
  onDrop,
  deleteContactImage,
  setEmailQuery,
  fetchContactListings
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleContactContainer
);
