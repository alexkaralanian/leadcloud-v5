import axios from "axios";
import { push } from "react-router-redux";
import * as types from "../types";

import { setError, isFetching } from "./common-actions";

export const setCampaign = campaign => ({
  type: types.SET_CAMPAIGN,
  payload: campaign
});

export const setCampaigns = campaigns => ({
  type: types.SET_CAMPAIGNS,
  payload: campaigns
});

export const fetchCampaign = id => async dispatch => {
  try {
    const res = await axios.get(`/api/campaigns/${id}`);
    dispatch(setCampaign(res.data));
  } catch (err) {
    console.error("Fetching Campaign unsuccessful", err);
  }
};

export const fetchCampaigns = () => async dispatch => {
  try {
    const res = await axios.get("/api/campaigns");
    dispatch(setCampaigns(res.data));
  } catch (err) {
    console.error("Fetching Campaigns unsuccessful", err);
  }
};

export const createCampaign = values => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/campaigns", {
      values
    });
    dispatch(setCampaign(res.data));
    dispatch(push(`/campaigns/${res.data.id}/edit`));
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Creating new campaign unsuccessful", err);
    dispatch(isFetching(false));
    dispatch(setError("ERROR CREATING NEW CAMPAIGN"));
  }
};

// UPDATE CAMPAIGN
export const updateCampaign = campaign => async dispatch => {
  try {
    const res = await axios.patch(`/api/campaigns/${campaign.id}`, campaign);
    dispatch(setCampaign(res.data));
  } catch (err) {
    console.error("Updating Campaign Unsuccessful", err);
  }
};

export const sendCampaign = (html, campaign) => async dispatch => {
  console.log("SEND CAMPAIGN", html);
  try {
    const res = await axios.post("/api/campaigns/send", {
      html,
      campaignId: campaign.id
    });
    dispatch(setCampaign(res.data));
    dispatch(push("/campaigns"));
    // dispatch(isFetching(false));
  } catch (err) {
    console.error("Submitting campaign unsuccessful", err);
    // dispatch(isFetching(false));
  }
};

// CRUS + Delete
