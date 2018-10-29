import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { push } from "react-router-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";

import Listings from "../../components/Listings/Listings";
import Navigation from "../NavContainer/NavContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header-old";
import SearchForm from "../../components/SearchForm/SearchForm";
import Counter from "../../components/Counter/Counter";

import {
  setListings,
  searchListings,
  clearListings,
  clearError
} from "../../actions/listing-actions";

import {
  fetchComponent,
  setQuery,
  setOffset,
  setCount
} from "../../actions/query-actions";

import { clearFormData } from "../../actions/common-actions";

class ListingsContainer extends React.Component {
  componentDidMount() {
    const { fetchComponent, listings } = this.props;
    fetchComponent("listings", [], setListings, null, null);
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    const { clearFormData, setQuery, setOffset } = this.props;
    window.removeEventListener("scroll", this.onScroll, false);
    setQuery("");
    setOffset(0);
    clearFormData();
  }

  onScroll = () => {
    const { isLoading, offset, count, listings, fetchComponent } = this.props;
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      count > offset &&
      !isLoading
    ) {
      fetchComponent("listings", listings, setListings, null, null);
    }
  };

  createNewListing = () => {
    this.props.push("/listings/new");
  };

  render() {
    const { isAuthed, isFetching, listings, push } = this.props;

    return !isAuthed ? (
      <Redirect to="/auth" />
    ) : (
      <React.Fragment>
        <BreadCrumbs />
        <div className="animated fadeIn">
          <Header
            isVisible={true}
            componentName="listings"
            headerTitle="Listings"
            isNew={null}
            primaryText="Create New Listing"
            primaryFunc={() => push("/listings/new")}
            primaryGlyph="plus"
          />


          <Listings isFetching={isFetching} listings={listings} SearchForm={<SearchForm
            searchFunction={searchListings}
            searchText="Search..."
          />}/>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  listings: state.listingReducer.listings,
  limit: state.listingReducer.limit,
  offset: state.listingReducer.offset,
  query: state.listingReducer.query,
  isFetching: state.listingReducer.isFetching,
  error: state.listingReducer.error
});

const mapDispatchToProps = {
  fetchComponent,
  searchListings,
  clearFormData,
  setQuery,
  setOffset,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingsContainer);
