import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import SearchForm from "../SearchForm/SearchForm";
import Loading from "../Loading/Loading";
import ContactTable from "../ContactTable/ContactTable";
import TableRow from "../TableRow/TableRow";

const GroupContacts = ({
  group,
  groupContacts,
  isFetching,
  searchGroupContacts,
  groupContactsSearchResults,
  submitGroupContact,
  deleteGroupContact
}) => {
  return isFetching ? (
    <Loading />
  ) : (
    <Grid>
      <SearchForm searchFunction={searchGroupContacts} />
      <Row>
        <Col xs={12}>
          <TableRow
            componentName="contact"
            rowText="fullName"
            collection={groupContactsSearchResults}
            submitFunction={submitGroupContact}
            hostComponent={group}
            buttonText="Add Contact"
            buttonStyle="warning"
          />
          <hr />
          <TableRow
            componentName="contact"
            rowText="fullName"
            collection={groupContacts}
            submitFunction={deleteGroupContact}
            hostComponent={group}
            buttonText="Delete"
            buttonStyle="danger"
          />
        </Col>
      </Row>
    </Grid>
  );
};

export default GroupContacts;
