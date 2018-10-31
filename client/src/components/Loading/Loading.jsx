import React from "react";
import { Row, Col } from "reactstrap";
import ReactLoading from "react-loading";
import "./Loading.css";

const Loading = props => (
  <Row>
    <Col xs={12}>
      <div className="LoadingContainer">
        <ReactLoading
          type="spinningBubbles"
          color="#444"
          height={50}
          width={50}
          delay={0}
          className="ReactLoading_Icon"
        />
      </div>
    </Col>
  </Row>
);

export default Loading;
