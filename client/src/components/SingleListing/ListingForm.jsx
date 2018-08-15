import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Grid, Row, Col, Form, FormGroup } from "react-bootstrap";

import { contactValidate } from "../../helpers/redux-form/validate";
import { fetchListing } from "../../actions/listing-actions";

import InputField from "../InputField/InputField";
import ButtonFooter from "../ButtonFooter/ButtonFooter";

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
      <FormGroup>
        <Field
          type="text"
          name="address"
          component={InputField}
          label="Address"
        />
        <Field type="text" name="city" component={InputField} label="City" />
        <Field type="text" name="state" component={InputField} label="State" />
        <Field type="text" name="zip" component={InputField} label="Zip" />
      </FormGroup>

      <Row>
        <Col xs={12}>
          {isListingNew ? (
            <ButtonFooter
              primaryButtonText="Submit"
              pristine={pristine}
              submitting={submitting}
            />
          ) : (
            <ButtonFooter
              pristine={pristine}
              submitting={submitting}
              primaryButtonText="Update"
              secondaryButtonText="Delete"
              secondaryFunc={deleteListing}
              component={listing}
            />
          )}
        </Col>
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
