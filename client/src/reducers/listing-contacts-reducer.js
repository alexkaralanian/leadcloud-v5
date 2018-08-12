import * as types from "../types";

const initialState = {
  listingContacts: [],
  listingContactsSearchResults: []
};

const listingContactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LISTING_CONTACTS:
      return {
        ...state,
        listingContacts: action.payload
      };
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

    default:
      return state;
  }
};

export default listingContactsReducer;
