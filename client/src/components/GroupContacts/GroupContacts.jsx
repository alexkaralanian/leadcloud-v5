import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import SearchForm from "../SearchForm/SearchForm";
import Loading from "../Loading/Loading";
import ContactTable from "../ContactTable/ContactTable";

const GroupContacts = ({
  group,
  groupContacts,
  isFetching,
  searchGroupContacts,
  groupContactsSearchResults
}) => {
  console.log("GROUP CONTACTS", groupContactsSearchResults);
  return isFetching ? (
    <Loading />
  ) : (
    <Grid>
      <SearchForm searchFunction={searchGroupContacts} />
      {groupContactsSearchResults.length > 0 && (
        <Row>
          <Col xs={12}>
            <ContactTable component={groupContactsSearchResults} />
          </Col>
        </Row>
      )}
      <Row>
        <Col xs={12}>
          <ContactTable component={groupContacts} />
        </Col>
      </Row>
    </Grid>
  );
};

export default GroupContacts;
