import React from "react";
import { connect } from "react-redux";
import { Grid, Col, Row } from "react-bootstrap";

import "./Counter.css";

class Counter extends React.Component {
  render() {
    const { offset, count } = this.props;

    return (
      <div className="counter_container">
        <div className="counter_text">
          {`Displaying ${count > offset ? offset : offset - (offset - count)}
                of ${count} items`}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  offset: state.queryReducer.offset,
  count: state.queryReducer.count
});

export default connect(mapStateToProps, null)(Counter);
