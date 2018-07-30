import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import SearchForm from "../SearchForm/SearchForm";
import Loading from "../Loading/Loading";
import ContactTable from "../ContactTable/ContactTable";
import TableRow from "../TableRow/TableRow";

const GroupContacts = ({
  isFetching,
  collection,
  submitGroupContact,
  deleteGroupContact,
  group
}) => {
  return isFetching ? (
    <Loading />
  ) : (
    <Row>
      <Col xs={12}>
        <TableRow
          componentName="contact"
          rowText="fullName"
          collection={collection}
          submitFunction={deleteGroupContact}
          buttonText={"Remove"}
          buttonStyle={"danger"}
          hostComponent={group}
        />
      </Col>
    </Row>
  );
};

export default GroupContacts;
