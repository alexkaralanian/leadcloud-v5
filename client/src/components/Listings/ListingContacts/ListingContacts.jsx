import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Card, CardHeader, CardBody } from "reactstrap";
import ReactTable from "react-table";

import {
  fetchListingContacts,
  deleteListingContact,
  onPageChange,
  onPageSizeChange,
  onFilteredChange
} from "../../../reducers/listing-contacts";

class ListingContacts extends React.Component {
  componentDidMount() {
    const { match, fetchListingContacts } = this.props;
    fetchListingContacts(match.params.id);
  }

  render() {
    const {
      match,
      listingContacts,
      searchListingContacts,
      submitListingContact,
      deleteListingContact,
      page,
      pages,
      loading,
      filtered
    } = this.props;

    const listingId = match.params.id;

    const columns = [
      {
        Header: null,
        id: "images",
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
        accessor: contact =>
          contact.phone ? (
            <a href={`tel:${contact.phone[0].value}`}>{contact.phone[0].value}</a>
          ) : (
            ""
          )
      },
      {
        Header: "Action",
        id: "id",
        accessor: contact => (
          <Button color="danger" onClick={() => deleteListingContact(contact.id, listingId)}>
            Remove Contact
          </Button>
        )
      }
    ];

    return (
      <Card className="mt-4 mb-0">
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>All Contacts</strong>
        </CardHeader>
        <CardBody>
          <ReactTable
            style={{
              "max-height": "475px"
            }}
            className="-highlight"
            data={listingContacts}
            page={page}
            pages={pages}
            loading={loading}
            filtered={filtered}
            columns={columns}
            defaultPageSize={20}
            minRows={3}
            // showPaginationTop
            showPageSizeOptions={false}
            manual
            filterable
            onPageChange={page => {
              onPageChange(page, listingId);
            }}
            onPageSizeChange={(pageSize, page) => {
              onPageSizeChange(pageSize, page, listingId);
            }}
            onFilteredChange={filtered => {
              onFilteredChange(filtered, listingId);
            }}
          />
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  listingContacts: state.listingContacts.listingContacts,
  page: state.listingContacts.page,
  pages: state.listingContacts.pages,
  loading: state.listingContacts.loading,
  filtered: state.listingContacts.filtered
});

export default connect(mapStateToProps, {
  fetchListingContacts,
  deleteListingContact,
  onPageChange,
  onPageSizeChange,
  onFilteredChange
})(ListingContacts);
