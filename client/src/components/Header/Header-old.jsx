import React from "react";
import {
  Glyphicon,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

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
      <div className="header animated fadeIn">
        <div className="header__content">
          {images && <img alt="Contact" src={images && images[0]} />}
          <h1>{isNew ? `New ${componentName}` : headerTitle}</h1>
        </div>
        <div className="header__button-row">
          {primaryFunc &&
            isVisible &&
            !isNew && (
              <ButtonToolbar>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="tooltip">{primaryText}</Tooltip>}
                >
                  <Button
                    color="primary"
                    onClick={evt => {
                      evt.stopPropagation();
                      primaryFunc();
                    }}
                  >
                    <span>{primaryText}</span>
                  </Button>
                </OverlayTrigger>
              </ButtonToolbar>
            )}
          {secondaryFunc &&
            isVisible &&
            !isNew && (
              <ButtonToolbar>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="tooltip">{secondaryText}</Tooltip>}
                >
                  <Button color={secondaryStyle} onClick={secondaryFunc}>
                    <span>{secondaryText}</span>
                  </Button>
                </OverlayTrigger>
              </ButtonToolbar>
            )}
        </div>
      </div>
    </Col>
  </Row>
);

export default Header;
