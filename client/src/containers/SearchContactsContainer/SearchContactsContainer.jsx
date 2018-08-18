import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import SearchForm from "../../components/SearchForm/SearchForm";
import Pills from "../../components/Pills/Pills";
import TableRow from "../../components/TableRow/TableRow";

import { addSelected, deleteSelected } from "../../actions/modal-actions";

import {
  fetchComponent,
  setOffset,
  setQuery
} from "../../actions/query-actions";

import { setContacts } from "../../actions/contact-actions";

class SearchContactsContainer extends React.Component {
  componentDidMount() {
    const { fetchComponent, setOffset, setFunction } = this.props;
    setOffset(0);
    setQuery("");
    fetchComponent("contacts", [], setFunction, null, null);
  }

  componentWillUnmount() {
    const { setContacts } = this.props;
    setContacts([]);
  }

  render() {
    const {
      contacts,
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
            searchText={"Search Contacts..."}
          />
          <Button
            className="button"
            onClick={evt => {
              evt.stopPropagation();
              submitFunction(selected, hostComponent);
            }}
            bsStyle="primary"
          >
            Add Selected
          </Button>
        </div>
        <div className="modal_pills-container">
          <Pills
            hostComponent={hostComponent}
            component={selected}
            componentName="contacts"
            submitFunction={deleteSelected}
            displayValue="fullName"
          />
        </div>
        <TableRow
          componentName="contacts"
          rowText="fullName"
          collection={contacts}
          submitFunction={addSelected}
          buttonText={"Add Contact"}
          buttonStyle={"warning"}
          hostComponent={hostComponent}
          isModal={true}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contactReducer.contacts,
  selected: state.modalReducer.selected
});

const mapDispatchToProps = {
  fetchComponent,
  setContacts,
  setOffset,
  setQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchContactsContainer
);
