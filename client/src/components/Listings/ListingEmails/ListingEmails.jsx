import React from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import moment from "moment";
import { Card, CardHeader, CardBody } from "reactstrap";

import {
  fetchListingEmails,
  onPageChange,
  onPageSizeChange,
  onFilteredChange,
  onListingEmailsSearch,
  setListingEmails
} from "../../../reducers/listing-emails";

import Pagination from "../../Pagination/Pagination";

class ListingEmails extends React.Component {
  // componentDidMount() {
  //   const { listing, fetchListingEmails } = this.props;
  //   if (listing.address) fetchListingEmails(listing.address.trim().toLowerCase());
  // }

  // componentWillReceiveProps(nextProps) {
  //   const { listing, fetchListingEmails } = this.props;
  //   if (listing !== nextProps.listing) {
  //     if (listing.address) fetchListingEmails(listing.address.trim().toLowerCase());
  //   }
  // }

  componentWillUnmount() {
    const { setListingEmails } = this.props;
    // setListingEmails([]);
  }

  // makeSearchQuery = query => {
  //   return `${query.trim().toLowerCase()}`;
  // };

  render() {
    const {
      listingEmails,
      onPageChange,
      onPageSizeChange,
      onFilteredChange,
      onListingEmailsSearch,
      fetchListingEmails,
      page,
      pages,
      pageSize,
      loading,
      match
    } = this.props;

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
          <strong>Listing Emails</strong>
        </CardHeader>
        <CardBody>
          <ReactTable
            className="-highlight"
            data={listingEmails}
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
                    onChange={() => console.log(input.value)}
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
  listingEmails: state.listingEmails.listingEmails,
  listing: state.listing.listing,
  page: state.listingEmails.page,
  pages: state.listingEmails.pages,
  loading: state.listingEmails.loading,
  filtered: state.listingEmails.filtered
});

const mapDispatchToProps = {
  fetchListingEmails,
  onPageChange,
  onPageSizeChange,
  onFilteredChange,
  onListingEmailsSearch,
  setListingEmails
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingEmails);
