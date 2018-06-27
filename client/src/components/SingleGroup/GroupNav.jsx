import React from "react";
import { Link } from "react-router-dom";
import { Grid, Col, Row, Nav, NavItem } from "react-bootstrap";
// import "./SingleContact.css";

const GroupNav = ({ groupId, isGroupNew, push }) => (
  <div className="NavWrapper">
    <Grid>
      <Row>
        <Col xs={12}>
          <Nav bsStyle="pills" activeKey={1}>
            <NavItem
              eventKey={1}
              onSelect={() => push(`/group/${groupId}/contacts`)}
            >
              Group Contacts
            </NavItem>

            <NavItem eventKey={2} onSelect={() => push(`/group/${groupId}`)}>
              Info
            </NavItem>

            <NavItem
              eventKey={3}
              onSelect={() => push(`/group/${groupId}/media`)}
            >
              Media
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default GroupNav;
