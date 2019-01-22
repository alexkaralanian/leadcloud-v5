import * as types from "../types";
// import { push } from 'react-router-redux';

/* ------------       REDUCERS     ------------------ */

const initialState = {
  // contacts: [],
  contact: {},
  contactListings: [],
  contactGroups: [],
  contactEmails: [],
  pages: 0,
  pageSize: 25,
  offset: 0,
  loading: false
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    // case types.SET_CONTACTS:
    //   return {
    //     ...state,
    //     contacts: action.payload
    //   };
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

    case types.SET_CONTACT_GROUPS:
      return {
        ...state,
        contactGroups: action.payload
      };

    case types.SET_CONTACT_EMAILS:
      return {
        ...state,
        contactEmails: action.contactEmails,
        pageToken: action.pageToken
      };

    default:
      return state;
  }
};

export default contactReducer;
