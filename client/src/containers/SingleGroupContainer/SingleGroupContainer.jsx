import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Navigation from "../NavContainer/NavContainer";
import GroupContacts from "../../components/SingleGroup/GroupContacts";

import {
  fetchGroup,
  fetchGroupContacts,
  clearGroupContacts
} from "../../actions/group-actions";

class SingleGroupContainer extends React.Component {
  componentDidMount() {
    const { fetchGroup, fetchGroupContacts, match } = this.props;

    if (match.params.id !== "new") {
      fetchGroup(match.params.id);
      fetchGroupContacts(match.params.id);
    }
  }

  componentWillUnmount() {
    const { clearGroupContacts } = this.props;
  }

  render() {
    const { isAuthed, groupContacts, group, isFetching } = this.props;

    return !isAuthed ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Navigation />
        <GroupContacts
          group={group}
          groupContacts={groupContacts}
          isFetching={isFetching}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.groupReducer.isFetching,
  isAuthed: state.authReducer.isAuthed,
  group: state.groupReducer.group,
  groupContacts: state.groupReducer.groupContacts
});

const mapDispatchToProps = {
  fetchGroup,
  fetchGroupContacts,
  clearGroupContacts
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleGroupContainer
);
