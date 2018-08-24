import React from "react";
import Moment from "moment";
import { Grid, Col, Row, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Campaigns.css";

const Campaigns = ({ campaigns }) => {
  return (
    <Grid className="margin-top-2">
      <Row>
        <Col xs={12}>
          <Table striped>
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {campaigns &&
                campaigns.map(campaign => (
                  <tr key={campaign.id}>
                    <td>
                      <Link to={`/campaigns/${campaign.id}`}>
                        <span>{campaign.title}</span>
                      </Link>
                    </td>
                    <td>{campaign.subject}</td>
                    <td>
                      {Moment(campaign.createdAt).format("ddd, M/D/YY h:mma")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Grid>
  );
};

export default Campaigns;
