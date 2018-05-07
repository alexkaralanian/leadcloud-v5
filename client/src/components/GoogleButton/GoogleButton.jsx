import React from "react";
import PropTypes from "prop-types";
import "./GoogleButton.css";

const GoogleButton = () => (
  <button onClick={() => console.log("HI")} className="googleButton">
    <a target="_self" href="/api/auth/google">
      <span className="googleButton_text">Login with Google</span>
    </a>
  </button>
);

export default GoogleButton;
