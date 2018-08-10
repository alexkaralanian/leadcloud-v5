import React from "react";
import { Grid, Col, Row, Nav, NavItem } from "react-bootstrap";

const GroupNav = ({ groupId, isGroupNew, push, onMenuSelect, activeKey }) => (
  <div className="secondary_nav-container">
    <Nav bsStyle="pills" activeKey={activeKey}>
      <NavItem eventKey={1} onSelect={() => onMenuSelect(1)}>
        Group Contacts
      </NavItem>

      <NavItem eventKey={2} onSelect={() => onMenuSelect(2)}>
        Info
      </NavItem>

      {/*<NavItem eventKey={3} onSelect={() => onMenuSelect(3)}>
              Media
            </NavItem>*/}
    </Nav>
  </div>
);

export default GroupNav;
