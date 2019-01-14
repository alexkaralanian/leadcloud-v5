import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const ContactNav = ({ push, contact }) => (
  <div>
    <Nav>
      <NavItem>
        <NavLink active onClick={() => push(`/contacts/${contact.id}`)}>
          Info
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink onClick={() => push(`/contacts/${contact.id}/listings`)}>Listings</NavLink>
      </NavItem>

      <NavItem>
        <NavLink onClick={() => push(`/contacts/${contact.id}/groups`)}>Groups</NavLink>
      </NavItem>

      <NavItem>
        <NavLink onClick={() => push(`/contacts/${contact.id}/emails`)}>Emails</NavLink>
      </NavItem>

      <NavItem>
        <NavLink onClick={() => push(`/contacts/${contact.id}/media`)}>Media</NavLink>
      </NavItem>
    </Nav>
  </div>
);

export default ContactNav;
