import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Loadable from "react-loadable";
import Loading from "../../components/Loading/Loading";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header-new";
import ContactsContainer from "./ContactsContainer";
import { syncContacts } from "../../actions/contact-actions";
import "./Contacts.scss";

const GroupsContainer = Loadable({
  loader: () => import("../GroupsContainer/GroupsContainer"),
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
        {displayGroups ? (
          <DragDropContextProvider backend={HTML5Backend}>
            <Col xs={0} lg={4} className="groups-container">
              <GroupsContainer />
            </Col>
            <Col xs={12} lg={displayGroups ? 8 : 12}>
              <ContactsContainer />
            </Col>
          </DragDropContextProvider>
        ) : (
          <Col xs={12} lg={displayGroups ? 8 : 12}>
            <ContactsContainer />
          </Col>
        )}
      </Row>
    );
  }
}

export default connect(null, { push, syncContacts })(ContactsDashboard);
