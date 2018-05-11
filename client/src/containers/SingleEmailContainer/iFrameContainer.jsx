import React from "react";
import SingleEmail from "../../components/SingleEmail/SingleEmail";

class iFrameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {}
    };

    this.receivePostMessage = this.receivePostMessage.bind(this);
  }

  componentDidMount() {
    window.addEventListener("message", this.receivePostMessage);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.receivePostMessage);
  }

  receivePostMessage(event) {
    // console.log("EMAIL POST MESSAGE", event.data.email);
    const email = event.data.email;
    if (email) {
      this.setState({
        email
      });
    }
  }

  render() {
    return (
      <SingleEmail
        email={this.state.email}
        isFetching={this.state.isFetching}
      />
    );
  }
}

export default iFrameContainer;
