import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Route, Redirect } from "react-router-dom";
import { Grid, Col, Row } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header";
import ContactNav from "../../components/SingleContact/ContactNav";
import ContactListings from "../../components/ContactListings/ContactListings";
import ContactForm from "../../components/SingleContact/ContactForm";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import Pills from "../../components/Pills/Pills";

import SingleContactEmailsContainer from "./SingleContactEmailsContainer";
import ContactGroups from "../../components/ContactGroups/ContactGroups";
import GroupsContainer from "../GroupsContainer/GroupsContainer";

import SearchForm from "../../components/SearchForm/SearchForm";
import Counter from "../../components/Counter/Counter";
import Modal from "../../components/Modal/Modal";
import SearchListingsContainer from "../SearchListingsContainer/SearchListingsContainer";
import SearchGroupsContainer from "../SearchGroupsContainer/SearchGroupsContainer";

import { clearError, isFetching } from "../../actions/common-actions";

import {
  fetchComponent,
  setQuery,
  setOffset,
  setCount
} from "../../actions/query-actions";

import {
  fetchContact,
  submitNewContact,
  updateContact,
  deleteContact,
  clearContact,
  onDrop,
  deleteContactImage
} from "../../actions/contact-actions";

import {
  searchContactListings,
  setContactListings,
  submitContactListings,
  deleteContactListing,
  setDiffedContactListings,
  searchDiffedContactListings
} from "../../actions/contact-listings-actions";

import { searchGroups } from "../../actions/group-actions";

import {
  submitContactGroups,
  deleteContactGroup,
  setContactGroups,
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
      clearContact,
      setOffset
    } = this.props;

    clearContact();
    setOffset(0);

    if (match.params.id !== "new") {
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
    const { setContactListings, setQuery, setOffset } = this.props;
    setOffset(0);
    clearContact();
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

  displayListingsModal = bool => {
    const { setOffset, setCount, fetchComponent, contact } = this.props;
    this.setState({
      isListingsModalVisible: bool
    });
    setCount(0);
    setOffset(0);
    fetchComponent("contacts", [], setContactListings, contact.id, "listings");
  };

  submitListings = (selected, hostId) => {
    this.props.submitContactListings(selected, hostId);
    this.setState({
      isListingsModalVisible: false
    });
  };

  displayGroupsModal = bool => {
    const { setOffset, setCount, fetchComponent, contact } = this.props;
    this.setState({
      isGroupsModalVisible: bool
    });
    setCount(0);
    setOffset(0);
    fetchComponent("contacts", [], setContactGroups, contact.id, "groups");
  };

  submitGroups = (selected, hostId) => {
    this.props.submitContactGroups(selected, hostId);
    this.setState({
      isGroupsModalVisible: false
    });
  };

  headerFunc = () => {
    const { match, location, contact } = this.props;
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
      location,
      push,
      isAuthed,
      isFetching,

      contact,
      submitNewContact,
      updateContact,
      deleteContact,

      contactListings,
      searchContactListings,
      submitContactListings,
      deleteContactListing,

      contactGroups,
      searchContactGroups,
      submitContactGroups,
      deleteContactGroup,

      emailsByContact,

      onDrop,
      deleteContactImage
    } = this.props;

    return !isAuthed ? (
      <Redirect path="/" />
    ) : (
      <React.Fragment>
        <Navigation />
        <BreadCrumbs />
        <Grid>
          <Header
            isVisible={this.headerFunc().isVisible}
            componentName="Contact"
            headerTitle={contact.fullName}
            isNew={match.params.id === "new"}
            images={contact.images}
            primaryFunc={() => this.headerFunc().modalFunc(true)}
            primaryGlyph="plus"
            primaryText={this.headerFunc().modalText}
          />
        </Grid>

        {/* CONTACT NESTED NAV */}
        {match.params.id !== "new" && (
          <Grid>
            <ContactNav
              activeKey={this.state.activeKey}
              onMenuSelect={this.onMenuSelect}
            />
          </Grid>
        )}

        {/* CONTACT FORM */}
        <Route
          exact
          path={
            match.params.id === "new"
              ? `/contacts/new`
              : `/contacts/${contact.id}`
          }
          render={routeProps => (
            <ContactForm
              {...routeProps}
              onSubmit={values => {
                match.params.id === "new"
                  ? submitNewContact(values)
                  : updateContact(values, contact.id);
              }}
              deleteContact={deleteContact}
              isContactNew={match.params.id === "new"}
              contact={contact}
              fetchContact={fetchContact}
            />
          )}
        />

        {/* CONTACT LISTINGS */}
        <Modal
          displayModal={this.displayListingsModal}
          isModalVisible={this.state.isListingsModalVisible}
          title={contact.fullName}
          Container={
            <SearchListingsContainer
              displayModal={this.displayListingsModal}
              submitFunction={this.submitListings}
              hostComponent={contact}
              componentListings={contactListings}
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

        {/**** IN PROGRESS ***/}
        {/****

        setDiffedContactGroups,
        searchDiffedContactGroups,
        submitContactGroups
        deleteContactGroup
        ***/}

        <Modal
          displayModal={this.displayGroupsModal}
          isModalVisible={this.state.isGroupsModalVisible}
          title={contact.fullName}
          Container={
            <SearchGroupsContainer
              displayModal={this.displayGroupsModal}
              submitFunction={this.submitGroups}
              hostComponent={contact}
              componentListings={contactGroups}
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
        {/**** IN PROGRESS ***/}

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
  isFetching: state.contactReducer.isFetching,
  isLoading: state.contactReducer.isLoading,
  error: state.contactReducer.error,
  contact: state.contactReducer.contact,
  contactListingsSearchResults:
    state.contactReducer.contactListingsSearchResults,
  contactGroups: state.contactReducer.contactGroups,
  contactListings: state.contactReducer.contactListings,
  emailsByContact: state.contactReducer.emailsByContact,
  emailQuery: state.emailReducer.emailQuery,
  maxResults: state.contactReducer.maxResults,
  pageToken: state.contactReducer.pageToken,
  path: state.router.location.pathname,
  isModalVisible: state.modalReducer.isModalVisible
});

const mapDispatchToProps = {
  push,
  setCount,
  setOffset,
  fetchComponent,
  clearError,

  fetchContact,
  clearContact,
  submitNewContact,
  updateContact,
  deleteContact,

  deleteContactImage,
  onDrop,

  setContactListings,
  searchContactListings,
  submitContactListings,
  deleteContactListing,

  searchContactGroups,
  submitContactGroups,
  deleteContactGroup,
  searchContactGroups,

  fetchEmailsByContact,
  setEmailQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleContactContainer
);
