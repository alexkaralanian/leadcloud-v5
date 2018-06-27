import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Button, Form, FormGroup, Grid, Col, Row } from "react-bootstrap";

import { contactValidate } from "../../helpers/redux-form/validate";
import { fetchGroup } from "../../actions/group-actions";

import inputField from "../InputField/InputField";

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
  <Form onSubmit={handleSubmit}>
    {/* *** NAMES *** */}
    <Grid>
      <Row>
        <Col xs={12}>
          <FormGroup className="formGroup">
            <Field
              type="text"
              name="title"
              component={inputField}
              label="Group Title"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        {isGroupNew ? (
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
        ) : (
          <div>
            <Col xs={12} sm={6}>
              <Button
                className="submitButton"
                type="submit"
                bsStyle="primary"
                disabled={pristine || submitting}
              >
                <span>Update</span>
              </Button>
            </Col>
            <Col xs={12} sm={6}>
              <Button
                className="submitButton"
                onClick={() => {
                  deleteGroup(group.id);
                }}
                bsStyle="danger"
              >
                <span>Delete</span>
              </Button>
            </Col>
          </div>
        )}
      </Row>
    </Grid>
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
