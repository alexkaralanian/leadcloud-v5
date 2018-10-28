import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";

import Groups from "../../components/Groups/Groups";

import { setGroups, searchGroups } from "../../actions/group-actions";

import {
  fetchComponent,
  setQuery,
  setOffset
} from "../../actions/query-actions";

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
    const { isFetching, history, groups, component } = this.props;
    return (
      <Groups
        groups={groups}
        hostId={this.props.hostId}
        component={this.props.component}
        submitFunction={this.props.submitFunction}
      />
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
  setGroups,
  setQuery,
  setOffset,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
