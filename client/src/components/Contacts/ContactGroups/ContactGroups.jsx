import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { Row, Col } from "reactstrap";

import SearchForm from "../../SearchForm/SearchForm";
import TableRow from "../../TableRow/TableRow";

import "../Contacts.scss";

const ContactGroups = ({ contact, contactGroups, deleteContactGroup, searchContactGroups }) => {
  return (
    <Row>
      <Col xs="12">
        <div className="margin-top-2" />
        <TableRow
          SearchForm={
            <SearchForm
              searchFunction={searchContactGroups}
              searchText="Search..."
              form="searchContactGroups"
            />
          }
          cardHeaderText="Contact Groups"
          componentName="groups"
          rowText="title"
          collection={contactGroups}
          submitFunction={deleteContactGroup}
          hostComponent={contact}
          buttonText="Remove Group"
          buttonStyle="danger"
        />
      </Col>
    </Row>
  );
};

export default reduxForm({
  form: "searchContactGroups", // a unique name for this form
  enableReinitialize: true
})(ContactGroups);
