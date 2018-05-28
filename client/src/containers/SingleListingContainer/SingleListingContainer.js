import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import ListingNav from "../../components/SingleListing/ListingNav";
import ListingHeader from "../../components/SingleListing/ListingHeader";
import Navigation from "../NavContainer/NavContainer";
import SearchContacts from "../../components/SingleListing/SearchContacts";
import ListingForm from "../../components/SingleListing/ListingForm";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import Emails from "../../components/Emails/Emails";

import {
  submitNewListing,
  setIsListingNew,
  fetchListing,
  fetchListingContacts,
  updateListing,
  deleteListing,
  clearListing,
  submitListingContact,
  onDrop,
  deleteListingImage,
  deleteListingContact
} from "../../actions/listing-actions";

import {
  searchContacts,
  clearListingContactsSearchResults
} from "../../actions/contact-actions";

class SingleListingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.searchContacts = this.searchContacts.bind(this);
    this.submitListingContact = this.submitListingContact.bind(this);
  }

  componentDidMount() {
    const { match, fetchListing, fetchListingContacts } = this.props;

    if (match.params.id !== "new") {
      fetchListing(match.params.id);
      fetchListingContacts(match.params.id);
    }
  }

  componentWillUnmount() {
    const { clearListing } = this.props;
    clearListing();
  }

  searchContacts(values) {
    const query = values.nativeEvent.target.defaultValue;
    const {
      clearListingContactsSearchResults,
      searchContacts,
      listingContactsSearchResults
    } = this.props;

    if (query.length < 1) clearListingContactsSearchResults();
    if (query.length >= 1) {
      searchContacts(
        25,
        0,
        query,
        listingContactsSearchResults,
        "listingContacts"
      );
    }

    if (!query) clearListingContactsSearchResults();
  }

  submitListingContact(contactId, listingId) {
    const {
      submitListingContact,
      clearListingContactsSearchResults
    } = this.props;

    submitListingContact(contactId, listingId);
    clearListingContactsSearchResults();
  }

  render() {
    const {
      isAuthed,
      listing,
      match,
      images,
      submitNewListing,
      updateListing,
      deleteListing,
      listingContactsSearchResults,
      listingContacts,
      deleteListingContact,
      listingEmails,
      isFetching,
      onDrop,
      deleteListingImage
    } = this.props;

    return !isAuthed ? (
      <Redirect path="/" />
    ) : (
      <div>
        <Navigation />

        {/* HEADER */}
        <ListingHeader
          listing={listing}
          isListingNew={match.params.id === "new"}
          images={images}
        />

        {match.params.id === "new" ? null : (
          <ListingNav listingId={listing.id} />
        )}

        {/* LISTING FORM (INFO) */}
        <Route
          exact
          path={
            match.params.id === "new"
              ? `/listing/new`
              : `/listing/${listing.id}`
          }
          render={routeProps => (
            <ListingForm
              {...routeProps}
              onSubmit={values => {
                match.params.id === "new"
                  ? submitNewListing(values)
                  : updateListing(values, listing.id);
              }}
              listing={listing}
              deleteListing={deleteListing}
              isListingNew={match.params.id === "new"}
            />
          )}
        />

        {/* LISTING CONTACTS */}
        <Route
          path={`/listing/${listing.id}/contacts`}
          render={routeProps => (
            <div>
              <SearchContacts
                searchResults={listingContactsSearchResults}
                searchContacts={this.searchContacts}
                submitListingContact={this.submitListingContact}
                listing={listing}
                listingContacts={listingContacts}
                deleteListingContact={deleteListingContact}
              />
            </div>
          )}
        />

        {/* LISTING EMAILS */}
        <Route
          path={`/listing/${listing.id}/emails`}
          render={routeProps => (
            <Emails
              {...routeProps}
              contacts={listingEmails}
              isFetching={isFetching}
            />
          )}
        />

        {/* LISTING MEDIA */}
        <Route
          path={`/listing/${listing.id}/media`}
          render={routeProps => (
            <ImageCarousel
              component={listing}
              onDrop={onDrop}
              images={images}
              deleteImg={deleteListingImage}
            />
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthed: state.authReducer.isAuthed,
    listing: state.listingReducer.listing,
    listingContacts: state.listingReducer.listingContacts,
    images: state.listingReducer.images,
    isFetching: state.listingReducer.isFetching,
    listingContactsSearchResults:
      state.contactReducer.listingContactsSearchResults
  };
}

SingleListingContainer.propTypes = {
  listing: PropTypes.object.isRequired,
  submitNewListing: PropTypes.func.isRequired,
  fetchListing: PropTypes.func.isRequired,
  updateListing: PropTypes.func.isRequired,
  deleteListing: PropTypes.func.isRequired
};

export const Unwrapped = SingleListingContainer;

export default connect(mapStateToProps, {
  submitNewListing,
  setIsListingNew,
  fetchListing,
  fetchListingContacts,
  updateListing,
  deleteListing,
  clearListing,
  searchContacts,
  clearListingContactsSearchResults,
  submitListingContact,
  onDrop,
  deleteListingImage,
  deleteListingContact
})(SingleListingContainer);
