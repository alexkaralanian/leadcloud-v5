import React from "react";
import debounce from "lodash.debounce";
import { Field, reduxForm } from "redux-form";
import { FormGroup, Input, Label } from "reactstrap";
// import { Formik, Form, Field } from "formik";

let searchForm;

const inputField = ({ input, label, placeholder, type, meta: { touched, active, error } }) => (
  <div>
    {label && <Label>{label}</Label>}
    <Input {...input} placeholder={placeholder} label={label} type={type} />
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

  // return <Input type="text" />;
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

// export default SearchForm;

export default reduxForm({
  form: `${searchForm || "searchForm"}`, // a unique name for this form
  enableReinitialize: true
})(SearchForm);

// const CustomInput = ({ type, field, form: { touched, errors }, ...props }) => (
//   <div>
//     <Input type={type} {...field} {...props} />
//     {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
//   </div>
// );

// const SearchForm = props => {
//   return (
//     <Formik
//       onSubmit={values => {
//         console.log("VALUES", values);
//       }}
//       render={({ values }) => (
//         <Form>
//           <FormGroup>
//             <Field type="text" component={CustomInput} name="search" />
//           </FormGroup>
//         </Form>
//       )}
//     />
//   );
// };

// export default SearchForm;
