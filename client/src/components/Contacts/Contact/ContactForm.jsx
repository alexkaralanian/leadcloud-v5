import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import { contactValidate } from "../../../helpers/redux-form/validate";
import { fetchContact } from "../../../actions/contact-actions";

import InputField from "../../InputField/InputField";
import TextAreaField from "../../InputField/TextAreaField";
import ButtonFooter from "../../ButtonFooter/ButtonFooter";

import "../Contacts.scss";

const capitalize = word => {
  if (word) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

let ContactForm;

ContactForm = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  auditClick,
  isContactNew,
  contact,
  fetchContact,
  deleteContact
}) => (
  <div>
    <Row>
      <Col xs="12">
        <Form className="margin-top-2" onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              <strong>Contact Info</strong>
            </CardHeader>
            <CardBody>
              <FormGroup>
                {/* *** NAMES *** */}
                <Field type="text" name="firstName" component={InputField} label="First Name" />

                <Field type="text" name="lastName" component={InputField} label="Last Name" />

                {/* ***EMAIL ADDRESSES*** */}
                {isContactNew || !contact.email ? (
                  <Field type="email" name={"email"} component={InputField} label="Email" />
                ) : (
                  contact.email &&
                  contact.email.map(address => {
                    return (
                      <div key={address.value}>
                        <Field
                          type="email"
                          name={`email[${contact.email.indexOf(address)}].value`}
                          component={InputField}
                          label={`${capitalize(address.type)} Email`}
                        />
                      </div>
                    );
                  })
                )}

                {/* ***PHONE NUMBERS*** */}
                {isContactNew || !contact.phone ? (
                  <div>
                    <Field type="tel" name={"phone"} component={InputField} label="Phone" />
                  </div>
                ) : (
                  contact.phone &&
                  contact.phone.map(number => {
                    return (
                      <div key={number.value}>
                        <Field
                          type="tel"
                          name={`phone[${contact.phone.indexOf(number)}].value`}
                          component={InputField}
                          label={`${capitalize(number.type)} Phone`}
                        />
                      </div>
                    );
                  })
                )}

                {/* *** NOTES *** */}
                <div>
                  <Field
                    type="textarea"
                    name="notes"
                    component={InputField}
                    label="Notes"
                    placeholder="Add your notes here..."
                  />
                </div>
              </FormGroup>
            </CardBody>
          </Card>

          {/* *** BUTTONS *** */}
          {isContactNew ? (
            <ButtonFooter primaryButtonText="Submit" pristine={pristine} submitting={submitting} />
          ) : (
            <ButtonFooter
              pristine={pristine}
              submitting={submitting}
              primaryButtonText="Update"
              secondaryButtonText="Delete"
              secondaryFunc={deleteContact}
              component={contact}
            />
          )}
        </Form>
      </Col>
    </Row>
  </div>
);

ContactForm = reduxForm({
  form: "contactForm", // a unique name for this form
  enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate: contactValidate
})(ContactForm);

ContactForm = connect(
  state => ({
    initialValues: state.contactReducer.contact // pull initial values from CONTACT reducer
  }),
  null
)(ContactForm);

export default ContactForm;
