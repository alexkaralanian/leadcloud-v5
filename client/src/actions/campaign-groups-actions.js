import * as types from "../types";
// import { searchGroups } from "./group-actions";
import store from "../store";

/* ------------   ACTION CREATORS     ------------------ */

export const setCampaignGroups = campaignGroups => {
  console.log("CAMPAIGN GROUPS ACTION", campaignGroups);
  return {
    type: types.SET_CAMPAIGN_GROUPS,
    payload: campaignGroups
  };
};

// export const setCampaignGroupsSearchResults = searchResults => ({
//   type: types.SET_CAMPAIGN_GROUPS_SEARCH_RESULTS,
//   payload: searchResults
// });

// export const clearCampaignGroupsSearchResults = () => ({
//   type: types.CLEAR_CAMPAIGN_GROUPS_SEARCH_RESULTS
// });

export const isFetching = bool => ({
  type: types.IS_FETCHING,
  isFetching: bool
});

// export const searchCampaignGroups = values => {
//   const query = values.nativeEvent.target.defaultValue;
//   const campaignGroupsSearchResults =
//     state.campaignReducer.campaignGroupsSearchResults;

//   if (query.length < 1) store.dispatch(clearCampaignGroupsSearchResults());
//   if (query.length >= 1) {
//     store.dispatch(
//       searchGroups(campaignGroupsSearchResults, 25, 0, query, "campaignGroups")
//     );
//   }

//   if (!query) store.dispatch(clearCampaignGroupsSearchResults());
// };

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

export const submitCampaignGroup = group => {
  const state = store.getState();
  const campaignGroups = state.campaignReducer.campaignGroups.slice();

  if (!campaignGroups.includes(group)) {
    campaignGroups.push(group);
  }

  store.dispatch(setCampaignGroups(campaignGroups));
};

export const deleteCampaignGroup = groupId => {
  const state = store.getState();

  const campaignGroups = state.campaignReducer.campaignGroups.slice();
  const campaignGroupsIdMap = campaignGroups.map(group => group.id);

  campaignGroups.splice(campaignGroupsIdMap.indexOf(groupId), 1);
  store.dispatch(setCampaignGroups(campaignGroups));
};
