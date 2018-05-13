import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash"; // refactor
import { Field, reduxForm } from "redux-form";
import {
  Grid,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  FormControl,
  Table
} from "react-bootstrap";
import "./SingleContact.css";

const inputField = ({
  input,
  label,
  type,
  list,
  meta: { touched, active, error }
}) => (
  <div>
    <FormControl {...input} placeholder={label} type={type} list={list} />
    {touched && !active && error && <div>{error}</div>}
  </div>
);

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
              label="Search for a contact"
              // onChange={_.debounce(searchListings, 500)}
            />

            <Table striped>
              <tbody>
                {searchResults &&
                  searchResults.map(listing => (
                    <tr key={listing.id}>
                      <td>
                        <img src={listing.images ? listing.images[0] : null} />
                      </td>
                      <td>{listing.fullName}</td>
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
                        <img src={listing.images ? listing.images[0] : null} />
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
