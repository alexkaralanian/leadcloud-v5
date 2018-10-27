import React from "react";
import debounce from "lodash.debounce";
import { Grid, Row, Col, Field, reduxForm } from "redux-form";
import { FormGroup, InputGroup, Input, Label } from "reactstrap";

// import inputField from "../InputField/InputField";
import "./SearchForm.css";

let searchForm;

const inputField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, active, error }
}) => (
  <div className="input_container">
    {label && <Label>{label}</Label>}
    <InputGroup className="search-form_input">
      <Input {...input} placeholder={placeholder} label={label} type={type} />
      {/*<InputGroup.Addon>
        <Glyphicon glyph="search" />
      </InputGroup.Addon>*/}
    </InputGroup>

    {touched && !active && error && <div>{error}</div>}
  </div>
);

const SearchForm = ({
  load,
  pristine,
  reset,
  onChange,
  searchFunction,
  values,
  reducer,
  searchText,
  form
}) => {
  searchForm = form;

  return (
    <FormGroup className="search-form">
      <Field
        type="text"
        name="contactSearch"
        component={inputField}
        placeholder={searchText || "Search..."}
        onChange={debounce(searchFunction, 500)}
      />
    </FormGroup>
  );
};

export default reduxForm({
  form: `${searchForm || "searchForm"}`, // a unique name for this form
  enableReinitialize: true
})(SearchForm);
