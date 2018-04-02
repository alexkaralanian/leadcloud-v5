import React from "react";
import { groupStyle } from "./styles.css";
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Groups = ({ groups }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <h4>GROUPS:</h4>
        <div>
          <ul className={groupStyle}>
            {groups &&
              groups.map(group => {
                return (
                  <Link key={group} to="http://www.google.com">
                    <li>{group}</li>
                  </Link>
                );
              })}
          </ul>
        </div>
      </Col>
    </Row>
  </Grid>
);

export default Groups;
