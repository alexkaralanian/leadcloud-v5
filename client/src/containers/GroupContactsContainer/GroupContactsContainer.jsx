import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import SearchForm from "../../components/SearchForm/SearchForm";
import SearchToggle from "../../components/SearchToggle/SearchToggle";
import TableRow from "../../components/TableRow/TableRow";

import { fetchGroup } from "../../actions/group-actions";
import {
  fetchComponent,
  setQuery,
  setOffset
} from "../../actions/query-actions";

import {
  searchContacts,
  setContacts,
  clearContacts
} from "../../actions/contact-actions";

import {
  setGroupContacts,
  setGroupContactsComponent,
  clearGroupContacts,
  searchGroupContacts,
  submitGroupContact,
  deleteGroupContact
} from "../../actions/group-contacts-actions";

class GroupContactsContainer extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
    const { match, fetchComponent, groupContacts, group } = this.props;
    if (match.params.id !== "new") {
      fetchComponent("groups", [], setGroupContacts, group.id, "contacts");
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    const { resetQuery, clearGroupContacts, setQuery, setOffset } = this.props;
    clearGroupContacts();
    setQuery("");
    setOffset(0);
  }

  onScroll = () => {
    const {
      isLoading,
      count,
      offset,
      fetchComponent,
      groupContacts,
      group
    } = this.props;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      count > offset &&
      !isLoading
    ) {
      fetchComponent(
        "groups",
        groupContacts,
        setGroupContacts,
        group.id,
        "contacts"
      );
    }
  };

  render() {
    const {
      isAuthed,
      groupContacts,
      group,
      isFetching,
      groupContactsSearchResults,
      submitGroupContact,
      deleteGroupContact
    } = this.props;

    return !isAuthed ? (
      <Redirect to="/" />
    ) : (
      <Grid>
        <Row>
          <Col xs={12}>
            <SearchForm searchFunction={searchGroupContacts} />
            <TableRow
              componentName="contact"
              rowText="fullName"
              collection={groupContacts}
              submitFunction={deleteGroupContact}
              buttonText={"Remove"}
              buttonStyle={"danger"}
              hostComponent={group}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  isFetching: state.commonReducer.isFetching,
  isLoading: state.queryReducer.isLoading,
  count: state.queryReducer.count,
  offset: state.queryReducer.offset,
  group: state.groupReducer.group,
  groupContacts: state.groupContactsReducer.groupContacts
});

const mapDispatchToProps = {
  fetchGroup,
  fetchComponent,
  clearGroupContacts,
  submitGroupContact,
  deleteGroupContact,
  setQuery,
  setOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GroupContactsContainer
);
