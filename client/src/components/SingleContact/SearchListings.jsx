import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import {
  Grid,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Table
} from "react-bootstrap";

import inputField from "../InputField/InputField";
import "./SingleContact.css";

const SearchContacts = ({
  handleSubmit,
  load,
  pristine,
  reset,
  onChange,
  submitting,
  searchListings,
  searchResults,
  setSearchResult,
  contact,
  submitContactListing,
  deleteContactListing,
  contactListings
}) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <h3 className="headerText">Add Listings</h3>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="formGroup">
            <Field
              type="text"
              name="contactSearch"
              component={inputField}
              label="Search for a listing"
              onChange={debounce(searchListings, 500)}
            />

            <Table striped>
              <tbody>
                {searchResults &&
                  searchResults.map(listing => (
                    <tr key={listing.id}>
                      <td>
                        <img
                          className="imgTableThumbnail"
                          src={listing.images && listing.images[0]}
                          alt={listing.address}
                        />
                      </td>
                      <td>{listing.address}</td>
                      <td>
                        <Button
                          className="addButton"
                          bsStyle="warning"
                          onClick={() =>
                            submitContactListing(listing.id, contact.id)
                          }
                        >
                          <span>Add Listing</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <hr />
            <Table striped>
              <tbody>
                {contactListings &&
                  contactListings.map(listing => (
                    <tr key={listing.id}>
                      <td>
                        <img
                          className="imgTableThumbnail"
                          src={listing.images ? listing.images[0] : null}
                          alt={listing.address}
                        />
                      </td>
                      <td>
                        <Link to={`/listing/${listing.id}`}>
                          <span>{listing.address}</span>
                        </Link>
                      </td>
                      <td>
                        <Button
                          className="addButton"
                          bsStyle="danger"
                          onClick={() =>
                            deleteContactListing(listing.id, contact.id)
                          }
                        >
                          <span>DeleteListing</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  </Grid>
);

export default reduxForm({
  form: "searchListings", // a unique name for this form
  enableReinitialize: true
})(SearchContacts);
