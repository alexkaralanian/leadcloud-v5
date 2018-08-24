import React from "react";
import { Grid, Col, Row, Nav, NavItem } from "react-bootstrap";

const CreateCampaignNav = ({ onMenuSelect, activeKey }) => (
  <div className="secondary_nav-container">
    <Nav bsStyle="pills" activeKey={activeKey}>
      <NavItem eventKey={1} onSelect={() => onMenuSelect(1)}>
        Add Listings
      </NavItem>

      <NavItem eventKey={2} onSelect={() => onMenuSelect(2)}>
        Add Groups
      </NavItem>

      <NavItem eventKey={3} onSelect={() => onMenuSelect(3)}>
        Add Contacts
      </NavItem>
    </Nav>
  </div>
);

export default CreateCampaignNav;
