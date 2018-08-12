import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { Grid, Row, Col } from "react-bootstrap";
import SearchForm from "../SearchForm/SearchForm";
import TableRow from "../TableRow/TableRow";
import Counter from "../../components/Counter/Counter";

const ListingContacts = ({
  listing,
  listingContacts,
  searchListingContacts,
  listingContactsSearchResults,
  setContactsQuery,
  submitListingContact,
  deleteListingContact
}) => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <SearchForm searchFunction={searchListingContacts} />
          <Counter />
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
