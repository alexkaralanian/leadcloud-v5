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
  <Grid>
    <Row>
      <Col xs={12}>
        <div className="header_container">
          <h1 className="header_text">
            {isNew ? `New ${componentName}` : headerTitle}
          </h1>
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
  </Grid>
);

export default Header;
