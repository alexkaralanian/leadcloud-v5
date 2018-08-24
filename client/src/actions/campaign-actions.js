import axios from "axios";
import { push } from "react-router-redux";
import * as types from "../types";
import store from "../store";

import {
  setError,
  clearError,
  isFetching,
  clearFormData
} from "./common-actions";

import { setCampaignListings } from "./campaign-listings-actions";
import { setCampaignGroups } from "./campaign-groups-actions";

export const setCampaign = campaign => ({
  type: types.SET_CAMPAIGN,
  payload: campaign
});

export const setCampaigns = campaigns => ({
  type: types.SET_CAMPAIGNS,
  payload: campaigns
});

export const fetchCampaign = id => async dispatch => {
  console.log("FETH CAMPAIGN CALLED", id);
  try {
    const res = await axios.get(`/api/campaigns/${id}`);
    console.log("FETH CAMPAIGN RES", id);
    dispatch(setCampaign(res.data));
    dispatch(setCampaignListings(res.data.listings));
    dispatch(setCampaignGroups(res.data.groups));
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

export const createCampaign = (
  values,
  campaignListings,
  campaignGroups
) => async dispatch => {
  console.log("VALUESS", values, campaignListings, campaignGroups);
  dispatch(isFetching(true));
  try {
    const res = await axios.post("/api/campaigns/create", {
      values,
      campaignListings,
      campaignGroups
    });
    dispatch(setCampaignListings(res.data.listings));
    dispatch(setCampaignGroups(res.data.groups));
    dispatch(setCampaign(res.data));
    dispatch(push(`/campaigns/${res.data.id}`));
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Creating new campaign unsuccessful", err);
    dispatch(isFetching(false));
    dispatch(setError("ERROR CREATING NEW CAMPAIGN"));
  }
};

export const submitCampaign = (
  values,
  campaignListings,
  campaignGroups
) => async dispatch => {
  //   try {
  //     const res = await axios.post("/api/campaigns/create", {
  //       values,
  //       campaignListings,
  //       campaignGroups
  //     });
  //     dispatch(setCampaign(res.data));
  //     dispatch(push("/campaigns"));
  //     // dispatch(isFetching(false));
  //   } catch (err) {
  //     console.error("Submitting campaign unsuccessful", err);
  //     // dispatch(isFetching(false));
  //   }
};
