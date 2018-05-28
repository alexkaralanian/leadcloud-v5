import React from "react";
import { FormControl, ControlLabel } from "react-bootstrap";

const inputField = ({
  input,
  label,
  type,
  meta: { touched, active, error }
}) => (
  <div>
    {label && <ControlLabel>{label}</ControlLabel>}
    <FormControl {...input} placeholder={label} type={type} />
    {touched && !active && error && <div>{error}</div>}
  </div>
);

export default inputField;
