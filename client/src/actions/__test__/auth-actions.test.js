import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";

import * as actions from "../auth-actions";
import * as types from "../../types";

describe("Auth Actions", () => {
  test("authUser(user)", () => {
    const user = {
      name: "Steve Jobs"
    };
    const expectedAction = {
      type: types.AUTH_USER,
      user,
      isFetching: false,
      error: "",
      isAuthed: true
    };
    expect(actions.authUser(user)).toEqual(expectedAction);
  });
});
