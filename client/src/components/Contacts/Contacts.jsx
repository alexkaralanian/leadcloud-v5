import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Groups from "..//Groups/Groups";
import ContactTable from "../ContactTable/ContactTable";
import Loading from "../Loading/Loading";

const Contacts = ({ contacts, groups, isFetching }) =>
  isFetching ? (
    <Loading />
  ) : (
    <Grid>
      <Row>
        <Col xs={12}>
          <ContactTable component={contacts} />
        </Col>
      </Row>
    </Grid>
  );

export default Contacts;
