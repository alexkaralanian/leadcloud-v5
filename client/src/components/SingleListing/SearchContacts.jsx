import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import { Grid, Row, Col } from "react-bootstrap";

import SearchForm from "../SearchForm/SearchForm";
import TableRow from "../TableRow/TableRow";

import "./SingleListing.css";

const SearchContacts = ({
  load,
  pristine,
  reset,
  onChange,
  submitting,
  setContactsQuery,
  searchContacts,
  searchResults,
  listing,
  submitListingContact,
  deleteListingContact,
  listingContacts
}) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <h3 className="headerText">Add Contacts</h3>

        <SearchForm searchFunction={searchContacts} />

        <TableRow
          componentName="contact"
          rowText="fullName"
          collection={searchResults}
          submitFunction={submitListingContact}
          hostComponent={listing}
          buttonText="Add Contact"
          buttonStyle="warning"
        />
        <hr />
        <TableRow
          componentName="contact"
          rowText="fullName"
          collection={listingContacts}
          submitFunction={deleteListingContact}
          hostComponent={listing}
          buttonText="Delete Contact"
          buttonStyle="danger"
        />
      </Col>
    </Row>
  </Grid>
);

export default reduxForm({
  form: "searchContacts", // a unique name for this form
  enableReinitialize: true
})(SearchContacts);
