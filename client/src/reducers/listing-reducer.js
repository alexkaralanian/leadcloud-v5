import * as types from "../types";

const initialState = {
  limit: 25,
  offset: 0,
  pageToken: "",
  maxResults: 15,
  listingQuery: "",
  contactListingsSearchResults: [],

  listings: [],
  listing: {},
  listingContacts: [],
  emailsByListing: [],
  groups: [],

  isListingNew: true,
  images: null,
  error: "",
  message: "",
  isFetching: false
};

const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LISTINGS:
      return {
        ...state,
        listings: action.payload,
        limit: action.limit,
        offset: action.offset
      };

    case types.SET_LISTING:
      return {
        ...state,
        listing: action.payload,
        images: action.payload.images
      };

    case types.SET_LISTING_QUERY:
      return {
        ...state,
        listingQuery: action.payload
      };

    case types.SET_LISTING_CONTACTS:
      return {
        ...state,
        listingContacts: action.payload
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

    case types.SET_EMAILS_BY_LISTING:
      return {
        ...state,
        emailsByListing: action.emailsByContact,
        pageToken: action.pageToken
      };

    case types.IS_LISTING_NEW:
      return {
        ...state,
        isListingNew: action.payload
      };

    case types.SET_LISTING_IMAGES:
      return {
        ...state,
        images: action.payload
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

    case types.CLEAR_LISTINGS:
      return {
        ...state,
        listings: []
      };

    case types.CLEAR_LISTING:
      return {
        ...state,
        listing: {}
      };

    default:
      return state;
  }
};

export default listingReducer;
