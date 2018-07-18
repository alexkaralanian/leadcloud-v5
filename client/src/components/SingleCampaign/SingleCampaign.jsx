import React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";

const SingleCampaign = ({ campaign }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <h1>Campaign</h1>
        <div>TITLE: {campaign.title}</div>
        <div>SUBJECT: {campaign.subject}</div>
        <div>
          {campaign.listings && (
            <div>
              <div>LISTINGS:</div>
              {campaign.listings.map(listing => <div>{listing.address}</div>)}
            </div>
          )}
        </div>
        <div>
          {campaign.recipients && (
            <div>
              <div>RECIPIENTS:</div>
              {campaign.recipients.map(recipient => (
                <div>{recipient.email}</div>
              ))}
            </div>
          )}
        </div>
      </Col>
    </Row>
  </Grid>
);

export default SingleCampaign;
