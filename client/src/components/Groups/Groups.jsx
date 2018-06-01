import React from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import Loading from "../Loading/Loading";
import "./Groups.css";

const Groups = ({ groups, isFetching }) =>
  isFetching ? (
    <Loading />
  ) : (
    <Grid>
      <Row>
        <Col xs={12}>
          <Table striped>
            <thead>
              <tr>
                <th />
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {groups &&
                groups.map(group => (
                  <tr key={group.id}>
                    <td>
                      {group && group.images ? (
                        <div className="tableImg">
                          <img alt="contact" src={group.images[0]} />
                        </div>
                      ) : (
                        <div className="tableImgNull">
                          <span>
                            {group && group.title
                              ? group.title.charAt(0).toUpperCase()
                              : null}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="nameDisplay">
                      <Link to={`/group/${group.id}`}>
                        <span>{group.title}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Grid>
  );

export default Groups;
