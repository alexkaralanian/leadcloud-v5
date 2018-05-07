import * as types from "../types";

const initialState = {
  isAuthed: false,
  user: null,
  isFetching: false,
  error: ""
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_USER:
      return {
        ...state,
        user: action.payload,
        isAuthed: true,
        isFetching: false,
        error: ""
      };

    case types.UNAUTH_USER:
      return {
        ...state,
        user: null,
        isAuthed: false,
        isFetching: false,
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
export default authReducer;
