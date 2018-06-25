import axios from "axios";
import { push } from "react-router-redux";
import * as types from "../types";
import store from "../store";

export const setCampaign = campaign => ({
  types: types.SET_CAMPAIGN,
  payload: campaign
});

export const setCampaigns = campaigns => ({
  types: types.SET_CAMPAIGNS,
  payload: campaigns
});

export const submitCampaign = (
  values,
  campaignListings,
  campaignGroups
) => async dispatch => {
  // const listings = campaignListings.map(listing => listing.id);
  // const groups = campaignGroups.map(group => group.id);

  // console.log("THE STUFF", { values, listings, groups });

  try {
    const res = await axios.post(`/api/campaigns/create`, {
      values,
      campaignListings,
      campaignGroups
    });
    console.log("CAMPAIGNS RES", res.data);

    // dispatch(setCampaign(res.data));
    // dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching single email unsuccessful", err);
    // dispatch(isFetching(false));
  }
};
