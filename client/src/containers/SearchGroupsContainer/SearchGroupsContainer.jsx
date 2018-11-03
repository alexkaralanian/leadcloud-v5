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

import { setGroups } from "../../actions/group-actions";

class SearchGroupsContainer extends React.Component {
  componentWillMount() {
    const { fetchComponent, setOffset, setFunction } = this.props;
    setOffset(0);
    setQuery("");
    fetchComponent("groups", [], setFunction, null, null);
  }

  componentWillUnmount() {
    const { setGroups } = this.props;
    setGroups([]);
  }

  render() {
    const {
      groups,
      selected,
      submitFunction,
      searchFunction,
      displayModal,
      hostComponent
    } = this.props;

    console.log("Selected", selected);

    return (
      <React.Fragment>
        <div className="modal_search-container">
          <SearchForm
            searchFunction={searchFunction}
            searchText={"Search Groups..."}
          />
          <Button
            className="button"
            onClick={() => {
              hostComponent
                ? submitFunction(selected, hostComponent)
                : submitFunction(selected);
            }}
            bsStyle="primary"
          >
            Add Selected
          </Button>
        </div>
        <div className="modal_pills-container">
          {selected.length > 0 && (
            <Pills
              hostComponent={hostComponent}
              component={selected}
              componentName="groups"
              submitFunction={deleteSelected}
              displayValue="title"
            />
          )}
        </div>
        <TableRow
          cardHeaderText="All Groups"
          componentName="groups"
          rowText="title"
          collection={groups}
          submitFunction={addSelected}
          buttonText={"Add Group"}
          buttonStyle={"warning"}
          hostComponent={hostComponent}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
  selected: state.modalReducer.selected
});

const mapDispatchToProps = {
  fetchComponent,
  setGroups,
  setOffset,
  setQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchGroupsContainer
);
