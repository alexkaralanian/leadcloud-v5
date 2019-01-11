import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import SearchForm from "../../components/SearchForm/SearchForm";

import { setGroups, searchGroups } from "../../actions/group-actions";

import { fetchComponent, setQuery, setOffset } from "../../actions/query-actions";

class GroupsContainer extends React.Component {
  componentDidMount() {
    const { fetchComponent, groups } = this.props;
    fetchComponent("groups", [], setGroups, null, null);
  }

  render = () => {
    const { groups, component } = this.props;
    return (
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify" />
          <strong>All Groups</strong>
        </CardHeader>
        <CardBody>
          <div>
            <SearchForm searchText="Search..." searchFunction={searchGroups} />
          </div>
          <Table responsive striped>
            <thead>
              <tr>
                <th />
                <th>Title</th>
                {component === "ContactGroups" && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {groups &&
                groups.map(group => (
                  <tr key={group.id}>
                    <td>
                      {group && group.images ? (
                        <div className="table_img">
                          <img alt="contact" src={group.images[0]} />
                        </div>
                      ) : (
                        <div className="table_img-null">
                          <span>
                            {group && group.title ? group.title.charAt(0).toUpperCase() : null}
                          </span>
                        </div>
                      )}
                    </td>
                    <td>
                      <Link to={`/groups/${group.id}/contacts`}>
                        <span>{group.title}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
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
