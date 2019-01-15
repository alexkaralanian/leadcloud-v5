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
  onFilteredChange
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
        accessor: group => (
          <Button color="danger" onClick={() => deleteContactGroup(contactId, group.id)}>
            Remove Group
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
            filterable
            onPageChange={page => {
              onPageChange(page, contactId);
            }}
            onPageSizeChange={(pageSize, page) => {
              onPageSizeChange(pageSize, page, contactId);
            }}
            onFilteredChange={filtered => {
              onFilteredChange(filtered, contactId);
            }}
          />
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  contactGroups: state.contactGroupsReducer.contactGroups,
  page: state.contactGroupsReducer.page,
  pages: state.contactGroupsReducer.pages,
  loading: state.contactGroupsReducer.loading,
  filtered: state.contactGroupsReducer.filtered
});

export default connect(mapStateToProps, {
  fetchContactGroups,
  deleteContactGroup,
  onPageChange,
  onPageSizeChange,
  onFilteredChange
})(ContactGroups);
