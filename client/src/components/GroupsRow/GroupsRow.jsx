import React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import SearchForm from "../SearchForm/SearchForm";
import "./GroupsRow.css";

const GroupsRow = ({ groups }) => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <h4>CONTACT GROUPS:</h4>
          <div>
            <ul className="groupStyle">
              {groups &&
                groups.map(group => (
                  <div>
                    <li>
                      <div
                        role="button"
                        className="groupDelete"
                        onClick={event => {
                          event.stopPropagation();
                          console.log("HI");
                          // deleteGroup();
                        }}
                      >
                        <span>x</span>
                      </div>
                      <Link key={group.id} to={`/group/${group.id}`}>
                        <div className="groupLink">{group.title}</div>
                      </Link>
                    </li>
                  </div>
                ))}
            </ul>
          </div>

          <h3 className="headerText">Add Groups</h3>

          <SearchForm
            searchFunction={() => console.log("HI")}
            fieldText="Search for listings"
          />
        </Col>
      </Row>
    </Grid>
  );
};

export default GroupsRow;

// onClick = renderGroups
// clickOnContactGroup = remove from group
// clickOnGroupName = add to contactGroups
