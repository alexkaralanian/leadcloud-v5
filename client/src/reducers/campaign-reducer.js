import * as types from "../types";

const initialState = {
  error: "",
  message: "",
  isFetching: false,
  campaignGroups: [],
  campaignListings: []
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    // ADMINISTRATIVE

    case types.SET_CAMPAIGN_GROUPS:
      return {
        ...state,
        campaignGroups: action.payload
      };

    case types.SET_CAMPAIGN_LISTINGS:
      return {
        ...state,
        campaignListings: action.payload
      };

    case types.IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      };

    case types.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case types.CLEAR_ERROR:
      return {
        ...state,
        error: ""
      };

    default:
      return state;
  }
};

export default campaignReducer;
