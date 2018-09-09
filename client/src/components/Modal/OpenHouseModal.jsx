import React from "react";
import { Modal, Button } from "react-bootstrap";

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
  <Modal
    backdrop="true"
    backdropClassName="modal-backdrop__color"
    bsSize="large"
    show={isModalVisible}
    onHide={onExit}
  >
    <Modal.Header closeButton>
      <Modal.Title componentClass="h1">Welcome to {title}!</Modal.Title>
    </Modal.Header>
    <Modal.Body>{Container}</Modal.Body>
    <Modal.Footer>
      <Button onClick={onExit}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default Modal1;
