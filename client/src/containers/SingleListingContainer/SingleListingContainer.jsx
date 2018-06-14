import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Navigation from "../NavContainer/NavContainer";
import ListingNav from "../../components/SingleListing/ListingNav";
import ListingHeader from "../../components/SingleListing/ListingHeader";
import ListingContacts from "../../components/ListingContacts/ListingContacts";
import ListingForm from "../../components/SingleListing/ListingForm";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import Emails from "../../components/Emails/Emails";

import {
  fetchListing,
  submitNewListing,
  updateListing,
  deleteListing,
  setIsListingNew,
  clearListing,
  onDrop,
  deleteListingImage
} from "../../actions/listing-actions";

import {
  searchListingContacts,
  fetchListingContacts,
  submitListingContact,
  deleteListingContact,
  clearListingContactsSearchResults
} from "../../actions/listing-contacts-actions";

class SingleListingContainer extends React.Component {
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

  render() {
    const {
      match,
      isAuthed,
      listing,
      submitNewListing,
      updateListing,
      deleteListing,
      searchContacts,
      listingContactsSearchResults,
      listingContacts,
      submitListingContact,
      deleteListingContact,

      listingEmails,
      isFetching,
      onDrop,
      images,
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
              <ListingContacts
                {...routeProps}
                listing={listing}
                listingContacts={listingContacts}
                searchResults={listingContactsSearchResults}
                searchContacts={searchListingContacts}
                submitListingContact={submitListingContact}
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
              {...routeProps}
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

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  listing: state.listingReducer.listing,
  listingContacts: state.listingReducer.listingContacts,
  listingContactsSearchResults:
    state.contactReducer.listingContactsSearchResults,
  images: state.listingReducer.images,
  isFetching: state.listingReducer.isFetching
});

const mapDispatchToProps = {
  submitNewListing,
  setIsListingNew,

  fetchListing,
  updateListing,
  deleteListing,
  clearListing,

  searchListingContacts,
  clearListingContactsSearchResults,
  fetchListingContacts,
  submitListingContact,
  deleteListingContact,

  onDrop,
  deleteListingImage
};

SingleListingContainer.propTypes = {
  listing: PropTypes.object.isRequired,
  submitNewListing: PropTypes.func.isRequired,
  fetchListing: PropTypes.func.isRequired,
  updateListing: PropTypes.func.isRequired,
  deleteListing: PropTypes.func.isRequired,
  deleteListingContact: PropTypes.func.isRequired
};

export const Unwrapped = SingleListingContainer;

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleListingContainer
);
