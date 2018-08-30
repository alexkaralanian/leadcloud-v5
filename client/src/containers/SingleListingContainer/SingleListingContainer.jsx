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
import SearchContactsContainer from "../SearchContactsContainer/SearchContactsContainer";

import OpenHouseContainer from "../OpenHouseContainer/OpenHouseContainer";

import {
  fetchListing,
  setListing,
  submitNewListing,
  updateListing,
  deleteListing,
  onDrop,
  deleteListingImage
} from "../../actions/listing-actions";

import {
  setListingContacts,
  searchListingContacts,
  submitListingContacts,
  deleteListingContact,
  searchDiffedListingContacts,
  setDiffedListingContacts
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
    activeKey: 1,
    isContactsModalVisible: false,
    isOpenHouseModalVisible: false
  };

  componentDidMount() {
    const { match, fetchComponent, fetchListing, setOffset } = this.props;

    if (match.path !== "/listings/new") {
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
    const { setListing, setQuery, setOffset } = this.props;
    setOffset(0);
    setListing({});
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

  displayOpenHouseModal = () => {
    this.setState({
      isOpenHouseModalVisible: true
    });
  };

  onOpenHouseModalExit = () => {
    this.setState({
      isOpenHouseModalVisible: false
    });
  };

  displayContactsModal = () => {
    this.setState({
      isContactsModalVisible: true
    });
  };

  submitContacts = (selected, host) => {
    this.props.submitListingContacts(selected, host);
    this.setState({
      isContactsModalVisible: false
    });
  };

  onContactsModalExit = () => {
    this.setState({
      isContactsModalVisible: false
    });
  };

  headerFunc = () => {
    const { match, location } = this.props;
    switch (location.pathname) {
      case `/listings/${match.params.id}`:
        return {
          modalFunc: this.displayOpenHouseModal,
          modalText: "Launch Open House",
          isVisible: true
        };

      case `/listings/${match.params.id}/contacts`:
        return {
          modalFunc: this.displayContactsModal,
          modalText: "Add Listing Contacts",
          isVisible: true
        };
      default:
        return {
          modalFunc: null,
          modalText: null,
          isVisible: false
        };
    }
  };

  render() {
    const {
      isAuthed,
      match,

      listing,
      submitNewListing,
      updateListing,
      deleteListing,

      listingContacts,
      searchListingContacts,
      submitListingContacts,
      deleteListingContact,

      onDrop,
      images,
      deleteListingImage
    } = this.props;

    return !isAuthed ? (
      <Redirect path="/" />
    ) : (
      <React.Fragment>
        <Navigation />
        <BreadCrumbs />

        {/* HEADER */}
        <Grid>
          <Header
            isVisible={this.headerFunc().isVisible}
            isNew={match.path === "/listings/new"}
            componentName="Listing"
            headerTitle={listing.address}
            images={listing.images}
            primaryFunc={() => this.headerFunc().modalFunc()}
            primaryGlyph="plus"
            primaryText={this.headerFunc().modalText}
          />
        </Grid>

        {match.path !== "/listings/new" && (
          <Grid>
            <ListingNav
              activeKey={this.state.activeKey}
              onMenuSelect={this.onMenuSelect}
            />
          </Grid>
        )}

        {/* LISTING FORM  */}
        <Modal
          displayModal={this.displayOpenHouseModal}
          onExit={this.onOpenHouseModalExit}
          isModalVisible={this.state.isOpenHouseModalVisible}
          title={listing.address}
          Container={<OpenHouseContainer />}
        />
        <Route
          exact
          path={
            match.path === "/listings/new"
              ? `/listings/new`
              : `/listings/${listing.id}`
          }
          render={routeProps => (
            <ListingForm
              {...routeProps}
              onSubmit={values => {
                match.path === "/listings/new"
                  ? submitNewListing(values)
                  : updateListing(values, listing.id);
              }}
              listing={listing}
              deleteListing={deleteListing}
              isListingNew={match.path === "/listings/new"}
            />
          )}
        />

        {/* LISTING CONTACTS */}
        <Modal
          displayModal={this.displayContactsModal}
          onExit={this.onContactsModalExit}
          isModalVisible={this.state.isContactsModalVisible}
          title={listing.address}
          Container={
            <SearchContactsContainer
              displayModal={this.displayContactsModal}
              submitFunction={this.submitContacts}
              hostComponent={listing}
              setFunction={setDiffedListingContacts}
              searchFunction={searchDiffedListingContacts}
            />
          }
        />
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

        {/* LISTING EMAILS
        <Route
          path={`/listings/${listing.id}/emails`}
          render={routeProps => (
            <Emails
              {...routeProps}
              contacts={null}
              isFetching={isFetching}
            />
          )}
        />*/}

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
  listingContacts: state.listingReducer.listingContacts,
  images: state.listingReducer.images,
  isFetching: state.commonReducer.isFetching
});

const mapDispatchToProps = {
  push,
  setCount,
  setOffset,
  setQuery,
  fetchComponent,

  fetchListing,
  setListing,
  submitNewListing,
  updateListing,
  deleteListing,

  setListingContacts,
  searchListingContacts,
  submitListingContacts,
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
