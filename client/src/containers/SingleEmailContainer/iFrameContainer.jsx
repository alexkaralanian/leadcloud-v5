import React from "react";
import ReactHtmlParser from "react-html-parser";

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
    const email = event.data.email;

    if (email) {
      this.setState({
        email
      });
    } else {
      console.error("NO EMAIL WAS SET");
    }
  }

  render() {
    const { email } = this.state;
    return (
      <div>
        <base target="_blank" />
        <div className="singleEmailBody">
          {email &&
            email.html &&
            ReactHtmlParser(
              email.html
                .replace(/&nbsp;/g, "")
                .replace(/&lt;/g, "")
                .replace(/&gt;/g, "")
                .replace(/&#8211/g, "")
                .replace(/&#39;/g, "'")
                .replace(/&#8203;/g, "")
                .replace(/&#8217;/g, "'")
                .replace(/&quot;/g, "")
                .replace(/&quot;/g, " ")
                .replace(/&amp;/g, "")
                .replace(/&middot;/g, "|")
                .replace(/&#43;/g, " ")
            )}
        </div>
      </div>
    );
  }
}

export default iFrameContainer;
