import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import SearchForm from "../SearchForm/SearchForm";
import Loading from "../Loading/Loading";
import ContactTable from "../ContactTable/ContactTable";

const GroupContacts = ({ group, groupContacts, isFetching }) => {
  return isFetching ? (
    <Loading />
  ) : (
    <Grid>
      <SearchForm searchFunction={() => console.log("IM SEARCHING")} />
      <Row>
        <Col xs={12}>
          <ContactTable component={groupContacts} />
        </Col>
      </Row>
    </Grid>
  );
};

export default GroupContacts;
