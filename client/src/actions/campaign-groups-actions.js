import * as types from "../types";
import axios from "axios";
import store from "../store";

import { searchGroups, setGroups } from "./group-actions";
import { fetchComponent, setQuery, setOffset, setCount } from "./query-actions";
import { setSelected } from "./modal-actions";
import { isFetching, clearFormData } from "./common-actions";

/* ------------   ACTION CREATORS     ------------------ */

export const setCampaignGroups = campaignGroups => {
  console.log("CAMPAIGN GROUPS ACTION", campaignGroups);
  return {
    type: types.SET_CAMPAIGN_GROUPS,
    payload: campaignGroups
  };
};

// export const searchCampaignGroups = values => {
//   const state = store.getState();
//   const contactId = state.contactReducer.contact.id;
//   const query = values.nativeEvent.target.defaultValue;
//   store.dispatch(setQuery(query));
//   store.dispatch(setOffset(0));
//   store.dispatch(
//     fetchComponent("contacts", [], setCampaignGroups, contactId, "groups")
//   );
// };

export const setDiffedCampaignGroups = groups => {
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

export const searchDiffedCampaignGroups = values => {
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(fetchComponent("groups", [], setDiffedCampaignGroups));
};

export const submitCampaignGroups = (
  campaignGroupsArray,
  contactId
) => async dispatch => {
  const campaignGroups = campaignGroupsArray.map(group => ({
    contactId,
    groupId: group.id
  }));
  dispatch(setSelected([]));
  dispatch(setQuery(""));
  try {
    const res = await axios.post(`/api/contacts/${contactId}/groups/add`, {
      campaignGroups
    });
    dispatch(setCampaignGroups(res.data.rows));
    dispatch(setCount(res.data.count));
  } catch (err) {
    console.error("Submitting Contact Groups Unsuccessful", err);
  }
};

export const deleteCampaignGroup = (groupId, contactId) => async dispatch => {
  try {
    const res = await axios.post(`/api/contacts/${contactId}/group/delete`, {
      groupId
    });

    dispatch(setCampaignGroups(res.data.rows));
    dispatch(setCount(res.data.count));
  } catch (err) {
    console.error("Submitting Contact Group Unsuccessful", err);
  }
};

///////

export const submitCampaignGroup = group => {
  const state = store.getState();
  const campaignGroups = state.campaignReducer.campaignGroups.slice();

  if (!campaignGroups.includes(group)) {
    campaignGroups.push(group);
  }

  store.dispatch(setCampaignGroups(campaignGroups));
};

// export const deleteCampaignGroup = groupId => {
//   const state = store.getState();

//   const campaignGroups = state.campaignReducer.campaignGroups.slice();
//   const campaignGroupsIdMap = campaignGroups.map(group => group.id);

//   campaignGroups.splice(campaignGroupsIdMap.indexOf(groupId), 1);
//   store.dispatch(setCampaignGroups(campaignGroups));
// };
