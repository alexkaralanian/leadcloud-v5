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

const brandPrimary = "#20a8d8";
const brandSuccess = "#4dbd74";
const brandInfo = "#63c2de";
const brandWarning = "#f8cb00";
const brandDanger = "#f86c6b";

// Card Chart 1
const cardChartData1 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandPrimary,
      borderColor: "rgba(255,255,255,.55)",
      data: [65, 59, 84, 84, 51, 55, 40]
    }
  ]
};

const cardChartOpts1 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

// Card Chart 2
const cardChartData2 = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: brandInfo,
      borderColor: "rgba(255,255,255,.55)",
      data: [1, 18, 9, 17, 34, 22, 11]
    }
  ]
};

const cardChartOpts2 = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4
    }
  }
};

const Dashboard = () => (
  <Row>
    <Col xs="12" sm="6">
      <Card className="text-white bg-primary">
        <CardBody className="pb-0">
          <ButtonGroup className="float-right">
            <ButtonDropdown
              id="card1"
              // isOpen={this.state.card1}
              // toggle={() => {
              //   this.setState({ card1: !this.state.card1 });
              // }}
            >
              <DropdownToggle caret className="p-0" color="transparent">
                <i className="icon-settings" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem disabled>Disabled action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </ButtonGroup>
          <h4 className="mb-0">9.823</h4>
          <p>Members online</p>
        </CardBody>
        <div className="chart-wrapper px-3" style={{ height: "70px" }}>
          <Line data={cardChartData1} options={cardChartOpts1} height={70} />
        </div>
      </Card>
    </Col>

    <Col xs="12" sm="6">
      <Card className="text-white bg-info">
        <CardBody className="pb-0">
          <ButtonGroup className="float-right">
            <Dropdown
              id="card2"
              // isOpen={this.state.card2}
              // toggle={() => {
              //   this.setState({ card2: !this.state.card2 });
              // }}
            >
              <DropdownToggle className="p-0" color="transparent">
                <i className="icon-location-pin" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
          <h4 className="mb-0">9.823</h4>
          <p>Members online</p>
        </CardBody>
        <div className="chart-wrapper px-3" style={{ height: "70px" }}>
          <Line data={cardChartData2} options={cardChartOpts2} height={70} />
        </div>
      </Card>
    </Col>
  </Row>
);

export default Dashboard;
