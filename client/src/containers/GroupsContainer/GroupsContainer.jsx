import React from "react";
import { connect } from "react-redux";

import { Grid, Row, Col, Button } from "react-bootstrap";

import SearchForm from "../../components/SearchForm/SearchForm";
import Groups from "../../components/Groups/Groups";
import { fetchGroups, clearGroups } from "../../actions/group-actions";

class GroupsContainer extends React.Component {
  constructor() {
    super();
    this.onScroll = this.onScroll.bind(this);
    this.searchGroups = this.searchGroups.bind(this);
    this.createNewGroup = this.createNewGroup.bind(this);
  }

  componentDidMount() {
    const {
      fetchGroups,
      groups,
      groupsLimit,
      groupsOffset,
      groupsQuery
    } = this.props;

    window.addEventListener("scroll", this.onScroll, false);

    fetchGroups(groups, groupsLimit, groupsOffset, groupsQuery);
  }

  componentWillUnmount() {
    const { clearGroups } = this.props;
    window.removeEventListener("scroll", this.onScroll, false);
    clearGroups();
  }

  onScroll() {
    const {
      isLoading,
      groups,
      groupsLimit,
      groupsOffset,
      groupsQuery
    } = this.props;
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      groups.length &&
      !isLoading
    ) {
      this.props.fetchGroups(groups, groupsLimit, groupsOffset, groupsQuery);
    }
  }

  searchGroups(values) {
    // const query = values.nativeEvent.target.defaultValue;
    // const {
    //   setContactsQuery,
    //   clearContacts,
    //   searchContacts,
    //   contactsLimit,
    //   contacts,
    //   fetchContacts
    // } = this.props;
    // setContactsQuery(query);
    // if (query.length < 1) clearContacts();
    // if (query.length >= 1) {
    //   searchContacts(contacts, contactsLimit, 0, query);
    // }
    // if (!query) fetchContacts([], contactsLimit, 0, "");
  }

  createNewGroup() {
    this.props.history.push("/group/new");
  }

  render() {
    const { isFetching, history, groups } = this.props;

    return (
      <div>
        <SearchForm searchFunction={() => console.log("SEARCH  GROUPS")} />
        <Groups groups={groups} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
  groupsLimit: state.groupReducer.limit,
  groupsOffset: state.groupReducer.offset,
  groupsQuery: state.groupReducer.query,
  isLoading: state.groupReducer.isLoading
});

const mapDispatchToProps = { fetchGroups, clearGroups };

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
