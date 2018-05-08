import React from "react";
import PropTypes from "prop-types";
import { Grid, Col, Row, Image, Button } from "react-bootstrap";
import "./Profile.css";

// import { LogoutButton, GetGmailProfile } from "../Buttons/AuthButtons";

const Profile = ({ logout, user }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <div>
          <h1 className="headerText">Welcome, {user.firstName}!</h1>
          <Image src={user.googlePhoto} className="profilePic" />
          <div>
            <Button className="logoutBtn" bsStyle="primary" onClick={logout}>
              <span>LOGOUT</span>
            </Button>
            {/* <GetGmailProfile onClick={getGmailProfile} /> */}
          </div>
        </div>
      </Col>
    </Row>
  </Grid>
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
