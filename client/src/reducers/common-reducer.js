import * as types from "../types";

const initialState = {
  error: "",
  isFetching: false
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default commonReducer;
