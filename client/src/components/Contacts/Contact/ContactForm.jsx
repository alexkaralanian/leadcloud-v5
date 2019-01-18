import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import {
  fetchContact,
  deleteContact,
  submitNewContact
  // updateContact
} from "../../../actions/contact-actions";

import ButtonFooter from "../../ButtonFooter/ButtonFooter";

import "../Contacts.scss";

const capitalize = word => {
  if (word) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

class ContactForm extends React.Component {
  init = contact => {
    const values = {};
    contact.email &&
      contact.email.forEach((address, idx) => {
        values[`email${idx}`] = address.value;
        values[`emailtype${idx}`] = address.type;
      });
    contact.phone &&
      contact.phone.forEach((number, idx) => {
        values[`phone${idx}`] = number.value;
        values[`phonetype${idx}`] = number.type;
      });
    return {
      firstName: contact.firstName,
      lastName: contact.lastName,
      ...values,
      notes: contact.notes
    };
  };

  render() {
    const { contact } = this.props;
    return (
      <Formik
        initialValues={this.init(contact)}
        onSubmit={values => {
          console.log("SUBMIT VALUES", values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Card className="mt-4">
                <CardHeader>
                  <i className="fa fa-user" />
                  <strong>Contact Details</strong>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          <strong>First Name</strong>
                        </Label>
                        <Input
                          type="text"
                          name="firstName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                        />
                        {errors.firstName && touched.email && errors.firstName}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          <strong>Last Name</strong>
                        </Label>
                        <Input
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                        />
                        {errors.lastName && touched.lastName && errors.lastName}
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
                  {contact.email &&
                    contact.email.map((address, idx) => (
                      <Row key={idx}>
                        <Col sm={2}>
                          <FormGroup>
                            <Label>
                              <strong>Type</strong>
                            </Label>
                            <Input
                              type="text"
                              name={`emailtype${idx}`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values[`emailtype${idx}`]}
                            />
                            {errors[`emailtype${idx}`] &&
                              touched[`emailtype${idx}`] &&
                              errors[`emailtype${idx}`]}
                          </FormGroup>
                        </Col>
                        <Col xs={10}>
                          <FormGroup>
                            <Label>
                              <strong>Address</strong>
                            </Label>
                            <Input
                              type="email"
                              name={`email${idx}`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values[`email${idx}`]}
                            />
                            {errors[`email${idx}`] &&
                              touched[`email${idx}`] &&
                              errors[`email${idx}`]}
                          </FormGroup>
                        </Col>
                      </Row>
                    ))}
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <i className="fa fa-phone" />
                  <strong>Phone Numbers</strong>
                </CardHeader>
                <CardBody>
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
                                <Input
                                  type="text"
                                  name={`phonetype${idx}`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values[`phonetype${idx}`]}
                                />
                                {errors[`phonetype${idx}`] &&
                                  touched[`phonetype${idx}`] &&
                                  errors[`phonetype${idx}`]}
                              </FormGroup>
                            </Col>
                            <Col sm={10}>
                              <FormGroup>
                                <Label>
                                  <strong>Phone</strong>
                                </Label>
                                <Input
                                  type="tel"
                                  name={`phone${idx}`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values[`phone${idx}`]}
                                />
                                {errors.email && touched.email && errors.email}
                              </FormGroup>
                            </Col>
                          </Row>
                        </React.Fragment>
                      );
                    })}
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <i className="fa fa-pencil" />
                  <strong>Notes</strong>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <Input
                      type="textarea"
                      name="notes"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.notes}
                    />
                    {errors.notes && touched.notes && errors.notes}
                  </FormGroup>
                </CardBody>
              </Card>
              <div className="mt-4">
                <ButtonFooter
                  submitting={isSubmitting}
                  primaryButtonText="Update"
                  secondaryButtonText="Delete"
                  secondaryFunc={deleteContact}
                  component={contact}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.contactReducer.contact,
  contact: state.contactReducer.contact
});

const mapDispatchToProps = {
  deleteContact,
  fetchContact,
  submitNewContact
  // updateContact
};

ContactForm = connect(mapStateToProps, mapDispatchToProps)(ContactForm);
export default ContactForm;
