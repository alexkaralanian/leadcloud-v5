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

const Dashboard = () => (
  <React.Fragment>
    <Row className="margin-top-2">
      <Col xs="12" sm="6" md="3">
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
            <p>Contacts</p>
          </CardBody>
          <div className="chart-wrapper px-3" style={{ height: "70px" }}>
            <Line data={cardChartData1} options={cardChartOpts1} height={70} />
          </div>
        </Card>
      </Col>

      <Col xs="12" sm="6" md="3">
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
            <p>Listings</p>
          </CardBody>
          <div className="chart-wrapper px-3" style={{ height: "70px" }}>
            <Line data={cardChartData1} options={cardChartOpts1} height={70} />
          </div>
        </Card>
      </Col>

      <Col xs="12" sm="6" md="3">
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
            <p>Emails</p>
          </CardBody>
          <div className="chart-wrapper px-3" style={{ height: "70px" }}>
            <Line data={cardChartData1} options={cardChartOpts1} height={70} />
          </div>
        </Card>
      </Col>

      <Col xs="12" sm="6" md="3">
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
            <p>Campaigns</p>
          </CardBody>
          <div className="chart-wrapper px-3" style={{ height: "70px" }}>
            <Line data={cardChartData1} options={cardChartOpts1} height={70} />
          </div>
        </Card>
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
