import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header-old";
import ContactsContainer from "./ContactsContainer";
import GroupsContainer from "../GroupsContainer/GroupsContainer";
import { syncContacts } from "../../actions/contact-actions";

import "./Contacts.scss";

class ContactsDashboard extends React.Component {
  render() {
    const { push } = this.props;
    return (
      <Row>
        <Col xs={12}>
          <BreadCrumbs />
          <Header
            isVisible
            componentName="contacts"
            headerTitle="Contacts"
            isNew={null}
            primaryText="Create New"
            primaryFunc={() => push("/contacts/new")}
            primaryGlyph="plus"
          />
        </Col>
        <DragDropContextProvider backend={HTML5Backend}>
          <Col xs={0} lg={4} className="groups-container mt-4">
            <GroupsContainer />
          </Col>
          <Col xs={12} lg={8} className="mt-4">
            <ContactsContainer />
          </Col>
        </DragDropContextProvider>
      </Row>
    );
  }
}

export default connect(null, { push, syncContacts })(ContactsDashboard);
