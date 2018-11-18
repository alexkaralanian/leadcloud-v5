import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
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
  <Modal isOpen={isModalVisible} toggle={onExit}>
    <ModalHeader>{title}</ModalHeader>
    <ModalBody>{Container}</ModalBody>
    <ModalFooter>
      <Button onClick={onExit}>Close</Button>
    </ModalFooter>
  </Modal>
);

export default Modal1;
