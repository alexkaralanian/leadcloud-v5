import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Route } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header-old";
import ContactNav from "../../components/SingleContact/ContactNav";
import ContactListings from "../../components/ContactListings/ContactListings";
import SearchListingsContainer from "../../components/ContactListings/SearchListingsContainer";
import ContactForm from "../../components/SingleContact/ContactForm";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import SingleContactEmailsContainer from "./SingleContactEmailsContainer";
import ContactGroups from "../../components/ContactGroups/ContactGroups";
import Modal from "../../components/Modal/Modal";

import SearchGroupsContainer from "../SearchGroupsContainer/SearchGroupsContainer";
import Placeholder from "../../components/Placeholder/Placeholder";

import { clearError } from "../../actions/common-actions";

import { fetchComponent, setQuery, setOffset, setCount } from "../../actions/query-actions";

import {
  fetchContact,
  setContact,
  submitNewContact,
  updateContact,
  deleteContact,
  onDrop,
  deleteContactImage
} from "../../actions/contact-actions";

import {
  searchContactListings,
  setContactListings,
  submitContactListings,
  deleteContactListing
} from "../../actions/contact-listings-actions";

import {
  submitContactGroups,
  deleteContactGroup,
  searchContactGroups
} from "../../actions/contact-groups-actions";

import { fetchEmailsByContact, setEmailQuery } from "../../actions/email-actions";

class SingleContactContainer extends React.Component {
  state = {
    activeKey: 1,
    isListingsModalVisible: false,
    isGroupsModalVisible: false
  };

  componentDidMount() {
    const { match, fetchComponent, fetchContact, setContact, setOffset } = this.props;

    setContact({});
    setOffset(0);

    if (match.path !== "/contacts/new") {
      fetchContact(match.params.id);
      fetchComponent("contacts", [], setContactListings, match.params.id, "listings");
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      location,
      contact,
      setEmailQuery,
      maxResults,
      fetchEmailsByContact,
      emailsByContact
    } = this.props;

    // if (contact !== nextProps.contact) {
    //   if (nextProps.contact.email) {
    //     let query = "";
    //     nextProps.contact.email.forEach(email => {
    //       query += `from: ${email.value.trim()} OR `;
    //     });
    //     query = query.slice(0, query.length - 4);

    //     setEmailQuery(query);
    //     fetchEmailsByContact(
    //       // args: query, maxResults, pageToken, emailsArray
    //       query,
    //       maxResults,
    //       0, // reset page token on new contact
    //       emailsByContact
    //     );
    //   }
    // }
  }

  componentWillUnmount() {
    const { setContact, setOffset } = this.props;
    setOffset(0);
    setContact({});
  }

  displayListingsModal = () => {
    this.setState({
      isListingsModalVisible: true
    });
  };

  submitListings = (selected, host) => {
    this.props.submitContactListings(selected, host);
    this.setState({
      isListingsModalVisible: false
    });
  };

  onListingsModalExit = () => {
    this.setState({
      isListingsModalVisible: false
    });
  };

  displayGroupsModal = () => {
    this.setState({
      isGroupsModalVisible: true
    });
  };

  onGroupsModalExit = () => {
    this.setState({
      isGroupsModalVisible: false
    });
  };

  submitGroups = (selected, host) => {
    this.props.submitContactGroups(selected, host);
    this.setState({
      isGroupsModalVisible: false
    });
  };

  // HEADER
  headerFunc = () => {
    const { match, location } = this.props;
    switch (location.pathname) {
      case `/contacts/${match.params.id}/listings`:
        return {
          modalFunc: this.displayListingsModal,
          modalText: "Add Listings",
          isVisible: true
        };
      case `/contacts/${match.params.id}/groups`:
        return {
          modalFunc: this.displayGroupsModal,
          modalText: "Add Groups",
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
      match,
      isAuthed,
      push,

      contact,
      submitNewContact,
      updateContact,
      deleteContact,

      contactListings,
      searchContactListings,
      deleteContactListing,

      contactGroups,
      searchContactGroups,
      deleteContactGroup,

      emailsByContact,
      onDrop,
      deleteContactImage
    } = this.props;

    return (
      <React.Fragment>
        <BreadCrumbs />
        <div>
          <Header
            isVisible={this.headerFunc().isVisible}
            componentName="Contact"
            headerTitle={contact.fullName}
            isNew={match.path === "/contacts/new"}
            images={contact.images}
            primaryFunc={() => this.headerFunc().modalFunc(true)}
            primaryGlyph="plus"
            primaryText={this.headerFunc().modalText}
          />

          {/* CONTACT NAV */}
          {match.path !== "/contacts/new" && <ContactNav push={push} contact={contact} />}

          {/* CONTACT FORM */}
          <Route
            exact
            path={match.path === "/contacts/new" ? `/contacts/new` : `/contacts/${contact.id}`}
            render={routeProps => (
              <ContactForm
                {...routeProps}
                onSubmit={values => {
                  match.path === "/contacts/new"
                    ? submitNewContact(values)
                    : updateContact(values, contact.id);
                }}
                deleteContact={deleteContact}
                isContactNew={match.path === "/contacts/new"}
                contact={contact}
                fetchContact={fetchContact}
              />
            )}
          />

          {/* CONTACT LISTINGS */}
          <Modal
            displayModal={this.displayListingsModal}
            onExit={this.onListingsModalExit}
            isModalVisible={this.state.isListingsModalVisible}
            title={contact.fullName}
            Container={
              <SearchListingsContainer
                match={match}
                submitFunction={this.submitListings}
                hostComponent={contact}
              />
            }
          />
          <Route
            path={`/contacts/:id/listings`}
            render={routeProps =>
              contactListings.length > 0 ? (
                <ContactListings
                  {...routeProps}
                  contact={contact}
                  contactListings={contactListings}
                  searchContactListings={searchContactListings}
                  deleteContactListing={deleteContactListing}
                />
              ) : (
                <Placeholder
                  headerText={`${contact.fullName} doesn't have any listings yet...`}
                  ctaText="Add Listings"
                  ctaFunc={this.displayListingsModal}
                />
              )
            }
          />

          {/* CONTACT GROUPS */}
          <Modal
            displayModal={this.displayGroupsModal}
            onExit={this.onGroupsModalExit}
            isModalVisible={this.state.isGroupsModalVisible}
            title={contact.fullName}
            Container={
              <SearchGroupsContainer
                match={match}
                submitFunction={this.submitGroups}
                hostComponent={contact}
              />
            }
          />
          <Route
            path={`/contacts/:id/groups`}
            render={routeProps =>
              contactGroups.length > 0 ? (
                <ContactGroups
                  contact={contact}
                  contactGroups={contactGroups}
                  searchContactGroups={searchContactGroups}
                  deleteContactGroup={deleteContactGroup}
                />
              ) : (
                <Placeholder
                  headerText={`${contact.fullName} doesn't have any groups yet...`}
                  ctaText="Add Groups"
                  ctaFunc={this.displayGroupsModal}
                />
              )
            }
          />

          {/* CONTACT EMAILS */}
          <Route
            path={`/contacts/:id/emails`}
            render={routeProps => <SingleContactEmailsContainer {...routeProps} />}
          />

          {/* CONTACT MEDIA */}
          <Route
            path={`/contacts/:id/media`}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.commonReducer.isFetching,
  isLoading: state.commonReducer.isLoading,
  error: state.contactReducer.error,
  contact: state.contactReducer.contact,
  contactGroups: state.contactReducer.contactGroups,
  contactListings: state.contactReducer.contactListings,
  emailsByContact: state.contactReducer.emailsByContact,
  emailQuery: state.emailReducer.emailQuery,
  maxResults: state.contactReducer.maxResults,
  pageToken: state.contactReducer.pageToken,
  path: state.router.location.pathname
});

const mapDispatchToProps = {
  push,
  setCount,
  setOffset,
  setQuery,
  fetchComponent,
  clearError,

  fetchContact,
  setContact,
  submitNewContact,
  updateContact,
  deleteContact,

  deleteContactImage,
  onDrop,

  setContactListings,
  searchContactListings,
  submitContactListings,
  deleteContactListing,

  submitContactGroups,
  deleteContactGroup,
  searchContactGroups,

  fetchEmailsByContact,
  setEmailQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleContactContainer);
