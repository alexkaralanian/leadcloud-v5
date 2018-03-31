import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ReactLoading from "react-loading";
import { loadingContainer, loadingContainer2 } from "./styles.css";

const Loading = props => (
  <Grid>
    <Row>
      <Col xs={12}>
        <div className={loadingContainer}>
          <ReactLoading
            type="spinningBubbles"
            color="#444"
            height="100"
            width="100"
            delay={500}
            className={loadingContainer2}
          />
        </div>
      </Col>
    </Row>
  </Grid>
);

export default Loading;
