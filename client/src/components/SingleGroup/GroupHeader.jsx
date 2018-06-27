import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

const GroupHeader = ({ group, images, isGroupNew }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <div>
          <h1 className="headerText">
            {isGroupNew ? "New Group" : group.title}
          </h1>
          {/*<img className="profileImage" src={images && images[0]} />*/}
        </div>
      </Col>
    </Row>
  </Grid>
);

export default GroupHeader;
