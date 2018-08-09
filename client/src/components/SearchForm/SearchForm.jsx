import React from "react";
import debounce from "lodash.debounce";
import { Grid, Row, Col, Field, reduxForm } from "redux-form";
import { FormGroup } from "react-bootstrap";

import inputField from "../InputField/InputField";
import "./SearchForm.css";

const SearchForm = ({
  load,
  pristine,
  reset,
  onChange,
  searchFunction,
  values,
  reducer,
  searchText
}) => {
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
  form: "searchForm", // a unique name for this form
  enableReinitialize: true
})(SearchForm);
