import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect, Link } from "react-router-dom";

import axios from "axios";
import Header from "../../components/Header/Header-old";
import SingleEmailContainer from "../SingleEmailContainer/SingleEmailContainer";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import Emails from "../../components/Emails/Emails";
import Inbox from "../../components/Email/Inbox";
import Errors from "../../components/Error/Error";
import Navigation from "../NavContainer/NavContainer";
import EmailNav from "../../components/Email/EmailNav";
import { fetchEmails, clearEmails } from "../../actions/email-actions";

import {
  Nav,
  NavItem,
  NavLink,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Input
} from "reactstrap";

class EmailsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  componentDidMount() {
    const { fetchEmails, maxResults, pageToken, emails } = this.props;
    fetchEmails(maxResults, pageToken, emails);
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    // this.props.clearError();
    // this.props.clearEmails();
  }

  onScroll = () => {
    const {
      fetchEmails,
      maxResults,
      pageToken,
      emails,
      isLoading
    } = this.props;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      emails.length &&
      !isLoading
    ) {
      fetchEmails(maxResults, pageToken, emails);
    }
  };

  // Still working??? //  MOVE TO CONTACT REDUCER...
  createContact = (email, name) => {
    return axios
      .post("api/email/gmail/fetchcontact", {
        email,
        name
      })
      .then(res => {
        this.props.history.push(`contact/${res.data.id}`);
      });
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { isAuthed, match, emails, email, isFetching, error } = this.props;
    return !isAuthed ? (
      <Redirect to="/auth" />
    ) : (
      <React.Fragment>
        <BreadCrumbs />
        <div className="animated fadeIn">
          <div className="email-app mb-4">
            <EmailNav />
            <Route
              exact
              path="/emails"
              render={routeProps => (
                <Inbox
                  {...routeProps}
                  emails={emails}
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                />
              )}
            />

            {/* SINGLE EMAIL */}
            <Route
              path="/emails/:id"
              render={routeProps => <SingleEmailContainer {...routeProps} />}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthed: state.authReducer.isAuthed,
  email: state.emailReducer.email,
  emails: state.emailReducer.emails,
  maxResults: state.emailReducer.maxResults,
  pageToken: state.emailReducer.pageToken,
  isFetching: state.emailReducer.isFetching,
  isLoading: state.emailReducer.isLoading,
  error: state.emailReducer.error
});

const mapDispatchToProps = { fetchEmails, clearEmails };

EmailsContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  emails: PropTypes.array.isRequired,
  maxResults: PropTypes.number.isRequired,
  pageToken: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchEmails: PropTypes.func.isRequired
  // clearEmails: PropTypes.func.isRequired,
  // clearError: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailsContainer);
