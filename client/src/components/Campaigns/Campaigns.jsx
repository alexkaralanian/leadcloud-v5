import React from "react";
import { Grid, Col, Row, Button } from "react-bootstrap";
import "./Campaigns.css";

const Campaigns = ({ createNewCampaign }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <Button
          className="submitButton"
          bsStyle="primary"
          onClick={createNewCampaign}
        >
          CREATE NEW
        </Button>
      </Col>
    </Row>
  </Grid>
);

export default Campaigns;
