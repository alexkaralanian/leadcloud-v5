import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const GroupNav = ({ push, group }) => (
  <div>
    <Nav>
      <NavItem>
        <NavLink onClick={() => push(`/groups/${group.id}`)}>Info</NavLink>
      </NavItem>

      <NavItem>
        <NavLink onClick={() => push(`/groups/${group.id}/contacts`)}>
          Group Contacts
        </NavLink>
      </NavItem>

      {/*<NavItem eventKey={3} onSelect={() => onMenuSelect(3)}>
              Media
            </NavItem>*/}
    </Nav>
  </div>
);

export default GroupNav;
