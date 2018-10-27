import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import {
  Form,
  FormGroup,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";

import { contactValidate } from "../../helpers/redux-form/validate";
import { fetchListing } from "../../actions/listing-actions";

import InputField from "../InputField/InputField";
import TextAreaField from "../InputField/TextAreaField";
import ButtonFooter from "../ButtonFooter/ButtonFooter";

import "./SingleListing.css";

let ListingForm;

ListingForm = ({
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
  <div className="animated fadeIn">
    <Row>
      <Col xs="12">
        <Form className="margin-top-2" onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <strong>Listing Info</strong>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Field
                  type="text"
                  name="address"
                  component={InputField}
                  label="Address"
                />
                <Field
                  type="text"
                  name="city"
                  component={InputField}
                  label="City"
                />
                <Field
                  type="text"
                  name="state"
                  component={InputField}
                  label="State"
                />
                <Field
                  type="text"
                  name="zip"
                  component={InputField}
                  label="Zip"
                />
                <Field
                  type="text"
                  name="description"
                  component={TextAreaField}
                  label="Description"
                />
              </FormGroup>
            </CardBody>
          </Card>

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
        </Form>
      </Col>
    </Row>
  </div>
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
