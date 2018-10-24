import React from "react";
import {

  Glyphicon,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

import { Button } from "reactstrap"

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
  <div className="row">
    <div className="col-sm">
      <div className="header">
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
                    // className="button-lg"
                    color="primary"
                    // bsSize="large"
                    onClick={evt => {
                      evt.stopPropagation();
                      primaryFunc();
                    }}
                  >
                    <span>{primaryText}</span>
                    {/*<Glyphicon glyph={primaryGlyph} />*/}
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
                    color={secondaryStyle}
                    onClick={secondaryFunc}
                  >
                    <span>{secondaryText}</span>
                    {/*<Glyphicon glyph={secondaryGlyph} />*/}
                  </Button>
                </OverlayTrigger>
              </ButtonToolbar>
            )}
        </div>
      </div>
    </div>
  </div>
);

export default Header;
