import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import EmailNav from "./EmailNav";
import { fetchEmails, clearEmails } from "../../actions/email-actions";

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Button,
  ButtonGroup
} from "reactstrap";

class Inbox extends Component {
  state = {
    dropdownOpen: false
  };

  componentDidMount() {
    const { fetchEmails, maxResults, pageToken, emails } = this.props;
    fetchEmails(maxResults, pageToken, emails);
    window.addEventListener("scroll", this.onScroll, false);
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    const { emails } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="email-app mb-4">
          <EmailNav/>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  emails: state.emailReducer.emails,
  maxResults: state.emailReducer.maxResults,
  pageToken: state.emailReducer.pageToken,
  isFetching: state.emailReducer.isFetching,
  isLoading: state.emailReducer.isLoading,
  error: state.emailReducer.error
});

const mapDispatchToProps = { fetchEmails, clearEmails };

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
