import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Row, Col, Table } from "react-bootstrap";
import moment from "moment";
import Loading from "../Loading/Loading";
import { tableCell, emailAddress, emailTable } from "./styles.css";
// import { error, background, content } from "../../sharedStyles/styles.css";

const Emails = ({ emails, createContact, isFetching, emailError }) =>
  isFetching ? (
    <Loading />
  ) : (
    <Grid>
      <Row>
        <Col xs={12}>
          <Table striped>
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
                      <td className={emailTable} id="sender">
                        <a
                          onClick={() =>
                            createContact(email.emailAddress, email.name)
                          }
                        >
                          <span className={emailAddress}>{email.name}</span>
                        </a>
                      </td>

                      <td id="email-subject">
                        <Link to={`/email/${email.id}`}>{email.subject}</Link>
                      </td>

                      <td id="email-date">
                        {moment(email.date).format("ddd, M/D/YY h:mma")}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/*error ? (
        <Row>
          <Col xs={12}>
            <p className={error}>{emailError}</p>
          </Col>
        </Row>
      ) : null*/}
    </Grid>
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
