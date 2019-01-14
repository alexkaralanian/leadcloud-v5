import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { asyncContainer, Typeahead } from "react-bootstrap-typeahead";

import {
  setSelected,
  fetchContacts,
  searchGroupContacts
} from "../../../reducers/group-contacts-search";

const AsyncTypeahead = asyncContainer(Typeahead);

class SearchContacts extends React.Component {
  render() {
    const {
      isLoading,
      searchContacts,
      selected,
      setSelected,
      options,
      submitContacts,
      group,
      hostComponent,
      searchGroupContacts
    } = this.props;

    return (
      <React.Fragment>
        <div className="reset-typeahead-height">
          <AsyncTypeahead
            isLoading={isLoading}
            onSearch={query => {
              searchGroupContacts(query);
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
            pagionationText="Display More..."
            options={options}
            labelKey="fullName"
            delay={0}
          />
          <Button
            className="mt-4"
            onClick={() => submitContacts(selected, group)}
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
  selected: state.groupContactsSearch.selected,
  options: state.groupContactsSearch.options,
  isLoading: state.groupContactsSearch.isLoading
});

const mapDispatchToProps = {
  setSelected,
  fetchContacts,
  searchGroupContacts
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContacts);
