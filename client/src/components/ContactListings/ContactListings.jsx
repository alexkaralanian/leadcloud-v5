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
  deleteContactListing
}) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <div>
          <SearchForm
            searchFunction={searchContactListings}
            searchText="Search Contact Listings..."
            form="searchContactListings"
          />
          <Counter />
        </div>
        <TableRow
          componentName="listings"
          rowText="address"
          collection={contactListings}
          submitFunction={deleteContactListing}
          hostComponent={contact}
          buttonText="Remove"
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
