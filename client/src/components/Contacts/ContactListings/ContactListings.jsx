import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Card, CardHeader, CardBody } from "reactstrap";
import ReactTable from "react-table";

import {
  fetchContactListings,
  deleteContactListing,
  onPageChange,
  onPageSizeChange,
  onFilteredChange
} from "../../../reducers/contact-listings";

class ContactListings extends React.Component {
  componentDidMount() {
    const { match, fetchContactListings } = this.props;
    fetchContactListings(match.params.id);
  }
  render() {
    const {
      match,
      contactListings,
      // searchContactListings,
      // submitContactListing,
      deleteContactListing,
      page,
      pages,
      loading,
      filtered
    } = this.props;

    const contactId = match.params.id;

    const columns = [
      {
        Header: null,
        id: "images",
        width: 50,
        accessor: listing =>
          listing.images ? (
            <div className="table_img">
              <img alt="listing" src={listing.images[0]} />
            </div>
          ) : (
            <div className="table_img-null">
              <span>{listing.address && listing.address.charAt(0).toUpperCase()}</span>
            </div>
          )
      },
      {
        Header: "Address",
        id: "address",
        accessor: listing =>
          listing.address ? <Link to={`/listings/${listing.id}`}>{listing.address}</Link> : ""
      },
      {
        Header: "Action",
        id: "id",
        accessor: listing => (
          <Button color="danger" onClick={() => deleteContactListing(contactId, listing.id)}>
            Remove Listing
          </Button>
        )
      }
    ];

    return (
      <Card className="mt-4 mb-0">
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>All Listings</strong>
        </CardHeader>
        <CardBody>
          <ReactTable
            className="-highlight"
            data={contactListings}
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
              onPageChange(page, contactId);
            }}
            onPageSizeChange={(pageSize, page) => {
              onPageSizeChange(pageSize, page, contactId);
            }}
            onFilteredChange={filtered => {
              onFilteredChange(filtered, contactId);
            }}
          />
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  contactListings: state.contactListings.contactListings,
  page: state.contactListings.page,
  pages: state.contactListings.pages,
  loading: state.contactListings.loading,
  filtered: state.contactListings.filtered
});

export default connect(mapStateToProps, {
  fetchContactListings,
  deleteContactListing,
  onPageChange,
  onPageSizeChange,
  onFilteredChange
})(ContactListings);
