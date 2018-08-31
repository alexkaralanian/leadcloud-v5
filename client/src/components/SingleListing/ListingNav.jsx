import React from "react";
import { Grid, Col, Row, Nav, NavItem } from "react-bootstrap";

const ListingNav = ({ onMenuSelect, activeKey }) => (
  <div className="secondary_nav-container">
    <Nav bsStyle="pills" activeKey={activeKey}>
      <NavItem eventKey={1} onSelect={() => onMenuSelect(1)}>
        Info
      </NavItem>
      <NavItem eventKey={2} onSelect={() => onMenuSelect(2)}>
        Contacts
      </NavItem>
      <NavItem eventKey={3} onSelect={() => onMenuSelect(3)}>
        Emails
      </NavItem>

      <NavItem eventKey={4} onSelect={() => onMenuSelect(4)}>
        Media
      </NavItem>
    </Nav>
  </div>
);

export default ListingNav;
