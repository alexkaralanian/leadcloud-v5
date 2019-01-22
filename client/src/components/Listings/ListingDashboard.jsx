import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header-new";
import ListingNav from "./Listing/ListingNav";
import ListingForm from "./Listing/ListingForm";

import ListingContacts from "./ListingContacts";
import SearchListingContacts from "./ListingContacts/SearchListingContacts";

import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import Modal from "../../components/Modal/Modal";

import OpenHouseModal from "../../components/Modal/OpenHouseModal";
import OpenHouseContainer from "./OpenHouse/OpenHouseContainer";

// import Navigation from "../NavContainer/NavContainer";
// import Emails from "../../components/Emails/Emails";

// import Loading from "../../components/Loading/Loading";
import Placeholder from "../../components/Placeholder/Placeholder";

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

import { fetchComponent, setQuery, setOffset, setCount } from "../../actions/query-actions";

class ListingDashboard extends React.Component {
  state = {
    activeKey: 1,
    isContactsModalVisible: false,
    isOpenHouseModalVisible: false
  };

  componentDidMount() {
    const { match, fetchComponent, fetchListing, setOffset } = this.props;

    if (match.path !== "/listings/new") {
      fetchListing(match.params.id);

      fetchComponent("listings", [], setListingContacts, match.params.id, "contacts");
    }
  }

  componentWillUnmount() {
    const { setListing, setQuery, setOffset } = this.props;
    setOffset(0);
    setListing({});
  }

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

  render() {
    const {
      isAuthed,
      match,
      location,
      push,

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

    return (
      <React.Fragment>
        <div>
          <BreadCrumbs />
          <Header>
            <div
              style={{
                display: "flex"
              }}
            >
              {listing.images && <img src={listing.images[0]} />}
              <h1>{match.path === "/listings/new" ? "New Listing" : listing.address}</h1>
            </div>
            {location.pathname === `/listings/${listing.id}` && (
              <Button onClick={this.displayOpenHouseModal} color="primary">
                Launch Open House
              </Button>
            )}
            {location.pathname === `/listings/${listing.id}/contacts` && (
              <Button onClick={this.displayContactsModal} color="primary">
                Add Listing Contacts
              </Button>
            )}
          </Header>

          {match.path !== "/listings/new" && <ListingNav push={push} listing={listing} />}

          {/* LISTING FORM  */}
          <OpenHouseModal
            displayModal={this.displayOpenHouseModal}
            onExit={this.onOpenHouseModalExit}
            isModalVisible={this.state.isOpenHouseModalVisible}
            title={listing.address}
            Container={<OpenHouseContainer />}
          />
          <Route
            exact
            path={match.path === "/listings/new" ? `/listings/new` : `/listings/${listing.id}`}
            render={routeProps => (
              <ListingForm
                {...routeProps}
                updateListing={updateListing}
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
              <SearchListingContacts
                displayModal={this.displayContactsModal}
                submitContacts={this.submitContacts}
                listing={listing}
              />
            }
          />
          <Route
            path={`/listings/${listing.id}/contacts`}
            render={routeProps =>
              listingContacts.length > 0 ? (
                <ListingContacts
                  {...routeProps}
                  listing={listing}
                  listingContacts={listingContacts}
                  searchListingContacts={searchListingContacts}
                  deleteListingContact={deleteListingContact}
                />
              ) : (
                <Placeholder
                  headerText={`${listing.address} doesn't have any contacts yet...`}
                  ctaText="Add Listing Contacts"
                  ctaFunc={this.displayContactsModal}
                />
              )
            }
          />

          {/* LISTING EMAILS */}
          <Route
            path={`/listings/${listing.id}/emails`}
            // render={routeProps => <Emails {...routeProps} contacts={null} />}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  listing: state.listing.listing,
  listingContacts: state.listing.listingContacts,
  images: state.listing.images,
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

ListingDashboard.propTypes = {
  listing: PropTypes.object.isRequired,
  submitNewListing: PropTypes.func.isRequired,
  fetchListing: PropTypes.func.isRequired,
  updateListing: PropTypes.func.isRequired,
  deleteListing: PropTypes.func.isRequired,
  deleteListingContact: PropTypes.func.isRequired
};

export const Unwrapped = ListingDashboard;
export default connect(mapStateToProps, mapDispatchToProps)(ListingDashboard);
