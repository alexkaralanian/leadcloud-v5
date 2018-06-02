import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Navigation from "../NavContainer/NavContainer";
import GroupContacts from "../../components/SingleGroup/GroupContacts";

import { fetchGroup, fetchGroupContacts } from "../../actions/group-actions";

class SingleGroupContainer extends React.Component {
  componentDidMount() {
    const { fetchGroup, fetchGroupContacts, match } = this.props;

    if (match.params.id !== "new") {
      fetchGroup(match.params.id);
      fetchGroupContacts(match.params.id);
    }
  }

  componentWillUnmount() {
    const {} = this.props;
  }

  render() {
    const { isAuthed, groupContacts, group } = this.props;
    console.log("GROUP ", group);

    return !isAuthed ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Navigation />
        <GroupContacts group={group} groupContacts={groupContacts} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  group: state.groupReducer.group,
  groupContacts: state.groupReducer.groupContacts
});

const mapDispatchToProps = {
  fetchGroup,
  fetchGroupContacts
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleGroupContainer
);
