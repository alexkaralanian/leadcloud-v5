// These actions manipulate state / redux store.
// They do no affect any data persisted to DB after submit...

import * as types from "../types";
import store from "../store";

import { setListings } from "./listing-actions";
import { fetchComponent, setQuery, setOffset } from "./query-actions";
import { setSelected } from "./modal-actions";
// import { isFetching, clearFormData } from "./common-actions";

/* ------------   ACTION CREATORS     ------------------ */

export const setCampaignListings = listings => ({
  type: types.SET_CAMPAIGN_LISTINGS,
  payload: listings
});

export const loadListingData = listingData => ({
  type: types.LOAD_LISTING_DATA,
  payload: listingData
});

export const setDiffedCampaignListings = listings => dispatch => {
  const state = store.getState();
  const campaignListings = state.campaignReducer.campaignListings;
  listings = listings.slice();
  campaignListings.forEach(campaignListing => {
    listings.forEach(listing => {
      if (campaignListing.id === listing.id) {
        listing.disabled = true;
      }
    });
  });
  dispatch(setListings(listings));
};

export const searchDiffedCampaignListings = values => {
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(fetchComponent("listings", [], setDiffedCampaignListings));
};

export const submitCampaignListings = listings => dispatch => {
  const state = store.getState();
  const campaignListings = state.campaignReducer.campaignListings;
  const newListings = [];

  listings.forEach(listing => {
    if (!campaignListings.includes(listing)) {
      newListings.push(listing);
    }
  });
  store.dispatch(setCampaignListings(campaignListings.concat(newListings)));
  store.dispatch(setSelected([]));
};

export const deleteCampaignListing = listing => {
  const state = store.getState();
  const campaignListings = state.campaignReducer.campaignListings.slice();
  const campaignListingIds = campaignListings.map(listing => listing.id);
  campaignListings.splice(campaignListingIds.indexOf(listing.id), 1);
  store.dispatch(setCampaignListings(campaignListings));
};
