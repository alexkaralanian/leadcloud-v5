import React from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import {
  fetchListing,
  createListing,
  updateListing,
  deleteListing
} from "../../../actions/listing-actions";

import ButtonFooter from "../../ButtonFooter/ButtonFooter";

import "./SingleListing.css";

// const capitalize = word => {
//   if (word) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
// };

const CustomInput = ({ type, field, form: { touched, errors }, ...props }) => (
  <React.Fragment>
    <Input type={type} {...field} {...props} />
    {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </React.Fragment>
);

const ListingForm = ({ isListingNew, listing, createListing, updateListing, deleteListing }) => {
  return (
    <Formik
      initialValues={listing}
      onSubmit={values => {
        isListingNew ? createListing(values) : updateListing(values, listing.id);
      }}
      render={({ values }) => (
        <Form>
          <Card>
            <CardHeader>
              <i className="fa fa-user" />
              <strong>Listing Info</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Priority Level</strong>
                    </Label>
                    <Field component={CustomInput} type="select" name="priority">
                      <option value="" />
                      <option value="a">A: High Priority</option>
                      <option value="b">B: Medium Priority</option>
                      <option value="c">C: Low Priority</option>
                    </Field>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Category</strong>
                    </Label>
                    <Field component={CustomInput} type="select" name="category">
                      <option value="" />
                      <option value="rental">Rental</option>
                      <option value="sale">Sale</option>
                    </Field>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Listing Status</strong>
                    </Label>
                    <Field component={CustomInput} type="select" name="listing_status">
                      <option value="" />
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="accepted_offer">Accepted Offer</option>
                      <option value="contract_signed">Contract Signed</option>
                      <option value="closed">Closed</option>
                    </Field>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Listing Type</strong>
                    </Label>
                    <Field component={CustomInput} type="select" name="listing_type">
                      <option value="" />
                      <option value="open">Open</option>
                      <option value="exclusive">Exclusive</option>
                      <option value="co-broke">Co-Broke</option>
                      <option value="off-market">Off Market</option>
                      <option value="closed">Closed</option>
                    </Field>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <i className="fa fa-user" />
              <strong>Building Info</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label>
                      <strong>Address</strong>
                    </Label>
                    <Field type="text" component={CustomInput} name="address" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>
                      <strong>City</strong>
                    </Label>
                    <Field type="text" component={CustomInput} name="city" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>
                      <strong>State</strong>
                    </Label>
                    <Field type="text" component={CustomInput} name="state" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>
                      <strong>Zip</strong>
                    </Label>
                    <Field type="text" component={CustomInput} name="zip" />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>
                      <strong>Unit#</strong>
                    </Label>
                    <Field type="text" component={CustomInput} name="unit_number" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Ownership Type</strong>
                    </Label>
                    <Field component={CustomInput} type="select" name="ownership_type">
                      <option value="" />
                      <option value="single-family">Single Family</option>
                      <option value="multi-family">Multifamily</option>
                      <option value="co-op">Co-Op</option>
                      <option value="condo">Condo</option>
                      <option value="cond-op">Condop</option>
                    </Field>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Property Style</strong>
                    </Label>
                    <Field component={CustomInput} type="select" name="property_style">
                      <option value="" />
                      <option value="pre-war">Pre-War</option>
                      <option value="post-war">Post-War</option>
                      <option value="new-development">New Development</option>
                      <option value="townhome">Townhome</option>
                      <option value="brownstone">Brownstone</option>
                    </Field>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <i className="fa fa-user" />
              <strong>Listing Info</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Layout</strong>
                    </Label>
                    <Field component={CustomInput} type="select" name="bedrooms">
                      <option value="" />
                      <option value="studio">Studio</option>
                      <option value="1br">1br</option>
                      <option value="2br">2br</option>
                      <option value="3br">2br</option>
                    </Field>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Bathrooms</strong>
                    </Label>
                    <Field component={CustomInput} type="select" name="bathrooms">
                      <option value="null" />
                      <option value="1">1ba</option>
                      <option value="2">2ba</option>
                      <option value="3">2ba</option>
                    </Field>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <i className="fa fa-user" />
              <strong>Financial</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Asking Price</strong>
                    </Label>
                    <Field type="text" component={CustomInput} name="asking_price" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Closing Price</strong>
                    </Label>
                    <Field type="text" component={CustomInput} name="closing_price" />
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      <strong>Commission %</strong>
                    </Label>
                    <Field type="text" component={CustomInput} name="gross_commission" />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <i className="fa fa-pencil" />
              <strong>Description</strong>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Field type="textarea" component={CustomInput} name="description" />
              </FormGroup>
            </CardBody>
          </Card>
          <div className="mt-4">
            <ButtonFooter
              // submitting={isSubmitting}
              primaryButtonText={isListingNew ? "Create" : "Update"}
              secondaryButtonText="Delete"
              secondaryFunc={deleteListing}
              component={listing}
            />
          </div>
        </Form>
      )}
    />
  );
};

const mapStateToProps = state => ({ listing: state.listing.listing });

const mapDispatchToProps = { fetchListing, createListing, updateListing, deleteListing };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingForm);
