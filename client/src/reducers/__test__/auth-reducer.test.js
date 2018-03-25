import authReducer from "../auth-reducer";
import * as types from "../../types";

describe("auth reducer", () => {
  const initialState = {
    isAuthed: false,
    user: null,
    isFetching: false,
    error: ""
  };

  const user = {
    name: "Elon Musk"
  };

  it("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle AUTH_USER", () => {
    expect(
      authReducer(initialState, {
        type: types.AUTH_USER,
        payload: user
      })
    ).toEqual({
      isAuthed: true,
      user,
      isFetching: false,
      error: ""
    });
  });

  it("should handle UNAUTH_USER", () => {
    expect(
      authReducer(
        {
          isAuthed: true,
          user,
          isFetching: false,
          error: ""
        },
        {
          type: types.UNAUTH_USER
        }
      )
    ).toEqual({
      isAuthed: false,
      user: null,
      isFetching: false,
      error: ""
    });
  });

  it("should handle IS_FETCHING", () => {
    expect(
      authReducer(initialState, {
        type: types.IS_FETCHING,
        payload: true
      })
    ).toEqual({
      isAuthed: false,
      user: null,
      isFetching: true,
      error: ""
    });
  });
});
