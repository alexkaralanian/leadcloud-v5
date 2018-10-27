import React from "react";
import { Input, Label } from "reactstrap";
import Textarea from "react-autosize-textarea";

const textAreaField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, active, error }
}) => (
  <React.Fragment>
    <Label>{label}</Label>
    <Input label={label} placeholder={placeholder} type={type} />

    {touched && !active && error && <div>{error}</div>}
  </React.Fragment>
);

export default textAreaField;
