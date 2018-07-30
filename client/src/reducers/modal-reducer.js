import * as types from "../types";

const initialState = {
  isModalVisible: false
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MODAL_VISIBILITY:
      return {
        ...state,
        isModalVisible: action.payload
      };

    default:
      return state;
  }
};

export default modalReducer;
