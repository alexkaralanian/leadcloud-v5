import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { Row, Col } from "reactstrap";

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
    <Row className="margin-top-2">
      <Col xs={12}>
        <TableRow
          cardHeaderText="Listing Contacts"
          SearchForm={
            <SearchForm
              searchFunction={searchListingContacts}
              searchText="Search..."
              form="searchListingContacts"
            />
          }
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
  );
};

export default ListingContacts;
