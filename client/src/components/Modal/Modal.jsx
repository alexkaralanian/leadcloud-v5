import React from "react";
import { Modal, Button, Glyphicon } from "react-bootstrap";
import SearchContactsContainer from "../../containers/SearchContactsContainer/SearchContactsContainer";
import "./Modal.css";

const Modal1 = ({ displayModal, isModalVisible, title }) => (
  <Modal show={isModalVisible} onHide={() => displayModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <SearchContactsContainer />
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => displayModal(false)}>Close</Button>
    </Modal.Footer>
  </Modal>
);

// const Modal = ({ displayModal }) => (
//   <div>
//     <div className="modal_bg" />
//     <div className="modal_container">
//       <div id="search-contacts-container" className="modal_inner-container">
//         <div className="modal_button-close">
//           <Button
//             bsStyle="primary"
//             bsSize="xsmall"
//             onClick={() => displayModal(false)}
//             className="header_button-sm"
//           >
//             <Glyphicon glyph="remove" />
//           </Button>
//         </div>
//         <SearchContactsContainer />
//       </div>
//     </div>
//   </div>
// );

export default Modal1;
