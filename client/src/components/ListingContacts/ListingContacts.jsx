import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import { Grid, Row, Col } from "react-bootstrap";

import SearchForm from "../SearchForm/SearchForm";
import TableRow from "../TableRow/TableRow";

const ListingContacts = ({
  listing,
  listingContacts,
  searchContacts,
  listingContactsSearchResults,
  setContactsQuery,
  submitListingContact,
  deleteListingContact
}) => {
  console.log("LISTING CONATCTS SEARC RESULTS", listingContactsSearchResults);
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <h3 className="headerText">Add Contacts</h3>

          <SearchForm searchFunction={searchContacts} />

          <TableRow
            componentName="contact"
            rowText="fullName"
            collection={listingContactsSearchResults}
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
};

export default reduxForm({
  form: "searchListingContacts", // a unique name for this form
  enableReinitialize: true
})(ListingContacts);
