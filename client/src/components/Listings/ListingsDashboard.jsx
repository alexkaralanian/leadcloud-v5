import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { push } from "react-router-redux";
import { Button, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import Listings from "../../components/Listings/Listings";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header-new";
import SearchForm from "../../components/SearchForm/SearchForm";
// import Counter from "../../components/Counter/Counter";
import Loading from "../../components/Loading/Loading";
import Placeholder from "../../components/Placeholder/Placeholder";

import {
  setListings,
  searchListings,
  clearListings,
  clearError
} from "../../actions/listing-actions";

import { fetchListings } from "../../reducers/listings";

import { fetchComponent, setQuery, setOffset, setCount } from "../../actions/query-actions";

import { clearFormData } from "../../actions/common-actions";

class ListingsContainer extends React.Component {
  componentDidMount() {
    const { fetchComponent, fetchListings, listings } = this.props;
    fetchListings();
    // fetchComponent("listings", [], setListings, null, null);
    // window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    const { clearFormData, setQuery, setOffset } = this.props;
    // window.removeEventListener("scroll", this.onScroll, false);
    // setQuery("");
    // setOffset(0);
    clearFormData();
  }

  // onScroll = () => {
  //   const { isLoading, offset, count, listings, fetchComponent } = this.props;
  //   if (
  //     window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
  //     count > offset &&
  //     !isLoading
  //   ) {
  //     fetchComponent("listings", listings, setListings, null, null);
  //   }
  // };

  createNewListing = () => {
    this.props.push("/listings/new");
  };

  render() {
    const { match, isFetching, listings, push } = this.props;

    return (
      <Row>
        <Col xs={12}>
          <BreadCrumbs />
          <Header>
            <div
              style={{
                display: "flex"
              }}
            >
              <h1>Listings</h1>
            </div>
            <Button onClick={() => push("/listings/new")} color="primary">
              Create New
            </Button>
          </Header>
        </Col>
        <Col xs={12}>
          <Listings
            isFetching={isFetching}
            listings={listings}
            SearchForm={<SearchForm searchFunction={searchListings} searchText="Search..." />}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  listings: state.listings.listings
  // limit: state.listingReducer.limit,
  // offset: state.listingReducer.offset,
  // query: state.listingReducer.query,
  // isFetching: state.listingReducer.isFetching,
  // error: state.listingReducer.error
});

const mapDispatchToProps = {
  fetchListings,
  fetchComponent,
  searchListings,
  clearFormData,
  setQuery,
  setOffset,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingsContainer);
