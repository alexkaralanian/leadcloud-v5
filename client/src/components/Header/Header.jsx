import React from "react";
import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap";
import "./Header.css";

const Header = ({
  images,
  componentName,
  headerTitle,
  isNew,
  primaryGlyph,
  primaryFunc,
  primaryStyle,
  secondaryGlyph,
  secondaryFunc,
  secondaryStyle
}) => (
  <Row>
    <Col xs={12}>
      <div className="header_container">
        <div className="header_container-inner">
          {images && (
            <img
              className="header_image"
              alt="Contact"
              src={images && images[0]}
            />
          )}
          <h1 className="header_text">
            {isNew ? `New ${componentName}` : headerTitle}
          </h1>
        </div>
        <div className="header_button-row">
          {primaryFunc && (
            <Button
              className="header_button-lg"
              bsStyle="primary"
              bsSize="large"
              onClick={primaryFunc}
            >
              <Glyphicon glyph={primaryGlyph} />
            </Button>
          )}
          {secondaryFunc && (
            <Button
              className="header_button-lg"
              bsStyle={secondaryStyle}
              bsSize="large"
              onClick={secondaryFunc}
            >
              <Glyphicon glyph={secondaryGlyph} />
            </Button>
          )}
        </div>
      </div>
    </Col>
  </Row>
);

export default Header;
