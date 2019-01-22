import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap"

import SearchForm from "../../SearchForm/SearchForm";

import {
  fetchContacts,
  onPageChange,
  onPageSizeChange,
  onFilteredChange,
  onSearch
} from "../../../reducers/contacts-reducer";

class ContactsContainer extends React.Component {
  componentDidMount() {
    const { fetchContacts } = this.props;
    fetchContacts();
  }

  render() {
    const columns = [
      {
        Header: null,
        id: "images",
        filterable: false,
        width: 50,
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
          contact.email ? (
            <a href={`mailto:${contact.email[0].value}`}>{contact.email[0].value}</a>
          ) : (
            ""
          )
      },
      {
        Header: "Phone",
        id: "phone",
        filterable: false,
        accessor: contact =>
          contact.phone ? (
            <a href={`tel:${contact.phone[0].value}`}>{contact.phone[0].value}</a>
          ) : (
            ""
          )
      }
    ];

    const {
      onPageChange,
      onPageSizeChange,
      onFilteredChange,
      groupContacts,
      deleteGroupContact,
      page,
      pages,
      pageSize,
      loading,
      filtered,
      match,
      contacts,
      onSearch
    } = this.props;

    return (
      <Card className="mt-4 mb-0">
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>All Contacts</strong>
        </CardHeader>
        <CardBody>
          <ReactTable
            className="-highlight"
            data={contacts}
            page={page}
            pages={pages}
            loading={loading}
            // filtered={filtered}
            columns={columns}
            defaultPageSize={20}
            minRows={3}
            // showPaginationTop
            showPageSizeOptions={false}
            manual
            // filterable
            onPageChange={page => {
              onPageChange(page);
            }}
            onPageSizeChange={(pageSize, page) => {
              onPageSizeChange(pageSize, page);
            }}
            onFilteredChange={filtered => {
              onFilteredChange(filtered);
            }}
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
                    onChange={() => onSearch(input.value)}
                  />
                  {makeTable()}
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
  contacts: state.contactsReducer.contacts,
  page: state.contactsReducer.page,
  pages: state.contactsReducer.pages,
  loading: state.contactsReducer.loading,
  filtered: state.contactsReducer.filtered
});

export default connect(mapStateToProps, {
  fetchContacts,
  onPageChange,
  onPageSizeChange,
  onFilteredChange,
  onSearch
})(ContactsContainer);
