import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Bar, Line } from "react-chartjs-2";

import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  ButtonGroup,
  ButtonDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import "./Dashboard.scss";

import {
  bar,
  line,
  cardChartData1,
  cardChartOpts1,
  cardChartData2,
  cardChartOpts2
} from "./chart-data";
import Widget01 from "../../components/Widgets/Widget01";
import Widget02 from "../../components/Widgets/Widget02";

const style = {
  "text-decoration": "none"
};

const Dashboard = () => (
  <React.Fragment>
    <Row className="margin-top-2">
      <Col xs="12" sm="6" lg="3">
        <Link style={style} to="/contacts">
          <Widget02
            header="25"
            mainText="Active Renters"
            icon="fa fa-bell"
            color="danger"
            variant="1"
          />
        </Link>
      </Col>
      <Col xs="12" sm="6" lg="3">
        <Widget02
          header="12"
          mainText="Active Buyers"
          icon="fa fa-cogs"
          color="primary"
          variant="1"
        />
      </Col>
      <Col xs="12" sm="6" lg="3">
        <Widget02
          header="5"
          mainText="Active Sales Listings"
          icon="fa fa-laptop"
          color="info"
          variant="1"
        />
      </Col>
      <Col xs="12" sm="6" lg="3">
        <Widget02
          header="12"
          mainText="Active Rental Listings"
          icon="fa fa-moon-o"
          color="warning"
          variant="1"
        />
      </Col>

      <Col xs="12" sm="6" lg="3">
        <Widget02
          header="12"
          mainText="Upcoming Appointments"
          icon="fa fa-cogs"
          color="primary"
          variant="1"
        />
      </Col>
      <Col xs="12" sm="6" lg="3">
        <Widget02
          header="18"
          mainText="Contracts Signed"
          icon="fa fa-laptop"
          color="info"
          variant="1"
        />
      </Col>
      <Col xs="12" sm="6" lg="3">
        <Widget02
          header="88"
          mainText="New Messages"
          icon="fa fa-moon-o"
          color="warning"
          variant="1"
        />
      </Col>
      <Col xs="12" sm="6" lg="3">
        <Widget02
          header="$435,000"
          mainText="Gross Closed Income"
          icon="fa fa-bell"
          color="danger"
          variant="1"
        />
      </Col>
    </Row>
    <Row>
      <Col xs="12" sm="12">
        <Card>
          <CardHeader>
            Gross Closed Income
            <div className="card-actions">
              <a href="http://www.chartjs.org">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <div className="chart-wrapper">
              <Line
                height={200}
                data={line}
                options={{
                  maintainAspectRatio: false
                }}
              />
            </div>
          </CardBody>
        </Card>
      </Col>

      <Col xs="12" sm="12">
        <Card>
          <CardHeader>
            Total Closed Units
            <div className="card-actions">
              <a href="http://www.chartjs.org">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <div className="chart-wrapper">
              <Bar
                height={200}
                data={bar}
                options={{
                  maintainAspectRatio: false
                }}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </React.Fragment>
);

export default Dashboard;
