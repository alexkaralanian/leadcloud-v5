import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ReactLoading from "react-loading";
import "./Loading.css";

const Loading = props => (
  <Grid>
    <Row>
      <Col xs={12}>
        <div className="LoadingContainer">
          <ReactLoading
            type="spinningBubbles"
            color="#444"
            height={200}
            width={200}
            delay={0}
            className="ReactLoading_Icon"
          />
        </div>
      </Col>
    </Row>
  </Grid>
);

export default Loading;
