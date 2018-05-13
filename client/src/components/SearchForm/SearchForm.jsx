import React from "react";
import _ from "lodash";
import { Field, reduxForm } from "redux-form";
import { FormGroup, FormControl } from "react-bootstrap";

const inputField = ({
  input,
  label,
  type,
  list,
  meta: { touched, active, error }
}) => (
  <div>
    <FormControl {...input} placeholder={label} type={type} list={list} />
    {touched && !active && error && <div>{error}</div>}
  </div>
);

const SearchForm = ({ load, pristine, reset, onChange, searchFunction }) => (
  <FormGroup>
    <Field
      type="text"
      name="contactSearch"
      component={inputField}
      label="Search for a contact"
      onChange={_.debounce(searchFunction, 500)}
    />
  </FormGroup>
);

export default reduxForm({
  form: "searchForm", // a unique name for this form
  enableReinitialize: true
})(SearchForm);
