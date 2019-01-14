import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Form, FormGroup, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import { contactValidate } from "../../../helpers/redux-form/validate";
import { fetchGroup } from "../../../actions/group-actions";

import InputField from "../../InputField/InputField";
import TextAreaField from "../../InputField/TextAreaField";
import ButtonFooter from "../../ButtonFooter/ButtonFooter";

const capitalize = word => {
  if (word) word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

let GroupForm;

GroupForm = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  isGroupNew,
  group,
  deleteGroup
}) => (
  <div className="margin-top-2">
    <Form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>Group Info</strong>
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Row>
              <Col xs={12}>
                <Field type="text" name="title" component={InputField} label="Group Title" />
                <Field
                  type="textarea"
                  name="description"
                  component={TextAreaField}
                  label="Description"
                />
              </Col>
            </Row>
          </FormGroup>
        </CardBody>
      </Card>
      <Row>
        <Col xs={12}>
          {isGroupNew ? (
            <ButtonFooter primaryButtonText="Submit" pristine={pristine} submitting={submitting} />
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
  </div>
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
