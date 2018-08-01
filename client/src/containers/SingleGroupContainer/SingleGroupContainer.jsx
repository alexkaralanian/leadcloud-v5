import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap";
import Navigation from "../NavContainer/NavContainer";

import GroupHeader from "../../components/SingleGroup/GroupHeader";
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
    return (
      <React.Fragment>
        <Navigation />
        {isModalVisible && <Modal displayModal={setModalVisibility} />}
        <GroupHeader
          isGroupNew={match.params.id === "new"}
          group={group}
          displayModal={setModalVisibility}
        />
        {match.params.id === "new" ? null : (
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
