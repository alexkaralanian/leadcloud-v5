import React from "react";
import ReactHtmlParser from "react-html-parser";
import PropTypes from "prop-types";
import "./SingleEmail.css";

const SingleEmail = ({ email }) => (
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

export default SingleEmail;

SingleEmail.propTypes = {
  email: PropTypes.object.isRequired
};
