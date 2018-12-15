import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col, Button } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import GroupsContainer from "../GroupsContainer/GroupsContainer";
import Header from "../../components/Header/Header-old";
import Counter from "../../components/Counter/Counter";

import { setGroup } from "../../actions/group-actions";

class GroupsDashboardContainer extends React.Component {
  groupsPrimaryFunc = () => {
    const { setGroup, push } = this.props;
    setGroup({});
    push("/groups/new");
  };

  render() {
    const { isAuthed, match, isFetching, groups } = this.props;

    return (
      <React.Fragment>
        <Breadcrumbs />
        <Header
          isVisible={true}
          componentName="groups"
          headerTitle="Groups"
          isNew={null}
          primaryText="Create New Group"
          primaryFunc={this.groupsPrimaryFunc}
          primaryGlyph="plus"
        />

        <GroupsContainer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups
});

const mapDispatchToProps = {
  push,
  setGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsDashboardContainer);
