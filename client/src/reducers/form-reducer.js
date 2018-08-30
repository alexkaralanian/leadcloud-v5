import { reducer } from "redux-form";
import * as types from "../types";

const formReducer = reducer.plugin({
  campaignFormA: (state, action) => {
    switch (action.type) {
      case types.CLEAR_FORM_DATA:
        return undefined;
      default:
        return state;
    }
  },

  contactForm: (state, action) => {
    switch (action.type) {
      case types.CLEAR_FORM_DATA:
        return undefined;
      default:
        return state;
    }
  },
  listingForm: (state, action) => {
    switch (action.type) {
      case types.CLEAR_FORM_DATA:
        return undefined;
      default:
        return state;
    }
  },

  groupForm: (state, action) => {
    switch (action.type) {
      case types.CLEAR_FORM_DATA:
        return undefined;
      default:
        return state;
    }
  },

  openHouseForm: (state, action) => {
    switch (action.type) {
      case types.CLEAR_FORM_DATA:
        return undefined;
      default:
        return state;
    }
  },

  searchListingContacts: (state, action) => {
    switch (action.type) {
      case types.CLEAR_FORM_DATA:
        return undefined;
      default:
        return state;
    }
  },

  searchContactListings: (state, action) => {
    switch (action.type) {
      case types.CLEAR_FORM_DATA:
        return undefined;
      default:
        return state;
    }
  },

  searchContactGoups: (state, action) => {
    switch (action.type) {
      case types.CLEAR_FORM_DATA:
        return undefined;
      default:
        return state;
    }
  },

  searchForm: (state, action) => {
    switch (action.type) {
      case types.CLEAR_FORM_DATA:
        return undefined;
      default:
        return state;
    }
  }
});

export default formReducer;
