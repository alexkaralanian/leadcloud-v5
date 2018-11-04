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
  cardChartData1,
  cardChartOpts1,
  cardChartData2,
  cardChartOpts2
} from "./chart-data";

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
