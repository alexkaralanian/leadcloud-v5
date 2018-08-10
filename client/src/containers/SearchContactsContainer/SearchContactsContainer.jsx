import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import SearchForm from "../../components/SearchForm/SearchForm";
import Contacts from "../../components/Contacts/Contacts";
import Navigation from "../NavContainer/NavContainer";
import Errors from "../../components/Error/Error";
import Pills from "../../components/Pills/Pills";

import { setModalVisibility } from "../../actions/modal-actions";
import {
  fetchComponent,
  setQuery,
  setOffset
} from "../../actions/query-actions";
import { setError, clearError } from "../../actions/common-actions";
import {
  syncContacts,
  setContacts,
  searchContacts2,
  clearContacts
} from "../../actions/contact-actions";
import {
  submitGroupContacts,
  addSelectedContact,
  deleteSelectedContact
} from "../../actions/group-contacts-actions";
import TableRow from "../../components/TableRow/TableRow";

class SearchContactsContainer extends React.Component {
  componentDidMount() {
    const { fetchComponent, setQuery, setOffset } = this.props;
    setQuery("");
    setOffset(0);
    fetchComponent("contacts", [], setContacts, null, null);
  }

  componentWillUnmount() {
    const { clearError, clearContacts, resetQuery } = this.props;
    clearError();
    clearContacts();
    setQuery("");
    setOffset(25);
  }

  render() {
    const {
      isFetching,
      contacts,
      submitFunction,
      group,
      submitGroupContacts,
      selectedContacts
    } = this.props;

    return (
      <React.Fragment>
        <div className="modal_search-container">
          <SearchForm
            searchFunction={searchContacts2}
            searchText={"Search Contacts..."}
          />
          <Button
            className="button"
            onClick={() => submitGroupContacts(selectedContacts, group.id)}
            bsStyle="primary"
          >
            Submit Contacts
          </Button>
        </div>
        <div className="modal_pills-container">
          <Pills
            component={selectedContacts}
            componentName="contact"
            submitFunction={deleteSelectedContact}
            displayValue="fullName"
          />
        </div>
        {contacts.length > 0 && (
          <TableRow
            componentName="contact"
            rowText="fullName"
            collection={contacts}
            submitFunction={addSelectedContact}
            buttonText={"Add Contact"}
            buttonStyle={"warning"}
            hostComponent={group}
            isModal={true}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contactReducer.contacts,
  group: state.groupReducer.group,
  selectedContacts: state.groupContactsReducer.selectedContacts,
  isAuthed: state.authReducer.isAuthed,
  isLoading: state.queryReducer.isLoading,
  isFetching: state.commonReducer.isFetching,
  error: state.commonReducer.error
});

const mapDispatchToProps = {
  syncContacts,
  fetchComponent,
  clearContacts,
  clearError,
  setModalVisibility,
  submitGroupContacts,
  setQuery,
  setOffset,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchContactsContainer
);