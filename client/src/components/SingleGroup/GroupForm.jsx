import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Grid, Col, Row } from "react-bootstrap";

import { contactValidate } from "../../helpers/redux-form/validate";
import { fetchGroup } from "../../actions/group-actions";

import InputField from "../InputField/InputField";
import TextAreaField from "../InputField/TextAreaField";
import ButtonFooter from "../ButtonFooter/ButtonFooter";

const capitalize = word => {
  if (word) word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

let GroupForm = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  isGroupNew,
  group,
  deleteGroup
}) => (
  <Grid className="margin-top-2">
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Row>
          <Col xs={12}>
            <Field
              type="text"
              name="title"
              component={InputField}
              label="Group Title"
            />
            <Field
              type="text"
              name="description"
              component={TextAreaField}
              label="Description"
            />
          </Col>
        </Row>
      </FormGroup>
      <Row>
        <Col xs={12}>
          {isGroupNew ? (
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
              secondaryFunc={deleteGroup}
              component={group}
            />
          )}
        </Col>
      </Row>
    </Form>
  </Grid>
);

GroupForm = reduxForm({
  form: "groupForm", // a unique name for this form
  enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate: contactValidate
})(GroupForm);

GroupForm = connect(
  state => ({
    initialValues: state.groupReducer.group // pull initial values from GROUP reducer
  }),
  { load: fetchGroup } // bind fetchContact action creator
)(GroupForm);

export default GroupForm;
