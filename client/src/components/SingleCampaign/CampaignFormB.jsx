import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import findIndex from "lodash.findindex";

import { Field, reduxForm } from "redux-form";
import { Button, Form, Col, Row, Image, FormGroup } from "react-bootstrap";

import TextAreaField from "../InputField/TextAreaField";
import InputField from "../InputField/InputField";
import { contactValidate } from "../../helpers/redux-form/validate";

import "./SingleCampaign.css";

let CampaignFormB;

CampaignFormB = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  auditClick,
  campaign,
  nextPage,
  prevPage,
  push
}) => {
  return (
    <Form className="margin-top-2" onSubmit={handleSubmit}>
      <Row>
        <Col xs={12}>
          <FormGroup>
            <Field
              type="text"
              name="subject"
              component={InputField}
              label="Subject"
            />
            <Field
              type="text"
              name="body"
              component={TextAreaField}
              label="Body"
            />
          </FormGroup>
          {campaign &&
            campaign.listings.map(listing => {
              console.log("LISTING", listing);
              console.log(
                "INDEX OF LISTING",
                findIndex(campaign.listings, o => o.id === listing.id)
              );
              return (
                <div key={listing.id} className="campaign_listing_card">
                  <div className="campaign_listing_card-inner">
                    <h3>{listing.address}</h3>
                    {listing.images && (
                      <Image
                        className="campaign_listing-img"
                        responsive
                        src={listing.images[0]}
                      />
                    )}
                    <FormGroup>
                      <Field
                        type="text"
                        name={`listings[${findIndex(
                          campaign.listings,
                          obj => obj.id === listing.id
                        )}].description`}
                        component={TextAreaField}
                        label="Description"
                      />
                    </FormGroup>
                  </div>
                </div>
              );
            })}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="button_footer-container">
            <Button
              className="button-lg"
              onClick={() => push(`/campaigns/${campaign.id}`)}
              bsSize="large"
              // disabled={pristine || submitting}
            >
              <span>Prev</span>
            </Button>
            <Button
              className="button-lg"
              type="submit"
              bsStyle="primary"
              bsSize="large"
              disabled={pristine || submitting}
            >
              <span>Submit</span>
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

const mapStateToProps = state => ({
  initialValues: state.campaignReducer.campaign // pull initial values from account reducer
});

const mapDisptachToProps = {
  push
};

CampaignFormB = reduxForm({
  form: "editCampaignContent", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate: contactValidate
})(CampaignFormB);

CampaignFormB = connect(mapStateToProps, mapDisptachToProps)(CampaignFormB);

export default CampaignFormB;
