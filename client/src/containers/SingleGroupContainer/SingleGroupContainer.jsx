import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";

import Navigation from "../NavContainer/NavContainer";

class GroupsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {} = this.props;
  }

  componentWillUnmount() {
    const {} = this.props;
  }

  render() {
    const { isAuthed } = this.props;

    return !isAuthed ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Navigation />
        <Grid>
          <Row id="load-contacts-btn">
            <Col sm={12}>
              <div>SINGLE GROUP</div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
