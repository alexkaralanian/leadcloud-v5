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
  isGroupNew,
  group,
  deleteGroup
}) => (
  <Grid className="group-form_container">
    <Form onSubmit={handleSubmit}>
      {/* *** NAMES *** */}

      <Row>
        <Col xs={12}>
          <FormGroup>
            <Field
              type="text"
              name="title"
              component={inputField}
              label="Group Title"
            />
            <Field
              type="text"
              name="description"
              component={textAreaField}
              label="Description"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        {isGroupNew ? (
          <Col xs={12}>
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
          </Col>
        ) : (
          <Col xs={12}>
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
                  deleteGroup(group.id);
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
          </Col>
        )}
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
