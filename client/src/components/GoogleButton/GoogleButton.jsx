import React from "react";
import "./GoogleButton.css";

const GoogleButton = () => (
  <button className="googleButton">
    <a target="_self" href="/api/auth/google">
      <span className="googleButton_text">Login with Google</span>
    </a>
  </button>
);

export default GoogleButton;
