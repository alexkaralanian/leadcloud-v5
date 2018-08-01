import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";

import SearchForm from "../../components/SearchForm/SearchForm";
import Groups from "../../components/Groups/Groups";
import { setGroups, clearGroups } from "../../actions/group-actions";

import {
  fetchComponent,
  setQuery,
  setOffset
} from "../../actions/query-actions";

class GroupsContainer extends React.Component {
  componentDidMount = () => {
    window.addEventListener("scroll", this.onScroll, false);
    const { fetchComponent, groups } = this.props;
    fetchComponent("groups", [], setGroups, null, null);
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.onScroll, false);
    const { clearGroups, setQuery, setOffset } = this.props;
    clearGroups();
    setQuery("");
    setOffset(0);
  };

  onScroll = () => {
    const { isLoading, count, offset, fetchComponent, groups } = this.props;
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      count > offset &&
      !isLoading
    ) {
      fetchComponent("groups", groups, setGroups);
    }
  };

  createNewGroup = () => {
    this.props.history.push("/group/new");
  };

  render = () => {
    const { isFetching, history, groups, component } = this.props;
    console.log("GROUPS", groups);
    return (
      <Grid>
        <SearchForm searchFunction={() => console.log("SEARCH  GROUPS")} />
        <Groups
          groups={groups}
          hostId={this.props.hostId}
          component={this.props.component}
          submitFunction={this.props.submitFunction}
        />
      </Grid>
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
  clearGroups,
  setQuery,
  setOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
