import axios from "axios";
import * as types from "../types";
import store from "../store";

import { searchListings, setListings } from "./listing-actions";
import { fetchComponent, setQuery, setOffset, setCount } from "./query-actions";
import { setSelected } from "./modal-actions";
import { isFetching, clearFormData } from "./common-actions";

/* ------------   ACTION CREATORS     ------------------ */

export const setCampaignListings = listings => ({
  type: types.SET_CAMPAIGN_LISTINGS,
  payload: listings
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

export const setDiffedCampaignListings = listings => {
  // const state = store.getState();
  // const contactGroups = state.contactReducer.contactGroups;
  // groups = groups.slice();
  // console.log("GROUPS", groups);
  // console.log("CONTACT GROUPS", contactGroups);
  // contactGroups.forEach(contactGroup => {
  //   groups.forEach(group => {
  //     if (contactGroup.id == group.id) {
  //       group.disabled = true;
  //     }
  //   });
  // });
  // store.dispatch(setGroups(groups));
};

export const searchDiffedCampaignListings = values => {
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(fetchComponent("groups", [], setDiffedCampaignListings));
};

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
