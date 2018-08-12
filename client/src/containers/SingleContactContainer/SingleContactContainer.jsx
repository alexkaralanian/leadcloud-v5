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

import { setModalVisibility } from "../../actions/modal-actions";

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

import { clearError } from "../../actions/common-actions";

import {
  searchContactListings,
  setContactListings,
  submitContactListings,
  deleteContactListing
} from "../../actions/contact-listings-actions";

import {
  fetchEmailsByContact,
  setEmailQuery
} from "../../actions/email-actions";

import { searchGroups } from "../../actions/group-actions";

import {
  submitContactGroup,
  deleteContactGroup
} from "../../actions/contact-groups-actions";

class SingleContactContainer extends React.Component {
  state = {
    activeKey: 1
  };

  componentDidMount() {
    const { match, fetchComponent, fetchContact } = this.props;

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
    setContactListings([]);
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

  displayModalFunc = bool => {
    const {
      match,
      fetchComponent,
      setModalVisibility,
      contact,
      setContactListings,
      setQuery,
      setOffset,
      setCount
    } = this.props;

    setModalVisibility(bool);
    setCount(0);
    setOffset(0);

    fetchComponent("contacts", [], setContactListings, contact.id, "listings");
  };

  render() {
    const {
      match,
      location,
      isAuthed,
      push,

      contact,
      submitNewContact,
      updateContact,
      deleteContact,

      searchContactListings,
      contactListingsSearchResults,
      contactListings,
      submitContactListings,
      deleteContactListing,

      emailsByContact,
      isFetching,
      onDrop,
      deleteContactImage,

      contactGroups,
      submitContactGroup,
      deleteContactGroup,
      path,

      isModalVisible,
      setModalVisibility
    } = this.props;

    return !isAuthed ? (
      <Redirect path="/" />
    ) : (
      <div>
        <Navigation />
        <Modal
          displayModal={this.displayModalFunc}
          isModalVisible={isModalVisible}
          title={contact.fullName}
          hostComponent={contact}
          submitFunction={submitContactListings}
          Container={
            <SearchListingsContainer
              submitFunction={submitContactListings}
              hostComponent={contact}
            />
          }
        />
        <BreadCrumbs />
        <Grid>
          <Header
            isVisible={location.pathname === `/contacts/${contact.id}/listings`}
            componentName="Contact"
            headerTitle={contact.fullName}
            isNew={match.params.id === "new"}
            images={contact.images}
            primaryFunc={() => setModalVisibility(true)}
            primaryGlyph="plus"
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

        {/* CONTACT GROUPS */}
        <Route
          path={`/contacts/${contact.id}/groups`}
          render={routeProps => (
            <React.Fragment>
              <Grid>
                <Row>
                  <Col xs={12}>
                    <Pills
                      {...routeProps}
                      component={contactGroups}
                      hostComponent={contact}
                      componentName="groups"
                      submitFunction={deleteContactGroup}
                      displayValue="title"
                    />
                  </Col>
                </Row>
                <SearchForm
                  searchText="Search Groups..."
                  searchFunction={searchGroups}
                />
                <Counter />
              </Grid>

              <GroupsContainer
                hostId={contact.id}
                component="ContactGroups"
                submitFunction={submitContactGroup}
              />
            </React.Fragment>
          )}
        />

        {/* CONTACT LISTINGS */}
        <Route
          path={`/contacts/${contact.id}/listings`}
          render={routeProps => (
            <ContactListings
              {...routeProps}
              contact={contact}
              contactListings={contactListings}
              searchContactListings={searchContactListings}
              submitContactListing={submitContactListings}
              deleteContactListing={deleteContactListing}
            />
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
      </div>
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

  fetchContact,
  fetchComponent,
  submitNewContact,
  updateContact,
  deleteContact,
  deleteContactImage,
  onDrop,

  fetchEmailsByContact,
  setEmailQuery,

  searchContactListings,
  submitContactListings,
  deleteContactListing,

  submitContactGroup,
  deleteContactGroup,

  clearContact,
  clearError,

  setContactListings,
  setModalVisibility,
  setCount,
  setOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleContactContainer
);
