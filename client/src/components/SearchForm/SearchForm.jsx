import React from "react";
import debounce from "lodash.debounce";
import { Field, reduxForm } from "redux-form";
import { FormGroup } from "react-bootstrap";

import inputField from "../InputField/InputField";

const SearchForm = ({ load, pristine, reset, onChange, searchFunction }) => {
  console.log("SEARCH FUNCTION", searchFunction);
  return (
    <FormGroup>
      <Field
        type="text"
        name="contactSearch"
        component={inputField}
        placeholder="Search..."
        onChange={debounce(searchFunction, 500)}
      />
    </FormGroup>
  );
};

export default reduxForm({
  form: "searchForm", // a unique name for this form
  enableReinitialize: true
})(SearchForm);
