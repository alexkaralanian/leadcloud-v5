import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import GroupContacts from "../../components/GroupContacts/GroupContacts";

import { fetchGroup } from "../../actions/group-actions";

import {
  fetchGroupContacts,
  clearGroupContacts,
  searchGroupContacts,
  submitGroupContact,
  deleteGroupContact
} from "../../actions/group-contacts-actions";

class GroupContactsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
    const {
      fetchGroup,
      fetchGroupContacts,
      groupContacts,
      groupContactsLimit,
      groupContactsOffset,
      groupContactsQuery,
      match
    } = this.props;

    if (match.params.id !== "new") {
      fetchGroupContacts(
        this.props.groupId,
        groupContacts,
        groupContactsLimit,
        groupContactsOffset,
        groupContactsQuery
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    this.props.clearGroupContacts();
  }

  onScroll() {
    const {
      isLoading,
      groupContacts,
      groupContactsLimit,
      groupContactsOffset,
      groupContactsQuery
    } = this.props;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      groupContacts.length &&
      !isLoading
    ) {
      this.props.fetchGroupContacts(
        this.props.groupId,
        groupContacts,
        groupContactsLimit,
        groupContactsOffset,
        groupContactsQuery
      );
    }
  }

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
  }
}

const mapStateToProps = state => ({
  isFetching: state.groupReducer.isFetching,
  isLoading: state.groupReducer.isLoading,
  isAuthed: state.authReducer.isAuthed,
  group: state.groupReducer.group,
  groupContacts: state.groupReducer.groupContacts,
  groupContactsLimit: state.groupReducer.groupContactsLimit,
  groupContactsOffset: state.groupReducer.groupContactsOffset,
  groupContactsQuery: state.groupReducer.groupContactsQuery,
  groupContactsSearchResults: state.groupReducer.groupContactsSearchResults
});

const mapDispatchToProps = {
  fetchGroup,
  fetchGroupContacts,
  clearGroupContacts,
  searchGroupContacts,
  submitGroupContact,
  deleteGroupContact
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GroupContactsContainer
);
