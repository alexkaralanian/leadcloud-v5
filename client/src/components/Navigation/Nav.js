import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import {
  navBar,
  active,
  navitem,
  toggle,
  profilePic,
  navContainerRight,
  link,
  menuItem,
  brand
} from "./styles.css";

// function Home() {
//   return (
//     <NavItem className={navitem} eventKey={1}>
//       <NavLink activeClassName={active} to="/dashboard" exact>
//         Home
//       </NavLink>
//     </NavItem>
//   );
// }

// function Login({ isAuthed }) {
//   return isAuthed === false ? (
//     <NavItem className={navitem} eventKey={5}>
//       <NavLink activeClassName={active} to="/login" exact>
//         Login
//       </NavLink>
//     </NavItem>
//   ) : null;
// }

function Emails({ isAuthed }) {
  return isAuthed === true ? (
    <NavItem className={navitem} eventKey={3}>
      <NavLink activeClassName={active} to="/emails" exact>
        Emails
      </NavLink>
    </NavItem>
  ) : null;
}

function Contacts({ isAuthed }) {
  return isAuthed === true ? (
    <NavItem className={navitem} eventKey={4}>
      <NavLink activeClassName={active} to="/contacts" exact>
        Contacts
      </NavLink>
    </NavItem>
  ) : null;
}

function Listings({ isAuthed }) {
  return isAuthed === true ? (
    <NavItem className={navitem} eventKey={4}>
      <NavLink activeClassName={active} to="/listings" exact>
        Listings
      </NavLink>
    </NavItem>
  ) : null;
}

function Profile({ isAuthed, user, logout, profile }) {
  return isAuthed === true ? (
    <NavDropdown
      className={menuItem}
      eventKey={2}
      title={`Welcome, ${user.firstName}!`}
      id="basic-nav-dropdown"
    >
      <MenuItem eventKey={2.1}>
        <Link className={link} exact to="/profile">
          Profile
        </Link>
      </MenuItem>
      <MenuItem divider />
      <MenuItem
        onClick={() => {
          logout();
        }}
        eventKey={2.4}
      >
        Logout
      </MenuItem>
    </NavDropdown>
  ) : null;
}

function ProfilePic({ isAuthed, user }) {
  return isAuthed ? (
    <Link className={navitem} to="/profile" exact>
      <div>
        <img
          className={profilePic}
          src={user.googlePhoto || null}
          alt="profile pic"
        />
      </div>
    </Link>
  ) : null;
}

function Navigation({ isAuthed, user, logout, profile }) {
  return (
    <Navbar inverse className={navBar}>
      <Navbar.Header className={navBar}>
        <Navbar.Brand className={brand}>
          <Link to="/dashboard">LeadCloud</Link>
        </Navbar.Brand>
        <Navbar.Toggle className={toggle} />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          {/*<Login isAuthed={isAuthed} />*/}
          <Contacts isAuthed={isAuthed} />
          <Listings isAuthed={isAuthed} />
          <Emails isAuthed={isAuthed} />
        </Nav>
        <Nav className={navContainerRight} pullRight>
          <Profile
            isAuthed={isAuthed}
            user={user}
            logout={logout}
            profile={profile}
          />
          <ProfilePic user={user} isAuthed={isAuthed} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
