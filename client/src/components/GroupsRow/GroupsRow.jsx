import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./GroupsRow.css";

const GroupsRow = ({ groups }) => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <h4>GROUPS:</h4>
          <div>
            <ul className="groupStyle">
              {groups &&
                groups.map(group => (
                  <Link key={group} to={`/group/${group.googleId}`}>
                    <li>{group.title}</li>
                  </Link>
                ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default GroupsRow;
