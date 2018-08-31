import * as types from "../types";

const initialState = {
  listings: [],
  listing: {},
  listingContacts: [],
  emailsByListing: []
};

const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LISTINGS:
      return {
        ...state,
        listings: action.payload
      };

    case types.SET_LISTING:
      return {
        ...state,
        listing: action.payload,
        images: action.payload.images
      };

    case types.SET_LISTING_CONTACTS:
      return {
        ...state,
        listingContacts: action.payload
      };

    case types.SET_EMAILS_BY_LISTING:
      return {
        ...state,
        emailsByListing: action.emailsByContact,
        pageToken: action.pageToken
      };

    default:
      return state;
  }
};

export default listingReducer;
