import React from "react";
import { Modal, Button, Glyphicon } from "react-bootstrap";
import SearchContactsContainer from "../../containers/SearchContactsContainer/SearchContactsContainer";
import "./Modal.css";

const Modal1 = ({
  displayModal,
  isModalVisible,
  title,
  submitFunction,
  hostComponent,
  Container
}) => (
  <Modal show={isModalVisible} onHide={() => displayModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{Container}</Modal.Body>
    <Modal.Footer>
      <Button onClick={() => displayModal(false)}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default Modal1;
