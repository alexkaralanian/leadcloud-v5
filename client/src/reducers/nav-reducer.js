import * as types from "../types";

const initialState = {
  activeKey: 1
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_KEY:
      return {
        ...state,
        activeKey: action.payload
      };

    default:
      return state;
  }
};

export default navReducer;
