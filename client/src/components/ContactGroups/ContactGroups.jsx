import React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./ContactGroups.css";

// ContactGroups renders a pills / tag view of all of a user's contact's group memberships and a delte button.

const ContactGroups = ({ contactGroups, deleteContactGroup, hostId }) => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <ul className="groupStyle">
            {contactGroups &&
              contactGroups.map(group => (
                <li key={group.id}>
                  <div
                    role="button"
                    className="groupDelete"
                    onClick={event => {
                      event.stopPropagation();
                      deleteContactGroup(group.id, hostId);
                    }}
                  >
                    <span>x</span>
                  </div>
                  <Link key={group.id} to={`/group/${group.id}/contacts`}>
                    <div className="groupLink">{group.title}</div>
                  </Link>
                </li>
              ))}
          </ul>
        </Col>
      </Row>
    </Grid>
  );
};

export default ContactGroups;
