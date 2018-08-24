import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Textarea from "react-autosize-textarea";
// import { Email, Item, Span, A, renderEmail } from "react-html-email";
import { Field, reduxForm } from "redux-form";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Grid,
  Col,
  Row,
  Image
} from "react-bootstrap";
import { contactValidate } from "../../helpers/redux-form/validate";

import TableRowCheckbox from "../../components/TableRow/TableRow_Checkbox";
// import EmailHTML from "../../components/EmailTemplate/EmailTemplate";
import SearchForm from "../../components/SearchForm/SearchForm";
import TextAreaField from "../InputField/TextAreaField";

import { fetchListing } from "../../actions/listing-actions";
import { loadListingData } from "../../actions/campaign-listings-actions";

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
  prevPage
}) => {
  return (
    <Form>
      <Grid>
        <Row>
          <Col xs={12}>
            <h2>{campaign.title}</h2>
          </Col>

          <Col xs={12}>
            <Field
              type="text"
              name="body"
              component={TextAreaField}
              label="Body"
            />
            {campaign.listings.map(listing => (
              <div className="campaign_listing_card">
                <div className="campaign_listing_card-inner">
                  <h3>{listing.address}</h3>
                  {listing.images && (
                    <Image
                      className="campaign_listing-img"
                      responsive
                      src={listing.images[0]}
                    />
                  )}
                  <Field
                    type="text"
                    name={`listings[${campaign.listings.indexOf(
                      listing
                    )}].description`}
                    component={TextAreaField}
                    label="Description"
                  />
                </div>
              </div>
            ))}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <div>
              <Button
                onClick={prevPage}
                className="submitButton"
                type="button"
                bsStyle="primary"
                disabled={pristine || submitting}
              >
                <span>Previous</span>
              </Button>
            </div>
          </Col>
          <Col xs={6}>
            <div>
              <Button
                onClick={nextPage}
                className="submitButton"
                type="button"
                bsStyle="primary"
                disabled={pristine || submitting}
              >
                <span>Next</span>
              </Button>
            </div>
          </Col>
        </Row>
      </Grid>
    </Form>
  );
};

CampaignFormB = reduxForm({
  form: "editCampaignContent", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate: contactValidate
})(CampaignFormB);

CampaignFormB = connect(
  state => ({
    initialValues: state.campaignReducer.campaign // pull initial values from account reducer
  })
  // { load: loadAccount } // bind account loading action creator
)(CampaignFormB);

export default CampaignFormB;
