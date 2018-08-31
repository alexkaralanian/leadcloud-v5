import React from "react";
import Moment from "moment";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Campaigns.css";

const Campaigns = ({ campaigns }) => (
  <React.Fragment>
    {campaigns.length > 0 && (
      <div className="margin-top-2 table_container">
        <Table striped>
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
      </div>
    )}
  </React.Fragment>
);

export default Campaigns;
