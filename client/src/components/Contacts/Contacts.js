import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import Loading from "../Loading/Loading";
import {
  emailDisplay,
  dateDisplay,
  tableImg,
  tableImgNull,
  nameDisplay,
  nameText
} from "./styles.css";

const Contacts = ({ contacts, isFetching }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <Table striped>
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th className={emailDisplay}>Email</th>
              <th>Phone</th>
              <th className={dateDisplay}>Updated</th>
            </tr>
          </thead>
          <tbody>
            {contacts &&
              contacts.map(contact => (
                <tr key={contact.id}>
                  <td>
                    {contact && contact.images ? (
                      <div className={tableImg}>
                        <img src={contact.images[0]} />
                      </div>
                    ) : (
                      <div className={tableImgNull}>
                        <span>
                          {contact && contact.firstName
                            ? contact.firstName.charAt(0).toUpperCase()
                            : null}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className={nameDisplay}>
                    {contact.fullName ? (
                      <Link to={`/contact/${contact.id}`}>
                        <span>{contact.fullName}</span>
                      </Link>
                    ) : (
                      ""
                    )}
                  </td>

                  <td className={emailDisplay}>
                    {contact.email ? (
                      <Link to={`/contact/${contact.id}`}>
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

                  <td className={dateDisplay}>
                    {moment(contact.updated).format("ddd, M/D/YY h:mma") ||
                      null}{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  </Grid>
);

export default Contacts;

// Contacts search bar
// Sort contacts by date added, firstName, lastName
