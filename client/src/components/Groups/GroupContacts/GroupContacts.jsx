import React from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import ReactTable from "react-table";

import {
  fetchGroupContacts,
  deleteGroupContact,
  onPageChange,
  onPageSizeChange,
  onFilteredChange
} from "../../../reducers/group-contacts";

class GroupContacts extends React.Component {
  componentDidMount() {
    const { match, fetchGroupContacts } = this.props;
    fetchGroupContacts(match.params.id);
  }

  render() {
    const {
      onPageChange,
      onPageSizeChange,
      onFilteredChange,
      groupContacts,
      deleteGroupContact,
      page,
      pages,
      pageSize,
      loading,
      filtered,
      match
    } = this.props;

    const groupId = match.params.id;

    const columns = [
      {
        Header: null,
        id: "images",
        width: 50,
        filterable: false,
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
          contact.email ? (
            <a href={`mailto:${contact.email[0].value}`}>{contact.email[0].value}</a>
          ) : (
            ""
          )
      },
      {
        Header: "Phone",
        id: "phone",
        accessor: contact =>
          contact.phone ? (
            <a href={`tel:${contact.phone[0].value}`}>{contact.phone[0].value}</a>
          ) : (
            ""
          )
      },
      {
        Header: "Action",
        filterable: false,
        id: "id",
        accessor: contact => (
          <Button color="danger" onClick={() => deleteGroupContact(contact.id, groupId)}>
            Remove Contact
          </Button>
        )
      }
    ];

    return (
      <Card className="mt-4 mb-0">
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>All Contacts</strong>
        </CardHeader>
        <CardBody>
          <ReactTable
            style={{
              "max-height": "475px"
            }}
            className="-highlight"
            data={groupContacts}
            page={page}
            pages={pages}
            loading={loading}
            filtered={filtered}
            columns={columns}
            defaultPageSize={20}
            minRows={3}
            // showPaginationTop
            showPageSizeOptions={false}
            manual
            filterable
            onPageChange={page => {
              onPageChange(page, groupId);
            }}
            onPageSizeChange={(pageSize, page) => {
              onPageSizeChange(pageSize, page, groupId);
            }}
            onFilteredChange={filtered => {
              onFilteredChange(filtered, groupId);
            }}
          />
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  groupContacts: state.groupContacts.groupContacts,
  page: state.groupContacts.page,
  pages: state.groupContacts.pages,
  loading: state.groupContacts.loading,
  filtered: state.groupContacts.filtered
});

export default connect(mapStateToProps, {
  fetchGroupContacts,
  deleteGroupContact,
  onPageChange,
  onPageSizeChange,
  onFilteredChange
})(GroupContacts);
