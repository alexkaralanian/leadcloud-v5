import React from "react";
import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap";
import "./Header.css";
import Glass from "../../images/glyphicons_free/glyphicons/png/glyphicons-1-glass.png";

const Header = ({
  images,
  componentName,
  headerTitle,
  isNew,
  primaryGlyph,
  primaryText,
  primaryFunc,
  primaryStyle,
  secondaryGlyph,
  secondaryText,
  secondaryFunc,
  secondaryStyle,
  isVisible
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
          {primaryFunc &&
            isVisible &&
            !isNew && (
              <Button
                className="button-lg"
                bsStyle="primary"
                bsSize="large"
                onClick={primaryFunc}
              >
                <div className="button_inner">
                  <span className="button_inner-text">{primaryText}</span>
                  <Glyphicon glyph={primaryGlyph} />
                </div>
              </Button>
            )}
          {secondaryFunc &&
            isVisible &&
            !isNew && (
              <Button
                className="button-lg"
                bsStyle={secondaryStyle}
                bsSize="large"
                onClick={secondaryFunc}
              >
                <div className="button_inner">
                  <span className="button_inner-text">{secondaryText}</span>
                  <Glyphicon glyph={secondaryGlyph} />
                </div>
              </Button>
            )}
        </div>
      </div>
    </Col>
  </Row>
);

export default Header;
