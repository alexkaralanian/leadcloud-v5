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

import { fetchGroup } from "../../actions/group-actions";

class SingleGroupContainer extends React.Component {
  componentDidMount() {
    const { match, fetchGroup } = this.props;

    if (match.params.id !== "new") {
      fetchGroup(match.params.id);
      // fetchGroupContacts(match.params.id);
    }
  }

  render() {
    const { isAuthed, group, match, push } = this.props;
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
              updateGroup={() => console.log("UPDATE GROUP")}
              deleteGroup={() => console.log("DELETE GROUP")}
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
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleGroupContainer
);
