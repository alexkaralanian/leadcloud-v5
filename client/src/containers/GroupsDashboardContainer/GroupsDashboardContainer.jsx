import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col, Button } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";
import GroupsContainer from "../GroupsContainer/GroupsContainer";
import Header from "../../components/Header/Header";

class GroupsDashboardContainer extends React.Component {
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
          primaryFunc={() => history.push("/group/new")}
          primaryGlyph="plus"
        />
        <GroupsContainer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed
});

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GroupsDashboardContainer
);
