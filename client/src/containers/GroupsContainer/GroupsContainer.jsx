import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col, Button } from "react-bootstrap";

import SearchForm from "../../components/SearchForm/SearchForm";
import Groups from "../../components/Groups/Groups";
import Navigation from "../NavContainer/NavContainer";
import { fetchGroups, clearGroups } from "../../actions/group-actions";

class GroupsContainer extends React.Component {
  constructor() {
    super();
    this.onScroll = this.onScroll.bind(this);
    this.searchGroups = this.searchGroups.bind(this);
    this.createNewGroup = this.createNewGroup.bind(this);
  }

  componentDidMount() {
    const { fetchGroups, groups, limit, offset, query } = this.props;
    fetchGroups(groups, limit, offset, query);
  }

  componentWillUnmount() {
    const { clearGroups } = this.props;
    clearGroups();
  }

  onScroll() {
    // const {
    //   isLoading,
    //   contacts,
    //   contactsLimit,
    //   contactsOffset,
    //   contactsQuery
    // } = this.props;
    // if (
    //   window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
    //   contacts.length &&
    //   !isLoading
    // ) {
    //   this.props.fetchContacts(
    //     contacts,
    //     contactsLimit,
    //     contactsOffset,
    //     contactsQuery
    //   );
    // }
  }

  searchGroups(values) {
    // const query = values.nativeEvent.target.defaultValue;
    // const {
    //   setContactsQuery,
    //   clearContacts,
    //   searchContacts,
    //   contactsLimit,
    //   contacts,
    //   fetchContacts
    // } = this.props;
    // setContactsQuery(query);
    // if (query.length < 1) clearContacts();
    // if (query.length >= 1) {
    //   searchContacts(contacts, contactsLimit, 0, query);
    // }
    // if (!query) fetchContacts([], contactsLimit, 0, "");
  }

  createNewGroup() {
    this.props.history.push("/group/new");
  }

  render() {
    const { isAuthed, isFetching, history, groups } = this.props;

    return !isAuthed ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Navigation />
        <Grid>
          <Row id="load-contacts-btn">
            <Col sm={12}>
              <Button
                className="submitButton"
                bsStyle="primary"
                onClick={() => history.push("/group/new")}
              >
                <span>Create New</span>
              </Button>
            </Col>
          </Row>
          <SearchForm searchFunction={this.searchGroups} />
          <Groups isFetching={isFetching} groups={groups} />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  groups: state.groupReducer.groups,
  limit: state.groupReducer.limit,
  offset: state.groupReducer.offset,
  query: state.groupReducer.query,
  isFetching: state.groupReducer.isFetching
});

const mapDispatchToProps = { fetchGroups, clearGroups };

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
