import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Route, Redirect } from "react-router-dom";
import { Grid } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header-old";
import ContactNav from "../../components/SingleContact/ContactNav";
import ContactListings from "../../components/ContactListings/ContactListings";
import ContactForm from "../../components/SingleContact/ContactForm";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import SingleContactEmailsContainer from "./SingleContactEmailsContainer";
import ContactGroups from "../../components/ContactGroups/ContactGroups";
import Modal from "../../components/Modal/Modal";
import SearchListingsContainer from "../SearchListingsContainer/SearchListingsContainer";
import SearchGroupsContainer from "../SearchGroupsContainer/SearchGroupsContainer";

import { clearError } from "../../actions/common-actions";

import {
  fetchComponent,
  setQuery,
  setOffset,
  setCount
} from "../../actions/query-actions";

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
  deleteContactListing,
  searchDiffedContactListings,
  setDiffedContactListings
} from "../../actions/contact-listings-actions";

import {
  submitContactGroups,
  deleteContactGroup,
  searchContactGroups,
  setDiffedContactGroups,
  searchDiffedContactGroups
} from "../../actions/contact-groups-actions";

import {
  fetchEmailsByContact,
  setEmailQuery
} from "../../actions/email-actions";

class SingleContactContainer extends React.Component {
  state = {
    activeKey: 1,
    isListingsModalVisible: false,
    isGroupsModalVisible: false
  };

  componentDidMount() {
    const {
      match,
      fetchComponent,
      fetchContact,
      setContact,
      setOffset
    } = this.props;

    setContact({});
    setOffset(0);

    if (match.path !== "/contacts/new") {
      fetchContact(match.params.id);
      fetchComponent(
        "contacts",
        [],
        setContactListings,
        match.params.id,
        "listings"
      );
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

    if (contact !== nextProps.contact) {
      if (nextProps.contact.email) {
        let query = "";
        nextProps.contact.email.forEach(email => {
          query += `from: ${email.value.trim()} OR `;
        });
        query = query.slice(0, query.length - 4);

        setEmailQuery(query);
        fetchEmailsByContact(
          // args: query, maxResults, pageToken, emailsArray
          query,
          maxResults,
          0, // reset page token on new contact
          emailsByContact
        );
      }
    }
  }

  componentWillUnmount() {
    const { setContact, setOffset } = this.props;
    setOffset(0);
    setContact({});
  }

  onMenuSelect = (eventKey, path) => {
    const { push, contact } = this.props;

    if (eventKey === 1) {
      push(`/contacts/${contact.id}`);
      this.setState({ activeKey: 1 });
    }

    if (eventKey === 2) {
      push(`/contacts/${contact.id}/listings`);
      this.setState({ activeKey: 2 });
    }

    if (eventKey === 3) {
      push(`/contacts/${contact.id}/groups`);
      this.setState({ activeKey: 3 });
    }

    if (eventKey === 4) {
      push(`/contacts/${contact.id}/emails`);
      this.setState({ activeKey: 4 });
    }

    if (eventKey === 5) {
      push(`/contacts/${contact.id}/media`);
      this.setState({ activeKey: 5 });
    }
  };

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

    return !isAuthed ? (
      <Redirect path="/" />
    ) : (
      <React.Fragment>
        <BreadCrumbs />
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

        {/* CONTACT NESTED NAV */}
        {match.path !== "/contacts/new" && (
          <ContactNav
            activeKey={this.state.activeKey}
            onMenuSelect={this.onMenuSelect}
          />
        )}

        {/* CONTACT FORM */}
        <Route
          exact
          path={
            match.path === "/contacts/new"
              ? `/contacts/new`
              : `/contacts/${contact.id}`
          }
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
              displayModal={this.displayListingsModal}
              submitFunction={this.submitListings}
              hostComponent={contact}
              setFunction={setDiffedContactListings}
              searchFunction={searchDiffedContactListings}
            />
          }
        />
        <Route
          path={`/contacts/${contact.id}/listings`}
          render={routeProps => (
            <ContactListings
              {...routeProps}
              contact={contact}
              contactListings={contactListings}
              searchContactListings={searchContactListings}
              deleteContactListing={deleteContactListing}
            />
          )}
        />

        {/* CONTACT GROUPS */}
        <Modal
          displayModal={this.displayGroupsModal}
          onExit={this.onGroupsModalExit}
          isModalVisible={this.state.isGroupsModalVisible}
          title={contact.fullName}
          Container={
            <SearchGroupsContainer
              displayModal={this.displayGroupsModal}
              submitFunction={this.submitGroups}
              hostComponent={contact}
              componentGroups={contactGroups}
              setFunction={setDiffedContactGroups}
              searchFunction={searchDiffedContactGroups}
            />
          }
        />
        <Route
          path={`/contacts/${contact.id}/groups`}
          render={routeProps => (
            <React.Fragment>
              <ContactGroups
                contact={contact}
                contactGroups={contactGroups}
                searchContactGroups={searchContactGroups}
                deleteContactGroup={deleteContactGroup}
              />
            </React.Fragment>
          )}
        />

        {/* CONTACT EMAILS */}
        <Route
          path={`/contacts/${contact.id}/emails`}
          render={routeProps => (
            <SingleContactEmailsContainer {...routeProps} />
          )}
        />

        {/* CONTACT MEDIA */}
        <Route
          path={`/contacts/${contact.id}/media`}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
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

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleContactContainer
);
