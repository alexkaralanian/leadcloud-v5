import React from "react";
import { Input, Label } from "reactstrap";

const inputField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, active, error }
}) => (
  <React.Fragment>
    <Label>{label}</Label>
    <Input {...input} label={label} placeholder={placeholder} type={type} />

    {touched && !active && error && <div>{error}</div>}
  </React.Fragment>
);

export default inputField;
