import React from "react";
import { Grid, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./Campaigns.css";

const Campaigns = ({ createNewCampaign, campaigns }) => {
  return (
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
          <Table striped>
            <thead>
              <tr>
                <th>Title</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {campaigns &&
                campaigns.map(campaign => (
                  <tr key={campaign.id}>
                    <td>
                      <Link to={`/campaign/${campaign.id}`}>
                        <span>{campaign.title}</span>
                      </Link>
                    </td>
                    <td>{campaign.createdAt}</td>
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
