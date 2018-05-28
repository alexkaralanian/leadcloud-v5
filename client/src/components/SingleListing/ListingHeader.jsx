import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./SingleListing.css";

const ListingHeader = ({ listing, images, isListingNew }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <div>
          <h1 className="headerText">
            {isListingNew ? "New Listing" : listing.address}
          </h1>
          {!isListingNew && (
            <div className="headerContent">
              <img
                className="listingImage"
                alt="Listing"
                src={images && images[0]}
              />

              <Link
                to={{
                  pathname: `/openhouse/${listing.id}`,
                  state: {
                    listing,
                    images
                  }
                }}
              >
                <span>Launch Open House</span>
              </Link>
            </div>
          )}
        </div>
      </Col>
    </Row>
  </Grid>
);

export default ListingHeader;
