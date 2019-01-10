import React from "react";
import moment from "moment";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import "react-table/react-table.css";

import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header-old";
import { syncContacts } from "../../actions/contact-actions";

const columns = [
  {
    Header: null,
    id: "images",
    width: 50,
    accessor: contact =>
      contact.images ? (
        <div className="table_img">
          <img alt="contact" src={contact.images[0]} />
        </div>
      ) : (
        <div className="table_img-null">
          <span>{contact.firstName && contact.firstName.charAt(0).toUpperCase()}</span>
        </div>
      )
  },
  {
    Header: "Name",
    id: "fullName",
    accessor: contact =>
      contact.fullName ? <Link to={`/contacts/${contact.id}`}>{contact.fullName}</Link> : ""
  },

  {
    Header: "Email",
    id: "email",
    accessor: contact =>
      contact.email ? <a href={`mailto:${contact.email[0].value}`}>{contact.email[0].value}</a> : ""
  },
  {
    Header: "Phone",
    id: "phone",
    accessor: contact =>
      contact.phone ? <a href={`tel:${contact.phone[0].value}`}>{contact.phone[0].value}</a> : ""
  },
  {
    Header: "Updated",
    id: "updated",
    accessor: contact => moment(contact.updated).format("ddd, M/D/YY h:mma")
  }
];

class ContactsContainer extends React.Component {
  state = {
    data: [],
    pages: 0,
    page: 0,
    pageSize: 25,
    offset: 0,
    loading: false,
    query: "",
    filtered: []
  };

  async componentDidMount() {
    try {
      const res = await axios.get(
        `/api/contacts/?limit=${this.state.pageSize}&offset=${this.state.page *
          this.state.pageSize}`
      );
      this.setState({
        pages: Math.ceil(res.data.count / this.state.pageSize),
        data: res.data.rows
      });
    } catch (err) {
      console.error(err);
    }
  }

  onPageChange = async page => {
    const { pageSize, filtered } = this.state;
    const offset = page * pageSize;
    const query = filtered.length ? filtered[0].value : "";
    try {
      const res = await axios.get(
        `/api/contacts/?limit=${pageSize}&offset=${offset}&query=${query}`
      );
      this.setState({
        pages: Math.ceil(res.data.count / pageSize),
        data: res.data.rows,
        page
      });
    } catch (err) {
      console.error(err);
    }
  };

  onPageSizeChange = async (pageSize, page) => {
    const { filtered } = this.state;
    const offset = page * pageSize;
    const query = filtered.length ? filtered[0].value : "";
    try {
      const res = await axios.get(
        `/api/contacts/?limit=${pageSize}&offset=${offset}&query=${query}`
      );
      this.setState({
        pages: Math.ceil(res.data.count / pageSize),
        data: res.data.rows,
        page,
        pageSize
      });
    } catch (err) {
      console.error(err);
    }
  };

  onFilteredChange = async filtered => {
    const { pageSize } = this.state;
    const query = filtered.length ? filtered[0].value : "";
    this.setState({
      filtered
    });
    try {
      const res = await axios.get(`/api/contacts/?limit=${pageSize}&offset=${0}&query=${query}`);
      this.setState({
        data: res.data.rows,
        pages: Math.ceil(res.data.count / pageSize)
      });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { push, syncContacts } = this.props;

    return (
      <React.Fragment>
        <BreadCrumbs />
        <Header
          isVisible
          componentName="contacts"
          headerTitle="Contacts"
          isNew={null}
          primaryText="Create New"
          primaryFunc={() => push("/contacts/new")}
          primaryGlyph="plus"
        />
        <Row className="margin-top-2">
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                <strong>All Contacts</strong>
              </CardHeader>
              <CardBody>
                <ReactTable
                  className="-highlight"
                  data={this.state.data} // contacts
                  page={this.state.page} // current page
                  pages={this.state.pages} // count
                  loading={this.state.loading}
                  filtered={this.state.filtered}
                  columns={columns}
                  defaultPageSize={20}
                  minRows={3}
                  manual
                  filterable
                  onPageChange={page => {
                    this.onPageChange(page);
                  }}
                  onPageSizeChange={(pageSize, page) => {
                    this.onPageSizeChange(pageSize, page);
                  }}
                  onFilteredChange={filtered => {
                    this.onFilteredChange(filtered);
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  syncContacts,
  push
};

export default connect(null, mapDispatchToProps)(ContactsContainer);
