import * as types from "../types";

const initialState = {
  emails: [],
  maxResults: 20,
  pageToken: "",
  email: {},
  emailQuery: "",
  singleEmailId: "",
  isLoading: false,
  error: "",
  isFetching: false
};

const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_EMAILS:
      return {
        ...state,
        emails: action.emails,
        pageToken: action.pageToken
      };

    case types.SET_EMAIL:
      return {
        ...state,
        email: action.email
      };

    case types.SET_EMAIL_QUERY:
      return {
        ...state,
        emailQuery: action.emailQuery
      };

    case types.CLEAR_EMAILS:
      return {
        ...state,
        emails: [],
        pageToken: ""
      };

    case types.CLEAR_EMAIL:
      return {
        ...state,
        email: {}
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

    default:
      return state;
  }
};

export default emailReducer;
