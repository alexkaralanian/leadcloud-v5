import React from "react";
import { Nav, NavItem, NavLink, Badge } from "reactstrap";

const EmailNav = () => (
  <nav>
    <a href="#/ui-kits/email/compose" className="btn btn-danger btn-block">
      New Email
    </a>
    <Nav>
      <NavItem>
        <NavLink href="#/ui-kits/email/inbox">
          <i className="fa fa-inbox" /> Inbox <Badge color="danger">4</Badge>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">
          <i className="fa fa-star" /> Stared
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">
          <i className="fa fa-rocket" /> Sent
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">
          <i className="fa fa-trash-o" /> Trash
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">
          <i className="fa fa-bookmark" /> Important<Badge color="info">
            5
          </Badge>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">
          <i className="fa fa-exclamation-circle" /> Spam{" "}
          <Badge color="danger">4</Badge>
        </NavLink>
      </NavItem>
    </Nav>
  </nav>
);

export default EmailNav;
