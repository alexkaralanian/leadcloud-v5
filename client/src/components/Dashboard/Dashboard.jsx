import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Col, Row } from "react-bootstrap";
// import "./Dashboard.css";

const Dashboard = () => (
  <div className="background">
    <Grid className="dashboard__content margin-top-2">
      <Row>
        <Col sm={6}>
          <Link className="dashboard__content-link" to="/contacts">
            <div className="dashboard__content-card">
              <h3 className="dashboard__content-text">Contacts</h3>
            </div>
          </Link>
        </Col>
        <Col sm={6}>
          <Link className="dashboard__content-link" to="/listings">
            <div className="dashboard__content-card">
              <h3 className="dashboard__content-text">Listings</h3>
            </div>
          </Link>
        </Col>
        <Col sm={6}>
          <Link className="dashboard__content-link" to="/groups">
            <div className="dashboard__content-card">
              <h3 className="dashboard__content-text">Groups</h3>
            </div>
          </Link>
        </Col>
        <Col sm={6}>
          <Link className="dashboard__content-link" to="/campaigns">
            <div className="dashboard__content-card">
              <h3 className="dashboard__content-text">Campaigns</h3>
            </div>
          </Link>
        </Col>
        <Col sm={6}>
          <Link className="dashboard__content-link" to="/emails">
            <div className="dashboard__content-card">
              <h3 className="dashboard__content-text">Messages</h3>
            </div>
          </Link>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Dashboard;
