import axios from "axios";
import { push } from "react-router-redux";
import * as types from "../types";
import store from "../store";

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
    console.log("CAMPAIGNS", res.data);
    dispatch(setCampaigns(res.data));
  } catch (err) {
    console.error("Fetching Campaigns unsuccessful", err);
  }
};

export const submitCampaign = (
  values,
  campaignListings,
  campaignGroups
) => async dispatch => {
  try {
    const res = await axios.post("/api/campaigns/create", {
      values,
      campaignListings,
      campaignGroups
    });

    dispatch(setCampaign(res.data));
    // dispatch(isFetching(false));
  } catch (err) {
    console.error("Submitting campaign unsuccessful", err);
    // dispatch(isFetching(false));
  }
};
