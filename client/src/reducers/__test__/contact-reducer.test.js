import contactReducer from "../contact-reducer";
import * as types from "../../types";

describe("Contact Reducer", () => {
  const initialState = {
    contacts: [],
    offset: 0,
    contact: {},
    contactListings: [],
    emailsByContact: [],
    pageToken: "",
    maxResults: 15,
    contactsQuery: "",
    groups: [],
    listingContactsSearchResults: [],
    error: "",
    isFetching: false,
    isLoading: false
  };

  it("should handle SET_EMAILS", () => {
    // const emails = [
    //   {
    //     name: "Ben Franklin"
    //   },
    //   {
    //     name: "Elon Musk"
    //   }
    // ];
    // const pageToken = "12345";
    // expect(
    //   emailReducer(initialState, {
    //     type: types.SET_EMAILS,
    //     emails,
    //     pageToken
    //   })
    // ).toEqual({
    //   ...initialState,
    //   emails,
    //   pageToken
    // });
  });

  // it("should handle SET_EMAIL", () => {
  //   const email = {
  //     name: "Elon Musk"
  //   };
  //   expect(
  //     emailReducer(initialState, {
  //       type: types.SET_EMAIL,
  //       email
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     email
  //   });
  // });

  // it("should handle SET_EMAIL_QUERY", () => {
  //   const emailQuery = "johnkennedy@gmail.com";
  //   expect(
  //     emailReducer(initialState, {
  //       type: types.SET_EMAIL_QUERY,
  //       emailQuery
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     emailQuery
  //   });
  // });

  // it("should handle CLEAR_EMAILS", () => {
  //   expect(
  //     emailReducer(initialState, {
  //       type: types.CLEAR_EMAILS
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     emails: [],
  //     pageToken: ""
  //   });
  // });

  // it("should handle CLEAR_EMAIL", () => {
  //   expect(
  //     emailReducer(initialState, {
  //       type: types.CLEAR_EMAIL,
  //       email: {}
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     email: {}
  //   });
  // });

  // it("should handle IS_FETCHING", () => {
  //   expect(
  //     emailReducer(initialState, {
  //       type: types.IS_FETCHING,
  //       isFetching: true
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     isFetching: true
  //   });
  // });

  // it("should handle IS_LOADING", () => {
  //   expect(
  //     emailReducer(initialState, {
  //       type: types.IS_LOADING,
  //       isLoading: true
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     isLoading: true
  //   });
  // });

  // it("should handle SET_ERROR", () => {
  //   const error = "THIS IS A TEST ERROR";
  //   expect(
  //     emailReducer(initialState, {
  //       type: types.SET_ERROR,
  //       error
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     error
  //   });
  // });

  // it("should handle CLEAR_ERROR", () => {
  //   expect(
  //     emailReducer(initialState, {
  //       type: types.CLEAR_ERROR,
  //       error: ""
  //     })
  //   ).toEqual({
  //     ...initialState,
  //     error: ""
  //   });
  // });
});
