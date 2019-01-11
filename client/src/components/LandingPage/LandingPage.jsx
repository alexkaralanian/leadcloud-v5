import React from "react";
import { Row, Col } from "reactstrap";

import GoogleButton from "../GoogleButton/GoogleButton";
import "./LandingPage.scss";

const LandingPage = () => (
  <Row>
    <Col xs={12}>
      <div className="landing-page__container">
        <div className="login__container">
          <div className="login__text-box">
            <h1 className="login__heading">Dashed App!</h1>
            {/*<h4 className="login__sub-heading">Please login...</h4>*/}
          </div>
          <GoogleButton />
        </div>
      </div>
    </Col>
  </Row>
);

export default LandingPage;
