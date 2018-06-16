import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import SearchForm from "../../components/SearchForm/SearchForm";
import Contacts from "../../components/Contacts/Contacts";

import Navigation from "../NavContainer/NavContainer";
import Errors from "../../components/Error/Error";
// import FilterInput from "../../components/FilterInput/FilterInput";
import {
  syncContacts,
  fetchContacts,
  searchContacts,
  setContactsQuery,
  clearContacts,
  clearError
} from "../../actions/contact-actions";

import { fetchGroups } from "../../actions/group-actions";

// import { clearError } from "../../actions/common-actions";
// import "../../components/Contacts/Contacts.css";

class ContactsContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.createNewContact = this.createNewContact.bind(this);
    this.searchContacts = this.searchContacts.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    const {
      fetchContacts,
      contacts,
      contactsLimit,
      contactsOffset,
      contactsQuery,

      fetchGroups,
      groups,
      groupsLimit,
      groupsOffset,
      groupsQuery
    } = this.props;

    fetchContacts(contacts, contactsLimit, contactsOffset, contactsQuery);
    fetchGroups(groups, groupsLimit, groupsOffset, groupsQuery);

    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    const { clearError, clearContacts } = this.props;

    window.removeEventListener("scroll", this.onScroll, false);
    clearError();
    clearContacts();
  }

  onScroll() {
    const {
      isLoading,
      contacts,
      contactsLimit,
      contactsOffset,
      contactsQuery
    } = this.props;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      contacts.length &&
      !isLoading
    ) {
      this.props.fetchContacts(
        contacts,
        contactsLimit,
        contactsOffset,
        contactsQuery
      );
    }
  }

  searchContacts(values) {
    const query = values.nativeEvent.target.defaultValue;

    const {
      setContactsQuery,
      clearContacts,
      searchContacts,
      contactsLimit,
      contacts,
      fetchContacts
    } = this.props;

    setContactsQuery(query);
    if (query.length < 1) clearContacts();
    if (query.length >= 1) {
      searchContacts(contacts, contactsLimit, 0, query);
    }

    if (!query) fetchContacts([], contactsLimit, 0, "");
  }

  createNewContact() {
    this.props.history.push("/contact/new");
  }

  render() {
    const {
      history,
      isAuthed,
      isFetching,
      syncContacts,

      contacts,
      limit,
      offset,
      query,
      groups
    } = this.props;

    return !isAuthed ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Navigation />
        <Grid>
          <Row id="load-contacts-btn">
            <Col sm={6}>
              <Button
                className="submitButton"
                bsStyle="primary"
                onClick={() => history.push("/contact/new")}
              >
                <span>Create New</span>
              </Button>
            </Col>
            <Col sm={6}>
              <Button
                className="submitButton"
                bsStyle="primary"
                onClick={() => syncContacts(limit, offset, contacts)}
              >
                <span>Sync Contacts</span>
              </Button>
            </Col>
          </Row>
          <SearchForm searchFunction={this.searchContacts} />
        </Grid>
        <Contacts contacts={contacts} isFetching={isFetching} />
        {/*<Errors errorText={this.props.error} />*/}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contactReducer.contacts,
  contactsLimit: state.contactReducer.limit,
  contactsOffset: state.contactReducer.offset,
  contactsQuery: state.contactReducer.query,

  groups: state.groupReducer.groups,
  groupsLimit: state.groupReducer.limit,
  groupsOffset: state.groupReducer.offset,
  groupsQuery: state.groupReducer.query,

  isAuthed: state.authReducer.isAuthed,
  isFetching: state.contactReducer.isFetching,
  isLoading: state.contactReducer.isLoading,
  error: state.contactReducer.error
});

const mapDispatchToProps = {
  syncContacts,
  fetchContacts,
  fetchGroups,
  searchContacts,
  setContactsQuery,
  clearContacts,
  clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);
