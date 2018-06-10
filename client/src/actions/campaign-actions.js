import * as types from "../types";
import store from "../store";

/* ------------   ACTION CREATORS     ------------------ */

export const setCampaignGroups = campaignGroups => {
  return {
    type: types.SET_CAMPAIGN_GROUPS,
    payload: campaignGroups
  };
};

export const addCampaignListing = listing => {
  const state = store.getState();

  const campaignListings = state.campaignReducer.campaignListings.slice();

  if (!campaignListings.includes(listing)) campaignListings.push(listing);

  return {
    type: types.SET_CAMPAIGN_LISTINGS,
    payload: campaignListings
  };
};

export const deleteCampaignListing = listing => {
  const state = store.getState();
  const campaignListings = state.campaignReducer.campaignListings.slice();

  campaignListings.splice(campaignListings.indexOf(listing), 1);

  return {
    type: types.SET_CAMPAIGN_LISTINGS,
    payload: campaignListings
  };
};

// ADMINISTRATIVE...

export const isFetching = bool => ({
  type: types.IS_FETCHING,
  payload: bool
});

export const setError = error => ({
  type: types.SET_ERROR,
  error
});

export const clearError = () => ({
  type: types.CLEAR_ERROR
});

/* ------------       DISPATCHERS     ------------------ */
