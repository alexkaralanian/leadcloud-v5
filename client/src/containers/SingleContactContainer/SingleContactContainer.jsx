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
import SingleContactEmailsContainer from "./SingleContactEmailsContainer";
import Groups from "../../components/Groups/Groups";

import {
  fetchContact,
  submitNewContact,
  updateContact,
  deleteContact,
  clearContact,
  fetchGroups,
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
  componentDidMount() {
    const { fetchContact, fetchContactListings, match } = this.props;

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
      fetchGroups,
      emailsByContact,
      maxResults
    } = this.props;

    if (contact !== nextProps.contact) {
      if (nextProps.contact.email) {
        // Map over all contacts email addresses + create query string...
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
      fetchGroups(nextProps.contact.membership);
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
      groups,
      contactListings,
      isFetching,
      emailsByContact,
      onDrop,
      deleteContactImage
    } = this.props;

    return !this.props.isAuthed ? (
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
              groups={groups}
            />
          )}
        />

        {/* CONTACT LISTINGS */}
        <Route
          path={`/contact/${contact.id}/listings`}
          render={routeProps => (
            <SearchListings
              {...routeProps}
              contact={contact}
              contactListings={contactListings}
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
          render={routeProps => <Groups {...routeProps} groups={groups} />}
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