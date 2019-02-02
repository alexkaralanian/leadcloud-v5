import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import Loadable from "react-loadable";

import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header-new";
import ListingNav from "./Listing/ListingNav";
import ListingForm from "./Listing/ListingForm";

import ListingContacts from "./ListingContacts/ListingContacts";
import SearchListingContacts from "./ListingContacts/SearchListingContacts";

import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import Modal from "../../components/Modal/Modal";

import OpenHouseModal from "../../components/Modal/OpenHouseModal";
import OpenHouseContainer from "./OpenHouse/OpenHouseContainer";
import Loading from "../Loading/Loading";

// import Navigation from "../NavContainer/NavContainer";
// import Emails from "../../components/Emails/Emails";

// import Loading from "../../components/Loading/Loading";
import Placeholder from "../../components/Placeholder/Placeholder";

import {
  fetchListing,
  setListing,
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

import { fetchListingEmails, setListingEmails, setPage } from "../../reducers/listing-emails";

import { setModalVisibility } from "../../actions/modal-actions";

import { fetchComponent, setQuery, setOffset, setCount } from "../../actions/query-actions";

const ListingEmails = Loadable({
  loader: () => import("./ListingEmails/ListingEmails"),
  loading: Loading
});

class ListingDashboard extends React.Component {
  state = {
    activeKey: 1,
    isContactsModalVisible: false,
    isOpenHouseModalVisible: false
  };

  componentDidMount() {
    const { match, fetchListing } = this.props;
    if (match.path !== "/listings/new") {
      fetchListing(match.params.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { listing, fetchListingEmails } = this.props;
    if (listing !== nextProps.listing) {
      fetchListingEmails(nextProps.listing.address.trim().toLowerCase());
    }
  }

  componentWillUnmount() {
    const { setListing, setListingEmails } = this.props;
    // setListing({});
    setListingEmails([]);
    setPage(1);
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
              <ListingForm isListingNew={match.path === "/listings/new"} {...routeProps} />
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
            path={`/listings/:id/contacts`}
            render={routeProps => <ListingContacts {...routeProps} />}
          />

          {/* LISTING EMAILS */}
          <Route
            path={`/listings/:id/emails`}
            render={routeProps => <ListingEmails {...routeProps} />}
          />
          {/* LISTING MEDIA */}
          <Route
            path={`/listings/:id/media`}
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
  listingContacts: state.listingContacts.listingContacts,
  images: state.listing.images,
  isFetching: state.commonReducer.isFetching
});

const mapDispatchToProps = {
  push,
  setCount,
  setOffset,
  setQuery,
  fetchComponent,
  fetchListingEmails,
  setListingEmails,
  setPage,

  fetchListing,
  setListing,
  // submitNewListing,
  // updateListing,
  // deleteListing,

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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingDashboard);
