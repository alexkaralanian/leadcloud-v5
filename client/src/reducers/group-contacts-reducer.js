import * as types from "../types";

const initialState = {
  groupContacts: [],
  groupId: null,
  component: "groups"
  // groupContactsSearchResults: []
};

const groupContactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_GROUP_CONTACTS:
      return {
        ...state,
        groupContacts: action.payload
      };

    case types.CLEAR_GROUP_CONTACTS:
      return {
        ...state,
        groupContacts: []
      };

    case types.SET_GROUP_CONTACTS_COMPONENT:
      return {
        ...state,
        component: action.payload
      };

    // case types.SET_GROUP_CONTACTS_SEARCH_RESULTS:
    //   return {
    //     ...state,
    //     groupContactsSearchResults: action.payload
    //   };

    // case types.CLEAR_GROUP_CONTACTS_SEARCH_RESULTS:
    //   return {
    //     ...state,
    //     groupContactsSearchResults: []
    //   };

    default:
      return state;
  }
};

export default groupContactsReducer;
