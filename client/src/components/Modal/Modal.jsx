import React from "react";
import { Grid, Row, Col, Button, Glyphicon } from "react-bootstrap";
import SearchContactsContainer from "../../containers/SearchContactsContainer/SearchContactsContainer";
import "./Modal.css";

const Modal = ({ displayModal, submitFunction, searchText }) => (
  <div>
    <div className="modal_bg" />
    <div className="modal_container">
      <div id="search-contacts-container" className="modal_inner-container">
        <div className="modal_button-close">
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            onClick={() => displayModal(false)}
            className="header_button-sm"
          >
            <Glyphicon glyph="remove" />
          </Button>
        </div>
        <SearchContactsContainer />
      </div>
    </div>
  </div>
);

export default Modal;
