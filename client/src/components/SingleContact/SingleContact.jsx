import React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";
import "./SingleContact.css";
import ContactForm from "./ContactForm";
import Loading from "../Loading/Loading";

const SingleContact = ({
  contact,
  isContactNew,
  submitNewContact,
  updateContact,
  deleteContact,
  groups,
  photo,
  isFetching,
  fetchContact,
  onDrop,
  images,
  googleImages,
  deleteContactImage
}) =>
  isFetching ? (
    <Loading />
  ) : (
    <Grid>
      <ContactForm
        onSubmit={values => {
          isContactNew
            ? submitNewContact(values)
            : updateContact(values, contact.id);
        }}
        deleteContact={deleteContact}
        isContactNew={isContactNew}
        contact={contact}
        groups={groups}
        fetchContact={fetchContact}
      />

      {isContactNew ? null : (
        <Row>
          <Col xs={12}>
            <Button
              onClick={() => {
                deleteContact(contact.id);
              }}
              className="submitButton"
              bsStyle="danger"
            >
              <span>Delete Contact</span>
            </Button>
          </Col>
        </Row>
      )}
    </Grid>
  );

export default SingleContact;
