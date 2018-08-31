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

class CampaignFormB extends React.Component {
  componentDidMount() {
    const { match, fetchCampaign } = this.props;
    this.props.fetchCampaign(match.params.id);
  }

  render() {
    return (
      <Form>
        <Grid>
          <Row>
            <Col xs={12}>
              <h2>Format Template</h2>
            </Col>

            <Col xs={12}>
              <Field
                type="text"
                name="body"
                component={TextAreaField}
                label="Body"
              />
              {campaignListings.map(listing => (
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
                    {/*<Textarea>{listing.description}</Textarea>*/}
                    <button
                      type="button"
                      onClick={() => loadListingData(listing)}
                    >
                      Load Listing Data
                    </button>
                    <Field
                      type="text"
                      name="description"
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
  }
}

CampaignFormB = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  auditClick,
  campaignListings,
  nextPage,
  prevPage,
  loadListingData
}) => {
  return (
    <Form>
      <Grid>
        <Row>
          <Col xs={12}>
            <h2>Format Template</h2>
          </Col>

          <Col xs={12}>
            <Field
              type="text"
              name="body"
              component={TextAreaField}
              label="Body"
            />
            {campaignListings.map(listing => (
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
                  {/*<Textarea>{listing.description}</Textarea>*/}
                  <button
                    type="button"
                    onClick={() => loadListingData(listing)}
                  >
                    Load Listing Data
                  </button>
                  <Field
                    type="text"
                    name="description"
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

CampaignFormB = reduxForm({
  form: "campaignForm", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate: contactValidate
})(CampaignFormB);

CampaignFormB = connect(mapStateToProps, mapDispatchToProps)(CampaignFormB);

export default CampaignFormB;
