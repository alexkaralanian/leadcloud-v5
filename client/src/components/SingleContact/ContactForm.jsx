import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Grid, Col, Row } from "react-bootstrap";

import { contactValidate } from "../../helpers/redux-form/validate";
import { fetchContact } from "../../actions/contact-actions";

import InputField from "../InputField/InputField";
import TextAreaField from "../InputField/TextAreaField";
import ButtonFooter from "../ButtonFooter/ButtonFooter";

import "./SingleContact.css";

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
  <Grid>
    <Form className="margin-top-2" onSubmit={handleSubmit}>
      <FormGroup>
        {/* *** NAMES *** */}
        <Row>
          <Col xs={12} sm={6}>
            <Field
              type="text"
              name="firstName"
              component={InputField}
              label="First Name"
            />
          </Col>
          <Col xs={12} sm={6}>
            <Field
              type="text"
              name="lastName"
              component={InputField}
              label="Last Name"
            />
          </Col>
        </Row>

        {/* ***EMAIL ADDRESSES*** */}
        <Row>
          {isContactNew || !contact.email ? (
            <Col xs={12} sm={6}>
              <Field
                type="email"
                name={"email"}
                component={InputField}
                label="Email"
              />
            </Col>
          ) : (
            contact.email &&
            contact.email.map(address => {
              return (
                <Col xs={12} sm={6} key={address.value}>
                  <Field
                    type="email"
                    name={`email[${contact.email.indexOf(address)}].value`}
                    component={InputField}
                    label={`${capitalize(address.type)} Email`}
                  />
                </Col>
              );
            })
          )}
        </Row>

        {/* ***PHONE NUMBERS*** */}
        <Row>
          {isContactNew || !contact.phone ? (
            <Col xs={12} sm={6}>
              <Field
                type="tel"
                name={"phone"}
                component={InputField}
                label="Phone"
              />
            </Col>
          ) : (
            contact.phone &&
            contact.phone.map(number => {
              return (
                <Col xs={12} sm={6} key={number.value}>
                  <Field
                    type="tel"
                    name={`phone[${contact.phone.indexOf(number)}].value`}
                    component={InputField}
                    label={`${capitalize(number.type)} Phone`}
                  />
                </Col>
              );
            })
          )}
        </Row>

        {/* *** NOTES *** */}
        <Row>
          <Col xs={12}>
            <Field
              type="text"
              name="notes"
              component={TextAreaField}
              label="Notes"
            />
          </Col>
        </Row>
      </FormGroup>

      {/* *** BUTTONS *** */}
      <Row>
        <Col xs={12}>
          {isContactNew ? (
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
              secondaryFunc={deleteContact}
              component={contact}
            />
          )}
        </Col>
      </Row>
    </Form>
  </Grid>
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
  { load: fetchContact } // bind fetchContact action creator
)(ContactForm);

export default ContactForm;
