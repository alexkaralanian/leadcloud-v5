import React from "react";
import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap";
import "./Header.css";

const Header = ({
  images,
  componentName,
  headerTitle,
  isNew,
  primaryFunc
}) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <div className="header_container">
          <h1 className="header_text">
            {isNew ? `New ${componentName}` : headerTitle}
          </h1>
          {/*<div className="header_button-container">*/}
          <Button
            className="header_button-lg"
            bsStyle="primary"
            bsSize="large"
            onClick={primaryFunc}
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

export default Header;
