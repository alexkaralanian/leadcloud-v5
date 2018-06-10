import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Loading from "../Loading/Loading";
import ContactTable from "../ContactTable/ContactTable";

const GroupContacts = ({ group, groupContacts, isFetching }) =>
  isFetching ? (
    <Loading />
  ) : (
    <Grid>
      <Row>
        <Col xs={12}>
          <h2>{group && group.title}</h2>
        </Col>
        <Col xs={12}>
          <ContactTable component={groupContacts} />
        </Col>
      </Row>
    </Grid>
  );

export default GroupContacts;
