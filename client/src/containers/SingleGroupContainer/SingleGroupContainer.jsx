import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header-old";
import GroupForm from "../../components/SingleGroup/GroupForm";
import GroupContactsContainer from "../GroupContactsContainer/GroupContactsContainer";
import GroupNav from "../../components/SingleGroup/GroupNav";
import Modal from "../../components/Modal/Modal";
import SearchContactsContainer from "../SearchContactsContainer/SearchContactsContainer";

import {
  fetchComponent,
  setQuery,
  setOffset,
  setCount
} from "../../actions/query-actions";

import {
  fetchGroup,
  submitNewGroup,
  updateGroup,
  deleteGroup,
  setGroup
} from "../../actions/group-actions";

import {
  submitGroupContacts,
  searchDiffedGroupContacts,
  setDiffedGroupContacts
} from "../../actions/group-contacts-actions";

class SingleGroupContainer extends React.Component {
  state = {
    activeKey: 1,
    isContactsModalVisible: false
  };

  componentDidMount() {
    const { match, fetchGroup } = this.props;
    if (match.path !== "/groups/new") {
      fetchGroup(match.params.id);
    }
  }

  componentWillUnmount() {
    const { setGroup, setOffset } = this.props;
    setOffset(0);
    setGroup({});
  }

  // GROUP SUB-NAV
  onMenuSelect = eventKey => {
    const { push, match, location } = this.props;
    const groupId = match.params.id;

    if (eventKey === 1) {
      push(`/groups/${groupId}`);
      this.setState({ activeKey: 1 });
    }

    if (eventKey === 2) {
      push(`/groups/${groupId}/contacts`);
      this.setState({ activeKey: 2 });
    }

    if (eventKey === 3) {
      push(`/groups/${groupId}/media`);
      this.setState({ activeKey: 3 });
    }
  };
  0;

  // GROUP CONTACTS MODAL
  displayContactsModal = () => {
    this.setState({
      isContactsModalVisible: true
    });
  };

  submitContacts = (selected, host) => {
    this.props.submitGroupContacts(selected, host);
    this.setState({
      isContactsModalVisible: false
    });
  };

  onContactsModalExit = () => {
    this.setState({
      isContactsModalVisible: false
    });
  };

  // HEADER
  headerFunc = () => {
    const { match, location } = this.props;
    switch (location.pathname) {
      case `/groups/${match.params.id}/contacts`:
        return {
          modalFunc: this.displayContactsModal,
          modalText: "Add Group Contacts",
          isVisible: true
        };
      default:
        return {
          modalFunc: null,
          modalText: null,
          isVisible: false
        };
    }
  };

  render() {
    const {
      // isAuthed,
      match,
      push,
      group,
      submitNewGroup,
      updateGroup,
      deleteGroup
    } = this.props;

    return (
      <React.Fragment>
        <BreadCrumbs />
        <Header
          isVisible={this.headerFunc().isVisible}
          isNew={match.path === "/groups/new"}
          componentName="Group"
          headerTitle={group.title}
          primaryFunc={() => this.headerFunc().modalFunc()}
          primaryGlyph="plus"
          primaryText={this.headerFunc().modalText}
        />

        {/* GROUP NESTED NAV */}
        {match.path !== "/groups/new" && <GroupNav push={push} group={group} />}

        {/* GROUP CONTACTS*/}
        <Modal
          displayModal={this.displayContactsModal}
          onExit={this.onContactsModalExit}
          isModalVisible={this.state.isContactsModalVisible}
          title={group.title}
          Container={
            <SearchContactsContainer
              displayModal={this.displayContactsModal}
              submitFunction={this.submitContacts}
              hostComponent={group}
              setFunction={setDiffedGroupContacts}
              searchFunction={searchDiffedGroupContacts}
            />
          }
        />
        <Route
          exact
          path={`/groups/${group.id}/contacts`}
          render={routeProps => <GroupContactsContainer {...routeProps} />}
        />

        {/* GROUP INFO */}
        <Route
          exact
          path={
            match.path === "/groups/new" ? `/groups/new` : `/groups/${group.id}`
          }
          render={routeProps => (
            <GroupForm
              {...routeProps}
              group={group}
              isGroupNew={match.path === "/groups/new"}
              deleteGroup={deleteGroup}
              onSubmit={values => {
                match.path === "/groups/new"
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
  isAuthed: state.authReducer.isAuthed,
  group: state.groupReducer.group,
  groupContacts: state.groupReducer.groupContacts
});

const mapDispatchToProps = {
  push,
  setQuery,
  setOffset,
  setCount,
  fetchComponent,

  fetchGroup,
  setGroup,
  submitNewGroup,
  updateGroup,
  deleteGroup,
  submitGroupContacts
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleGroupContainer
);
