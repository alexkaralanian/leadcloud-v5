import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";

import * as actions from "../email-actions";
import * as types from "../../types";

// ACTIONS
describe("Email Actions", () => {
  test("setEmails", () => {
    const emails = [{ name: "a" }, { name: "b" }];
    const pageToken = "12345";
    const expectedAction = {
      type: types.SET_EMAILS,
      emails,
      pageToken
    };
    expect(actions.setEmails(emails, pageToken)).toEqual(expectedAction);
  });

  test("setEmail", () => {
    const expectedAction = {
      type: types.SET_EMAIL,
      email: { name: "example" }
    };
    expect(actions.setEmail({ name: "example" })).toEqual(expectedAction);
  });

  test("setEmailsByContact", () => {
    const emailsByContact = [{ name: "a" }, { name: "b" }];
    const pageToken = "12345";
    const expectedAction = {
      type: types.SET_EMAILS_BY_CONTACT,
      emailsByContact,
      pageToken
    };
    expect(actions.setEmailsByContact(emailsByContact, pageToken)).toEqual(
      expectedAction
    );
  });

  test("setEmailQuery", () => {
    const emailQuery = "james@taylor.net";
    const expectedAction = {
      type: types.SET_EMAIL_QUERY,
      emailQuery
    };
    expect(actions.setEmailQuery(emailQuery)).toEqual(expectedAction);
  });

  test("isFetching", () => {
    const expectedAction = {
      type: types.IS_FETCHING,
      isFetching: true
    };
    expect(actions.isFetching(true)).toEqual(expectedAction);
  });

  test("isLoading", () => {
    const expectedAction = {
      type: types.IS_LOADING,
      isLoading: true
    };
    expect(actions.isLoading(true)).toEqual(expectedAction);
  });

  test("clearEmail", () => {
    const expectedAction = {
      type: types.CLEAR_EMAIL
    };
    expect(actions.clearEmail()).toEqual(expectedAction);
  });

  test("clearEmails", () => {
    const expectedAction = {
      type: types.CLEAR_EMAILS
    };
    expect(actions.clearEmails()).toEqual(expectedAction);
  });

  test("setError", () => {
    const expectedAction = {
      type: types.SET_ERROR,
      error: "THIS IS A TEST ERROR"
    };
    expect(actions.setError("THIS IS A TEST ERROR")).toEqual(expectedAction);
  });

  test("clearError", () => {
    const expectedAction = {
      type: types.CLEAR_ERROR
    };
    expect(actions.clearError()).toEqual(expectedAction);
  });
});

describe("Async Email Actions {{THUNKS}}", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const store = mockStore({
    emails: [],
    pageToken: "",
    isFetching: false,
    isLoading: false,
    email: {}
  });

  test("fetchEmails(maxResults, pageToken, emailsArray)", () => {
    moxios.wait(() => {
      const response = {
        data: {
          emailArray: [{ body: "email1" }, { body: "email2" }],
          nextPageToken: "12345"
        }
      };

      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response
        })
        .then(() => {
          store.dispatch(actions.fetchEmails(25, "", []));
        })
        .then(() => {
          const actionz = store.getActions();
          expect(actionz[0]).toEqual(actions.isFetching(true));
          expect(actionz[1]).toEqual(actions.isLoading(true));
          expect(actionz[2]).toEqual(
            actions.setEmails(
              response.data.emailArray,
              response.data.nextPageToken
            )
          );
          expect(actionz[2]).toEqual(actions.isFetching(false));
        });
    });
  });

  test("fetchEmail(id)", () => {
    moxios.wait(() => {
      const response = {
        data: {
          email: { body: "I am an email" }
        }
      };
      const request = moxios.requests.mostRecent();

      request
        .respondWith({
          status: 200,
          response
        })
        .then(() => {
          store.dispatch(actions.fetchEmail("424242"));
        })
        .then(() => {
          const actionz = store.getActions();
          expect(actionz[0]).toEqual(actions.isFetching(true));
          expect(actionz[1]).toEqual(actions.setEmail(response.data.email));
          expect(actionz[3]).toEqual(actions.isFetching(true));
        });
    });
  });
});
