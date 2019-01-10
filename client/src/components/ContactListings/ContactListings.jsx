import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { Col, Row } from "reactstrap";

import SearchForm from "../SearchForm/SearchForm";
import Counter from "../../components/Counter/Counter";
import TableRow from "../TableRow/TableRow";

const ContactListings = ({
  contact,
  contactListings,
  searchContactListings,
  deleteContactListing
}) => (
  <Row>
    <Col xs={12}>
      <div className="mt-4" />
      <TableRow
        SearchForm={
          <SearchForm
            searchFunction={searchContactListings}
            searchText="Search..."
            form="searchContactListings"
          />
        }
        cardHeaderText="Contact Listings"
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
);

export default reduxForm({
  form: "searchContactListings", // a unique name for this form
  enableReinitialize: true
})(ContactListings);
