import React from "react";
import { Link } from "react-router-dom";
import { Grid, Col, Row, Nav, NavItem } from "react-bootstrap";
import "./SingleContact.css";

const ContactNav = ({ contactId, isContactNew, push }) => (
  <div className="NavWrapper">
    <Grid>
      <Row>
        <Col xs={12}>
          <Nav bsStyle="tabs" activeKey={1}>
            <NavItem
              eventKey={1}
              onSelect={() => push(`/contact/${contactId}`)}
            >
              Info
            </NavItem>

            <NavItem
              eventKey={2}
              onSelect={() => push(`/contact/${contactId}/listings`)}
            >
              Listings
            </NavItem>

            <NavItem
              eventKey={3}
              onSelect={() => push(`/contact/${contactId}/emails`)}
            >
              Emails
            </NavItem>

            <NavItem
              eventKey={4}
              onSelect={() => push(`/contact/${contactId}/groups`)}
            >
              Groups
            </NavItem>

            <NavItem
              eventKey={5}
              onSelect={() => push(`/contact/${contactId}/media`)}
            >
              Media
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default ContactNav;
