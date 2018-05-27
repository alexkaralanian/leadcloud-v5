import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

import Loading from "../Loading/Loading";
import "./Listings.css";

const Listings = ({ listings, isFetching, isListingNew }) =>
  isFetching ? (
    <Loading />
  ) : (
    <Table striped>
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
                  <div className="tableImg">
                    <img src={listing.images[0]} alt="Listing_Image_Primary" />
                  </div>
                ) : (
                  <div className="tableImgNull">
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
                  <Link to={`/listing/${listing.id}`}>{listing.address}</Link>
                ) : (
                  ""
                )}
              </td>

              <td>
                {moment(listing.updated).format("ddd, M/D/YY h:mma") || null}
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );

export default Listings;
