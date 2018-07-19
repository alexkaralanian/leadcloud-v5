import * as types from "../types";
// import { push } from 'react-router-redux';

/* ------------       REDUCERS     ------------------ */

const initialState = {
  limit: 25,
  offset: 0,
  query: "",

  contacts: [],
  contact: {},
  contactListings: [],
  contactListingsSearchResults: [],
  contactGroups: [],

  emailsByContact: [],
  pageToken: "",
  maxResults: 15,

  error: "",
  isFetching: false,
  isLoading: false
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CONTACTS:
      return {
        ...state,
        contacts: action.contacts,
        limit: action.limit,
        offset: action.offset,
        query: action.query
      };

    case types.SET_CONTACT:
      return {
        ...state,
        contact: action.contact
      };

    case types.SET_CONTACT_LISTINGS:
      return {
        ...state,
        contactListings: action.payload
      };

    case types.SET_CONTACTS_QUERY:
      return {
        ...state,
        query: action.payload
      };

    // SEARCH
    case types.SET_CONTACT_LISTINGS_SEARCH_RESULTS:
      return {
        ...state,
        contactListingsSearchResults: action.payload
      };

    case types.CLEAR_CONTACT_LISTINGS_SEARCH_RESULTS:
      return {
        ...state,
        contactListingsSearchResults: []
      };

    case types.SET_EMAILS_BY_CONTACT:
      return {
        ...state,
        emailsByContact: action.emailsByContact,
        pageToken: action.pageToken
      };

    case types.SET_CONTACT_GROUPS:
      return {
        ...state,
        contactGroups: action.payload
      };

    case types.CLEAR_CONTACT:
      return {
        ...state,
        contact: {},
        emailsByContact: [],
        photo: "",
        contactGroups: [],
        googleImages: null
      };

    case types.CLEAR_CONTACTS:
      return {
        ...state,
        contacts: [],
        limit: 25,
        offset: 0,
        query: ""
      };

    case types.SET_ERROR:
      return {
        ...state,
        error: action.error
      };

    case types.CLEAR_ERROR:
      return {
        ...state,
        error: ""
      };

    case types.IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      };

    case types.IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };

    // case types.CLEAR_EMAILS_BY_CONTACT:
    //   return {
    //     ...state,
    //     emailsByContact: []
    //   };

    default:
      return state;
  }
};

export default contactReducer;