import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import "./OpenHouse.css";

const OpenHouse = ({ listing, images }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <div className="OpenHouseContainer">
          <h1>{listing.address}</h1>
          <img className="OpenHouseImg" src={images[0]} />
        </div>
      </Col>
    </Row>
  </Grid>
);

export default OpenHouse;
