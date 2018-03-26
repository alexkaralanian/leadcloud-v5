import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Col, Row } from "react-bootstrap";
import Loading from "../Loading/Loading";
import { dashCard, dashHeader, dashText, navLink, content } from "./styles.css";

import { background } from "../../index.css";

const Dashboard = () => (
  <div className={background}>
    <Grid className={content}>
      <Row>
        <Col sm={6}>
          <Link className={navLink} to="/contacts">
            <div className={dashCard}>
              <h3 className={dashText}>Contacts</h3>
            </div>
          </Link>
        </Col>
        <Col sm={6}>
          <Link className={navLink} to="/listings">
            <div className={dashCard}>
              <h3 className={dashText}>Listings</h3>
            </div>
          </Link>
        </Col>
        <Col sm={6}>
          <Link className={navLink} to="/emails">
            <div className={dashCard}>
              <h3 className={dashText}>Emails</h3>
            </div>
          </Link>
        </Col>
        <Col sm={6}>
          <Link className={navLink} to="/profile">
            <div className={dashCard}>
              <h3 className={dashText}>Profile</h3>
            </div>
          </Link>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Dashboard;
