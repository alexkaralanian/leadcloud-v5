import { reducer } from "redux-form";
import * as types from "../types";

// Apply Custom Reducer Cases
const formReducer = reducer.plugin({
  // email: (state, action) => {
  //       return undefined; // <--- blow away form data
  //     default:
  //       return state;
  //   }
  // },
  contactForm: (state, action) => {
    switch (action.type) {
      // case types.CONTACT_SEARCH:
      //   return {
      //     ...state,
      //     input: action.change
      //   };
      default:
        return state;
    }
  },
  listingForm: (state, action) => {
    switch (action.type) {
      // return undefined; // <--- blow away form data
      default:
        return state;
    }
  },

  openHouseForm: (state, action) => {
    switch (action.type) {
      case types.FORM_SUBMIT_SUCCESS:
        return undefined; // <--- blow away form data
      default:
        return state;
    }
  },

  searchListingContacts: (state, action) => {
    switch (action.type) {
      case types.FORM_SUBMIT_SUCCESS:
        return undefined; // <--- blow away form data
      default:
        return state;
    }
  },

  searchContactListings: (state, action) => {
    switch (action.type) {
      case types.FORM_SUBMIT_SUCCESS:
        return undefined; // <--- blow away form data
      default:
        return state;
    }
  }
});

export default formReducer;
