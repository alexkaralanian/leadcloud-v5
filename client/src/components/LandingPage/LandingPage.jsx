import React from "react";
import GoogleButton from "../GoogleButton/GoogleButton";
import "./LandingPage.scss";

const LandingPage = () => (
  <div className="landing-page__bg-img">
    <div className="landing-page__container">
      <div className="login__container">
        <div className="login__text-box">
          {/*<h1 className="login__heading">Tempo</h1>*/}
          <h2 className="login__sub-heading">LeadCloud</h2>
        </div>
        <GoogleButton />
      </div>
    </div>
  </div>
);

export default LandingPage;
