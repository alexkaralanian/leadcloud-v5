import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import {
  fetchContact,
  deleteContact,
  submitNewContact,
  updateContact
} from "../../../actions/contact-actions";

import ButtonFooter from "../../ButtonFooter/ButtonFooter";

import "../Contacts.scss";

const capitalize = word => {
  if (word) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

const CustomInput = ({ type, field, form: { touched, errors }, ...props }) => (
  <div>
    <Input type={type} {...field} {...props} />
    {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);

class ContactForm extends React.Component {
  state = {};
  render() {
    const { contact, updateContact } = this.props;
    return (
      <Formik
        initialValues={contact}
        onSubmit={values => {
          updateContact(values, contact.id);
        }}
        render={({ values }) => (
          <Form>
            <Card>
              <CardHeader>
                <i className="fa fa-user" />
                <strong>Name</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        <strong>First Name</strong>
                      </Label>
                      <Field type="text" component={CustomInput} name="firstName" />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        <strong>Last Name</strong>
                      </Label>
                      <Field type="text" component={CustomInput} name="lastName" />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <i className="fa fa-user" />
                <strong>Profile</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        <strong>Priority Level</strong>
                      </Label>
                      <Field component={CustomInput} type="select" name="priority">
                        <option value="A">A: High Priority</option>
                        <option value="B">B: Medium Priority</option>
                        <option value="C">C: Low Priority</option>
                      </Field>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup check inline>
                      <Label check>
                        <strong>Buyer</strong>
                        <Field component={CustomInput} type="radio" name="buyer" />
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <strong>Seller</strong>
                        <Field component={CustomInput} type="radio" name="seller" />
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <strong>Landlord</strong>
                        <Field component={CustomInput} type="radio" name="landlord" />
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <strong>Tenant</strong>
                        <Field component={CustomInput} type="radio" name="tenant" />
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <i className="fa fa-envelope" />
                <strong>Emails</strong>
              </CardHeader>
              <CardBody>
                <FieldArray
                  name="email"
                  render={arrayHelpers => (
                    <div>
                      {contact.email &&
                        contact.email.map((address, idx) => (
                          <Row key={idx}>
                            <Col sm={2}>
                              <FormGroup>
                                <Label>
                                  <strong>Type</strong>
                                </Label>
                                <Field
                                  type="text"
                                  component={CustomInput}
                                  name={`email.${idx}.type`}
                                />
                              </FormGroup>
                            </Col>
                            <Col xs={10}>
                              <FormGroup>
                                <Label>
                                  <strong>Address</strong>
                                </Label>
                                <Field
                                  type="email"
                                  component={CustomInput}
                                  name={`email.${idx}.value`}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        ))}
                    </div>
                  )}
                />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <i className="fa fa-phone" />
                <strong>Phone Numbers</strong>
              </CardHeader>
              <CardBody>
                <FieldArray
                  name="phone"
                  render={arrayHelpers => (
                    <div>
                      {contact.phone &&
                        contact.phone.map((address, idx) => {
                          return (
                            <React.Fragment>
                              <Row>
                                <Col sm={2}>
                                  <FormGroup>
                                    <Label>
                                      <strong>Type</strong>
                                    </Label>
                                    <Field
                                      type="text"
                                      component={CustomInput}
                                      name={`phone.${idx}.type`}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col sm={10}>
                                  <FormGroup>
                                    <Label>
                                      <strong>Phone</strong>
                                    </Label>
                                    <Field
                                      type="tel"
                                      component={CustomInput}
                                      name={`phone.${idx}.value`}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </React.Fragment>
                          );
                        })}
                    </div>
                  )}
                />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <i className="fa fa-map" />
                <strong>Addresses</strong>
              </CardHeader>
              <CardBody>
                <FieldArray
                  name="address"
                  render={arrayHelpers => (
                    <div>
                      {values.address &&
                        values.address.map((data, idx) => {
                          return (
                            <Row key={idx}>
                              <Col sm={2}>
                                <FormGroup>
                                  <Label>
                                    <strong>Type</strong>
                                  </Label>
                                  <Field
                                    type="text"
                                    component={CustomInput}
                                    name={`address.${idx}.type`}
                                  />
                                </FormGroup>
                              </Col>
                              <Col sm={10}>
                                <FormGroup>
                                  <Label>
                                    <strong>Street Address</strong>
                                  </Label>
                                  <Field
                                    type="text"
                                    component={CustomInput}
                                    name={`address.${idx}.streetAddress`}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          );
                        })}
                    </div>
                  )}
                />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <i className="fa fa-user" />
                <strong>Financial</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <label for="customRange1">Budget</label>
                  <input type="range" class="custom-range" id="customRange1" />
                </FormGroup>
                <FormGroup>
                  <Label>
                    <strong>Income</strong>
                  </Label>
                  <Field type="text" component={CustomInput} name="income" />
                </FormGroup>
                <FormGroup>
                  <Label>
                    <strong>Credit Score</strong>
                  </Label>
                  <Field type="text" component={CustomInput} name="creditScore" />
                </FormGroup>
                <FormGroup>
                  <Label>
                    <strong>Net Worth</strong>
                  </Label>
                  <Field type="text" component={CustomInput} name="netWorth" />
                </FormGroup>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <i className="fa fa-pencil" />
                <strong>Notes</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Field type="textarea" component={CustomInput} name="notes" />
                </FormGroup>
              </CardBody>
            </Card>
            <div className="mt-4">
              <ButtonFooter
                // submitting={isSubmitting}
                primaryButtonText="Update"
                secondaryButtonText="Delete"
                secondaryFunc={deleteContact}
                component={contact}
              />
            </div>
          </Form>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  deleteContact,
  fetchContact,
  submitNewContact,
  updateContact
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
