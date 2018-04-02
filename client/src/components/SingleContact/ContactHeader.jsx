import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { headerText, profileImage } from "../../index.css";

const ContactHeader = ({ contact, images, isContactNew }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <div>
          <h1 className={headerText}>
            {isContactNew ? "New Contact" : contact.fullName}
          </h1>
          <img className={profileImage} src={images && images[0]} />
        </div>
      </Col>
    </Row>
  </Grid>
);

export default ContactHeader;
