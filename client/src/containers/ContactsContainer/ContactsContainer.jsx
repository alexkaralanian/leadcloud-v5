import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import SearchForm from "../../components/SearchForm/SearchForm";
import Header from "../../components/Header/Header";
import Contacts from "../../components/Contacts/Contacts";
import Navigation from "../NavContainer/NavContainer";
import Errors from "../../components/Error/Error";
import Counter from "../../components/Counter/Counter";

import {
  fetchComponent,
  setQuery,
  setOffset,
  setCount
} from "../../actions/query-actions";

import { setError, clearError } from "../../actions/common-actions";
import {
  syncContacts,
  setContacts,
  searchContacts,
  clearContacts
} from "../../actions/contact-actions";

class ContactsContainer extends React.Component {
  componentDidMount() {
    const { fetchComponent, contacts } = this.props;
    fetchComponent("contacts", [], setContacts, null, null);
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    const { clearError, clearContacts, setQuery, setOffset } = this.props;
    window.removeEventListener("scroll", this.onScroll, false);
    // clearError();
    clearContacts();
    setQuery("");
    setOffset(0);
  }

  onScroll = () => {
    const { isLoading, offset, count, contacts, fetchComponent } = this.props;
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      count > offset &&
      !isLoading
    ) {
      fetchComponent("contacts", contacts, setContacts, null, null);
    }
  };

  createNewContact = () => {
    this.props.history.push("/contact/new");
  };

  render() {
    const {
      history,
      isAuthed,
      isFetching,
      syncContacts,
      contacts
    } = this.props;

    return !isAuthed ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Navigation />

        <Header
          componentName="Contacts"
          headerTitle="Contacts"
          isNew={null}
          primaryFunc={() => history.push("/contact/new")}
          primaryGlyph="plus"
          secondaryFunc={() => syncContacts()}
          secondaryGlyph="refresh"
        />

        <Grid>
          <SearchForm
            searchFunction={searchContacts}
            searchText="Search Contacts..."
          />
          <Counter />
        </Grid>
        <Contacts contacts={contacts} isFetching={isFetching} />
        {/*<Errors errorText={this.props.error} />*/}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contactReducer.contacts,
  isAuthed: state.authReducer.isAuthed,
  isLoading: state.queryReducer.isLoading,
  isFetching: state.commonReducer.isFetching,
  error: state.commonReducer.error,
  count: state.queryReducer.count,
  offset: state.queryReducer.offset
});

const mapDispatchToProps = {
  syncContacts,
  fetchComponent,
  clearContacts,
  clearError,
  setQuery,
  setOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);
