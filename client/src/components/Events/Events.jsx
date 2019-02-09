import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { Card, CardHeader, CardBody } from "reactstrap";

import { fetchEvents } from "../../reducers/events";

class EventsContainer extends React.Component {
  componentDidMount() {
    const { fetchEvents } = this.props;
    fetchEvents();
  }

  render() {
    const { events, fetchEvents } = this.props;

    return (
      <Card className="mt-4 mb-0">
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>All Events</strong>
        </CardHeader>
        <CardBody>{events && events.map(event => {})}</CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events
});

export default connect(
  mapStateToProps,
  { fetchEvents }
)(EventsContainer);
