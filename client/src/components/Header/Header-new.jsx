import React from "react";

import { Row, Col } from "reactstrap";

import "./Header-old.css";

const Header = ({ children }) => (
  <Row>
    <Col xs="12">
      <div className="header-old">
        <div className="header__content">{children}</div>
      </div>
    </Col>
  </Row>
);

export default Header;
