import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";

import Groups from "../../components/Groups/Groups";
import Navigation from "../NavContainer/NavContainer";
import { fetchGroups } from "../../actions/group-actions";

class GroupsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchGroups } = this.props;
    fetchGroups();
  }

  componentWillUnmount() {
    const {} = this.props;
  }

  render() {
    const { isAuthed, groups, isFetching } = this.props;

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
  isFetching: state.groupReducer.isFetching
});

const mapDispatchToProps = { fetchGroups };

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
