import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Button } from "react-bootstrap";

const SingleCampaign = ({ campaign }) => (
  <Grid className="margin-top-2">
    <Row>
      <Col xs={12}>
        <h1>Campaign</h1>
        <div>TITLE: {campaign.title}</div>
        <div>SUBJECT: {campaign.subject}</div>
        <div>
          {campaign.listings && (
            <div>
              <div>LISTINGS:</div>
              {campaign.listings.map(listing => (
                <div>
                  <Link to={`/listing/${listing.id}`}>{listing.address}</Link>
                </div>
              ))}
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
