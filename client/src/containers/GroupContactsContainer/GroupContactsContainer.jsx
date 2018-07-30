import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import GroupContacts from "../../components/GroupContacts/GroupContacts";
import SearchForm from "../../components/SearchForm/SearchForm";
import SearchToggle from "../../components/SearchToggle/SearchToggle";

import { fetchGroup } from "../../actions/group-actions";
import { fetchComponent, resetQuery } from "../../actions/query-actions";

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
    const { resetQuery, clearGroupContacts } = this.props;
    clearGroupContacts();
    resetQuery();
  }

  onScroll = () => {
    const groups = this.props.groupContactsComponent === "groups";
    const {
      isLoading,
      fetchComponent,
      groupContacts,
      group,
      query
    } = this.props;
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      groupContacts.length &&
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
        <SearchForm searchFunction={searchGroupContacts} />
        <GroupContacts
          isFetching={isFetching}
          collection={groupContacts}
          submitGroupContact={submitGroupContact}
          deleteGroupContact={deleteGroupContact}
          group={group}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  isFetching: state.commonReducer.isFetching,
  isLoading: state.queryReducer.isLoading,
  group: state.groupReducer.group,
  groupContacts: state.groupContactsReducer.groupContacts
});

const mapDispatchToProps = {
  fetchGroup,
  fetchComponent,
  resetQuery,
  clearGroupContacts,
  submitGroupContact,
  deleteGroupContact
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GroupContactsContainer
);
