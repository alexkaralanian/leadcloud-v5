import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Col, Row } from "react-bootstrap";
import "./Dashboard.css";

const Dashboard = () => (
  <div className="background">
    <Grid className="content">
      <Row>
        <Col sm={6}>
          <Link className="navLink" to="/contacts">
            <div className="dashCard">
              <h3 className="dashText">Contacts</h3>
            </div>
          </Link>
        </Col>
        <Col sm={6}>
          <Link className="navLink" to="/listings">
            <div className="dashCard">
              <h3 className="dashText">Listings</h3>
            </div>
          </Link>
        </Col>
        {/*<Col sm={6}>
          <Link className="navLink" to="/groups">
            <div className="dashCard">
              <h3 className="dashText">Groups</h3>
            </div>
          </Link>
        </Col>*/}
        <Col sm={6}>
          <Link className="navLink" to="/campaigns">
            <div className="dashCard">
              <h3 className="dashText">Campaigns</h3>
            </div>
          </Link>
        </Col>
        <Col sm={6}>
          <Link className="navLink" to="/emails">
            <div className="dashCard">
              <h3 className="dashText">Messages</h3>
            </div>
          </Link>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Dashboard;
