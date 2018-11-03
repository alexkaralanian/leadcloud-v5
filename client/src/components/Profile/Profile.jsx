import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Button, Card, CardHeader, CardBody } from "reactstrap";
import "./Profile.css";

const Profile = ({ logout, syncContacts, user }) => (
  <Row className="margin-top-2">
    <Col xs={12}>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>Profile Details</strong>
        </CardHeader>
        <CardBody>
          <h1 className="headerText">Welcome, {user.firstName}!</h1>
          <img src={user.googlePhoto} className="img-fluid profilePic" />
          <div>
            <Button color="primary" onClick={logout}>
              <span>LOGOUT</span>
            </Button>
            <Button color="primary" onClick={syncContacts}>
              <span>SYNC GOOGLE CONTACTS</span>
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

Profile.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

Profile.defaultProps = {
  user: {},
  logout: () => {}
};

export default Profile;
