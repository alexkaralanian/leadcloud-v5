import React from "react";
import { Link } from "react-router-dom";
import { Grid, Col, Row, Nav, NavItem } from "react-bootstrap";
import { NavWrapper } from "./styles.css";

const ContactNav = ({ contactId, isContactNew }) => (
  <div className={NavWrapper}>
    <Grid>
      <Row>
        <Col xs={12}>
          <Nav bsStyle="tabs" activeKey="1">
            <NavItem eventKey="1">
              <Link
                to={{
                  pathname: `/contact/${contactId}`
                }}
              >
                Info
              </Link>
            </NavItem>

            <NavItem eventKey="2">
              <Link
                to={{
                  pathname: `/contact/${contactId}/listings`
                }}
              >
                Listings
              </Link>
            </NavItem>

            <NavItem eventKey="3">
              <Link
                to={{
                  pathname: `/contact/${contactId}/emails`
                }}
              >
                Emails
              </Link>
            </NavItem>

            <NavItem eventKey="4">
              <Link
                to={{
                  pathname: `/contact/${contactId}/groups`
                }}
              >
                Groups
              </Link>
            </NavItem>

            <NavItem eventKey="5">
              <Link
                to={{
                  pathname: `/contact/${contactId}/media`
                }}
              >
                Media
              </Link>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default ContactNav;
