import React from "react";
import { push } from "react-router-redux";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";

import Header from "../../components/Header/Header-new";
import GroupForm from "./Group/GroupForm";
import GroupContacts from "./GroupContacts/GroupContacts";
import Modal from "../../components/Modal/Modal";
import SearchGroupContacts from "./GroupContacts/SearchGroupContacts";

import { fetchGroup, submitNewGroup, updateGroup, deleteGroup } from "../../reducers/group";

import {
  submitGroupContacts,
  searchDiffedGroupContacts,
  setDiffedGroupContacts
} from "../../reducers/group-contacts";

class GroupContainer extends React.Component {
  state = {
    isContactsModalVisible: false,
    dropdownOpen: false
  };

  componentDidMount() {
    const { match, fetchGroup } = this.props;
    if (match.path !== "/groups/new") {
      fetchGroup(match.params.id);
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

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

  render() {
    const { match, push, group, submitNewGroup, updateGroup, deleteGroup } = this.props;

    return (
      <React.Fragment>
        <BreadCrumbs />
        <Header>
          <h1>{group.title}</h1>
          <Dropdown isOpen={this.state.dropdownOpen} color="primary" toggle={this.toggle}>
            <DropdownToggle caret>Actions</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => push(`/groups/${match.params.id}/contacts`)}>
                View Members
              </DropdownItem>
              <DropdownItem onClick={() => push(`/groups/${match.params.id}`)}>Edit</DropdownItem>
              <DropdownItem onClick={this.displayContactsModal}>Add Contacts</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Header>

        {/* GROUP NESTED NAV
        {match.path !== "/groups/new" && <GroupNav push={push} group={group} />}*/}

        {/* GROUP CONTACTS*/}
        <Modal
          displayModal={this.displayContactsModal}
          onExit={this.onContactsModalExit}
          isModalVisible={this.state.isContactsModalVisible}
          title={group.title}
          Container={
            <SearchGroupContacts
              displayModal={this.displayContactsModal}
              submitContacts={this.submitContacts}
              group={group}
            />
          }
        />
        <Route
          exact
          path={`/groups/:id/contacts`}
          render={routeProps => <GroupContacts {...routeProps} />}
        />

        {/* GROUP INFO */}
        <Route
          exact
          path={match.path === "/groups/new" ? `/groups/new` : `/groups/:id`}
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
  group: state.group.group
});

const mapDispatchToProps = {
  push,
  fetchGroup,
  submitNewGroup,
  updateGroup,
  deleteGroup,
  submitGroupContacts
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupContainer);
