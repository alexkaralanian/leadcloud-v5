import React from "react";
import PropTypes from "prop-types";
// import _ from "lodash";
import { Link } from "react-router-dom";
// import {
//   submitButton,
//   formGroup,
//   headerText
// } from "../../sharedStyles/styles.css";
import "./SingleListing.css";
import {
  Grid,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  FormControl,
  Table
} from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import SearchForm from "../SearchForm/SearchForm";

const SearchContacts = ({
  load,
  pristine,
  reset,
  onChange,
  submitting,
  setContactsQuery,
  searchContacts,
  searchResults,
  listing,
  submitListingContact,
  deleteListingContact,
  listingContacts
}) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <h3 className="headerText">Add Contacts</h3>
        <SearchForm searchFunction={searchContacts} />
        <Table striped>
          <tbody>
            {searchResults &&
              searchResults.map(contact => (
                <tr key={contact.id}>
                  <td>
                    <img
                      src={contact.images && contact.images[0]}
                      alt="Contact"
                    />
                  </td>
                  <td>{contact.fullName}</td>
                  <td>
                    <Button
                      className="addButton"
                      bsStyle="warning"
                      onClick={() =>
                        submitListingContact(contact.id, listing.id)
                      }
                    >
                      <span>Add Contact</span>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <hr />
        <Table striped>
          <tbody>
            {listingContacts &&
              listingContacts.map(contact => (
                <tr key={contact.id}>
                  <td>
                    <img src={contact.images && contact.images[0]} />
                  </td>
                  <td>
                    <Link to={`/contact/${contact.id}`}>
                      <span>{contact.fullName}</span>
                    </Link>
                  </td>
                  <td>
                    <Button
                      className="addButton"
                      bsStyle="danger"
                      onClick={() =>
                        deleteListingContact(contact.id, listing.id)
                      }
                    >
                      <span>DeleteContact</span>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  </Grid>
);

export default reduxForm({
  form: "searchContacts", // a unique name for this form
  enableReinitialize: true
})(SearchContacts);
