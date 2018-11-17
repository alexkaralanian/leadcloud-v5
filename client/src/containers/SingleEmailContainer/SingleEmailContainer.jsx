import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
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

import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import EmailNav from "../../components/Email/EmailNav";
import { fetchEmail, clearEmail } from "../../actions/email-actions";
import iFrameContainer from "./iFrameContainer";

class SingleEmailContainer extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  componentDidMount() {
    const { fetchEmail, match } = this.props;
    fetchEmail(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { email } = this.props;

    if (email !== nextProps.email) {
      this.iframe.contentWindow.postMessage({ email: nextProps.email }, "*");
    }
  }

  componentWillUnmount() {
    const { clearEmail } = this.props;
    clearEmail();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { isAuthed, email, emails } = this.props;

    return (
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
        </div>
        <div className="details">
          <div className="title">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit.
          </div>
          <div className="header">
            <img className="avatar" src="img/avatars/7.jpg" />
            <div className="from">
              <span>Lukasz Holeczek</span>
              lukasz@bootstrapmaster.com
            </div>
            <div className="date">
              Today, <b>3:47 PM</b>
            </div>
          </div>
          <div className="content">
            <iframe
              ref={el => (this.iframe = el)}
              title="Email"
              frameBorder={1}
              src={iFrameContainer}
              scrolling="no"
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
    );

    // return (
    //   <React.Fragment>
    //     <BreadCrumbs />
    //     <Row className="animated fadeIn">
    //       <Col xs={12}>
    //         <h4>Subject: {email && email.subject}</h4>
    //         <h4>
    //           To:{" "}
    //           {email.to &&
    //             ReactHtmlParser(
    //               email.to.html
    //                 .replace(/&#x27;/g, "'")
    //                 .replace(/&lt;/g, "")
    //                 .replace(/&gt;/g, "")
    //             )}
    //         </h4>
    //         <h4>
    //           From:{" "}
    //           {email.from &&
    //             ReactHtmlParser(
    //               email.from.html
    //                 .replace(/&#x27;/g, "'")
    //                 .replace(/&lt;/g, "")
    //                 .replace(/&gt;/g, "")
    //             )}
    //         </h4>
    //       </Col>
    //     </Row>

    //     <iframe
    //       ref={el => (this.iframe = el)}
    //       title="Email"
    //       frameBorder={1}
    //       src="/iframecontainer"
    //       scrolling="no"
    //     />
    //   </React.Fragment>
    // );
  }
}

const mapStateToProps = state => ({
  email: state.emailReducer.email,
  emails: state.emailReducer.emails,
  isFetching: state.emailReducer.isFetching,
  // error: state.emailReducer.error,
  isAuthed: state.authReducer.isAuthed
});

const mapDispatchToProps = {
  fetchEmail,
  clearEmail
  // clearError
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SingleEmailContainer
);
