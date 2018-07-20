import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Navigation from "../NavContainer/NavContainer";
import ContactNav from "../../components/SingleContact/ContactNav";
import ContactHeader from "../../components/SingleContact/ContactHeader";
import ContactListings from "../../components/ContactListings/ContactListings";
import SingleContact from "../../components/SingleContact/SingleContact";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";

import SingleContactEmailsContainer from "./SingleContactEmailsContainer";
import ContactGroups from "../../components/ContactGroups/ContactGroups";
import GroupsContainer from "../GroupsContainer/GroupsContainer";

import {
  fetchContact,
  submitNewContact,
  updateContact,
  deleteContact,
  clearContact,
  // fetchContactGroups,
  onDrop,
  deleteContactImage
} from "../../actions/contact-actions";

import { clearError } from "../../actions/common-actions";

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

import {
  submitContactGroup,
  deleteContactGroup
} from "../../actions/contact-groups-actions";

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
      maxResults,
      fetchEmailsByContact,
      emailsByContact
      // fetchContactGroups,
    } = this.props;

    if (contact !== nextProps.contact) {
      if (nextProps.contact.email) {
        // Map over all contacts email addresses + create query string to fetch ALL emails from ALL addresses.
        let query = "";
        nextProps.contact.email.forEach(email => {
          query += `from: ${email.value.trim()} OR `;
        });
        query = query.slice(0, query.length - 4);

        setEmailQuery(query);
        fetchEmailsByContact(
          // args: query, maxResults, pageToken, emailsArray
          query,
          maxResults,
          0, // reset page token on new contact
          emailsByContact
        );
      }
      // fetchContactGroups(nextProps.contact.membership);
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
      push,

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

      contactGroups,
      submitContactGroup,
      deleteContactGroup,
      deleteGroupContact
    } = this.props;

    return !isAuthed ? (
      <Redirect path="/" />
    ) : (
      <div>
        <Navigation />
        <ContactHeader
          contact={contact}
          isContactNew={match.params.id === "new"}
          images={contact.images}
        />

        {/* CONTACT NESTED NAV */}
        {match.params.id === "new" ? null : (
          <ContactNav contactId={contact.id} push={push} />
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
            <React.Fragment>
              <ContactGroups
                {...routeProps}
                hostId={contact.id}
                contactGroups={contactGroups}
                deleteContactGroup={deleteContactGroup}
              />
              <GroupsContainer
                hostId={contact.id}
                component="ContactGroups"
                submitFunction={submitContactGroup}
              />
            </React.Fragment>
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
  isAuthed: state.authReducer.isAuthed,
  isFetching: state.contactReducer.isFetching,
  isLoading: state.contactReducer.isLoading,
  error: state.contactReducer.error,
  contact: state.contactReducer.contact,
  contactListingsSearchResults:
    state.contactReducer.contactListingsSearchResults,
  contactGroups: state.contactReducer.contactGroups,
  contactListings: state.contactReducer.contactListings,
  emailsByContact: state.contactReducer.emailsByContact,
  emailQuery: state.emailReducer.emailQuery,
  maxResults: state.contactReducer.maxResults,
  pageToken: state.contactReducer.pageToken
});

const mapDispatchToProps = {
  push,

  fetchContact,
  submitNewContact,
  updateContact,
  deleteContact,
  deleteContactImage,
  onDrop,

  fetchEmailsByContact,
  setEmailQuery,

  searchContactListings,
  fetchContactListings,
  submitContactListing,
  deleteContactListing,
  clearContactListingsSearchResults,

  submitContactGroup,
  deleteContactGroup,

  clearContact,
  clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleContactContainer
);
