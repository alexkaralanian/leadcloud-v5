import React from "react";
import { Nav, NavItem } from "reactstrap";

const ContactNav = ({ onMenuSelect, activeKey }) => (
  <div className="secondary_nav-container">
    <Nav pills activeKey={activeKey}>
      <NavItem eventKey={1} onSelect={() => onMenuSelect(1)}>
        Info
      </NavItem>

      <NavItem eventKey={2} onSelect={() => onMenuSelect(2)}>
        Listings
      </NavItem>

      <NavItem eventKey={3} onSelect={() => onMenuSelect(3)}>
        Groups
      </NavItem>

      <NavItem eventKey={4} onSelect={() => onMenuSelect(4)}>
        Emails
      </NavItem>

      <NavItem eventKey={5} onSelect={() => onMenuSelect(5)}>
        Media
      </NavItem>
    </Nav>
  </div>
);

export default ContactNav;
