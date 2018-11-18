import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Button,
  ButtonGroup,
  FormGroup,
  Input
} from "reactstrap";

import { fetchEmail, clearEmail } from "../../actions/email-actions";

class SingleEmailContainer extends React.Component {
  state = {
    dropdownOpen: false
  };

  componentDidMount() {
    const { fetchEmail, match } = this.props;
    fetchEmail(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { email } = this.props;
    if (email !== nextProps.email) {
      this.iframe.contentWindow.document.write(`${nextProps.email.html}`);
    }
  }

  componentWillUnmount() {
    const { clearEmail } = this.props;
    clearEmail();
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    const { isAuthed, email } = this.props;
    console.log("EMAIL", email);
    return (
      <React.Fragment>
        <main className="message">
          <div className="toolbar">
            <ButtonGroup>
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
          </div>
          <div className="details">
            <div className="title">{email && email.subject}</div>
            <div className="header">
              {/*<img className="avatar" src="img/avatars/7.jpg" />*/}
              <div className="from">
                <span>{email.from && email.from.value[0].name}</span>
                {email.from && email.from.value[0].address}
              </div>
              <div className="date">
                {email && moment(email.date).format("ddd, M/D/YY h:mma")}
              </div>
            </div>
            <div className="content">
              <iframe
                ref={el => (this.iframe = el)}
                title="Email"
                frameBorder={1}
                src="about:blank"
                scrolling="yes"
              />
            </div>
            <div className="attachments">
              <div className="attachment">
                <Badge color="danger">zip</Badge> <b>bootstrap.zip</b>{" "}
                <i>(2,5MB)</i>
                <span className="menu">
                  <a href="#" className="fa fa-search" />
                  <a href="#" className="fa fa-share" />
                  <a href="#" className="fa fa-cloud-download" />
                </span>
              </div>
              <div className="attachment">
                <Badge color="info">txt</Badge> <b>readme.txt</b> <i>(7KB)</i>
                <span className="menu">
                  <a href="#" className="fa fa-search" />
                  <a href="#" className="fa fa-share" />
                  <a href="#" className="fa fa-cloud-download" />
                </span>
              </div>
              <div className="attachment">
                <Badge color="success">xls</Badge> <b>spreadsheet.xls</b>{" "}
                <i>(984KB)</i>
                <span className="menu">
                  <a href="#" className="fa fa-search" />
                  <a href="#" className="fa fa-share" />
                  <a href="#" className="fa fa-cloud-download" />
                </span>
              </div>
            </div>
            <form method="post" action="">
              <FormGroup>
                <Input
                  type="textarea"
                  id="message"
                  name="body"
                  rows="12"
                  placeholder="Click here to reply"
                />
              </FormGroup>
              <FormGroup>
                <Button type="submit" color="success">
                  Send message
                </Button>
              </FormGroup>
            </form>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  email: state.emailReducer.email,
  isFetching: state.emailReducer.isFetching
  // error: state.emailReducer.error,
});

const mapDispatchToProps = {
  fetchEmail,
  clearEmail
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleEmailContainer
);
