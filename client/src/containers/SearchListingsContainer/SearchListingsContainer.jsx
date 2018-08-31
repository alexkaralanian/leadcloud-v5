import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

import SearchForm from "../../components/SearchForm/SearchForm";
import Pills from "../../components/Pills/Pills";
import TableRow from "../../components/TableRow/TableRow";

import { addSelected, deleteSelected } from "../../actions/modal-actions";

import {
  fetchComponent,
  setOffset,
  setQuery
} from "../../actions/query-actions";

import { setListings } from "../../actions/listing-actions";

class SearchListingsContainer extends React.Component {
  componentWillMount() {
    const { fetchComponent, setOffset, setQuery, setFunction } = this.props;
    setOffset(0);
    setQuery("");
    fetchComponent("listings", [], setFunction, null, null);
  }

  componentWillUnmount() {
    const { setListings } = this.props;
    setListings([]);
  }

  render() {
    const {
      listings,
      selected,
      submitFunction,
      searchFunction,
      displayModal,
      hostComponent
    } = this.props;

    return (
      <React.Fragment>
        <div className="modal_search-container">
          <SearchForm
            searchFunction={searchFunction}
            searchText={"Search Listings..."}
          />
          <Button
            className="button"
            onClick={() => submitFunction(selected, hostComponent)}
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
        <TableRow
          componentName="listings"
          rowText="address"
          collection={listings}
          submitFunction={addSelected}
          buttonText={"Add"}
          buttonStyle={"warning"}
          hostComponent={hostComponent}
          isModal={true}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  listings: state.listingReducer.listings,
  selected: state.modalReducer.selected
});

const mapDispatchToProps = {
  fetchComponent,
  setListings,
  setOffset,
  setQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchListingsContainer
);
