import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import GroupsContainer from "./Groups/GroupsContainer";
import Header from "../../components/Header/Header-new";

class GroupsDashboardContainer extends React.Component {
  state = {
    dropdownOpen: false
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  render() {
    const { push } = this.props;

    return (
      <React.Fragment>
        <Breadcrumbs />
        <Header>
          <h1>Groups</h1>
          <Dropdown isOpen={this.state.dropdownOpen} color="primary" toggle={this.toggle}>
            <DropdownToggle caret>Actions</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => push("/groups/new")}>Create New</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Header>
        <GroupsContainer />
      </React.Fragment>
    );
  }
}

export default connect(null, { push })(GroupsDashboardContainer);
