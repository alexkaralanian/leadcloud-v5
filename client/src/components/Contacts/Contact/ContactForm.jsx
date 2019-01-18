import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import { contactValidate } from "../../../helpers/redux-form/validate";
import {
  fetchContact,
  deleteContact,
  submitNewContact
  // updateContact
} from "../../../actions/contact-actions";

import InputField from "../../InputField/InputField";
import TextAreaField from "../../InputField/TextAreaField";
import ButtonFooter from "../../ButtonFooter/ButtonFooter";

import "../Contacts.scss";

// import React from "react";
// import { FormGroup, Input, Label, Col } from "reactstrap";

// const inputField = ({ input, label, placeholder, type, meta: { touched, active, error } }) => (
//   <React.Fragment>
//     <FormGroup row>
//       <Label sm={2}>{label}</Label>
//       <Col sm={10}>
//         <Input {...input} label={label} placeholder={placeholder} type={type} />

//         {touched && !active && error && <div>{error}</div>}
//       </Col>
//     </FormGroup>
//   </React.Fragment>
// );

// export default inputField;

const capitalize = word => {
  if (word) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

class ContactForm extends React.Component {
  init = contact => {
    const values = {};
    contact.email &&
      contact.email.forEach((address, idx) => {
        values[`email[${idx}]`] = address.value;
        values[`emailtype[${idx}]`] = address.type;
      });
    contact.phone &&
      contact.phone.forEach((number, idx) => {
        values[`phone[${idx}]`] = number.value;
        values[`phonetype[${idx}]`] = number.type;
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
                          name={"firstName"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                        />
                        {errors.email && touched.email && errors.email}
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
                        {errors.email && touched.email && errors.email}
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
                      <React.Fragment>
                        <Row>
                          <Col sm={2}>
                            <FormGroup>
                              <Label>
                                <strong>Type</strong>
                              </Label>
                              <Input
                                type="text"
                                name={`emailtype[${idx}]`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values[`emailtype[${idx}]`]}
                              />
                              {errors.password && touched.password && errors.password}
                            </FormGroup>
                          </Col>
                          <Col xs={10}>
                            <FormGroup>
                              <Label>
                                <strong>Address</strong>
                              </Label>
                              <Input
                                type="email"
                                name={`email[${idx}]`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values[`email[${idx}]`]}
                              />
                              {errors.email && touched.email && errors.email}
                            </FormGroup>
                          </Col>
                        </Row>
                      </React.Fragment>
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
                    contact.phone.map((address, idx) => (
                      <React.Fragment>
                        <Row>
                          <Col sm={2}>
                            <FormGroup>
                              <Label>
                                <strong>Type</strong>
                              </Label>
                              <Input
                                type="text"
                                name={`phonetype[${idx}]`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values[`phonetype[${idx}]`]}
                              />
                              {errors.password && touched.password && errors.password}
                            </FormGroup>
                          </Col>
                          <Col sm={10}>
                            <FormGroup>
                              <Label>
                                <strong>Phone</strong>
                              </Label>
                              <Input
                                type="tel"
                                name={`phone[${idx}]`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values[`phone[${idx}]`]}
                              />
                              {errors.email && touched.email && errors.email}
                            </FormGroup>
                          </Col>
                        </Row>
                      </React.Fragment>
                    ))}
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
                    {errors.email && touched.email && errors.email}
                  </FormGroup>
                </CardBody>
              </Card>

              <div className="mt-4">
                <ButtonFooter
                  // pristine={pristine}
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

ContactForm = reduxForm({
  form: "contactForm", // a unique name for this form
  enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate: contactValidate
})(ContactForm);

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

{
  /*<div className="form_border">
              <Field type="text" name="firstName" component={InputField} label="First Name" />

              <Field type="text" name="lastName" component={InputField} label="Last Name" />
            </div>
            {isContactNew || !contact.email ? (
              <Field type="email" name={"email"} component={InputField} label="Email" />
            ) : (
              contact.email &&
              contact.email.map(address => {
                return (
                  <div className="form_border" key={address.value}>
                    <Field
                      type="text"
                      name={`email[${contact.email.indexOf(address)}].type`}
                      component={InputField}
                      label={`Email Label`}
                    />
                    <Field
                      type="email"
                      name={`email[${contact.email.indexOf(address)}].value`}
                      component={InputField}
                      label={`Email Address`}
                    />
                  </div>
                );
              })
            )}

            <div className="form_border">
              {isContactNew || !contact.phone ? (
                <Field type="tel" name={"phone"} component={InputField} label="Phone" width={6} />
              ) : (
                contact.phone &&
                contact.phone.map(number => {
                  return (
                    <React.Fragment key={number.value}>
                      <Field
                        type="tel"
                        name={`phone[${contact.phone.indexOf(number)}].value`}
                        component={InputField}
                        label={`${capitalize(number.type)} Phone`}
                      />
                    </React.Fragment>
                  );
                })
              )}
            </div>
            <div className="form_border">
              <Field
                type="textarea"
                name="notes"
                component={InputField}
                label="Notes"
                placeholder="Add your notes here..."
              />
            </div>
            <div className="mt-4">
              <ButtonFooter
                pristine={pristine}
                submitting={submitting}
                primaryButtonText="Update"
                secondaryButtonText="Delete"
                secondaryFunc={deleteContact}
                component={contact}
              />
            </div>*/
}
