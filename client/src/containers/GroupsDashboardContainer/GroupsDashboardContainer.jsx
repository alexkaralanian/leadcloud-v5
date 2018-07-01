import React from "react";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col, Button } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";
import GroupsContainer from "../GroupsContainer/GroupsContainer";

class GroupsDashboardContainer extends React.Component {
  render() {
    const { isAuthed, isFetching, push, groups } = this.props;

    return !isAuthed ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Navigation />
        <Grid>
          <Row>
            <Col xs={12}>
              <h2>Groups</h2>
            </Col>
          </Row>
          <Row id="load-contacts-btn">
            <Col sm={12}>
              <Button
                className="submitButton"
                bsStyle="primary"
                onClick={() => push("/group/new")}
              >
                <span>Create New</span>
              </Button>
            </Col>
          </Row>
          <GroupsContainer />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed
});

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(
  GroupsDashboardContainer
);
