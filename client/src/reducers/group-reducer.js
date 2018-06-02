import * as types from "../types";

const initialState = {
  groups: [],
  groupContacts: [],
  group: {},
  isGroupNew: true,
  error: "",
  message: "",
  isFetching: false
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_GROUPS:
      return {
        ...state,
        groups: action.payload
      };

    case types.SET_GROUP:
      return {
        ...state,
        group: action.payload
      };

    case types.SET_GROUP_CONTACTS:
      return {
        ...state,
        groupContacts: action.payload
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

export default groupReducer;
