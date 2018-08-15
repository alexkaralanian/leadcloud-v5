import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap";
import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header";
import GroupForm from "../../components/SingleGroup/GroupForm";
import GroupContactsContainer from "../GroupContactsContainer/GroupContactsContainer";
import GroupNav from "../../components/SingleGroup/GroupNav";

import Modal from "../../components/Modal/Modal";
import SearchContactsContainer from "../SearchContactsContainer/SearchContactsContainer";

import {
  fetchGroup,
  submitNewGroup,
  updateGroup,
  deleteGroup,
  setGroup
} from "../../actions/group-actions";

import { setModalVisibility } from "../../actions/modal-actions";

import {
  submitGroupContact,
  setGroupContacts,
  submitGroupContacts
} from "../../actions/group-contacts-actions";

import {
  fetchComponent,
  setQuery,
  setOffset,
  setCount
} from "../../actions/query-actions";

class SingleGroupContainer extends React.Component {
  state = {
    activeKey: 1
  };

  componentDidMount() {
    const { match, fetchGroup } = this.props;
    if (match.params.id !== "new") {
      fetchGroup(match.params.id);
    }
  }

  onMenuSelect = eventKey => {
    const { push, match } = this.props;
    const groupId = match.params.id;

    if (eventKey === 1) {
      push(`/groups/${groupId}/contacts`);
      this.setState({ activeKey: 1 });
    }

    if (eventKey === 2) {
      push(`/groups/${groupId}`);
      this.setState({ activeKey: 2 });
    }

    if (eventKey === 3) {
      push(`/groups/${groupId}/media`);
      this.setState({ activeKey: 3 });
    }
  };

  headerPrimaryFuncSwitch = path => {
    const { group, setModalVisibility, setGroup } = this.props;
    switch (path) {
      case `/groups/${group.id}/contacts`:
        return () => {
          setModalVisibility(true);
        };
    }
  };

  headerPrimaryGlyphSwitch = path => {
    const { group } = this.props;
    switch (path) {
      case `/groups/${group.id}/contacts`:
        return "plus";
    }
  };

  displayModalFunc = bool => {
    const {
      match,
      fetchGroup,
      fetchComponent,
      group,
      setModalVisibility,
      setQuery,
      setOffset,
      setCount
    } = this.props;
    setModalVisibility(bool);
    setCount(0);
    setOffset(0);

    fetchComponent("groups", [], setGroupContacts, group.id, "contacts");
  };

  render() {
    const {
      isAuthed,
      match,
      push,
      group,
      submitNewGroup,
      updateGroup,
      deleteGroup,
      submitGroupContacts,
      isModalVisible,
      setModalVisibility
    } = this.props;

    const path = this.props.history.location.pathname;

    return (
      <React.Fragment>
        <Navigation />
        <Modal
          displayModal={this.displayModalFunc}
          isModalVisible={isModalVisible}
          title={group.title}
          Container={
            <SearchContactsContainer
              submitFunction={submitGroupContacts}
              hostComponent={group}
            />
          }
        />
        <BreadCrumbs />
        <Grid>
          <Header
            isVisible={true}
            isNew={match.params.id === "new"}
            componentName="Group"
            headerTitle={group.title}
            primaryText="Add Contacts"
            primaryFunc={() => setModalVisibility(true)}
            primaryGlyph="plus"
          />

          {match.params.id !== "new" && (
            <GroupNav
              groupId={group.id}
              isGroupNew={match.params.id === "new"}
              push={push}
              activeKey={this.state.activeKey}
              onMenuSelect={this.onMenuSelect}
            />
          )}
        </Grid>

        {/* GROUP CONTACTS*/}
        <Route
          exact
          path={`/groups/${group.id}/contacts`}
          render={routeProps => <GroupContactsContainer {...routeProps} />}
        />

        {/* GROUP INFO */}
        <Route
          exact
          path={
            match.params.id === "new" ? `/groups/new` : `/groups/${group.id}`
          }
          render={routeProps => (
            <GroupForm
              {...routeProps}
              group={group}
              isGroupNew={match.params.id === "new"}
              deleteGroup={deleteGroup}
              onSubmit={values => {
                match.params.id === "new"
                  ? submitNewGroup(values)
                  : updateGroup(values, group.id);
              }}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  group: state.groupReducer.group,
  isAuthed: state.authReducer.isAuthed,
  isModalVisible: state.modalReducer.isModalVisible
});

const mapDispatchToProps = {
  fetchGroup,
  submitNewGroup,
  submitGroupContacts,
  updateGroup,
  deleteGroup,
  setModalVisibility,
  push,
  fetchComponent,
  setQuery,
  setCount,
  setOffset,
  setGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleGroupContainer
);
