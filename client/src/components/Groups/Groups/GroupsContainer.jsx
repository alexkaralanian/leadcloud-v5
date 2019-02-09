import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { Card, CardHeader, CardBody } from "reactstrap";

import {
  fetchGroups,
  onPageChange,
  onPageSizeChange,
  onFilteredChange
} from "../../../reducers/groups";

class GroupsContainer extends React.Component {
  async componentDidMount() {
    const { fetchGroups } = this.props;
    fetchGroups();
  }

  render() {
    const {
      groups,
      page,
      pages,
      loading,
      filtered,
      onPageChange,
      onFilteredChange,
      onPageSizeChange
    } = this.props;
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
              <span>{group && group.title ? group.title.charAt(0).toUpperCase() : null}</span>
            </div>
          )
      },
      {
        Header: "Title",
        id: "title",
        accessor: group => (
          <Link to={`/groups/${group.id}/contacts`}>
            <span>{group.title}</span>
          </Link>
        )
      }
    ];

    return (
      <Card className="mt-4 mb-0">
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>All Groups</strong>
        </CardHeader>
        <CardBody>
          <ReactTable
            className="-highlight"
            data={groups} // contacts
            page={page} // current page
            pages={pages} // count
            loading={loading}
            filtered={filtered}
            columns={columns}
            defaultPageSize={20}
            minRows={8}
            // showPaginationTop
            showPageSizeOptions={false}
            manual
            filterable
            onPageChange={page => {
              onPageChange(page);
            }}
            onPageSizeChange={(pageSize, page) => {
              onPageSizeChange(pageSize, page);
            }}
            onFilteredChange={filtered => {
              onFilteredChange(filtered);
            }}
          />
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groups.groups,
  page: state.groups.page,
  pages: state.groups.pages,
  loading: state.groups.loading,
  filtered: state.groups.filtered
});

const mapDispatchToProps = {
  fetchGroups,
  onPageChange,
  onPageSizeChange,
  onFilteredChange,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
