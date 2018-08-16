import React from "react";
import { Modal, Button, Glyphicon } from "react-bootstrap";
import SearchContactsContainer from "../../containers/SearchContactsContainer/SearchContactsContainer";
import "./Modal.css";

const Modal1 = ({
  displayModal,
  onExit,
  isModalVisible,
  title,
  submitFunction,
  hostComponent,
  Container
}) => (
  <Modal show={isModalVisible} onHide={onExit}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{Container}</Modal.Body>
    <Modal.Footer>
      <Button onClick={onExit}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default Modal1;
