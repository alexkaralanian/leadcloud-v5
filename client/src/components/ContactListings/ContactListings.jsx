import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { Grid, Col, Row } from "react-bootstrap";

import SearchForm from "../SearchForm/SearchForm";
import Counter from "../../components/Counter/Counter";
import TableRow from "../TableRow/TableRow";

const ContactListings = ({
  contact,
  contactListings,
  searchContactListings,
  submitContactListing,
  deleteContactListing
}) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <SearchForm
          searchFunction={searchContactListings}
          searchText="Search Contact Listings..."
        />
        <Counter />
        <TableRow
          componentName="listings"
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
  form: "searchContactListings", // a unique name for this form
  enableReinitialize: true
})(ContactListings);
