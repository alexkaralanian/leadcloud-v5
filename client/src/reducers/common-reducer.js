import * as types from "../types";

const initialState = {
  error: "",
  isFetching: false
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
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

    case types.IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      };

    default:
      return state;
  }
};

export default commonReducer;
