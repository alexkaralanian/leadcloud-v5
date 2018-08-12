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

import Modal from "../../components/Modal/Modal";

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
  setListingContacts,
  searchListingContacts,
  submitListingContacts,
  deleteListingContact
} from "../../actions/listing-contacts-actions";

import { setModalVisibility } from "../../actions/modal-actions";

import {
  fetchComponent,
  setQuery,
  setOffset,
  setCount
} from "../../actions/query-actions";

class SingleListingContainer extends React.Component {
  state = {
    activeKey: 1
  };

  componentDidMount() {
    const { match, fetchComponent, fetchListing } = this.props;

    if (match.params.id !== "new") {
      fetchListing(match.params.id);

      fetchComponent(
        "listings",
        [],
        setListingContacts,
        match.params.id,
        "contacts"
      );
    }
  }

  componentWillUnmount() {
    const { setListingContacts, setQuery, setOffset } = this.props;
    setListingContacts([]);
    setQuery("");
    setOffset(0);
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

  displayModalFunc = bool => {
    const {
      match,
      fetchComponent,
      listing,
      setModalVisibility,
      setListingContacts,
      setQuery,
      setOffset,
      setCount
    } = this.props;

    setModalVisibility(bool);
    setCount(0);
    setOffset(0);

    fetchComponent("listings", [], setListingContacts, listing.id, "contacts");
  };

  render() {
    const {
      match,
      location,
      push,
      isAuthed,
      listing,
      submitNewListing,
      updateListing,
      deleteListing,
      searchContacts,

      listingContacts,
      listingContactsSearchResults,
      submitListingContacts,
      deleteListingContact,

      listingEmails,
      isFetching,
      onDrop,
      images,
      deleteListingImage,

      isModalVisible,
      setModalVisibility,
      setQuery,
      setOffset,
      setCount
    } = this.props;

    return !isAuthed ? (
      <Redirect path="/" />
    ) : (
      <React.Fragment>
        <Navigation />
        <Modal
          displayModal={this.displayModalFunc}
          isModalVisible={isModalVisible}
          title={listing.address}
          hostComponent={listing}
          submitFunction={submitListingContacts}
        />
        <BreadCrumbs />

        {/* HEADER */}
        <Grid>
          <Header
            isVisible={
              location.pathname === `/listings/${match.params.id}/contacts`
            }
            componentName="Listing"
            headerTitle={listing.address}
            isNew={match.params.id === "new"}
            images={listing.images}
            primaryFunc={() => setModalVisibility(true)}
            primaryGlyph="plus"
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
                searchListingContacts={searchListingContacts}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  listing: state.listingReducer.listing,
  listingContacts: state.listingContactsReducer.listingContacts,
  listingContactsSearchResults:
    state.listingContactsReducer.listingContactsSearchResults,
  images: state.listingReducer.images,
  isFetching: state.listingReducer.isFetching,
  isModalVisible: state.modalReducer.isModalVisible
});

const mapDispatchToProps = {
  submitNewListing,
  setIsListingNew,

  fetchListing,
  updateListing,
  deleteListing,
  clearListing,

  searchListingContacts,
  submitListingContacts,
  deleteListingContact,

  onDrop,
  deleteListingImage,
  push,

  setModalVisibility,

  setListingContacts,
  fetchComponent,
  setQuery,
  setOffset,
  setCount
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
