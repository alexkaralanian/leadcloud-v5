import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col, Button } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import GroupsContainer from "../GroupsContainer/GroupsContainer";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import Counter from "../../components/Counter/Counter";

import { setGroup, searchGroups } from "../../actions/group-actions";

class GroupsDashboardContainer extends React.Component {
  groupsPrimaryFunc = () => {
    const { setGroup, push } = this.props;
    setGroup({});
    push("/groups/new");
  };
  render() {
    const { isAuthed, match, isFetching } = this.props;

    return !isAuthed ? (
      <Redirect to="/" />
    ) : (
      <React.Fragment>
        <Navigation />
        <BreadCrumbs />
        <Grid>
          <Header
            isVisible={match.params.id !== "new"}
            componentName="groups"
            headerTitle="Groups"
            isNew={null}
            primaryFunc={this.groupsPrimaryFunc}
            primaryGlyph="plus"
          />

          <SearchForm
            searchText="Search Groups..."
            searchFunction={searchGroups}
          />
          <Counter />
        </Grid>

        <GroupsContainer />
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
