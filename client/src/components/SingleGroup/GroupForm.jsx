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
            <Button
              className="header_button-lg"
              type="submit"
              bsStyle="primary"
              bsSize="large"
              disabled={pristine || submitting}
            >
              <span>Submit</span>
            </Button>
          </Col>
        ) : (
          <Col xs={12}>
            <div className="form_button-row">
              <Button
                className="header_button-lg"
                type="submit"
                bsStyle="primary"
                bsSize="large"
                disabled={pristine || submitting}
              >
                <Glyphicon glyph="floppy-disk" />
              </Button>

              <Button
                className="header_button-lg"
                onClick={() => {
                  deleteGroup(group.id);
                }}
                bsStyle="danger"
                bsSize="large"
              >
                <Glyphicon glyph="trash" />
              </Button>
            </div>
          </Col>
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
    initialValues: state.groupReducer.group // pull initial values from GROUP reducer
  }),
  { load: fetchGroup } // bind fetchContact action creator
)(GroupForm);

export default GroupForm;
