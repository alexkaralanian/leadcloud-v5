import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import SearchForm from "../../components/SearchForm/SearchForm";
import Pills from "../../components/Pills/Pills";
import TableRow from "../../components/TableRow/TableRow";

import {
  setModalVisibility,
  addSelected,
  deleteSelected
} from "../../actions/modal-actions";

import { fetchComponent, setOffset } from "../../actions/query-actions";

import { setContacts, searchContacts2 } from "../../actions/contact-actions";

class SearchContactsContainer extends React.Component {
  componentDidMount() {
    const { fetchComponent, setOffset } = this.props;
    setOffset(0)
    fetchComponent("contacts", [], setContacts, null, null);
  }

  componentWillUnmount() {
    const { setContacts } = this.props;
    setContacts([]);
  }

  render() {
    const {
      isFetching,
      contacts,
      submitFunction,
      hostComponent,
      selected
    } = this.props;

    return (
      <React.Fragment>
        <div className="modal_search-container">
          <SearchForm
            searchFunction={searchContacts2}
            searchText={"Search Contacts..."}
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
            componentName="contacts"
            submitFunction={deleteSelected}
            displayValue="fullName"
          />
        </div>
        {contacts.length > 0 && (
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
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contactReducer.contacts,
  selected: state.modalReducer.selected,
  isLoading: state.queryReducer.isLoading,
  isFetching: state.commonReducer.isFetching
});

const mapDispatchToProps = {
  fetchComponent,
  setModalVisibility,
  setContacts,
  setOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SearchContactsContainer
);
