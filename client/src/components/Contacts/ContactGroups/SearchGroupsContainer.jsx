import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015

import { fetchComponent, setOffset, setQuery } from "../../../actions/query-actions";

import { setGroups } from "../../../actions/group-actions";

class SearchGroupsContainer extends React.Component {
  state = {
    selected: []
  };

  componentDidMount() {
    const { fetchComponent, setOffset } = this.props;
    setOffset(0);
    setQuery("");
    fetchComponent("groups", [], setGroups, null, null);
  }

  componentWillUnmount() {
    const { setGroups } = this.props;
    setGroups([]);
  }

  diffContactGroups = allGroups => {
    const { contactGroups } = this.props;
    const map = {};
    contactGroups.forEach(group => {
      map[group.id] = group;
    });
    allGroups.forEach(group => {
      if (map[group.id]) delete map[group.id];
      else map[group.id] = group;
    });
    return Object.values(map);
  };

  render() {
    const { groups, contactGroups, submitFunction, hostComponent } = this.props;

    return (
      <React.Fragment>
        <div className="reset-typeahead-height">
          <Typeahead
            clearButton
            multiple
            placeholder="Choose groups..."
            selected={this.state.selected}
            onChange={selected => {
              this.setState({ selected });
            }}
            options={this.diffContactGroups(groups)}
            labelKey="title"
          />
          <Button
            className="mt-4"
            onClick={() => submitFunction(this.state.selected, hostComponent)}
            bsStyle="primary"
          >
            Add Selected
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groups.groups,
  contactGroups: state.contactGroups.contactGroups
});

const mapDispatchToProps = {
  fetchComponent,
  setGroups,
  setOffset,
  setQuery
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchGroupsContainer);
