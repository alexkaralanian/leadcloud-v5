import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Loadable from "react-loadable";
import Loading from "../Loading/Loading";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import Header from "../Header/Header-new";
import ContactsContainer from "./Contacts/ContactsContainer";
import { syncContacts } from "../../actions/contact-actions";

import "./Contacts.scss";

const GroupsContainer = Loadable({
  loader: () => import("../Groups/Groups/GroupsContainer"),
  loading: Loading
});

class ContactsDashboard extends React.Component {
  state = {
    dropdownOpen: false,
    displayGroups: false
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  displayGroups = () => {
    this.setState(prevState => ({
      displayGroups: !prevState.displayGroups
    }));
  };

  render() {
    const { push } = this.props;
    const { displayGroups } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col xs={12}>
            <BreadCrumbs />
            <Header>
              <h1>Contacts</h1>
              <Dropdown isOpen={this.state.dropdownOpen} color="primary" toggle={this.toggle}>
                <DropdownToggle caret>Actions</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => push("/contacts/new")}>Create New</DropdownItem>
                  <DropdownItem onClick={this.displayGroups}>Display Groups Panel</DropdownItem>
                  <DropdownItem onClick={syncContacts}>Sync Google Contacts</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Header>
          </Col>
        </Row>
        <Row>
          {displayGroups ? (
            <React.Fragment>
              <Col xs={0} lg={4} className="groups-container">
                <GroupsContainer />
              </Col>
              <Col xs={12} lg={displayGroups ? 8 : 12}>
                <ContactsContainer />
              </Col>
            </React.Fragment>
          ) : (
            <Col xs={12} lg={displayGroups ? 8 : 12}>
              <ContactsContainer />
            </Col>
          )}
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { push, syncContacts }
)(ContactsDashboard);
