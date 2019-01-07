import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import Groups from "../../components/Groups/Groups";
import SearchForm from "../../components/SearchForm/SearchForm";
import Loading from "../../components/Loading/Loading";
import Placeholder from "../../components/Placeholder/Placeholder";

import { setGroups, searchGroups } from "../../actions/group-actions";

import { fetchComponent, setQuery, setOffset } from "../../actions/query-actions";

class GroupsContainer extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
    const { fetchComponent, groups } = this.props;
    fetchComponent("groups", [], setGroups, null, null);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    const { clearGroups, setQuery, setOffset } = this.props;
    setGroups([]);
    setQuery("");
    setOffset(0);
  }

  onScroll = () => {
    const { isLoading, count, offset, fetchComponent, groups } = this.props;
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      count > offset &&
      !isLoading
    ) {
      fetchComponent("groups", groups, setGroups, null, null);
    }
  };

  createNewGroup = () => {
    this.props.push("/groups/new");
  };

  render = () => {
    const { isFetching, history, groups, component, searchGroups } = this.props;
    return (
      <React.Fragment>
        {isFetching ? (
          <Loading />
        ) : groups.length > 0 ? (
          <Groups
            SearchForm={<SearchForm searchText="Search..." searchFunction={searchGroups} />}
            groups={groups}
            hostId={this.props.hostId}
            component={this.props.component}
            submitFunction={this.props.submitFunction}
          />
        ) : (
          <Placeholder
            headerText="You Dont Have Any Groups Yet..."
            ctaText="Create New Group"
            ctaFunc={this.createNewGroup}
          />
        )}
      </React.Fragment>
    );
  };
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
  isLoading: state.queryReducer.isLoading,
  count: state.queryReducer.count,
  offset: state.queryReducer.offset
});

const mapDispatchToProps = {
  fetchComponent,
  searchGroups,
  setGroups,
  setQuery,
  setOffset,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
