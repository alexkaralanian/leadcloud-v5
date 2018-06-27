import * as types from "../types";

const initialState = {
  limit: 25,
  offset: 0,
  query: "",

  groups: [],
  group: {},

  groupContacts: [],
  groupContactsLimit: 25,
  groupContactsOffset: 0,
  groupContactsQuery: "",
  groupContactsSearchResults: [],

  maxResults: 15,
  pageToken: "",

  isGroupNew: true,
  error: "",
  message: "",
  isFetching: false,
  isLoading: false
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
        groupContacts: action.groupContacts,
        groupContactsLimit: action.groupContactsLimit,
        groupContactsOffset: action.groupContactsOffset,
        groupContactsQuery: action.groupContactsQuery
      };

    // ADMINISTRATIVE

    case types.CLEAR_GROUP_CONTACTS:
      return {
        ...state,
        groupContacts: [],
        groupContactsLimit: 25,
        groupContactsOffset: 0,
        groupContactsQuery: "",
        groupContactsSearchResults: []
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
