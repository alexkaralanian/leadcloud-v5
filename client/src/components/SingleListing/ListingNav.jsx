import React from "react";
import { Link } from "react-router-dom";
import { Grid, Col, Row, Nav, NavItem } from "react-bootstrap";
import "./SingleListing.css";

const ListingNav = ({ listingId }) => (
  <div className="NavBar">
    <Grid>
      <Row>
        <Col xs={12}>
          <Nav bsStyle="tabs" activeKey="1">
            <NavItem eventKey="1">
              <Link
                to={{
                  pathname: `/listing/${listingId}`
                }}
              >
                Info
              </Link>
            </NavItem>
            <NavItem eventKey="2">
              <Link
                to={{
                  pathname: `/listing/${listingId}/contacts`
                }}
              >
                Contacts
              </Link>
            </NavItem>
            <NavItem eventKey="3">
              <Link
                to={{
                  pathname: `/listing/${listingId}/emails`
                }}
              >
                Emails
              </Link>
            </NavItem>

            <NavItem eventKey="4">
              <Link
                to={{
                  pathname: `/listing/${listingId}/media`
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

export default ListingNav;
