import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Groups from "../../components/Groups/Groups";
import Navigation from "../NavContainer/NavContainer";
import { fetchGroups, clearGroups } from "../../actions/group-actions";

class GroupsContainer extends React.Component {
  componentDidMount() {
    const { fetchGroups, groups, limit, offset, query } = this.props;
    fetchGroups(groups, limit, offset, query);
  }

  componentWillUnmount() {
    const { clearGroups } = this.props;
    clearGroups();
  }

  render() {
    const { isAuthed, isFetching, groups } = this.props;

    return !isAuthed ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Navigation />
        <Groups isFetching={isFetching} groups={groups} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  groups: state.groupReducer.groups,
  limit: state.groupReducer.limit,
  offset: state.groupReducer.offset,
  query: state.groupReducer.query,
  isFetching: state.groupReducer.isFetching
});

const mapDispatchToProps = { fetchGroups, clearGroups };

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
