import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect, Link } from "react-router-dom";
import moment from "moment";
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
                <main className="inbox">
                  <div className="toolbar">
                    <ButtonGroup>
                      <Button color="light">
                        <span className="fa fa-envelope" />
                      </Button>
                      <Button color="light">
                        <span className="fa fa-star" />
                      </Button>
                      <Button color="light">
                        <span className="fa fa-star-o" />
                      </Button>
                      <Button color="light">
                        <span className="fa fa-bookmark-o" />
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button color="light">
                        <span className="fa fa-mail-reply" />
                      </Button>
                      <Button color="light">
                        <span className="fa fa-mail-reply-all" />
                      </Button>
                      <Button color="light">
                        <span className="fa fa-mail-forward" />
                      </Button>
                    </ButtonGroup>
                    <Button color="light">
                      <span className="fa fa-trash-o" />
                    </Button>
                    <ButtonDropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggle}
                    >
                      <DropdownToggle caret color="light">
                        <span className="fa fa-tags" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          add label<Badge color="danger">Home</Badge>
                        </DropdownItem>
                        <DropdownItem>
                          add label<Badge color="info">Job</Badge>
                        </DropdownItem>
                        <DropdownItem>
                          add label<Badge color="success">Clients</Badge>
                        </DropdownItem>
                        <DropdownItem>
                          add label<Badge color="warning">News</Badge>
                        </DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                    <ButtonGroup className="float-right">
                      <Button color="light">
                        <span className="fa fa-chevron-left" />
                      </Button>
                      <Button color="light">
                        <span className="fa fa-chevron-right" />
                      </Button>
                    </ButtonGroup>
                  </div>
                  <ul className="messages">
                    {emails &&
                      emails.map(email => {
                        return (
                          <li className="message unread">
                            <Link to={`/emails/${email.id}`}>
                              <div className="actions">
                                <span className="action">
                                  <i className="fa fa-square-o" />
                                </span>
                                <span className="action">
                                  <i className="fa fa-star-o" />
                                </span>
                              </div>
                              <div className="header">
                                <span className="from">{email.name}</span>
                                <span className="date">
                                  <span className="fa fa-paper-clip" />{" "}
                                  {moment(email.date).format(
                                    "ddd, M/D/YY h:mma"
                                  )}
                                </span>
                              </div>
                              <div className="title">{email.subject}</div>
                              <div className="description">
                                {email.snippet}...
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </main>
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
