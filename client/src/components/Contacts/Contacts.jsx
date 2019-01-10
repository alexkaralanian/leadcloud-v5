import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactTable from "react-table";

import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import "./Contacts.css";

const columns = [
  {
    Header: null,
    id: "images",
    accessor: contact =>
      contact.images ? (
        <div className="table_img">
          <img alt="contact" src={contact.images[0]} />
        </div>
      ) : (
        <div className="table_img-null">
          <span>{contact.firstName && contact.firstName.charAt(0).toUpperCase()}</span>
        </div>
      )
  },
  {
    Header: "Name",
    id: "fullName",
    accessor: contact =>
      contact.fullName ? <Link to={`/contacts/${contact.id}`}>{contact.fullName}</Link> : ""
  },

  {
    Header: "Email",
    id: "email",
    accessor: contact =>
      contact.email ? <a href={`mailto:${contact.email[0].value}`}>{contact.email[0].value}</a> : ""
  },
  {
    Header: "Phone",
    id: "phone",
    accessor: contact =>
      contact.phone ? <a href={`tel:${contact.phone[0].value}`}>{contact.phone[0].value}</a> : ""
  }
];

const Contacts = ({ contacts, groups, SearchForm }) => (
  <Row className="margin-top-2">
    <Col xs="12">
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>All Contacts</strong>
        </CardHeader>
        <CardBody>
          <div>{SearchForm}</div>
          <ReactTable
            data={contacts}
            columns={columns}
            defaultPageSize={25}
            minRows={3}
            manual
            onPageChange={() => {}}
          />

          {/*<Table responsive striped>
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
                            {contact.firstName && contact.firstName.charAt(0).toUpperCase()}
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
                        <Link to={`/contacts/${contact.id}`}>{`${contact.email[0].value}`}</Link>
                      ) : (
                        ""
                      )}
                    </td>

                    <td>
                      {contact.phone ? (
                        <a href={`tel:${contact.phone[0].value}`}>{contact.phone[0].value}</a>
                      ) : (
                        ""
                      )}
                    </td>

                    <td className="dateDisplay">
                      {moment(contact.updated).format("ddd, M/D/YY h:mma") || null}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>*/}
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default Contacts;
