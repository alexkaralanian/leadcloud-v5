import React from "react";
import {
  Grid,
  Row,
  Col,
  Button,
  Glyphicon,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import "./Header.css";

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
              <ButtonToolbar>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="tooltip">{primaryText}</Tooltip>}
                >
                  <Button
                    className="button-lg"
                    bsStyle="primary"
                    // bsSize="large"
                    onClick={evt => {
                      evt.stopPropagation();
                      primaryFunc();
                    }}
                  >
                    <Glyphicon glyph={primaryGlyph} />
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
                  <Button
                    className="button-lg"
                    bsStyle={secondaryStyle}
                    // bsSize="large"
                    onClick={secondaryFunc}
                  >
                    <Glyphicon glyph={secondaryGlyph} />
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
