import React from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
import "./Error.css";

const Errors = ({ errorText }) =>
  errorText && <Alert color="danger">{errorText}</Alert>;

export default Errors;

Errors.propTypes = {
  errorText: PropTypes.string.isRequired
};
