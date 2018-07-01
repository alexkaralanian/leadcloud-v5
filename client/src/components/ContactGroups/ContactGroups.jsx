import React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./ContactGroups.css";

const ContactGroups = ({ contactGroups, deleteContactGroup, hostId }) => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <h4>CONTACT GROUPS:</h4>
          <div>
            <ul className="groupStyle">
              {contactGroups &&
                contactGroups.map(group => (
                  <div>
                    <li>
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
                  </div>
                ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default ContactGroups;

// onClick = renderGroups
// clickOnContactGroup = remove from group
// clickOnGroupName = add to contactGroups
