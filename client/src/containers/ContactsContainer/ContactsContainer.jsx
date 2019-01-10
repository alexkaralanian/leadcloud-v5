import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";

import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Header from "../../components/Header/Header-old";
import SearchForm from "../../components/SearchForm/SearchForm";

import { fetchComponent, setQuery, setOffset } from "../../actions/query-actions";
import { clearFormData } from "../../actions/common-actions";
import {
  logFetchData,
  syncContacts,
  setContacts,
  searchContacts
} from "../../actions/contact-actions";

const columns = [
  {
    Header: null,
    id: "images",
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
    accessor: contact => contact.updated
  }
];

class ContactsContainer extends React.Component {
  state = {
    data: [],
    pages: 0,
    page: 0,
    pageSize: 25,
    offset: 0,
    loading: false
  };

  componentDidMount() {
    axios
      .get(
        `/api/contacts/?limit=${this.state.pageSize}&offset=${this.state.page *
          this.state.pageSize}`
      )
      .then(res => {
        this.setState({
          pages: Math.ceil(res.data.count / this.state.pageSize),
          data: res.data.rows
        });
      });
  }

  render() {
    const {
      push,
      fetchComponent,
      logFetchData,
      isFetching,
      syncContacts,
      contacts,
      isSearching
    } = this.props;

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
                <SearchForm searchFunction={searchContacts} searchText="Search..." />
                <ReactTable
                  data={this.state.data} // contacts
                  page={this.state.page} // current page
                  pages={this.state.pages} // count
                  loading={this.state.loading}
                  columns={columns}
                  defaultPageSize={25}
                  minRows={3}
                  manual
                  onPageChange={page => {
                    axios
                      .get(
                        `/api/contacts/?limit=${this.state.pageSize}&offset=${page *
                          this.state.pageSize}`
                      )
                      .then(res => {
                        this.setState({
                          pages: Math.ceil(res.data.count / this.state.pageSize),
                          data: res.data.rows,
                          page
                        });
                      });
                  }}
                  onPageSizeChange={(pageSize, page) => {
                    axios
                      .get(`/api/contacts/?limit=${pageSize}&offset=${page * pageSize}`)
                      .then(res => {
                        this.setState({
                          pages: Math.ceil(res.data.count / this.state.pageSize),
                          data: res.data.rows,
                          page,
                          pageSize
                        });
                      });
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

const mapStateToProps = state => ({
  isSearching: state.contactReducer.isSearching,
  contacts: state.contactReducer.contacts
});

const mapDispatchToProps = {
  syncContacts,
  fetchComponent,
  logFetchData,
  clearFormData,
  setQuery,
  setOffset,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);
