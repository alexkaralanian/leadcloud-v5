import React from "react";
// import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  Grid,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import PropTypes from "prop-types";

// import { contactValidate } from "../../helpers/redux-form/validate";

const inputField = ({
  input,
  label,
  type,
  meta: { touched, active, error }
}) => (
  <div>
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} placeholder={label} type={type} />
    {touched && !active && error && <div>{error}</div>}
  </div>
);

let OpenHouseForm = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  auditClick,
  listing
}) => (
  <Grid className="marginTop20">
    <Form onSubmit={handleSubmit}>
      <FormGroup className="formGroup">
        <Field
          type="text"
          name="firstName"
          component={inputField}
          label="First Name"
        />
      </FormGroup>
      <FormGroup className="formGroup">
        <Field
          type="text"
          name="lastName"
          component={inputField}
          label="Last Name"
        />
      </FormGroup>
      <FormGroup className="formGroup">
        <Field type="email" name="email" component={inputField} label="Email" />
      </FormGroup>
      <FormGroup className="formGroup">
        <Field type="tel" name="phone" component={inputField} label="Phone" />
      </FormGroup>

      <Row>
        <Col xs={12}>
          <Button
            className="submitButton"
            type="submit"
            bsStyle="primary"
            disabled={pristine || submitting}
          >
            <span>Submit</span>
          </Button>
        </Col>
      </Row>
    </Form>
  </Grid>
);

OpenHouseForm = reduxForm({
  form: "openHouseForm", // a unique name for this form
  enableReinitialize: true
  // keepDirtyOnReinitialize: true,
  // validate: contactValidate
})(OpenHouseForm);

export default OpenHouseForm;
