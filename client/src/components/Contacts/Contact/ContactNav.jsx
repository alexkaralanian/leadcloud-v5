import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const ContactNav = ({ push, contact }) => {
  console.log("CONTACT", contact);
  return (
    <div>
      <Nav>
        <NavItem />
        <NavItem>
          <NavLink active onClick={() => push(`/contacts/${contact.id}`)}>
            Edit
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
};

export default ContactNav;
