import * as types from "../types";

const initialState = {
  groups: [],
  group: {},
  groupContacts: []
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_GROUPS:
      return {
        ...state,
        groups: action.payload
      };

    case types.SET_GROUP:
      return {
        ...state,
        group: action.payload
      };

    case types.SET_GROUP_CONTACTS:
      return {
        ...state,
        groupContacts: action.payload
      };

    default:
      return state;
  }
};

export default groupReducer;
