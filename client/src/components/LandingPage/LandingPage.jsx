import React from "react";
import GoogleButton from "../GoogleButton/GoogleButton";
import * as styles from "./styles.css";

const LandingPage = () => (
  <div className={styles.LandingPageContainer}>
    <div className={styles.LandingPage}>
      <div className={styles.ContentBox}>
        <div className={styles.PrimaryHeading}>
          <h1 className={styles.PrimaryHeading_Main}>Tempo</h1>
          <h2 className={styles.PrimaryHeading_Sub}>by LeadCloud</h2>
        </div>
        <GoogleButton />
      </div>
    </div>
  </div>
);

export default LandingPage;
