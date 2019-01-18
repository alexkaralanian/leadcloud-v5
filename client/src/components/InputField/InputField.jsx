import React from "react";
import { FormGroup, Input, Label, Col } from "reactstrap";

const inputField = ({ input, label, placeholder, type, meta: { touched, active, error } }) => (
  <React.Fragment>
    <FormGroup row>
      <Label sm={2}>{label}</Label>
      <Col sm={10}>
        <Input {...input} label={label} placeholder={placeholder} type={type} />

        {touched && !active && error && <div>{error}</div>}
      </Col>
    </FormGroup>
  </React.Fragment>
);

export default inputField;
