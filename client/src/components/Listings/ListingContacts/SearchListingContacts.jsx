import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { asyncContainer, Typeahead } from "react-bootstrap-typeahead";

import {
  setSelected,
  fetchContacts,
  searchListingContacts
} from "../../../reducers/listing-contacts-search";

const AsyncTypeahead = asyncContainer(Typeahead);

const SearchListingContacts = ({
  isLoading,
  searchContacts,
  selected,
  setSelected,
  options,
  submitContacts,
  listing,
  hostComponent,
  searchListingContacts
}) => (
  <React.Fragment>
    <div className="reset-typeahead-height">
      <AsyncTypeahead
        isLoading={isLoading}
        onSearch={query => {
          searchListingContacts(query);
        }}
        clearButton
        multiple
        placeholder="Choose contacts..."
        selected={selected}
        onChange={selected => {
          setSelected(selected);
        }}
        maxResults={10}
        paginate
        paginationText="Display More..."
        options={options}
        labelKey="fullName"
        delay={0}
      />
      <Button className="mt-4" onClick={() => submitContacts(selected, listing)} bsStyle="primary">
        Add Selected
      </Button>
    </div>
  </React.Fragment>
);

const mapStateToProps = state => ({
  selected: state.listingContactsSearch.selected,
  options: state.listingContactsSearch.options,
  isLoading: state.listingContactsSearch.isLoading
});

const mapDispatchToProps = {
  setSelected,
  fetchContacts,
  searchListingContacts
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchListingContacts);
