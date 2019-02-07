import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./Modal.css";

const ModalComponent = ({ displayModal, onExit, isModalVisible, title, Container }) => (
  <Modal isOpen={isModalVisible} toggle={onExit}>
    <ModalHeader>{title}</ModalHeader>
    <ModalBody>{Container}</ModalBody>
    <ModalFooter>
      <Button onClick={onExit}>Close</Button>
    </ModalFooter>
  </Modal>
);

export default ModalComponent;
