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
          <div className="margin-top-2">
            <SearchForm
              searchFunction={searchListingContacts}
              searchText="Search Listing Contacts..."
              form="searchListingContacts"
            />
            <Counter />
          </div>
          {listingContacts.length > 0 && (
            <TableRow
              componentName="contacts"
              rowText="fullName"
              collection={listingContacts}
              submitFunction={deleteListingContact}
              hostComponent={listing}
              buttonText="Delete Contact"
              buttonStyle="danger"
            />
          )}
        </Col>
      </Row>
    </Grid>
  );
};

export default ListingContacts;
