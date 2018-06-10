import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import "./Navigation.css";

const Navigation = ({ isAuthed, user, logout, profile, push }) => (
  <Navbar inverse className="NavContainer">
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/dashboard">LeadCloud</Link>
      </Navbar.Brand>
      <Navbar.Toggle className="toggle" />
    </Navbar.Header>

    <Navbar.Collapse>
      <Nav>
        <Contacts isAuthed={isAuthed} push={push} />
        <Listings isAuthed={isAuthed} push={push} />
        {/*<Groups isAuthed={isAuthed} push={push} />*/}
        <Campaigns isAuthed={isAuthed} push={push} />
        <Emails isAuthed={isAuthed} push={push} />
      </Nav>
      <Nav className="navContainerRight" pullRight>
        <Profile
          isAuthed={isAuthed}
          user={user}
          logout={logout}
          profile={profile}
          push={push}
        />
        <ProfilePic user={user} isAuthed={isAuthed} />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

const Contacts = ({ isAuthed, push }) =>
  isAuthed && (
    <MenuItem
      className="menuItem"
      eventKey="2"
      onSelect={() => push("/contacts")}
    >
      Contacts
    </MenuItem>
  );

const Listings = ({ isAuthed, push }) =>
  isAuthed && (
    <MenuItem
      className="menuItem"
      eventKey="3"
      onSelect={() => push("/listings")}
    >
      Listings
    </MenuItem>
  );

const Emails = ({ isAuthed, push }) =>
  isAuthed && (
    <MenuItem
      className="menuItem"
      eventKey="1"
      onSelect={() => push("/emails")}
    >
      Messages
    </MenuItem>
  );

// const Groups = ({ isAuthed, push }) =>
//   isAuthed && (
//     <MenuItem
//       className="menuItem"
//       eventKey="1"
//       onSelect={() => push("/groups")}
//     >
//       Groups
//     </MenuItem>
//   );

const Campaigns = ({ isAuthed, push }) =>
  isAuthed && (
    <MenuItem
      className="menuItem"
      eventKey="1"
      onSelect={() => push("/campaigns")}
    >
      Campaigns
    </MenuItem>
  );

const Profile = ({ isAuthed, user, logout, push }) =>
  isAuthed && (
    <NavDropdown
      className="menuItem"
      eventKey={2}
      title={`Welcome, ${user.firstName}!`}
      id="basic-nav-dropdown"
    >
      <MenuItem
        className="menuItem"
        eventKey="3"
        onSelect={() => push("/profile")}
      >
        Profile
      </MenuItem>

      <MenuItem divider />
      <MenuItem
        onClick={() => {
          push("/");
          logout();
        }}
        eventKey={2.4}
      >
        Logout
      </MenuItem>
    </NavDropdown>
  );

const ProfilePic = ({ isAuthed, user }) =>
  isAuthed && (
    <Link className="navitem" to="/profile">
      <div>
        <img
          className="navProfilePic"
          src={user.googlePhoto || null}
          alt="profile pic"
        />
      </div>
    </Link>
  );

export default Navigation;
