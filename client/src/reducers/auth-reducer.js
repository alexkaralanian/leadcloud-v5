import * as types from "../types";

const initialState = {
  isAuthed: false,
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_USER:
      return {
        ...state,
        user: action.user,
        isAuthed: action.isAuthed
      };

    case types.UNAUTH_USER:
      return {
        ...state,
        isAuthed: action.isAuthed,
        user: action.user
      };

    default:
      return state;
  }
};
export default authReducer;
