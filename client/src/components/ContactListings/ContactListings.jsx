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
      <div>
        <div className="margin-top-2">
          <SearchForm
            searchFunction={searchContactListings}
            searchText="Search Contact Listings..."
            form="searchContactListings"
          />
        </div>
        <Counter />
      </div>
      {contactListings.length > 0 && (
        <TableRow
          componentName="listings"
          rowText="address"
          collection={contactListings}
          submitFunction={deleteContactListing}
          hostComponent={contact}
          buttonText="Remove"
          buttonStyle="danger"
        />
      )}
    </Col>
  </Row>
);

export default reduxForm({
  form: "searchContactListings", // a unique name for this form
  enableReinitialize: true
})(ContactListings);
