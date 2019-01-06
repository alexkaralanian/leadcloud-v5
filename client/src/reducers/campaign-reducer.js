import * as types from "../types";

const initialState = {
  campaign: {},
  campaigns: []
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default campaignReducer;
