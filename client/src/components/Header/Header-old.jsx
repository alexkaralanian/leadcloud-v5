import React from "react";

import { Button, Row, Col } from "reactstrap";

import "./Header-old.css";

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
    <Col xs="12">
      <div className="header-old">
        <div className="header__content">
          {images && <img alt="Contact" src={images && images[0]} />}
          <h1>{isNew ? `New ${componentName}` : headerTitle}</h1>
        </div>
        <div className="header__button-row">
          {primaryFunc &&
            isVisible &&
            !isNew && (
              <Button
                color="primary"
                onClick={evt => {
                  evt.stopPropagation();
                  primaryFunc();
                }}
              >
                <span>{primaryText}</span>
              </Button>
            )}
          {secondaryFunc &&
            isVisible &&
            !isNew && (
              <Button color={secondaryStyle} onClick={secondaryFunc}>
                <span>{secondaryText}</span>
              </Button>
            )}
        </div>
      </div>
    </Col>
  </Row>
);

export default Header;
