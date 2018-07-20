import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import GroupContacts from "../../components/GroupContacts/GroupContacts";

import { fetchGroup } from "../../actions/group-actions";
import { fetchComponent, resetQuery } from "../../actions/query-actions";

import {
  setGroupContacts,
  clearGroupContacts,
  searchGroupContacts,
  submitGroupContact,
  deleteGroupContact
} from "../../actions/group-contacts-actions";

class GroupContactsContainer extends React.Component {
  componentDidMount = () => {
    window.addEventListener("scroll", this.onScroll, false);
    const { match, fetchComponent, groupContacts, group } = this.props;
    if (match.params.id !== "new") {
      fetchComponent("groups", [], setGroupContacts, group.id, "contacts");
    }
  };

  componentWillUnmount = () => {
    const { resetQuery, clearGroupContacts } = this.props;
    window.removeEventListener("scroll", this.onScroll, false);
    clearGroupContacts();
    resetQuery();
  };

  onScroll = () => {
    const { isLoading, fetchComponent, groupContacts, groupId } = this.props;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      groupContacts.length &&
      !isLoading
    ) {
      fetchComponent(
        "groups",
        groupContacts,
        setGroupContacts,
        groupId,
        "contacts"
      );
    }
  };

  render = () => {
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
      <div>
        <GroupContacts
          searchGroupContacts={searchGroupContacts}
          isFetching={isFetching}
          group={group}
          groupContacts={groupContacts}
          groupContactsSearchResults={groupContactsSearchResults}
          submitGroupContact={submitGroupContact}
          deleteGroupContact={deleteGroupContact}
        />
      </div>
    );
  };
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  isFetching: state.commonReducer.isFetching,
  isLoading: state.queryReducer.isLoading,
  group: state.groupReducer.group,
  groupContacts: state.groupContactsReducer.groupContacts
  // groupContactsSearchResults: state.groupReducer.groupContactsSearchResults
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
