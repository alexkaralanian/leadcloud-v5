import React from "react";
import { connect } from "react-redux";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Button,
  ButtonGroup
} from "reactstrap";
import moment from "moment";
import { Link } from "react-router-dom";

import { fetchEmails, clearEmails } from "../../actions/email-actions";

class Inbox extends React.Component {
  state = {
    dropdownOpen: false
  };

  componentDidMount() {
    const { fetchEmails, maxResults, pageToken, emails } = this.props;
    fetchEmails(maxResults, pageToken, emails);
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
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

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    const { emails } = this.props;
    return (
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
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
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
                        {moment(email.date).format("ddd, M/D/YY h:mma")}
                      </span>
                    </div>
                    <div className="title">{email.subject}</div>
                    <div className="description">{email.snippet}...</div>
                  </Link>
                </li>
              );
            })}
        </ul>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  emails: state.emailReducer.emails,
  maxResults: state.emailReducer.maxResults,
  pageToken: state.emailReducer.pageToken,
  isFetching: state.emailReducer.isFetching,
  isLoading: state.emailReducer.isLoading
  // error: state.emailReducer.error
});

const mapDispatchToProps = { fetchEmails, clearEmails };

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
