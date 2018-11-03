import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { Row, Col, Card, CardHeader, CardBody, Table } from "reactstrap";

import PropTypes from "prop-types";
import Groups from "../Groups/Groups";

import "./Contacts.css";

const Contacts = ({ contacts, groups, SearchForm }) => (
  <React.Fragment>
    <Row className=" animated fadeIn margin-top-2">
      <Col xs="12">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" />
            <strong>All Contacts</strong>
          </CardHeader>
          <CardBody>
            <div>{SearchForm}</div>
            <Table responsive striped>
              <thead>
                <tr>
                  <th />
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th className="dateDisplay">Updated</th>
                </tr>
              </thead>
              <tbody>
                {contacts &&
                  contacts.map(contact => (
                    <tr key={contact.id}>
                      <td>
                        {contact.images ? (
                          <div className="table_img">
                            <img alt="contact" src={contact.images[0]} />
                          </div>
                        ) : (
                          <div className="table_img-null">
                            <span>
                              {contact.firstName &&
                                contact.firstName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </td>
                      <td>
                        {contact.fullName ? (
                          <Link to={`/contacts/${contact.id}`}>
                            <span>{contact.fullName}</span>
                          </Link>
                        ) : (
                          ""
                        )}
                      </td>

                      <td>
                        {contact.email ? (
                          <Link to={`/contacts/${contact.id}`}>
                            {`${contact.email[0].value}`}
                          </Link>
                        ) : (
                          ""
                        )}
                      </td>

                      <td>
                        {contact.phone ? (
                          <a href={`tel:${contact.phone[0].value}`}>
                            {contact.phone[0].value}
                          </a>
                        ) : (
                          ""
                        )}
                      </td>

                      <td className="dateDisplay">
                        {moment(contact.updated).format("ddd, M/D/YY h:mma") ||
                          null}
                      </td>
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

export default Contacts;
