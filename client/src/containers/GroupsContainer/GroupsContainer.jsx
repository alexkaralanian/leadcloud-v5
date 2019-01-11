import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { Card, CardHeader, CardBody } from "reactstrap";

import { setGroups, searchGroups } from "../../actions/group-actions";

import { fetchComponent, setQuery, setOffset } from "../../actions/query-actions";

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

class GroupsContainer extends React.Component {
  state = {
    data: [],
    pages: 0,
    page: 0,
    pageSize: 20,
    offset: 0,
    loading: false,
    query: "",
    filtered: []
  };

  async componentDidMount() {
    try {
      const res = await axios.get(
        `/api/groups/?limit=${this.state.pageSize}&offset=${this.state.page * this.state.pageSize}`
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
      const res = await axios.get(`/api/groups/?limit=${pageSize}&offset=${offset}&query=${query}`);
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
      const res = await axios.get(`/api/groups/?limit=${pageSize}&offset=${offset}&query=${query}`);
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
      const res = await axios.get(`/api/groups/?limit=${pageSize}&offset=${0}&query=${query}`);
      this.setState({
        data: res.data.rows,
        pages: Math.ceil(res.data.count / pageSize)
      });
    } catch (err) {
      console.error(err);
    }
  };

  render = () => {
    const { groups, component } = this.props;
    return (
      <Card className="mt-4 mb-0">
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>All Groups</strong>
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
            showPaginationTop
            showPageSizeOptions={false}
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
            // getProps={props => {
            //   console.log("TH FILTER PROPS", props.getTheadFilterTrProps);
            //   return {};
            // }}
          />
        </CardBody>
      </Card>
    );
  };
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
  isLoading: state.queryReducer.isLoading,
  count: state.queryReducer.count,
  offset: state.queryReducer.offset
});

const mapDispatchToProps = {
  fetchComponent,
  searchGroups,
  setGroups,
  setQuery,
  setOffset,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
