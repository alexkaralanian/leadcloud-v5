import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { push } from "react-router-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";

import Contacts from "../../components/Contacts/Contacts";
import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import Counter from "../../components/Counter/Counter";
import Errors from "../../components/Error/Error";

import {
  fetchComponent,
  setQuery,
  setOffset,
  setCount
} from "../../actions/query-actions";

import {
  setError,
  clearError,
  clearFormData
} from "../../actions/common-actions";

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
    const { clearFormData, clearContacts, setQuery, setOffset } = this.props;
    window.removeEventListener("scroll", this.onScroll, false);
    clearFormData();
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
    this.props.push("/contact/new");
    this.props.clearFormData();
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
        <BreadCrumbs />
        <Grid>
          <Header
            isVisible={true}
            componentName="contacts"
            headerTitle="Contacts"
            isNew={null}
            primaryText="Create Contact"
            primaryFunc={() => history.push("/contacts/new")}
            primaryGlyph="plus"
            secondaryText="Sync Contacts"
            secondaryFunc={() => syncContacts()}
            secondaryGlyph="refresh"
          />

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
  clearFormData,
  setQuery,
  setOffset,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);
