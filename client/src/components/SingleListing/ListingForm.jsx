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
  <React.Fragment>
    <Form className="margin-top-2" onSubmit={handleSubmit}>
      <Row>
        <Col sm="12" md="6">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              <strong>Listing Address</strong>
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
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
        <Col sm="12" md="6">
          <Card>
            <CardHeader>
              <strong>Listing Details</strong>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Field
                  type="price"
                  name="price"
                  component={InputField}
                  label="Price"
                />
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
        <Col sm="12" md="6">
          <Card>
            <CardHeader>
              <strong>Listing Description</strong>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Field
                  type="textarea"
                  name="description"
                  component={InputField}
                  label="Description"
                />
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
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
  </React.Fragment>
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
