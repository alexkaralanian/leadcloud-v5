import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";

import SearchForm from "../../components/SearchForm/SearchForm";
import Groups from "../../components/Groups/Groups";
import { setGroups, clearGroups } from "../../actions/group-actions";

import { fetchComponent, resetQuery } from "../../actions/query-actions";

class GroupsContainer extends React.Component {
  componentDidMount = () => {
    window.addEventListener("scroll", this.onScroll, false);
    const { fetchComponent, groups } = this.props;
    fetchComponent("groups", [], setGroups, null, null);
  };

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.onScroll, false);
    const { clearGroups, resetQuery } = this.props;
    clearGroups();
    resetQuery();
  };

  onScroll = () => {
    const { isLoading, fetchComponent, groups } = this.props;
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      groups.length &&
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
  isLoading: state.queryReducer.isLoading
});

const mapDispatchToProps = {
  fetchComponent,
  setGroups,
  resetQuery,
  clearGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
