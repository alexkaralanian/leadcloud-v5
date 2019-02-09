import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const ListingNav = ({ push, listing }) => (
  <div className="secondary_nav-container">
    <Nav>
      <NavItem>
        <NavLink onClick={() => push(`/listings/${listing.id}`)}>Info</NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={() => push(`/listings/${listing.id}/contacts`)}>
          Contacts
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={() => push(`/listings/${listing.id}/emails`)}>
          Emails
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={() => push(`/listings/${listing.id}/media`)}>
          Media
        </NavLink>
      </NavItem>
    </Nav>
  </div>
);

export default ListingNav;
