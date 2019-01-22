import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import { Button, Card, CardHeader, CardBody } from "reactstrap";
import "../Contacts.scss";

import {
  fetchContactGroups,
  deleteContactGroup,
  onPageChange,
  onPageSizeChange,
  onFilteredChange,
  onContactGroupsSearch
} from "../../../reducers/contact-groups";

class ContactGroups extends React.Component {
  componentDidMount() {
    const { match, fetchContactGroups } = this.props;
    fetchContactGroups(match.params.id);
  }

  render() {
    const {
      contactGroups,
      deleteContactGroup,
      onPageChange,
      onPageSizeChange,
      onFilteredChange,
      onContactGroupsSearch,
      page,
      pages,
      pageSize,
      loading,
      filtered,
      match
    } = this.props;

    const contactId = match.params.id;

    const columns = [
      {
        Header: null,
        id: "images",
        width: 50,
        accessor: group =>
          group.images ? (
            <div className="table_img">
              <img alt="contact" src={group.images[0]} />
            </div>
          ) : (
            <div className="table_img-null">
              <span>{group.title.charAt(0).toUpperCase()}</span>
            </div>
          )
      },
      {
        Header: "Title",
        id: "title",
        accessor: group => <Link to={`/groups/${group.id}`}>{group.title}</Link>
      },

      {
        Header: "Action",
        id: "id",
        width: 130,
        accessor: group => (
          <Button color="danger" onClick={() => deleteContactGroup(contactId, group.id)}>
            Remove Group
          </Button>
        )
      }
    ];

    return (
      <Card className="mb-0">
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>Group Memberships</strong>
        </CardHeader>
        <CardBody>
          <ReactTable
            className="-highlight"
            data={contactGroups}
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
            sortable={false}
            // filterable
            onPageChange={page => {
              onPageChange(page, contactId);
            }}
            onPageSizeChange={(pageSize, page) => {
              onPageSizeChange(pageSize, page, contactId);
            }}
            onFilteredChange={filtered => {
              onFilteredChange(filtered, contactId);
            }}
          >
            {(state, makeTable, instance) => {
              let input;
              return (
                <div>
                  <input
                    className="form-control mb-4"
                    placeholder="Search..."
                    type="text"
                    ref={n => (input = n)}
                    onChange={() => onContactGroupsSearch(input.value, contactId)}
                  />
                  {makeTable()}
                </div>
              );
            }}
          </ReactTable>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  contactGroups: state.contactGroups.contactGroups,
  page: state.contactGroups.page,
  pages: state.contactGroups.pages,
  loading: state.contactGroups.loading,
  filtered: state.contactGroups.filtered
});

export default connect(mapStateToProps, {
  fetchContactGroups,
  deleteContactGroup,
  onPageChange,
  onPageSizeChange,
  onFilteredChange,
  onContactGroupsSearch
})(ContactGroups);
