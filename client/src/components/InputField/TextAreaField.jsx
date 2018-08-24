import React from "react";
import { FormControl, ControlLabel } from "react-bootstrap";
import Textarea from "react-autosize-textarea";

const textAreaField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, active, error }
}) => {
  console.log("INPUT", input);
  return (
    <React.Fragment>
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        componentClass={Textarea}
        {...input}
        label={label}
        placeholder={placeholder}
        type={type}
      />
      {touched && !active && error && <div>{error}</div>}
    </React.Fragment>
  );
};

export default textAreaField;
