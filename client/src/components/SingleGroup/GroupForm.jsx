import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Button, Form, FormGroup, Col, Row } from "react-bootstrap";

import { contactValidate } from "../../helpers/redux-form/validate";
import { fetchGroup } from "../../actions/group-actions";

import inputField from "../InputField/InputField";
import textAreaField from "../InputField/TextAreaField";

const capitalize = word => {
  if (word) word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

let GroupForm = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  group
}) => (
  <Form onSubmit={handleSubmit}>
    {/* *** NAMES *** */}
    <Row>
      <Col xs={12} sm={6}>
        <FormGroup className="formGroup">
          <Field
            type="text"
            name="groupName"
            component={inputField}
            label="Group Name"
          />
        </FormGroup>
      </Col>
    </Row>
  </Form>
);

GroupForm = reduxForm({
  form: "groupForm", // a unique name for this form
  enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate: contactValidate
})(GroupForm);

GroupForm = connect(
  state => ({
    initialValues: state.groupReducer.contact // pull initial values from GROUP reducer
  }),
  { load: fetchGroup } // bind fetchContact action creator
)(GroupForm);

export default GroupForm;
