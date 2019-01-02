import React from "react";
import Moment from "moment";
import { Row, Col, Card, CardHeader, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";
import "./Campaigns.css";

const Campaigns = ({ campaigns }) => (
  <React.Fragment>
    <Row className="margin-top-2">
      <Col xs="12">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" />
            <strong>All Campaigns</strong>
          </CardHeader>
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map(campaign => (
                  <tr key={campaign.id}>
                    <td>
                      <Link to={`/campaigns/${campaign.id}/edit`}>
                        <span>{campaign.title}</span>
                      </Link>
                    </td>
                    <td>{campaign.subject}</td>
                    <td>{Moment(campaign.createdAt).format("ddd, M/D/YY h:mma")}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </React.Fragment>
);

export default Campaigns;
