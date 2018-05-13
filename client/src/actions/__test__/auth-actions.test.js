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

describe("Async Auth Actions", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const store = mockStore({
    isFetching: false,
    isAuthed: false,
    user: null,
    error: ""
  });

  it("fetchUser", () => {
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

    return store.dispatch(actions.fetchUser()).then(() => {
      const actionz = store.getActions();
      expect(actionz[0]).toEqual(actions.isFetching(true));
      expect(actionz[1]).toEqual(actions.authUser(response));
    });
  });

  it("logout", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      console.log("REQUEST", request);
      request.respondWith({
        status: 200
      });
    });

    return store.dispatch(actions.logout()).then(() => {
      const actionz = store.getActions();
      console.log("ACTIONZ", actionz);
      expect(actionz[0]).toEqual(actions.unauthUser());
    });
  });
});
