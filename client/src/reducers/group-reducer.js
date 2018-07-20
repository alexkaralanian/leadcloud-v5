import * as types from "../types";

const initialState = {
  groups: [],
  group: {},
  isFetching: false,
  isLoading: false
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_GROUPS:
      return {
        ...state,
        groups: action.payload
      };

    case types.CLEAR_GROUPS:
      return {
        ...state,
        groups: []
      };

    case types.SET_GROUP:
      return {
        ...state,
        group: action.payload
      };

    default:
      return state;
  }
};

export default groupReducer;
