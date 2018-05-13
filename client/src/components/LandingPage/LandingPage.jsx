import React from "react";
import GoogleButton from "../GoogleButton/GoogleButton";
import "./LandingPage.css";

const LandingPage = () => (
  <div className="LandingPageContainer">
    <div className="LandingPage">
      <div className="ContentBox">
        <div className="PrimaryHeading">
          <h1 className="PrimaryHeading_Main">Tempo</h1>
          <h2 className="PrimaryHeading_Sub">by LeadCloud</h2>
        </div>
        <GoogleButton />
      </div>
    </div>
  </div>
);

export default LandingPage;
