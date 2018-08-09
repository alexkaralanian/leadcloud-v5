import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col, Button } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";
import GroupsContainer from "../GroupsContainer/GroupsContainer";
import Header from "../../components/Header/Header";
import Counter from "../../components/Counter/Counter";

import { setGroup } from "../../actions/group-actions";

class GroupsDashboardContainer extends React.Component {
  groupsPrimaryFunc = () => {
    const { history, setGroup, push } = this.props;
    setGroup({});
    push("/group/new");
  };
  render() {
    const { isAuthed, history, isFetching, push, groups } = this.props;

    return !isAuthed ? (
      <Redirect to="/" />
    ) : (
      <React.Fragment>
        <Navigation />
        <Header
          componentName="Groups"
          headerTitle="Groups"
          isNew={null}
          primaryFunc={this.groupsPrimaryFunc}
          primaryGlyph="plus"
        />
        <GroupsContainer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  count: state.queryReducer.count
});

const mapDispatchToProps = {
  push,
  setGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GroupsDashboardContainer
);
