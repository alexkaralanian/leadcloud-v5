import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

// import PropTypes from "prop-types";
// import { contactValidate } from "../../helpers/redux-form/validate";

const inputField = ({ input, label, type, meta: { touched, active, error } }) => (
  <div>
    <Label>{label}</Label>
    <Input {...input} placeholder={label} type={type} />
    {touched && !active && error && <div>{error}</div>}
  </div>
);

let OpenHouseForm;

OpenHouseForm = ({ handleSubmit, load, pristine, reset, submitting, auditClick, listing }) => (
  <Form className="margin-top-2" onSubmit={handleSubmit}>
    <h2>Please Sign-In...</h2>
    <div className="margin-top-2">
      <FormGroup className="formGroup">
        <Field type="text" name="firstName" component={inputField} label="First Name" />
      </FormGroup>
      <FormGroup className="formGroup">
        <Field type="text" name="lastName" component={inputField} label="Last Name" />
      </FormGroup>
      <FormGroup className="formGroup">
        <Field type="email" name="email" component={inputField} label="Email" />
      </FormGroup>
      <FormGroup className="formGroup">
        <Field type="tel" name="phone" component={inputField} label="Phone" />
      </FormGroup>

      <Button
        className="submitButton"
        type="submit"
        bsSize="lg"
        bsStyle="primary"
        disabled={pristine || submitting}
      >
        <span>Submit</span>
      </Button>
    </div>
  </Form>
);

OpenHouseForm = reduxForm({
  form: "openHouseForm", // a unique name for this form
  enableReinitialize: true
  // keepDirtyOnReinitialize: true,
  // validate: contactValidate
})(OpenHouseForm);

export default OpenHouseForm;
