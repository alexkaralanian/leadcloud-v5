import React from "react";
// import moment from "moment";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone
} from "react-bootstrap-table2-paginator";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import ReactTable from "react-table";
import { Card, CardHeader, CardBody, Pagination, PaginationItem, PaginationLink } from "reactstrap";
// import SearchForm from "../../SearchForm/SearchForm";

import {
  fetchContacts,
  onPageChange,
  onPageSizeChange,
  onFilteredChange,
  onSearch
} from "../../../reducers/contacts-reducer";

const SearchForm = props => {
  let input;
  return (
    <div className="mb-3">
      <input
        onChange={() => props.onSearch(input.value)}
        className="form-control"
        ref={n => (input = n)}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

const options = {
  onSizePerPageChange: (sizePerPage, page) => {
    console.log("Size per page change!!!");
    console.log("Newest size per page:" + sizePerPage);
    console.log("Newest page:" + page);
  },
  onPageChange: (page, sizePerPage) => {
    console.log("Page change!!!");
    console.log("Newest size per page:" + sizePerPage);
    console.log("Newest page:" + page);
  }
};

const columns = [
  {
    dataField: "fullName",
    text: "Name"
  }

  // {
  //   dataField: "email[0].value",
  //   text: "Email",
  //   formatter: cell => cell && <a href={`mailto:${cell}`}>{cell || null}</a>
  // },
  // {
  //   dataField: "phone[0].value",
  //   text: "Phone",
  //   formatter: cell => <a href={cell && `tel:${cell}`}>{cell || null}</a>
  // }
];

const RemotePagination = ({ data, columns, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <PaginationProvider
      pagination={paginationFactory({
        custom: true,
        page,
        sizePerPage,
        totalSize
      })}
    >
      {({ paginationProps, paginationTableProps }) => (
        <div>
          <div>
            <p>Current Page: {paginationProps.page}</p>
            <p>Current SizePerPage: {paginationProps.sizePerPage}</p>
          </div>
          <div>
            <PaginationListStandalone {...paginationProps} />
          </div>
          <BootstrapTable
            remote
            keyField="id"
            // bordered={false}
            data={[
              { id: 1, fullName: "Alex K" },
              { id: 2, fullName: "Alex K" },
              { id: 3, fullName: "Alex K" },
              { id: 4, fullName: "Alex K" },
              { id: 5, fullName: "Alex K" }
            ]}
            columns={columns}
            onTableChange={onTableChange}
            {...paginationTableProps}
          />
        </div>
      )}
    </PaginationProvider>
  </div>
);

class ContactsContainer extends React.Component {
  state = {
    page: 1,
    sizePerPage: 5,
    data: [
      { id: 1, fullName: "Alex K" },
      { id: 2, fullName: "Alex K" },
      { id: 3, fullName: "Alex K" },
      { id: 4, fullName: "Alex K" },
      { id: 5, fullName: "Alex K" }
    ]
  };

  // componentDidMount() {
  //   const { fetchContacts } = this.props;
  //   fetchContacts();
  // }

  handleTableChange = (type, { page, sizePerPage }) => {
    console.log("HANDLE PAGINATION CHANGE");
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      this.setState(() => ({
        page,
        data: [{ id: 2, fullName: "James Karalanian" }],
        sizePerPage
      }));
    }, 2000);
  };

  render() {
    // const { SearchBar } = Search;

    const columns = [
      {
        dataField: "fullName",
        text: "Name"
      }
    ];

    const {
      onPageChange,
      onPageSizeChange,
      onFilteredChange,
      groupContacts,
      deleteGroupContact,
      // page,
      pages,
      pageSize,
      loading,
      filtered,
      match,
      contacts,
      onSearch
    } = this.props;

    const { data, sizePerPage, page } = this.state;

    return (
      <Card className="mt-4 mb-0">
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>All Contacts</strong>
        </CardHeader>
        <CardBody>
          <RemotePagination
            data={data}
            page={page}
            sizePerPage={sizePerPage}
            totalSize={20}
            onTableChange={this.handleTableChange}
          />
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contactsReducer.contacts,
  page: state.contactsReducer.page,
  pages: state.contactsReducer.pages,
  loading: state.contactsReducer.loading,
  filtered: state.contactsReducer.filtered
});

export default connect(mapStateToProps, {
  fetchContacts,
  onPageChange,
  onPageSizeChange,
  onFilteredChange,
  onSearch
})(ContactsContainer);

// ACTIONS
export const onPageChange = (page, pageSize) => async dispatch => {
  console.log("onPageChange", page, pageSize);
  // const state = store.getState();
  const offset = page * pageSize;
  try {
    const res = await axios.get(`/api/contacts/?limit=${pageSize}&offset=${offset}&query=${""}`);
    console.log("RESPONSE", res);
    dispatch(setContacts(res.data.rows));
  } catch (err) {
    console.error(err);
  }
};

const SearchForm = props => {
  let input;
  return (
    <div className="mb-3">
      <input
        onChange={() => props.onSearch(input.value)}
        className="form-control"
        ref={n => (input = n)}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

const RemotePagination = ({ data, columns, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <PaginationProvider
      pagination={paginationFactory({
        custom: true,
        page,
        sizePerPage,
        totalSize
      })}
    >
      {({ paginationProps, paginationTableProps }) => (
        <div>
          <div>
            <p>Current Page: {paginationProps.page}</p>
            <p>Current SizePerPage: {paginationProps.sizePerPage}</p>
          </div>
          <div>
            <PaginationListStandalone {...paginationProps} />
          </div>
          <BootstrapTable
            remote
            keyField="id"
            bordered={false}
            data={data}
            columns={columns}
            onTableChange={onTableChange}
            {...paginationTableProps}
          />
        </div>
      )}
    </PaginationProvider>
  </div>
);
