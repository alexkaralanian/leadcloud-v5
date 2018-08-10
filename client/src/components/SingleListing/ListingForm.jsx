import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import {
  Grid,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Glyphicon
} from "react-bootstrap";

import { contactValidate } from "../../helpers/redux-form/validate";
import { fetchListing } from "../../actions/listing-actions";
import inputField from "../InputField/InputField";

import "./SingleListing.css";

let ListingForm = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  auditClick,
  isListingNew,
  listing,
  deleteListing
}) => (
  <Grid>
    <Form onSubmit={handleSubmit}>
      <FormGroup className="formGroup">
        <Field
          type="text"
          name="address"
          component={inputField}
          label="Address"
        />
      </FormGroup>
      <FormGroup className="formGroup">
        <Field type="text" name="city" component={inputField} label="City" />
      </FormGroup>
      <FormGroup className="formGroup">
        <Field type="text" name="state" component={inputField} label="State" />
      </FormGroup>
      <FormGroup className="formGroup">
        <Field type="text" name="zip" component={inputField} label="Zip" />
      </FormGroup>

      <Row>
        {isListingNew ? (
          <Col xs={12}>
            <div className="button_footer-container">
              <Button
                className="button-lg"
                type="submit"
                bsStyle="primary"
                bsSize="large"
                disabled={pristine || submitting}
              >
                <div className="button_inner">
                  <span className="button_inner-text">Submit</span>
                  <Glyphicon glyph="floppy-disk" />
                </div>
              </Button>
            </div>
          </Col>
        ) : (
          <Col xs={12}>
            <div className="button_footer-container">
              <Button
                className="button-lg"
                type="submit"
                bsStyle="primary"
                bsSize="large"
                disabled={pristine || submitting}
              >
                <div className="button_inner">
                  <span className="button_inner-text">Update</span>
                  <Glyphicon glyph="floppy-disk" />
                </div>
              </Button>

              <Button
                className="button-lg"
                onClick={() => {
                  deleteListing(listing.id);
                }}
                bsSize="large"
                bsStyle="danger"
              >
                <div className="button_inner">
                  <span className="button_inner-text">Delete</span>
                  <Glyphicon glyph="trash" />
                </div>
              </Button>
            </div>
          </Col>
        )}
      </Row>
    </Form>
  </Grid>
);

ListingForm = reduxForm({
  form: "listingForm", // a unique name for this form
  enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate: contactValidate
})(ListingForm);

ListingForm = connect(
  state => ({
    initialValues: state.listingReducer.listing // pull initial values from LISTING reducer
  }),
  { load: fetchListing } // bind fetchListing action
)(ListingForm);

export default ListingForm;
