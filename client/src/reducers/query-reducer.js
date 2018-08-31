import * as types from "../types";

const initialState = {
  count: 0,
  limit: 25,
  offset: 0,
  query: "",
  isLoading: false
};

const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_COUNT:
      return {
        ...state,
        count: action.payload
      };

    case types.SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      };

    case types.SET_QUERY:
      return {
        ...state,
        query: action.payload
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
