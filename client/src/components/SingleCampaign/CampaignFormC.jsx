import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { Email, Item, Span, A, renderEmail } from "react-html-email";
import { Field, reduxForm } from "redux-form";
import { Button, Form, FormGroup, Grid, Col, Row } from "react-bootstrap";
import { contactValidate } from "../../helpers/redux-form/validate";

import TableRowCheckbox from "../../components/TableRow/TableRow_Checkbox";
// import EmailHTML from "../../components/EmailTemplate/EmailTemplate";
import SearchForm from "../../components/SearchForm/SearchForm";
import inputField from "../InputField/InputField";

let CampaignFormC;

CampaignFormC = ({
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  auditClick,
  campaign,
  campaignGroups,
  groups,
  submitCampaignGroup,
  deleteCampaignGroup,
  onSubmit,
  prevPage
}) => (
  <Form onSubmit={handleSubmit}>
    <Grid>
      <Row>
        <Col xs={12}>
          <h3>Select Groups</h3>
          {/*<SearchForm searchFunction={searchListings} />*/}
        </Col>
        <Col xs={12}>
          <TableRowCheckbox
            componentName="groups"
            rowText="title"
            collection={campaignGroups}
            submitFunction={deleteCampaignGroup}
            hostComponent={campaign}
            buttonText="Delete Group"
            buttonStyle="danger"
          />
        </Col>

        <Col xs={12}>
          <TableRowCheckbox
            componentName="groups"
            rowText="title"
            collection={groups}
            submitFunction={submitCampaignGroup}
            hostComponent={campaign}
            buttonText="Add Group"
            buttonStyle="warning"
          />
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
              className="submitButton"
              type="submit"
              bsStyle="primary"
              disabled={pristine || submitting}
            >
              <span>Submit</span>
            </Button>
          </div>
        </Col>
      </Row>
    </Grid>
  </Form>
);

CampaignFormC = reduxForm({
  form: "campaignForm", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // enableReinitialize: true,
  // keepDirtyOnReinitialize: true,
  validate: contactValidate
})(CampaignFormC);

// CampaignForm = connect(
//   state => ({
//     // initialValues: state.campaignReducer.campaign // pull initial values from CONTACT reducer
//   })
//   // { load: fetchCampaign } // bind fetchContact action creator
// )(CampaignForm);

export default CampaignFormC;
