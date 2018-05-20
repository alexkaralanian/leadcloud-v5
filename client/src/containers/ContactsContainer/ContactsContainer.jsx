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
import "../../components/Contacts/Contacts.css";
import "../../index.css";

class ContactsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.createNewContact = this.createNewContact.bind(this);
    this.searchContacts = this.searchContacts.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.props.fetchContacts(
      this.props.limit,
      this.props.offset,
      this.props.contactsQuery,
      this.props.contacts
    );
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    this.props.clearError();
    this.props.clearContacts();
  }

  onScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.props.contacts.length &&
      !this.props.isLoading
    ) {
      this.props.fetchContacts(
        this.props.limit,
        this.props.offset,
        this.props.contactsQuery,
        this.props.contacts
      );
    }
  }

  searchContacts(values) {
    const query = values.nativeEvent.target.defaultValue;
    this.props.setContactsQuery(query);
    if (query.length < 1) this.props.clearContacts();
    if (query.length >= 1) {
      this.props.searchContacts(
        this.props.limit,
        0,
        query,
        this.props.contacts
      );
    }

    if (!query)
      this.props.fetchContacts(this.props.limit, 0, query, this.props.contacts);
  }

  createNewContact() {
    this.props.history.push("/contact/new");
  }

  render() {
    return !this.props.isAuthed ? (
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
                onClick={() =>
                  this.props.loadContacts(
                    this.props.limit,
                    this.props.offset,
                    this.props.contacts
                  )
                }
              >
                <span>Sync Contacts</span>
              </Button>
            </Col>
          </Row>
          <SearchForm searchFunction={this.searchContacts} />
        </Grid>
        <Contacts
          contacts={this.props.contacts}
          isFetching={this.props.isFetching}
        />
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
