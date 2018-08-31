import * as types from "../types";
import axios from "axios";
import store from "../store";

import { searchGroups, setGroups } from "./group-actions";
import { fetchComponent, setQuery, setOffset, setCount } from "./query-actions";
import { setSelected } from "./modal-actions";
import { isFetching, clearFormData } from "./common-actions";

/* ------------   ACTION CREATORS     ------------------ */

export const setCampaignGroups = campaignGroups => {
  return {
    type: types.SET_CAMPAIGN_GROUPS,
    payload: campaignGroups
  };
};

export const setDiffedCampaignGroups = groups => dispatch => {
  const state = store.getState();
  const campaignGroups = state.campaignReducer.campaignGroups;
  groups = groups.slice();
  campaignGroups.forEach(campaignGroup => {
    groups.forEach(group => {
      if (campaignGroup.id == group.id) {
        group.disabled = true;
      }
    });
  });
  dispatch(setGroups(groups));
};

export const searchDiffedCampaignGroups = values => {
  const query = values.nativeEvent.target.defaultValue;
  store.dispatch(setQuery(query));
  store.dispatch(setOffset(0));
  store.dispatch(fetchComponent("groups", [], setDiffedCampaignGroups));
};

export const submitCampaignGroups = groups => dispatch => {
  const state = store.getState();
  const campaignGroups = state.campaignReducer.campaignGroups.slice();
  const newGroups = [];

  groups.forEach(group => {
    if (!campaignGroups.includes(group)) {
      newGroups.push(group);
    }
  });

  dispatch(setCampaignGroups(campaignGroups.concat(newGroups)));
  store.dispatch(setSelected([]));
};

export const deleteCampaignGroup = group => {
  const state = store.getState();
  const campaignGroups = state.campaignReducer.campaignGroups.slice();
  const campaignGroupIds = campaignGroups.map(group => group.id);

  campaignGroups.splice(campaignGroupIds.indexOf(group.id), 1);
  store.dispatch(setCampaignGroups(campaignGroups));
};
