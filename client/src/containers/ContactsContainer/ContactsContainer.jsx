import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import SearchForm from "../../components/SearchForm/SearchForm";
import Contacts from "../../components/Contacts/Contacts";
import Navigation from "../NavContainer/NavContainer";
import Errors from "../../components/Error/Error";

import { fetchComponent, resetQuery } from "../../actions/query-actions";

import {
  syncContacts,
  setContacts,
  searchContacts,
  clearContacts,
  clearError
} from "../../actions/contact-actions";

// import { fetchGroups } from "../../actions/group-actions";

// import { clearError } from "../../actions/common-actions";
// import "../../components/Contacts/Contacts.css";

class ContactsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.createNewContact = this.createNewContact.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    const {
      fetchComponent,
      searchConacts,
      contacts

      // fetchGroups,
      // groups,
      // groupsLimit,
      // groupsOffset,
      // groupsQuery
    } = this.props;

    fetchComponent("contacts", contacts, setContacts);
    // fetchGroups(groups, groupsLimit, groupsOffset, groupsQuery);

    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    const { clearError, clearContacts, resetQuery } = this.props;

    window.removeEventListener("scroll", this.onScroll, false);
    clearError();
    clearContacts();
    resetQuery();
  }

  onScroll() {
    const { isLoading, contacts, fetchComponent } = this.props;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      contacts.length &&
      !isLoading
    ) {
      fetchComponent("contacts", contacts, setContacts);
    }
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
          <SearchForm searchFunction={searchContacts} />
        </Grid>
        <Contacts contacts={contacts} isFetching={isFetching} />
        {/*<Errors errorText={this.props.error} />*/}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contactReducer.contacts,

  groups: state.groupReducer.groups,
  groupsLimit: state.groupReducer.limit,
  groupsOffset: state.groupReducer.offset,
  groupsQuery: state.groupReducer.query,

  isAuthed: state.authReducer.isAuthed,
  isFetching: state.contactReducer.isFetching,
  isLoading: state.queryReducer.isLoading,
  error: state.contactReducer.error
});

const mapDispatchToProps = {
  syncContacts,
  fetchComponent,
  clearContacts,
  clearError,
  resetQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);
