import axios from "axios";
import * as types from "../types";
import { searchGroups } from "./group-actions";
import store from "../store";

export const addCampaignGroup = campaignGroups => {
  return {
    type: types.SET_CAMPAIGN_GROUPS,
    payload: campaignGroups
  };
};

export const deleteCampaignGroup = campaignGroups => {
  return {
    type: types.SET_CAMPAIGN_GROUPS,
    payload: campaignGroups
  };
};
