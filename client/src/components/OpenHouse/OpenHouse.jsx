import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./OpenHouse.css";

const OpenHouse = ({ listing }) => (
  <Row>
    <Col xs={12}>
      <div className="OpenHouseContainer">
        <img className="OpenHouseImg" src={listing.images[0]} />
      </div>
    </Col>
  </Row>
);

export default OpenHouse;
