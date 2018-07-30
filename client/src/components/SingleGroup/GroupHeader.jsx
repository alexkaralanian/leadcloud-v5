import React from "react";
import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap";
import "./SingleGroup.css";

const GroupHeader = ({ group, images, isGroupNew, displayModal }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <div className="header_container">
          <h1 className="header_text">
            {isGroupNew ? "New Group" : group.title}
          </h1>
          {/*<div className="header_button-container">*/}
          <Button
            bsStyle="primary"
            bsSize="large"
            className="header_button-lg"
            onClick={() => displayModal(true)}
          >
            <Glyphicon glyph="plus" />
          </Button>
          {/*<div className="header_button-text">Add Contacts</div>
          </div>*/}
        </div>
      </Col>
    </Row>
  </Grid>
);

export default GroupHeader;
