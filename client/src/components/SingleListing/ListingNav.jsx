import React from "react";
import { Grid, Col, Row, Nav, NavItem } from "react-bootstrap";
import "./SingleListing.css";

const ListingNav = ({ listingId, push }) => (
  <div className="NavWrapper">
    <Grid>
      <Row>
        <Col xs={12}>
          <Nav bsStyle="pills" activeKey={1}>
            <NavItem
              eventKey={1}
              onSelect={() => push(`/listing/${listingId}`)}
            >
              Info
            </NavItem>
            <NavItem
              eventKey={2}
              onSelect={() => push(`/listing/${listingId}/contacts`)}
            >
              Contacts
            </NavItem>
            <NavItem
              eventKey={3}
              onSelect={() => push(`/listing/${listingId}/emails`)}
            >
              Emails
            </NavItem>

            <NavItem
              eventKey={4}
              onSelect={() => push(`/listing/${listingId}/media`)}
            >
              Media
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default ListingNav;
