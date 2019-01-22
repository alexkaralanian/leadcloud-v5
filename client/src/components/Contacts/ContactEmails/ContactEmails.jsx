import React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import moment from "moment";
import { Card, CardHeader, CardBody } from "reactstrap";

import {
  fetchContactEmails,
  onPageChange,
  onPageSizeChange,
  onFilteredChange,
  onContactEmailsSearch,
  setContactEmails
} from "../../../reducers/contact-emails";

import Pagination from "../../Pagination/Pagination";

class ContactEmails extends React.Component {
  componentDidMount() {
    console.log("COMP DID MNT");
    const { contact, fetchContactEmails } = this.props;
    if (contact.email) {
      fetchContactEmails(this.makeEmailsQuery(contact.email));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { contact, fetchContactEmails } = this.props;
    if (contact !== nextProps.contact) {
      if (nextProps.contact.email) {
        fetchContactEmails(this.makeEmailsQuery(nextProps.contact.email));
      }
    }
  }

  componentWillUnmount() {
    const { setContactEmails } = this.props;
    setContactEmails([]);
  }

  makeEmailsQuery = emails => {
    let query = "";
    emails.forEach(email => {
      query += `from: ${email.value.trim()} OR `;
    });
    query = query.slice(0, query.length - 4);
    return query;
  };

  makeSearchQuery = query => {
    const { contact } = this.props;
    const emailsQuery = this.makeEmailsQuery(contact.email);
    return `${query.toLowerCase()} ${emailsQuery}`;
  };

  render() {
    const {
      contactEmails,
      onPageChange,
      onPageSizeChange,
      onFilteredChange,
      onContactEmailsSearch,
      fetchContactEmails,
      page,
      pages,
      pageSize,
      loading,
      match
    } = this.props;

    const contactId = match.params.id;

    const columns = [
      {
        Header: "Sender",
        id: "name",
        accessor: email => <span>{email.emailAddress}</span>
      },
      {
        Header: "Subject",
        id: "subject",
        accessor: email => (
          <span>
            <Link to={`/emails/${email.id}`}>{email.subject}</Link>
          </span>
        )
      },
      {
        Header: "Date",
        id: "date",
        accessor: email => <span>{moment(email.date).format("ddd, M/D/YY h:mma")}</span>
      }
    ];

    return (
      <Card className="mb-0">
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>Contact Emails</strong>
        </CardHeader>
        <CardBody>
          <ReactTable
            className="-highlight"
            data={contactEmails}
            // page={page}
            // pages={pages}
            // loading={loading}
            // filtered={filtered}
            columns={columns}
            defaultPageSize={20}
            minRows={3}
            showPaginationBottom={false}
            // showPaginationTop
            // showPageSizeOptions={false}
            // showPageJump={false}
            // manual
            // sortable={false}
            // filterable
            // onPageChange={page => {
            //   onPageChange(page, contactId);
            // }}
            // onPageSizeChange={(pageSize, page) => {
            //   onPageSizeChange(pageSize, page, contactId);
            // }}
            // onFilteredChange={filtered => {
            //   onFilteredChange(filtered, contactId);
            // }}
            // getPaginationProps={(state, rowInfo, column, instance) => {
            //   console.log("PAGINATION PROPS", { state, rowInfo, column, instance });
            //   console.log("PAGINATION COMPONENT", state.PaginationComponent.toString());
            //   return {};

            // PaginationComponent={() => <Pagination />}
          >
            {(state, makeTable, instance) => {
              let input;
              return (
                <div>
                  <input
                    className="form-control mb-4"
                    placeholder="Search..."
                    type="text"
                    ref={n => (input = n)}
                    onChange={() => fetchContactEmails(this.makeSearchQuery(input.value))}
                    // onChange={() => console.log("INPUT", input.value)}
                  />
                  {makeTable()}
                  <Pagination />
                </div>
              );
            }}
          </ReactTable>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  contactEmails: state.contactEmails.contactEmails,
  contact: state.contactReducer.contact,
  page: state.contactEmails.page,
  pages: state.contactEmails.pages,
  loading: state.contactEmails.loading,
  filtered: state.contactEmails.filtered
});

const mapDispatchToProps = {
  fetchContactEmails,
  onPageChange,
  onPageSizeChange,
  onFilteredChange,
  onContactEmailsSearch,
  setContactEmails
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactEmails);
