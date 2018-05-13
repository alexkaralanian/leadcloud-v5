import React from "react";
import PropTypes from "prop-types";
import { googleButton, googleButton_text } from "./styles.css";

const GoogleButton = () => (
  <button onClick={() => console.log("HI")} className={googleButton}>
    <a target="_self" href="/api/auth/google">
      <span className={googleButton_text}>Login with Google</span>
    </a>
  </button>
);

export default GoogleButton;
