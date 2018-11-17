import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

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
          <nav>
            <a
              href="#/ui-kits/email/compose"
              className="btn btn-danger btn-block"
            >
              New Email
            </a>
            <Nav>
              <NavItem>
                <NavLink href="#/ui-kits/email/inbox">
                  <i className="fa fa-inbox" /> Inbox{" "}
                  <Badge color="danger">4</Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <i className="fa fa-star" /> Stared
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <i className="fa fa-rocket" /> Sent
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <i className="fa fa-trash-o" /> Trash
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <i className="fa fa-bookmark" /> Important<Badge color="info">
                    5
                  </Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">
                  <i className="fa fa-exclamation-circle" /> Spam{" "}
                  <Badge color="danger">4</Badge>
                </NavLink>
              </NavItem>
            </Nav>
          </nav>

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
                  console.log("EMAIL", email);
                  return (
                    <li className="message unread">
                      <a href="#">
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
                            {moment(email.date).format("ddd, M/D/YY h:mma")}
                          </span>
                        </div>
                        <div className="title">{email.subject}</div>
                        <div className="description">{email.snippet}...</div>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </main>
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
