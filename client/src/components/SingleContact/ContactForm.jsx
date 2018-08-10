import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Form,
  FormGroup,
  Grid,
  Col,
  Row,
  Glyphicon
} from "react-bootstrap";

import { contactValidate } from "../../helpers/redux-form/validate";
import { fetchContact } from "../../actions/contact-actions";

import inputField from "../InputField/InputField";
import textAreaField from "../InputField/TextAreaField";

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
    <Form onSubmit={handleSubmit}>
      {/* *** NAMES *** */}
      <Row>
        <Col xs={12} sm={6}>
          <FormGroup className="formGroup">
            <Field
              type="text"
              name="firstName"
              component={inputField}
              label="First Name"
            />
          </FormGroup>
        </Col>
        <Col xs={12} sm={6}>
          <FormGroup className="formGroup">
            <Field
              type="text"
              name="lastName"
              component={inputField}
              label="Last Name"
            />
          </FormGroup>
        </Col>
      </Row>

      {/* ***EMAIL ADDRESSES*** */}
      <Row>
        {isContactNew || !contact.email ? (
          <Col xs={12} sm={6}>
            <FormGroup className="formGroup">
              <Field
                type="email"
                name={"email"}
                component={inputField}
                label="Email"
              />
            </FormGroup>
          </Col>
        ) : (
          contact.email &&
          contact.email.map(address => {
            return (
              <Col xs={12} sm={6} key={address.value}>
                <FormGroup className="formGroup">
                  <Field
                    type="email"
                    name={`email[${contact.email.indexOf(address)}].value`}
                    component={inputField}
                    label={`${capitalize(address.type)} Email`}
                  />
                </FormGroup>
              </Col>
            );
          })
        )}
      </Row>

      {/* ***PHONE NUMBERS*** */}
      <Row>
        {isContactNew || !contact.phone ? (
          <Col xs={12} sm={6}>
            <FormGroup className="formGroup">
              <Field
                type="tel"
                name={"phone"}
                component={inputField}
                label="Phone"
              />
            </FormGroup>
          </Col>
        ) : (
          contact.phone &&
          contact.phone.map(number => {
            return (
              <Col xs={12} sm={6} key={number.value}>
                <FormGroup className="formGroup">
                  <Field
                    type="tel"
                    name={`phone[${contact.phone.indexOf(number)}].value`}
                    component={inputField}
                    label={`${capitalize(number.type)} Phone`}
                  />
                </FormGroup>
              </Col>
            );
          })
        )}
      </Row>

      {/* *** NOTES *** */}
      <Row>
        <Col xs={12}>
          <FormGroup controlId="formControlsTextarea">
            <Field
              type="text"
              name="notes"
              component={textAreaField}
              label="Notes"
            />
          </FormGroup>
        </Col>
      </Row>

      {/* *** BUTTONS *** */}

      <Row>
        <Col xs={12}>
          {isContactNew ? (
            <div className="button_footer-container">
              <Button
                className="button-lg"
                type="submit"
                bsStyle="primary"
                bsSize="large"
                disabled={pristine || submitting}
              >
                <div className="button_inner">
                  <span className="button_inner-text">Submit</span>
                  <Glyphicon glyph="floppy-disk" />
                </div>
              </Button>
            </div>
          ) : (
            <div className="button_footer-container">
              <Button
                className="button-lg"
                type="submit"
                bsStyle="primary"
                bsSize="large"
                disabled={pristine || submitting}
              >
                <div className="button_inner">
                  <span className="button_inner-text">Update</span>
                  <Glyphicon glyph="floppy-disk" />
                </div>
              </Button>

              <Button
                className="button-lg"
                onClick={() => {
                  deleteContact(contact.id);
                }}
                bsSize="large"
                bsStyle="danger"
              >
                <div className="button_inner">
                  <span className="button_inner-text">Delete</span>
                  <Glyphicon glyph="trash" />
                </div>
              </Button>
            </div>
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
