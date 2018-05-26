import * as types from "../types";

const initialState = {
  listings: [],
  listing: {},
  listingContacts: [],
  isListingNew: true,
  error: "",
  message: "",
  images: null
  // isListingSubmitted: false
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

    case types.IS_LISTING_NEW:
      return {
        ...state,
        isListingNew: action.payload
      };

    case types.CLEAR_LISTING:
      return {
        ...state,
        listing: {}
      };

    case types.SET_LISTING_IMAGES:
      return {
        ...state,
        images: action.payload
      };

    // case types.CLEAR_LISTING:
    //   newState.emails = [];
    //   break;

    // case types.IS_FETCHING:
    //   newState.isFetching = action.isFetching;
    //   break;

    // case types.GET_ERROR:
    //   newState.error = action.error;
    //   break;

    // case types.CLEAR_ERROR:
    //   newState.error = "";
    //   break;

    default:
      return state;
  }
};

export default listingReducer;
