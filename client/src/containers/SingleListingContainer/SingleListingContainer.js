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
  // setSearchResult,
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
    if (this.props.match.params.id !== "new") {
      this.props.fetchListing(this.props.match.params.id);
      this.props.fetchListingContacts(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.clearListing();
  }

  searchContacts(values) {
    const query = values.nativeEvent.target.defaultValue;
    if (query.length < 1) this.props.clearListingContactsSearchResults();
    if (query.length >= 1) {
      this.props.searchContacts(
        25,
        0,
        query,
        this.props.listingContactsSearchResults,
        "listingContacts"
      );
    }

    if (!query) this.props.clearListingContactsSearchResults();
  }

  submitListingContact(contactId, listingId) {
    this.props.submitListingContact(contactId, listingId);
    this.props.clearListingContactsSearchResults();
  }

  render() {
    return !this.props.isAuthed ? (
      <Redirect path="/" />
    ) : (
      <div>
        <Navigation />

        {/* HEADER */}
        <ListingHeader
          listing={this.props.listing}
          isListingNew={this.props.match.params.id === "new"}
          images={this.props.images}
        />

        {this.props.match.params.id === "new" ? null : (
          <ListingNav listingId={this.props.listing.id} />
        )}

        {/* LISTING FORM (INFO) */}
        <Route
          exact
          path={
            this.props.match.params.id === "new"
              ? `/listing/new`
              : `/listing/${this.props.listing.id}`
          }
          render={routeProps => (
            <ListingForm
              {...routeProps}
              onSubmit={values => {
                this.props.match.params.id === "new"
                  ? this.props.submitNewListing(values)
                  : this.props.updateListing(values, this.props.listing.id);
              }}
              listing={this.props.listing}
              deleteListing={this.props.deleteListing}
              isListingNew={this.props.match.params.id === "new"}
            />
          )}
        />

        {/* LISTING CONTACTS */}
        <Route
          path={`/listing/${this.props.listing.id}/contacts`}
          render={routeProps => (
            <div>
              <SearchContacts
                searchResults={this.props.listingContactsSearchResults}
                searchContacts={this.searchContacts}
                submitListingContact={this.submitListingContact}
                listing={this.props.listing}
                listingContacts={this.props.listingContacts}
                deleteListingContact={this.props.deleteListingContact}
              />
            </div>
          )}
        />

        {/* LISTING EMAILS */}
        <Route
          path={`/listing/${this.props.listing.id}/emails`}
          render={routeProps => (
            <Emails
              {...routeProps}
              contacts={this.props.listingEmails}
              isFetching={this.props.isFetching}
            />
          )}
        />

        {/* LISTING MEDIA */}
        <Route
          path={`/listing/${this.props.listing.id}/media`}
          render={routeProps => (
            <ImageCarousel
              component={this.props.listing}
              onDrop={this.props.onDrop}
              images={this.props.images}
              deleteImg={this.props.deleteListingImage}
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
  // setSearchResult,
  onDrop,
  deleteListingImage,
  deleteListingContact
})(SingleListingContainer);
