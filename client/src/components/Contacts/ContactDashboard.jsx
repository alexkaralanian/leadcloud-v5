import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Route } from "react-router-dom";
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import Header from "../Header/Header-new";
import ContactNav from "./Contact/ContactNav";

import ContactForm from "./Contact/ContactForm";

import ContactListings from "./ContactListings/ContactListings";
import SearchListingsContainer from "./ContactListings/SearchListingsContainer";

import ContactGroups from "./ContactGroups/ContactGroups";
import SearchGroupsContainer from "./ContactGroups/SearchGroupsContainer";

import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
// import EmailsContainer from "./Contact/EmailsContainer";

import Modal from "../../components/Modal/Modal";
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
    isGroupsModalVisible: false,
    dropdownOpen: false
  };

  componentDidMount() {
    const { match, fetchComponent, fetchContact, setContact } = this.props;
    setContact({});
    if (match.path !== "/contacts/new") {
      fetchContact(match.params.id);
      fetchComponent("contacts", [], setContactListings, match.params.id, "listings");
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const {
  //     location,
  //     contact,
  //     setEmailQuery,
  //     maxResults,
  //     fetchEmailsByContact,
  //     emailsByContact
  //   } = this.props;

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
  // }

  componentWillUnmount() {
    const { setContact } = this.props;
    setContact({});
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  displayListingsModal = () => {
    const { push, match } = this.props;
    push(`/contacts/${match.params.id}/listings`);
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
    // push(`/contacts/${match.params.id}/listings`);
  };

  displayGroupsModal = () => {
    const { push, match } = this.props;
    push(`/contacts/${match.params.id}/groups`);
    this.setState({
      isGroupsModalVisible: true
    });
  };

  onGroupsModalExit = () => {
    // const { push, match } = this.props;
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
          <Header>
            <div
              style={{
                display: "flex"
              }}
            >
              {contact.images && <img src={contact.images[0]} />}
              <h1>{match.path === "/contacts/new" ? "New Contact" : contact.fullName}</h1>
            </div>
            {location.pathname === `/contacts/${contact.id}/groups` && (
              <Button onClick={this.displayGroupsModal} color="primary">
                Add Groups
              </Button>
            )}
            {location.pathname === `/contacts/${contact.id}/listings` && (
              <Button onClick={this.displayListingsModal} color="primary">
                Add Listings
              </Button>
            )}

            {/*<Dropdown isOpen={this.state.dropdownOpen} color="primary" toggle={this.toggle}>
              <DropdownToggle caret>Actions</DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.displayListingsModal}>Add Listings</DropdownItem>
                <DropdownItem onClick={this.displayGroupsModal}>Add Groups</DropdownItem>
              </DropdownMenu>
            </Dropdown>*/}
          </Header>

          {/* CONTACT NAV */}
          {location.pathname !== "/contacts/new" && <ContactNav push={push} contact={contact} />}

          {/* CONTACT FORM */}
          <Route
            exact
            path={
              location.pathname === "/contacts/new" ? `/contacts/new` : `/contacts/${contact.id}`
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
            render={routeProps => <ContactGroups {...routeProps} />}
          />

          {/* CONTACT EMAILS */}
          <Route
            path={`/contacts/:id/emails`}
            // render={routeProps => <EmailsContainer {...routeProps} />}
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