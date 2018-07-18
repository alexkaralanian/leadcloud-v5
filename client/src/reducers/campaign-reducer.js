import * as types from "../types";

const initialState = {
  campaign: {},
  campaigns: [],
  campaignListings: [],
  campaignListingsSearchResults: [],
  campaignGroupsSearchResults: [],
  campaignGroups: [],
  isFetching: false,
  error: "",
  message: ""
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    // CAMPAIGN LISTINGS

    case types.SET_CAMPAIGN:
      return {
        ...state,
        campaign: action.payload
      };

    case types.SET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload
      };

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

    // CAMPAIGN GROUPS
    case types.SET_CAMPAIGN_GROUPS:
      return {
        ...state,
        campaignGroups: action.payload
      };
    // case types.SET_CAMPAIGN_GROUPS_SEARCH_RESULTS:
    //   return {
    //     ...state,
    //     campaignGroupsSearchResults: action.payload
    //   };

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
