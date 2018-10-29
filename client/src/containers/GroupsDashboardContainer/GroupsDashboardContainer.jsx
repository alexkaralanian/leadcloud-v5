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
    const { isAuthed, match, isFetching } = this.props;

    return !isAuthed ? (
      <Redirect to="/auth" />
    ) : (
      <React.Fragment>
        <Breadcrumbs />
        <div className="animated fadeIn">
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
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed
});

const mapDispatchToProps = {
  push,
  setGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GroupsDashboardContainer
);
