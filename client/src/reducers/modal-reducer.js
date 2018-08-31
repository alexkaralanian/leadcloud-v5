import * as types from "../types";

const initialState = {
  selected: []
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SELECTED:
      return {
        ...state,
        selected: action.payload
      };

    default:
      return state;
  }
};

export default modalReducer;
