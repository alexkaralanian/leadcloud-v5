import * as types from "../types";
// import { push } from 'react-router-redux';

/* ------------       REDUCERS     ------------------ */

const initialState = {
  contacts: [],
  contactsSearchResults: [],

  contact: {},
  contactListings: [],
  contactListingsSearchResults: [],
  contactGroups: [],

  emailsByContact: [],
  pageToken: "",
  maxResults: 15
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
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
        contacts: []
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
