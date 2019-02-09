import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import moment from "moment";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import {
  fetchListings,
  onPageChange,
  onPageSizeChange,
  onFilteredChange,
  onSearch
} from "../../reducers/listings";

import "./Listings.css";

class Listings extends React.Component {
  componentDidMount() {
    const { fetchListings } = this.props;
    fetchListings();
  }
  render() {
    const columns = [
      {
        Header: null,
        id: "images",
        filterable: false,
        width: 50,
        accessor: listing =>
          listing.images ? (
            <div className="table_img">
              <img alt="contact" src={listing.images[0]} />
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
        Header: "City",
        id: "city",
        accessor: listing => <span>{listing.city}</span>
      },
      {
        Header: "State",
        id: "state",
        accessor: listing => <span>{listing.state}</span>
      },
      {
        Header: "Unit #",
        id: "unit_number",
        accessor: listing => <span>{listing.unit_number}</span>
      },

      {
        Header: "Layout",
        id: "bedrooms",
        accessor: listing => <span>{listing.bedrooms}</span>
      },
      {
        Header: "Price",
        id: "asking_price",
        accessor: listing => <span>{listing.asking_price}</span>
      },
      {
        Header: "Category",
        id: "category",
        accessor: listing => <span>{listing.category}</span>
      },
      {
        Header: "Status",
        id: "status",
        accessor: listing => <span>{listing.listing_status}</span>
      }
    ];

    const {
      onPageChange,
      onPageSizeChange,
      onFilteredChange,
      page,
      pages,
      pageSize,
      loading,
      filtered,
      match,
      listings,
      onSearch
    } = this.props;

    return (
      <Row className="mt-4">
        <Col xs={12}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify" />
              <strong>All Listings</strong>
            </CardHeader>
            <CardBody>
              <ReactTable
                className="-highlight"
                data={listings}
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
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  listings: state.listings.listings
});
const mapDispatchToProps = { fetchListings, onSearch };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listings);

{
  /*<div>{SearchForm}</div>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th />
                    <th>Address</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {listings &&
                    listings.map(listing => (
                      <tr key={listing.id}>
                        <td>
                          {listing && listing.images ? (
                            <div className="table_img">
                              <img src={listing.images[0]} alt="Listing_Image_Primary" />
                            </div>
                          ) : (
                            <div className="table_img-null">
                              <span>
                                {listing && listing.address
                                  ? listing.address.charAt(0).toUpperCase()
                                  : null}
                              </span>
                            </div>
                          )}
                        </td>
                        <td>
                          {listing.address ? (
                            <Link to={`/listings/${listing.id}`}>{listing.address}</Link>
                          ) : (
                            ""
                          )}
                        </td>

                        <td>{moment(listing.updated).format("ddd, M/D/YY h:mma") || null}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>*/
}
