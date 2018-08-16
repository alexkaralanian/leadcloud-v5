import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { Grid, Row, Col } from "react-bootstrap";

import SearchForm from "../SearchForm/SearchForm";
import Counter from "../../components/Counter/Counter";
import TableRow from "../TableRow/TableRow";

const ListingContacts = ({
  listing,
  listingContacts,
  searchListingContacts,
  submitListingContact,
  deleteListingContact
}) => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <div>
            <SearchForm
              searchFunction={searchListingContacts}
              searchText="Search Listing Contacts..."
            />
            <Counter />
          </div>
          <TableRow
            componentName="contacts"
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

export default ListingContacts;
