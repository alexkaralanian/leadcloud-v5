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
  loadContacts,
  fetchContacts,
  clearContacts,
  searchContacts,
  setContactsQuery,
  clearError
} from "../../actions/contact-actions";
// import { clearError } from "../../actions/common-actions";
// import "../../components/Contacts/Contacts.css";

class ContactsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.createNewContact = this.createNewContact.bind(this);
    this.searchContacts = this.searchContacts.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    const {
      fetchContacts,
      limit,
      offset,
      contactsQuery,
      contacts
    } = this.props;

    fetchContacts(limit, offset, contactsQuery, contacts);
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    const { clearError, clearContacts } = this.props;

    window.removeEventListener("scroll", this.onScroll, false);
    clearError();
    clearContacts();
  }

  onScroll() {
    const { isLoading, limit, offset, contactsQuery, contacts } = this.props;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      contacts.length &&
      !isLoading
    ) {
      this.props.fetchContacts(limit, offset, contactsQuery, contacts);
    }
  }

  searchContacts(values) {
    const query = values.nativeEvent.target.defaultValue;
    const {
      setContactsQuery,
      clearContacts,
      searchContacts,
      limit,
      contacts,
      fetchContacts
    } = this.props;

    setContactsQuery(query);
    if (query.length < 1) clearContacts();
    if (query.length >= 1) {
      searchContacts(limit, 0, query, contacts);
    }

    if (!query) fetchContacts(limit, 0, query, contacts);
  }

  createNewContact() {
    this.props.history.push("/contact/new");
  }

  render() {
    const {
      isAuthed,
      loadContacts,
      limit,
      offset,
      contacts,
      isFetching
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
                onClick={this.createNewContact}
              >
                <span>Create New</span>
              </Button>
            </Col>
            <Col sm={6}>
              <Button
                className="submitButton"
                bsStyle="primary"
                onClick={() => loadContacts(limit, offset, contacts)}
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
  isAuthed: state.authReducer.isAuthed,
  contacts: state.contactReducer.contacts,
  contactsQuery: state.contactReducer.contactsQuery,
  // searchResults: state.contactReducer.searchResults,
  limit: state.contactReducer.limit,
  offset: state.contactReducer.offset,
  isFetching: state.contactReducer.isFetching,
  isLoading: state.contactReducer.isLoading,
  error: state.contactReducer.error
});

const mapDispatchToProps = {
  loadContacts,
  fetchContacts,
  searchContacts,
  setContactsQuery,
  clearContacts,
  clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);
