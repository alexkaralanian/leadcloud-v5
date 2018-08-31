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
    <div className="table_container">
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
                    <div className="table_img">
                      <img
                        src={listing.images[0]}
                        alt="Listing_Image_Primary"
                      />
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
                    <Link to={`/listings/${listing.id}`}>
                      {listing.address}
                    </Link>
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
    </div>
  );

export default Listings;
