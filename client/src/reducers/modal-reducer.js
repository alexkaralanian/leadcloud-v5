import * as types from "../types";

const initialState = {
  isModalVisible: false,
  isModal2Visible: false,
  selected: []
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MODAL_VISIBILITY:
      return {
        ...state,
        isModalVisible: action.payload
      };

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
