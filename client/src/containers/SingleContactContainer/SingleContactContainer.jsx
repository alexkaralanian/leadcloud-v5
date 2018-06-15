import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Navigation from "../NavContainer/NavContainer";
import ContactNav from "../../components/SingleContact/ContactNav";
import ContactHeader from "../../components/SingleContact/ContactHeader";
import ContactListings from "../../components/ContactListings/ContactListings";
import SingleContact from "../../components/SingleContact/SingleContact";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";

import SingleContactEmailsContainer from "./SingleContactEmailsContainer";
import GroupsRow from "../../components/GroupsRow/GroupsRow";

import {
  fetchContact,
  submitNewContact,
  updateContact,
  deleteContact,
  clearContact,
  fetchContactGroups,
  onDrop,
  deleteContactImage,
  clearError
} from "../../actions/contact-actions";

import {
  searchContactListings,
  fetchContactListings,
  submitContactListing,
  deleteContactListing,
  clearContactListingsSearchResults
} from "../../actions/contact-listings-actions";

import {
  fetchEmailsByContact,
  setEmailQuery
} from "../../actions/email-actions";

class SingleContactContainer extends React.Component {
  componentDidMount() {
    const { match, fetchContact, fetchContactListings } = this.props;

    if (match.params.id !== "new") {
      fetchContact(match.params.id);
      fetchContactListings(match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      contact,
      setEmailQuery,
      fetchEmailsByContact,
      fetchContactGroups,
      emailsByContact,
      maxResults
    } = this.props;

    if (contact !== nextProps.contact) {
      if (nextProps.contact.email) {
        // Map over all contacts email addresses + create query string to fetch ALL emails from ALL addresses.
        let request = "";
        nextProps.contact.email.forEach(email => {
          request += `from: ${email.value.trim()} OR `;
        });
        request = request.slice(0, request.length - 4);

        setEmailQuery(request);
        fetchEmailsByContact(
          // args: query, maxResults, pageToken, emailsArray
          request,
          maxResults,
          0, // reset page token on new contact
          emailsByContact
        );
      }
      fetchContactGroups(nextProps.contact.membership);
    }
  }

  componentWillUnmount() {
    const { clearContact, clearError } = this.props;

    clearContact();
    clearError();
  }

  render() {
    const {
      match,
      isAuthed,

      contact,
      submitNewContact,
      updateContact,
      deleteContact,

      searchContactListings,
      contactListingsSearchResults,
      contactListings,
      submitContactListing,
      deleteContactListing,

      emailsByContact,
      isFetching,
      onDrop,
      deleteContactImage,
      contactGroups
    } = this.props;

    return !isAuthed ? (
      <Redirect path="/" />
    ) : (
      <div>
        <Navigation />

        {/* CONTACT HEADER */}
        <ContactHeader
          contact={contact}
          isContactNew={match.params.id === "new"}
          images={contact.images}
        />

        {/* CONTACT NESTED NAV */}
        {match.params.id === "new" ? null : (
          <ContactNav contactId={contact.id} />
        )}

        {/* CONTACT FORM */}
        <Route
          exact
          path={
            match.params.id === "new"
              ? `/contact/new`
              : `/contact/${contact.id}`
          }
          render={routeProps => (
            <SingleContact
              {...routeProps}
              contact={contact}
              isContactNew={match.params.id === "new"}
              submitNewContact={submitNewContact}
              updateContact={updateContact}
              deleteContact={deleteContact}
              contactGroups={contactGroups}
            />
          )}
        />

        {/* CONTACT LISTINGS */}
        <Route
          path={`/contact/${contact.id}/listings`}
          render={routeProps => (
            <ContactListings
              {...routeProps}
              contact={contact}
              contactListings={contactListings}
              searchContactListings={searchContactListings}
              contactListingsSearchResults={contactListingsSearchResults}
              submitContactListing={submitContactListing}
              deleteContactListing={deleteContactListing}
            />
          )}
        />

        {/* CONTACT EMAILS */}
        <Route
          path={`/contact/${contact.id}/emails`}
          render={routeProps => (
            <SingleContactEmailsContainer {...routeProps} />
          )}
        />

        {/* CONTACT GROUPS */}
        <Route
          path={`/contact/${contact.id}/groups`}
          render={routeProps => (
            <GroupsRow {...routeProps} groups={contactGroups} />
          )}
        />

        {/* CONTACT MEDIA */}
        <Route
          path={`/contact/${contact.id}/media`}
          render={routeProps => (
            <ImageCarousel
              {...routeProps}
              onDrop={onDrop}
              component={contact}
              images={contact.images}
              deleteImg={deleteContactImage}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contact: state.contactReducer.contact,
  contactListingsSearchResults:
    state.contactReducer.contactListingsSearchResults,
  googleImages: state.contactReducer.googleImages,
  emailsByContact: state.contactReducer.emailsByContact,
  maxResults: state.contactReducer.maxResults,
  pageToken: state.contactReducer.pageToken,
  contactGroups: state.contactReducer.contactGroups,
  isFetching: state.contactReducer.isFetching,
  isLoading: state.contactReducer.isLoading,
  error: state.contactReducer.error,
  contactListings: state.contactReducer.contactListings,
  isAuthed: state.authReducer.isAuthed,
  emailQuery: state.emailReducer.emailQuery
});

const mapDispatchToProps = {
  fetchContact,
  submitNewContact,
  updateContact,
  deleteContact,
  fetchEmailsByContact,

  searchContactListings,
  fetchContactListings,
  submitContactListing,
  deleteContactListing,
  clearContactListingsSearchResults,
  fetchContactGroups,

  clearContact,
  clearError,
  onDrop,
  deleteContactImage,
  setEmailQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleContactContainer
);
