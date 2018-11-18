import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Table } from "reactstrap";
import moment from "moment";
import Loading from "../Loading/Loading";
import Errors from "../Error/Error";
import "./Emails.css";

const Emails = ({ emails, createContact, isFetching, emailError }) =>
  isFetching ? (
    <Loading />
  ) : (
    <Row className="margin-top-2">
      <Col xs={12}>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify" />
            <strong>Emails</strong>
          </CardHeader>
          <CardBody>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {emails &&
                  emails.map(email => {
                    return (
                      <tr key={email.id}>
                        <td className="emailTable" id="sender">
                          <a
                            onClick={() =>
                              createContact(email.emailAddress, email.name)
                            }
                          >
                            <span className="emailAddress">{email.name}</span>
                          </a>
                        </td>

                        <td id="email-subject">
                          <Link to={`/emails/${email.id}`}>
                            {email.subject}
                          </Link>
                        </td>

                        <td id="email-date">
                          {moment(email.date).format("ddd, M/D/YY h:mma")}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );

export default Emails;

Emails.propTypes = {
  emails: PropTypes.array.isRequired,
  createContact: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  emailError: PropTypes.string.isRequired
};

Emails.defaultProps = {
  emails: [],
  createContact: () => {},
  isFetching: false,
  emailError: ""
};
