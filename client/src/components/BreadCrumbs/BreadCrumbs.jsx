import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "react-router-redux";
import { Grid, Col, Row, Breadcrumb } from "react-bootstrap";
import "./BreadCrumbs.css";

class BreadCrumbs extends React.Component {
  render() {
    const location = this.props.path.slice(1).split("/");

    const capitalize = word =>
      word
        .trim()
        .charAt(0)
        .toUpperCase() + word.slice(1).toLowerCase();

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Breadcrumb>
              <Breadcrumb.Item onClick={() => this.props.push(`/dashboard`)}>
                Dashboard
              </Breadcrumb.Item>
              {location &&
                location.map(path => {
                  const url = location
                    .slice(0, location.indexOf(path) + 1)
                    .join("/");
                  return (
                    <Breadcrumb.Item onClick={() => this.props.push(`/${url}`)}>
                      {capitalize(path)}
                    </Breadcrumb.Item>
                  );
                })}
            </Breadcrumb>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  path: state.router.location.pathname
});

export default connect(mapStateToProps, { push })(BreadCrumbs);
