import React from "react";
import { Row, Col, Card, CardHeader, CardBody, Table } from "reactstrap";

import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import Loading from "../Loading/Loading";
import "./Groups.css";

const Groups = ({
  groups,
  isFetching,
  component,
  hostId,
  submitFunction,
  SearchForm
}) =>
  isFetching ? (
    <Loading />
  ) : (
        <Row className="margin-top-2">
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> All Groups
              </CardHeader>
              <CardBody>
                <div>{SearchForm}</div>
                <Table responsive striped>
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
              </CardBody>
            </Card>
          </Col>
        </Row>

  );

export default Groups;
