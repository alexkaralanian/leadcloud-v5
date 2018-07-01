import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Grid, Row, Col, Button } from "react-bootstrap";
import Navigation from "../NavContainer/NavContainer";

import GroupHeader from "../../components/SingleGroup/GroupHeader";
import GroupForm from "../../components/SingleGroup/GroupForm";
import GroupContactsContainer from "../GroupContactsContainer/GroupContactsContainer";
import GroupNav from "../../components/SingleGroup/GroupNav";

import {
  fetchGroup,
  submitNewGroup,
  updateGroup,
  deleteGroup
} from "../../actions/group-actions";

class SingleGroupContainer extends React.Component {
  componentDidMount() {
    const { match, fetchGroup } = this.props;

    if (match.params.id !== "new") {
      fetchGroup(match.params.id);
      // fetchGroupContacts(match.params.id);
    }
  }

  render() {
    const {
      isAuthed,
      match,
      push,
      group,
      submitNewGroup,
      updateGroup,
      deleteGroup
    } = this.props;
    return (
      <div>
        <Navigation />
        <GroupHeader isGroupNew={match.params.id === "new"} group={group} />
        {match.params.id === "new" ? null : (
          <GroupNav
            groupId={match.params.id}
            isGroupNew={match.params.id === "new"}
            push={push}
          />
        )}

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

        <Route
          exact
          path={`/group/${group.id}/contacts`}
          render={routeProps => (
            <GroupContactsContainer {...routeProps} groupId={group.id} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  group: state.groupReducer.group,
  isAuthed: state.authReducer.isAuthed
});

const mapDispatchToProps = {
  fetchGroup,
  submitNewGroup,
  updateGroup,
  deleteGroup,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleGroupContainer
);
