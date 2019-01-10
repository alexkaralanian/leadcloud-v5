import React from "react";

import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Typeahead } from "react-bootstrap-typeahead";

import { fetchComponent, setOffset, setQuery } from "../../actions/query-actions";

import { setListings } from "../../actions/listing-actions";

class SearchListingsContainer extends React.Component {
  state = {
    selected: []
  };

  componentDidMount() {
    const { fetchComponent, setOffset, setQuery, setFunction } = this.props;
    setOffset(0);
    setQuery("");
    fetchComponent("listings", [], setListings, null, null);
  }

  componentWillUnmount() {
    const { setListings } = this.props;
    setListings([]);
  }

  diffContactListings = allListings => {
    const { contactListings } = this.props;
    const map = {};
    contactListings.forEach(listing => {
      map[listing.id] = listing;
    });
    allListings.forEach(listing => {
      if (map[listing.id]) delete map[listing.id];
      else map[listing.id] = listing;
    });
    return Object.values(map);
  };

  render() {
    const { listings, contactListings, submitFunction, hostComponent } = this.props;

    return (
      <React.Fragment>
        <div>
          <div className="reset-typeahead-height">
            <Typeahead
              clearButton
              multiple
              placeholder="Choose listings..."
              selected={this.state.selected}
              onChange={selected => {
                this.setState({ selected });
              }}
              options={this.diffContactListings(listings)}
              labelKey="address"
            />
          </div>

          <Button
            className="button mt-4"
            onClick={() => submitFunction(this.state.selected, hostComponent)}
            bsStyle="primary"
          >
            Add Selected
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  listings: state.listingReducer.listings,
  contactListings: state.contactReducer.contactListings
});

const mapDispatchToProps = {
  fetchComponent,
  setListings,
  setOffset,
  setQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchListingsContainer);
