import * as types from "../types";

const initialState = {
  isModalVisible: false,
  selectedContacts: []
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MODAL_VISIBILITY:
      return {
        ...state,
        isModalVisible: action.payload
      };

    case types.SET_SELECTED_CONTACTS:
      return {
        ...state,
        selectedContacts: action.payload
      };

    default:
      return state;
  }
};

export default modalReducer;
