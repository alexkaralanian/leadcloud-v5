import React from "react";
import { Nav, NavItem } from "react-bootstrap";

const CreateCampaignNav = ({ onMenuSelect, activeKey }) => (
  <div className="secondary_nav-container">
    <Nav bsStyle="pills" activeKey={activeKey}>
      <NavItem eventKey={1} onSelect={() => onMenuSelect(1)}>
        Initialize
      </NavItem>

      <NavItem eventKey={2} onSelect={() => onMenuSelect(2)}>
        Edit
      </NavItem>

      {/*<NavItem eventKey={3} onSelect={() => onMenuSelect(3)}>
        Review
      </NavItem>*/}
    </Nav>
  </div>
);

export default CreateCampaignNav;
