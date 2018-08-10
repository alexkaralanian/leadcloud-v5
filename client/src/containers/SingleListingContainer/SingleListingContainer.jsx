import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Col, Row } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header";
import ListingNav from "../../components/SingleListing/ListingNav";
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
  state = {
    activeKey: 1
  };

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

  onMenuSelect = (eventKey, path) => {
    const { push, listing } = this.props;

    if (eventKey === 1) {
      push(`/listings/${listing.id}`);
      this.setState({ activeKey: 1 });
    }

    if (eventKey === 2) {
      push(`/listings/${listing.id}/contacts`);
      this.setState({ activeKey: 2 });
    }

    if (eventKey === 3) {
      push(`/listings/${listing.id}/emails`);
      this.setState({ activeKey: 3 });
    }

    if (eventKey === 4) {
      push(`/listings/${listing.id}/media`);
      this.setState({ activeKey: 4 });
    }
  };

  render() {
    const {
      match,
      push,
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
        <BreadCrumbs />

        {/* HEADER */}
        <Grid>
          <Header
            componentName="Listing"
            headerTitle={listing.address}
            isNew={match.params.id === "new"}
            images={listing.images}
          />
        </Grid>

        {match.params.id !== "new" && (
          <Grid>
            <ListingNav
              activeKey={this.state.activeKey}
              onMenuSelect={this.onMenuSelect}
            />
          </Grid>
        )}

        {/* LISTING FORM (INFO) */}
        <Route
          exact
          path={
            match.params.id === "new"
              ? `/listings/new`
              : `/listings/${listing.id}`
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
          path={`/listings/${listing.id}/contacts`}
          render={routeProps => (
            <div>
              <ListingContacts
                {...routeProps}
                listing={listing}
                listingContacts={listingContacts}
                listingContactsSearchResults={listingContactsSearchResults}
                searchContacts={searchListingContacts}
                submitListingContact={submitListingContact}
                deleteListingContact={deleteListingContact}
              />
            </div>
          )}
        />

        {/* LISTING EMAILS */}
        <Route
          path={`/listings/${listing.id}/emails`}
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
          path={`/listings/${listing.id}/media`}
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
    state.listingReducer.listingContactsSearchResults,
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
  deleteListingImage,
  push
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
