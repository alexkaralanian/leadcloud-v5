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
  FormControl,
  ControlLabel
} from "react-bootstrap";

import { contactValidate } from "../../helpers/redux-form/validate";
import { fetchListing } from "../../actions/listing-actions";

const inputField = ({
  input,
  label,
  type,
  meta: { touched, active, error }
}) => (
  <div>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} placeholder={label} type={type} />
    {touched && !active && error && <div>{error}</div>}
  </div>
);

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
            <Button
              className="submitButton"
              type="submit"
              bsStyle="primary"
              disabled={pristine || submitting}
            >
              <span>Submit</span>
            </Button>
          </Col>
        ) : (
          <div>
            <Col xs={12}>
              <Button
                className="submitButton"
                type="submit"
                bsStyle="primary"
                disabled={pristine || submitting}
              >
                <span>Update</span>
              </Button>
            </Col>
            <Col xs={12}>
              <Button
                className="submitButton"
                onClick={() => {
                  deleteListing(listing.id);
                }}
                bsStyle="danger"
              >
                <span>Delete</span>
              </Button>
            </Col>
          </div>
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
