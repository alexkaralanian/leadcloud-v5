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
      payload: user
    };
    expect(actions.authUser(user)).toEqual(expectedAction);
  });

  test("unauthUser()", () => {
    const expectedAction = {
      type: types.UNAUTH_USER
    };
    expect(actions.unauthUser()).toEqual(expectedAction);
  });
});

describe("Async Auth Actions ((THUNKS))", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("fetchUser", () => {
    const response = {
      data: {
        name: "Elon Musk"
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response
      });
    });

    const store = mockStore({
      isFetching: false,
      isAuthed: false,
      user: null,
      error: ""
    });

    return store.dispatch(actions.fetchUser()).then(() => {
      const actionz = store.getActions();
      expect(actionz[0]).toEqual(actions.isFetching(true));
      expect(actionz[1]).toEqual(actions.authUser(response));
    });
  });

  test("fetchUser failure", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500
      });
    });

    const store = mockStore({
      isFetching: false,
      isAuthed: false,
      user: null
    });

    return store.dispatch(actions.fetchUser()).then(() => {
      const actionz = store.getActions();
      expect(actionz[0]).toEqual(actions.isFetching(true));
      expect(actionz[1]).toEqual(actions.isFetching(false));
    });
  });

  test("logout", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });

    const store = mockStore({
      isFetching: false,
      isAuthed: false,
      user: null
    });

    return store.dispatch(actions.logout()).then(() => {
      const actionz = store.getActions();
      expect(actionz[0]).toEqual(actions.unauthUser());
    });
  });
});
