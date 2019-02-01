import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import {
  setContact,
  deleteContact,
  createContact,
  updateContact
} from "../../../actions/contact-actions";

import ButtonFooter from "../../ButtonFooter/ButtonFooter";

import "../Contacts.scss";

const capitalize = word => {
  if (word) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

const CustomInput = ({ type, field, form: { touched, errors }, ...props }) => {
  return (
    <div>
      <Input type={type} {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  );
};

class ContactForm extends React.Component {
  componentWillUnmount() {
    const { setContact } = this.props;
    setContact({});
  }

  addEmail = () => {
    console.log("THIS.PROPS", this.props);
    // const { contact, updateContact } = this.props;
    // console.log("FIRST CONTACT", contact);
    // if (!contact.email)
    //   contact.email = [
    //     {
    //       value: "",
    //       type: ""
    //     }
    //   ];
    // else {
    //   contact.email.push({
    //     value: "",
    //     type: ""
    //   });
    // }

    // console.log("FINAL CONTACT", contact);
    // updateContact(contact);
  };

  // renderEmails = () => {

  // };

  render() {
    const { isContactNew, contact, createContact, updateContact, deleteContact } = this.props;

    return (
      <Formik
        initialValues={contact}
        onSubmit={values => {
          console.log("VALUES", values);
          isContactNew ? createContact(values) : updateContact(values, contact.id);
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
                        <option value="null">{null}</option>
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

            {/* ***EMAILS*** */}
            <Card>
              <CardHeader>
                <i className="fa fa-envelope" />
                <strong>Emails</strong>
              </CardHeader>
              <CardBody>
                <FieldArray
                  name="email"
                  render={arrayHelpers => {
                    return (
                      <div>
                        {values.email && values.email.length > 0 ? (
                          values.email.map((address, idx) => (
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
                              <Col xs={12}>
                                <button type="button" onClick={() => arrayHelpers.remove(idx)}>
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    arrayHelpers.insert(idx, {
                                      type: "",
                                      value: ""
                                    })
                                  }
                                >
                                  +
                                </button>
                              </Col>
                            </Row>
                          ))
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              arrayHelpers.push({
                                type: "",
                                value: ""
                              })
                            }
                          >
                            Add Email
                          </button>
                        )}
                      </div>
                    );
                  }}
                />
              </CardBody>
            </Card>

            {/* *** Phone NUmbers *** */}
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
                      {values.phone && values.phone.length > 0 ? (
                        values.phone.map((address, idx) => {
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
                              <Col xs={12}>
                                <button type="button" onClick={() => arrayHelpers.remove(idx)}>
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    arrayHelpers.insert(idx, {
                                      type: "",
                                      value: ""
                                    })
                                  }
                                >
                                  +
                                </button>
                              </Col>
                            </Row>
                          );
                        })
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              type: "",
                              value: ""
                            })
                          }
                        >
                          Add Phone
                        </button>
                      )}
                    </div>
                  )}
                />
              </CardBody>
            </Card>

            {/* *** Addresses *** */}
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
                      {values.address && values.address.length > 0 ? (
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
                              <Col xs={12}>
                                <button type="button" onClick={() => arrayHelpers.remove(idx)}>
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    arrayHelpers.insert(idx, {
                                      type: "",
                                      value: ""
                                    })
                                  }
                                >
                                  +
                                </button>
                              </Col>
                            </Row>
                          );
                        })
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              streetAddress: "",
                              type: ""
                            })
                          }
                        >
                          Add Address
                        </button>
                      )}
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
                  <label htmlFor="customRange1">Budget</label>
                  <input type="range" className="custom-range" id="customRange1" />
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
                primaryButtonText={isContactNew ? "Create" : "Update"}
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

const mapStateToProps = state => ({ contact: state.contact.contact });

const mapDispatchToProps = {
  setContact,
  createContact,
  updateContact,
  deleteContact
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm);
