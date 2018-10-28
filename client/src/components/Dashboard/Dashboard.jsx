import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";
import "./Dashboard.scss";

const Dashboard = () => (
  <Row>
    <Col sm="6">
      <Link className="dashboard__content-link" to="/contacts">
        <div className="dashboard__content-card">
          <h3 className="dashboard__content-text">Contacts</h3>
        </div>
      </Link>
    </Col>
    <Col sm="6">
      <Link className="dashboard__content-link" to="/listings">
        <div className="dashboard__content-card">
          <h3 className="dashboard__content-text">Listings</h3>
        </div>
      </Link>
    </Col>
    <Col sm="6">
      <Link className="dashboard__content-link" to="/groups">
        <div className="dashboard__content-card">
          <h3 className="dashboard__content-text">Groups</h3>
        </div>
      </Link>
    </Col>
    <Col sm="6">
      <Link className="dashboard__content-link" to="/campaigns">
        <div className="dashboard__content-card">
          <h3 className="dashboard__content-text">Campaigns</h3>
        </div>
      </Link>
    </Col>
    <Col sm="6">
      <Link className="dashboard__content-link" to="/emails">
        <div className="dashboard__content-card">
          <h3 className="dashboard__content-text">Messages</h3>
        </div>
      </Link>
    </Col>
  </Row>
);

export default Dashboard;
