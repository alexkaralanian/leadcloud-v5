import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import { contactValidate } from "../../../helpers/redux-form/validate";
import { fetchContact } from "../../../actions/contact-actions";

import InputField from "../../InputField/InputField";
import TextAreaField from "../../InputField/TextAreaField";
// import ButtonFooter from "../../ButtonFooter/ButtonFooter";

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
  <Card>
    <CardHeader>
      <i className="fa fa-align-justify" />
      <strong>Edit Contact</strong>
    </CardHeader>
    <CardBody>
      <Form onSubmit={handleSubmit}>
        <div className="form_border">
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
            <Field type="tel" name={"phone"} component={InputField} label="Phone" />
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
        <Field
          type="textarea"
          name="notes"
          component={InputField}
          label="Notes"
          placeholder="Add your notes here..."
        />
      </Form>
    </CardBody>
  </Card>
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

{
  /* *** BUTTONS ***
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
          )}*/
}
