import React from "react";
import PropTypes from "prop-types";
import { Grid, Col, Row } from "react-bootstrap";
import { error } from "./styles.css";

const Errors = ({ errorText }) =>
  errorText && (
    <Grid>
      <Row>
        <Col xs={12}>
          <p className={error}>{errorText}</p>
        </Col>
      </Row>
    </Grid>
  );

export default Errors;

Errors.propTypes = {
  errorText: PropTypes.string.isRequired
};
