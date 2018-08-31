import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { Grid, Row, Col, Button } from "react-bootstrap";

import SearchForm from "../SearchForm/SearchForm";
import Counter from "../../components/Counter/Counter";
import TableRow from "../TableRow/TableRow";

import "./ContactGroups.css";

// ContactGroups renders a pills / tag view of all of a user's contact's group memberships and a delte button.

const ContactGroups = ({
  contact,
  contactGroups,
  deleteContactGroup,
  searchContactGroups
}) => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <div className="margin-top-2">
            <SearchForm
              searchFunction={searchContactGroups}
              searchText="Search Contact Groups..."
              form="searchContactGroups"
            />
          </div>
          <Counter />
          {contactGroups.length > 0 && (
            <TableRow
              componentName="groups"
              rowText="title"
              collection={contactGroups}
              submitFunction={deleteContactGroup}
              hostComponent={contact}
              buttonText="Remove Group"
              buttonStyle="danger"
            />
          )}
        </Col>
      </Row>
    </Grid>
  );
};

export default reduxForm({
  form: "searchContactGroups", // a unique name for this form
  enableReinitialize: true
})(ContactGroups);
