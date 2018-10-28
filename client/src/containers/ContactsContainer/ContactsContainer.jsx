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
    const { push, isAuthed, isFetching, syncContacts, contacts } = this.props;

    return !isAuthed ? (
      <Redirect to="/auth" />
    ) : (
      <React.Fragment>
        <BreadCrumbs />
        <div className="animated fadeIn">
          <Header
            isVisible={true}
            componentName="contacts"
            headerTitle="Contacts"
            isNew={null}
            primaryText="Create New"
            primaryFunc={() => push("/contacts/new")}
            primaryGlyph="plus"
          />

          <SearchForm searchFunction={searchContacts} searchText="Search..." />

          <Contacts contacts={contacts} isFetching={isFetching} />
        </div>
      </React.Fragment>
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
