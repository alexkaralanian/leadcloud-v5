import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import SearchForm from "../SearchForm/SearchForm";
import Loading from "../Loading/Loading";
import ContactTable from "../ContactTable/ContactTable";

const GroupContacts = ({ group, groupContacts, isFetching }) => {
  console.log("GROUP CONTACTS", { group, groupContacts });
  return isFetching ? (
    <Loading />
  ) : (
    <Grid>
      {/*<Row>
        <Col xs={12}>
          <h2>{group && group.title}</h2>
        </Col>
      </Row>*/}
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
