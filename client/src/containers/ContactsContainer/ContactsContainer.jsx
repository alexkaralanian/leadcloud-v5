import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { push } from "react-router-redux";
import { Grid } from "react-bootstrap";

import Contacts from "../../components/Contacts/Contacts";
import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header-old";
import SearchForm from "../../components/SearchForm/SearchForm";
import Counter from "../../components/Counter/Counter";
import Loading from "../../components/Loading/Loading";
import Placeholder from "../../components/Placeholder/Placeholder";

import {
  fetchComponent,
  setQuery,
  setOffset,
  setCount
} from "../../actions/query-actions";

import { clearFormData } from "../../actions/common-actions";

import {
  syncContacts,
  setContacts,
  searchContacts
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

  render() {
    const {
      push,
      isAuthed,
      isFetching,
      syncContacts,
      contacts,
      isSearching
    } = this.props;

    console.log("IS SEARCHING", isSearching);

    return !isAuthed ? (
      <Redirect to="/auth" />
    ) : (
      <React.Fragment>
        <BreadCrumbs />
        <Header
          isVisible={true}
          componentName="contacts"
          headerTitle="Contacts"
          isNew={null}
          primaryText="Create New"
          primaryFunc={() => push("/contacts/new")}
          primaryGlyph="plus"
        />
        {isFetching ? (
          <Loading />
        ) : contacts.length > 0 || isSearching ? (
          <Contacts
            contacts={contacts}
            isFetching={isFetching}
            SearchForm={
              <SearchForm
                searchFunction={searchContacts}
                searchText="Search..."
              />
            }
          />
        ) : (
          <Placeholder
            headerText="You Dont Have Any Contacts Yet..."
            ctaText="Sync Google Contacts"
            ctaFunc={syncContacts}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isSearching: state.contactReducer.isSearching,
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
