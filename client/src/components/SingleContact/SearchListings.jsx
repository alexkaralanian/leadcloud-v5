import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { Grid, Col, Row } from "react-bootstrap";

import SearchForm from "../SearchForm/SearchForm";
import TableRow from "../TableRow/TableRow";

import "./SingleContact.css";

const SearchContacts = ({
  handleSubmit,
  load,
  pristine,
  reset,
  onChange,
  submitting,
  searchListings,
  searchResults,
  setSearchResult,
  contact,
  submitContactListing,
  deleteContactListing,
  contactListings
}) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <h3 className="headerText">Add Listings</h3>

        <SearchForm searchFunction={searchListings} />

        <TableRow
          componentName="listing"
          rowText="address"
          collection={searchResults}
          submitFunction={submitContactListing}
          hostComponent={contact}
          buttonText="Add Listing"
          buttonStyle="warning"
        />
        <hr />
        <TableRow
          componentName="listing"
          rowText="address"
          collection={contactListings}
          submitFunction={deleteContactListing}
          hostComponent={contact}
          buttonText="Delete Listing"
          buttonStyle="danger"
        />
      </Col>
    </Row>
  </Grid>
);

export default reduxForm({
  form: "searchListings", // a unique name for this form
  enableReinitialize: true
})(SearchContacts);
