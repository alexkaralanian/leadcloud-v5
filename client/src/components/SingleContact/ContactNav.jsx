import React from "react";
import { Grid, Col, Row, Nav, NavItem } from "react-bootstrap";

const ContactNav = ({
  contactId,
  isContactNew,
  push,
  onMenuSelect,
  activeKey
}) => (
  <div className="secondary_nav-container">
    <Grid>
      <Row>
        <Col xs={12}>
          <Nav bsStyle="pills" activeKey={activeKey}>
            <NavItem eventKey={1} onSelect={() => onMenuSelect(1)}>
              Info
            </NavItem>

            <NavItem eventKey={2} onSelect={() => onMenuSelect(2)}>
              Listings
            </NavItem>

            <NavItem eventKey={3} onSelect={() => onMenuSelect(3)}>
              Groups
            </NavItem>

            <NavItem eventKey={4} onSelect={() => onMenuSelect(4)}>
              Emails
            </NavItem>

            <NavItem eventKey={5} onSelect={() => onMenuSelect(5)}>
              Media
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default ContactNav;
