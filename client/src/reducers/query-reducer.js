import * as types from "../types";

const initialState = {
  limit: 25,
  offset: 0,
  query: "",
  isLoading: false
};

const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_QUERY:
      return {
        ...state,
        query: action.payload,
        offset: 0
      };

    case types.RESET_QUERY:
      return {
        ...state,
        query: "",
        offset: 0
      };

    case types.SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      };

    case types.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

export default queryReducer;
