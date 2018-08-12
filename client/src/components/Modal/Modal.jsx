import React from "react";
import { Modal, Button, Glyphicon } from "react-bootstrap";
import SearchContactsContainer from "../../containers/SearchContactsContainer/SearchContactsContainer";
import "./Modal.css";

const Modal1 = ({ displayModal, isModalVisible, title, submitFunction, hostComponent }) => (
  <Modal show={isModalVisible} onHide={() => displayModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <SearchContactsContainer submitFunction={submitFunction} hostComponent={hostComponent} />
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => displayModal(false)}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default Modal1;
