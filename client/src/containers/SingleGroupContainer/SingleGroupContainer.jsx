import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap";
import Navigation from "../NavContainer/NavContainer";

import Header from "../../components/Header/Header";
import GroupForm from "../../components/SingleGroup/GroupForm";
import GroupContactsContainer from "../GroupContactsContainer/GroupContactsContainer";
import GroupNav from "../../components/SingleGroup/GroupNav";

import Modal from "../../components/Modal/Modal";

import {
  fetchGroup,
  submitNewGroup,
  updateGroup,
  deleteGroup
} from "../../actions/group-actions";

import { setModalVisibility } from "../../actions/modal-actions";
import { submitGroupContact } from "../../actions/group-contacts-actions";

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
      push(`/group/${groupId}/contacts`);
      this.setState({ activeKey: 1 });
    }

    if (eventKey === 2) {
      push(`/group/${groupId}`);
      this.setState({ activeKey: 2 });
    }

    if (eventKey === 3) {
      push(`/group/${groupId}/media`);
      this.setState({ activeKey: 3 });
    }
  };

  headerPrimaryFuncSwitch = path => {
    const { group, setModalVisibility } = this.props;
    switch (path) {
      case `/group/${group.id}/contacts`:
        return () => setModalVisibility(true);
    }
  };

  headerPrimaryGlyphSwitch = path => {
    const { group } = this.props;
    switch (path) {
      case `/group/${group.id}/contacts`:
        return "plus";
    }
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
      submitGroupContact,
      isModalVisible,
      setModalVisibility
    } = this.props;

    const path = this.props.history.location.pathname;

    return (
      <React.Fragment>
        <Navigation />
        {isModalVisible && <Modal displayModal={setModalVisibility} />}
        <Header
          componentName="Group"
          headerTitle={group.title}
          isNew={match.params.id === "new"}
          primaryFunc={this.headerPrimaryFuncSwitch(path)}
          primaryGlyph={this.headerPrimaryGlyphSwitch(path)}
        />
        {match.params.id !== "new" && (
          <GroupNav
            groupId={match.params.id}
            isGroupNew={match.params.id === "new"}
            push={push}
            activeKey={this.state.activeKey}
            onMenuSelect={this.onMenuSelect}
          />
        )}

        {/* GROUP CONTACTS*/}
        <Route
          exact
          path={`/group/${group.id}/contacts`}
          render={routeProps => <GroupContactsContainer {...routeProps} />}
        />

        {/* GROUP INFO */}
        <Route
          exact
          path={match.params.id === "new" ? `/group/new` : `/group/${group.id}`}
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
  submitGroupContact,
  updateGroup,
  deleteGroup,
  setModalVisibility,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleGroupContainer
);
