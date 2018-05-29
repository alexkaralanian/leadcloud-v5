import React from "react";
import { FormControl, ControlLabel } from "react-bootstrap";

const textAreaField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, active, error }
}) => (
  <div>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      componentClass="textarea"
      {...input}
      label={label}
      placeholder={placeholder}
      type={type}
    />
    {touched && !active && error && <div>{error}</div>}
  </div>
);

export default textAreaField;
