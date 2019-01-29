import React from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import { fetchListing, updateListing, deleteListing } from "../../../actions/listing-actions";

import ButtonFooter from "../../ButtonFooter/ButtonFooter";

import "./SingleListing.css";

const capitalize = word => {
  if (word) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

const CustomInput = ({ type, field, form: { touched, errors }, ...props }) => {
  return (
    <React.Fragment>
      <Input type={type} {...field} {...props} />
      {touched[field.name] &&
        errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </React.Fragment>
  );
};

const ListingForm = ({ listing, updateListing, deleteListing }) => {
  return (
    <Formik
      initialValues={listing}
      onSubmit={values => {
        console.log("VALUES", values);
        updateListing(values, listing.id);
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
                      <option value="null" />
                      <option value="a">A: High Priority</option>
                      <option value="b">B: Medium Priority</option>
                      <option value="c">C: Low Priority</option>
                    </Field>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Type</strong>
                    </Label>
                    <Field component={CustomInput} type="select" name="type">
                      <option value="null" />
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
                    <Field component={CustomInput} type="select" name="status">
                      <option value="null" />
                      <option value="open">Open</option>
                      <option value="offMarket">Off-Market</option>
                      <option value="exclusiveSigned">Exclusive Signed</option>
                      <option value="acceptedOffer">Accepted Offer</option>
                      <option value="contractSigned">Contract Signed</option>
                      <option value="closed">Closed</option>
                      <option value="delisted">De-listed</option>
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
                    <Field type="text" component={CustomInput} name="unit" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Property Type</strong>
                    </Label>
                    <Field component={CustomInput} type="select" name="propertyType">
                      <option value="null" />
                      <option value="singlefamily">Single Family</option>
                      <option value="multifamily">Multifamily</option>
                      <option value="coop">Co-Op</option>
                      <option value="condo">Condo</option>
                      <option value="condop">Condop</option>
                    </Field>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Property Style</strong>
                    </Label>
                    <Field component={CustomInput} type="select" name="propertyStyle">
                      <option value="null" />
                      <option value="prewar">Pre-War</option>
                      <option value="postwar">Post-War</option>
                      <option value="newdevelopment">New Development</option>
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
                    <Field component={CustomInput} type="select" name="layout">
                      <option value="null" />
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
                    <Field type="text" component={CustomInput} name="askingPrice" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      <strong>Closing Price</strong>
                    </Label>
                    <Field type="text" component={CustomInput} name="closingPrice" />
                  </FormGroup>
                  <FormGroup>
                    <Label>
                      <strong>Commission %</strong>
                    </Label>
                    <Field type="text" component={CustomInput} name="commission%" />
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
              primaryButtonText="Update"
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

export default connect(mapStateToProps, { fetchListing, updateListing, deleteListing })(
  ListingForm
);
