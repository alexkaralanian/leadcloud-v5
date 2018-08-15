import React from "react";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import Loading from "../Loading/Loading";
import "./Groups.css";

const Groups = ({ groups, isFetching, component, hostId, submitFunction }) =>
  isFetching ? (
    <Loading />
  ) : (
    <Table striped>
      <thead>
        <tr>
          <th />
          <th>Title</th>
          {component === "ContactGroups" && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {groups &&
          groups.map(group => (
            <tr key={group.id}>
              <td>
                {group && group.images ? (
                  <div className="table_img">
                    <img alt="contact" src={group.images[0]} />
                  </div>
                ) : (
                  <div className="table_img-null">
                    <span>
                      {group && group.title
                        ? group.title.charAt(0).toUpperCase()
                        : null}
                    </span>
                  </div>
                )}
              </td>
              <td>
                <Link to={`/groups/${group.id}/contacts`}>
                  <span>{group.title}</span>
                </Link>
              </td>

              {component === "ContactGroups" && (
                <td>
                  <Button
                    bsStyle="warning"
                    onClick={() => submitFunction(group.id, hostId)}
                  >
                    Add Group
                  </Button>
                </td>
              )}

              {component === "CampaignGroups" && (
                <td>
                  <Button
                    bsStyle="warning"
                    onClick={() => submitFunction(group)}
                  >
                    Add Group
                  </Button>
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </Table>
  );

export default Groups;
