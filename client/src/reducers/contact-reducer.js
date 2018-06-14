import * as types from "../types";
// import { push } from 'react-router-redux';

/* ------------       REDUCERS     ------------------ */

const initialState = {
  limit: 25,
  offset: 0,
  pageToken: "",
  maxResults: 15,
  contactsQuery: "",
  listingContactsSearchResults: [],

  contacts: [],
  contact: {},
  contactListings: [],
  emailsByContact: [],
  groups: [],

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
        offset: action.offset
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
        contactsQuery: action.payload
      };

    // SEARCH
    case types.SET_LISTING_CONTACTS_SEARCH_RESULTS:
      return {
        ...state,
        listingContactsSearchResults: action.payload
      };

    case types.CLEAR_LISTING_CONTACTS_SEARCH_RESULTS:
      return {
        ...state,
        listingContactsSearchResults: []
      };

    case types.SET_EMAILS_BY_CONTACT:
      return {
        ...state,
        emailsByContact: action.emailsByContact,
        pageToken: action.pageToken
      };

    case types.SET_GROUPS:
      return {
        ...state,
        groups: action.groups
      };

    case types.CLEAR_CONTACT:
      return {
        ...state,
        contact: {},
        emailsByContact: [],
        photo: "",
        groups: [],
        googleImages: null
      };

    case types.CLEAR_CONTACTS:
      return {
        ...state,
        contacts: [],
        limit: 25,
        offset: 0
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
