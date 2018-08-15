import axios from "axios";
import * as types from "../types";
import { searchListings } from "./listing-actions";
import store from "../store";

/* ------------   ACTION CREATORS     ------------------ */

export const setCampaignListings = listings => ({
  type: types.SET_CAMPAIGN_LISTINGS,
  payload: listings
});

export const setCampaignListingsSearchResults = searchResults => ({
  type: types.SET_CAMPAIGN_LISTINGS_SEARCH_RESULTS,
  payload: searchResults
});

export const clearCampaignListingsSearchResults = () => ({
  type: types.CLEAR_CAMPAIGN_LISTINGS_SEARCH_RESULTS
});

export const isFetching = bool => ({
  type: types.IS_FETCHING,
  isFetching: bool
});

// export const fetchCampaignListings = contactId => async dispatch => {
//   dispatch(isFetching(true));
//   try {
//     const res = await axios.post("/api/campaigns/fetchCampaignListings", {
//       contactId
//     });
//     if (res.status === 200) {
//       dispatch(setCampaignListings(res.data));
//     }
//     dispatch(isFetching(false));
//   } catch (err) {
//     console.error("Fetching listing contacts unsuccessful", err);
//     dispatch(isFetching(false));
//   }
// };

export const submitCampaignListings = listings => {
  console.log("LISTINGS", listings);
  const state = store.getState();
  const campaignListings = state.campaignReducer.campaignListings;
  store.dispatch(setCampaignListings(campaignListings.concat(listings)));
};

export const deleteCampaignListing = listing => {
  const state = store.getState();
  const campaignListings = state.campaignReducer.campaignListings.slice();

  try {
    campaignListings.splice(campaignListings.indexOf(listing), 1);
    store.dispatch(setCampaignListings(campaignListings));
    store.dispatch(isFetching(false));
  } catch (err) {
    console.error("Deleting listing contacts unsuccessful", err);
    store.dispatch(isFetching(false));
  }
};
