import * as types from "../types";

const initialState = {
  limit: 25,
  offset: 0,
  query: "",

  groups: [],
  group: {},

  groupContacts: null,
  groupContactsSearchResults: [],

  maxResults: 15,
  pageToken: "",

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
        groups: action.groups,
        limit: action.limit,
        offset: action.offset,
        query: action.query
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

    case types.CLEAR_GROUP_CONTACTS:
      return {
        ...state,
        groupContacts: null
      };

    case types.CLEAR_GROUPS:
      return { ...initialState };

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
