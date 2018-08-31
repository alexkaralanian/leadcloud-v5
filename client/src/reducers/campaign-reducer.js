import * as types from "../types";

const initialState = {
  campaign: {},
  campaigns: [],
  campaignGroups: [],
  campaignListings: [],
  listingData: []
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

    case types.SET_CAMPAIGN_GROUPS:
      return {
        ...state,
        campaignGroups: action.payload
      };

    case types.LOAD_LISTING_DATA: {
      return {
        ...state,
        listingData: action.payload
      };
    }

    default:
      return state;
  }
};

export default campaignReducer;
