import * as types from "../types";

const initialState = {
  campaignGroups: [],
  campaignListings: [],
  campaignListingsSearchResults: [],
  campaignGroupsSearchResults: [],
  isFetching: false,
  error: "",
  message: ""
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CAMPAIGN_LISTINGS:
      return {
        ...state,
        campaignListings: action.payload
      };
    case types.SET_CAMPAIGN_LISTINGS_SEARCH_RESULTS:
      return {
        ...state,
        campaignListingsSearchResults: action.payload
      };

    case types.CLEAR_CAMPAIGN_LISTINGS_SEARCH_RESULTS:
      return {
        ...state,
        campaignListingsSearchResults: []
      };

    case types.SET_CAMPAIGN_GROUPS:
      return {
        ...state,
        campaignGroups: action.payload
      };
    case types.SET_CAMPAIGN_GROUPS_SEARCH_RESULTS:
      return {
        ...state,
        campaignGroupsSearchResults: action.payload
      };

    // ADMINISTRATIVE
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
