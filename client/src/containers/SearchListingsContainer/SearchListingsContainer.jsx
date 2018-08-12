import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

import SearchForm from "../../components/SearchForm/SearchForm";
import Pills from "../../components/Pills/Pills";

import { setModalVisibility } from "../../actions/modal-actions";

import {
  fetchComponent,
  setQuery,
  setOffset
} from "../../actions/query-actions";

import { setError, clearError } from "../../actions/common-actions";

import {
  setListings,
  searchListings,
  clearListings
} from "../../actions/listing-actions";

import { addSelected, deleteSelected } from "../../actions/modal-actions";

import TableRow from "../../components/TableRow/TableRow";

class SearchListingsContainer extends React.Component {
  componentDidMount() {
    const { fetchComponent, setQuery, setOffset } = this.props;
    setOffset(0);
    fetchComponent("listings", [], setListings, null, null);
  }

  componentWillUnmount() {
    const { clearError, setQuery, setOffset } = this.props;
    clearListings();
    clearError();
    setOffset(25);
  }

  render() {
    const {
      isFetching,
      listings,
      submitFunction,
      hostComponent,
      selected
    } = this.props;

    return (
      <React.Fragment>
        <div className="modal_search-container">
          <SearchForm
            searchFunction={searchListings}
            searchText={"Search Listings..."}
          />
          <Button
            className="button"
            onClick={() => submitFunction(selected, hostComponent.id)}
            bsStyle="primary"
          >
            Add Selected
          </Button>
        </div>
        <div className="modal_pills-container">
          <Pills
            hostComponent={hostComponent}
            component={selected}
            componentName="listings"
            submitFunction={deleteSelected}
            displayValue="address"
          />
        </div>
        {listings.length > 0 && (
          <TableRow
            componentName="listings"
            rowText="address"
            collection={listings}
            submitFunction={addSelected}
            buttonText={"Add Listing"}
            buttonStyle={"warning"}
            hostComponent={hostComponent}
            isModal={true}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  listings: state.listingReducer.listings,
  selected: state.modalReducer.selected,
  isAuthed: state.authReducer.isAuthed,
  isLoading: state.queryReducer.isLoading,
  isFetching: state.commonReducer.isFetching,
  error: state.commonReducer.error
});

const mapDispatchToProps = {
  fetchComponent,
  clearListings,
  clearError,
  setModalVisibility,
  setQuery,
  setOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchListingsContainer
);
