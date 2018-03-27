import React from "react";
import ReactHtmlParser from "react-html-parser";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import Loading from "../Loading/Loading";
import { singleEmailBody } from "./styles.css";

const SingleEmail = ({ email, isFetching }) =>
  isFetching ? (
    <Loading />
  ) : (
    <Grid>
      <Row>
        <Col xs={12}>
          <h4>Subject: {email && email.subject}</h4>
          <h4>
            To:{" "}
            {email.to &&
              ReactHtmlParser(
                email.to.html
                  .replace(/&#x27;/g, "'")
                  .replace(/&lt;/g, "")
                  .replace(/&gt;/g, "")
              )}
          </h4>
          <h4>
            From:{" "}
            {email.from &&
              ReactHtmlParser(
                email.from.html
                  .replace(/&#x27;/g, "'")
                  .replace(/&lt;/g, "")
                  .replace(/&gt;/g, "")
              )}
          </h4>
          <div className={singleEmailBody}>
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
        </Col>
      </Row>
    </Grid>
  );

export default SingleEmail;

SingleEmail.propTypes = {
  email: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired
};

SingleEmail.defaultProps = {
  email: {},
  isFetching: false
};
