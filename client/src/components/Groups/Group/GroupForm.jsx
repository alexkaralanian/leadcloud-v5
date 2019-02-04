import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Form, Field, FieldArray } from "formik";
import { FormGroup, Label, Input, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import { createGroup, updateGroup, deleteGroup } from "../../../reducers/group";
import ButtonFooter from "../../ButtonFooter/ButtonFooter";

const CustomInput = ({ type, field, form: { touched, errors }, ...props }) => (
  <div>
    <Input type={type} {...field} {...props} />
    {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
  </div>
);

// const capitalize = word => {
//   if (word) word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
// };

const GroupForm = ({ isGroupNew, group, createGroup, updateGroup, deleteGroup }) => (
  <Formik
    initialValues={group}
    onSubmit={values => {
      if (isGroupNew) {
        createGroup(values);
      } else {
        updateGroup(values, group.id);
      }
    }}
    render={({ values }) => (
      <Form>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" />
            <strong>Group Details</strong>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Row>
                <Col xs={12}>
                  <Label>
                    <strong>Group Title</strong>
                  </Label>
                  <Field type="text" component={CustomInput} name="title" />
                  <Label>
                    <strong>Description</strong>
                  </Label>
                  <Field type="textarea" component={CustomInput} name="description" />
                </Col>
              </Row>
            </FormGroup>
          </CardBody>
        </Card>
        <Row>
          <Col xs={12}>
            <ButtonFooter
              primaryButtonText={isGroupNew ? "Create" : "Update"}
              secondaryButtonText="Delete"
              secondaryFunc={deleteGroup}
              component={group}
            />
          </Col>
        </Row>
      </Form>
    )}
  />
);

const mapStateToProps = state => ({
  group: state.group.group
});

const mapDispatchToProps = {
  createGroup,
  updateGroup,
  deleteGroup
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupForm);
