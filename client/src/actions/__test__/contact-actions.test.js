import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";

import * as actions from "../contact-actions";
import * as types from "../../types";

describe("Contact Actions", () => {
  test("setContact(Contact)", () => {
    const contact = {
      name: "Steve Jobs"
    };

    const expectedAction = {
      type: types.SET_CONTACT,
      contact
    };
    expect(actions.setContact(contact)).toEqual(expectedAction);
  });
});

// describe("Async Auth Actions", () => {
//   const middlewares = [thunk];
//   const mockStore = configureMockStore(middlewares);

//   beforeEach(() => {
//     moxios.install();
//   });
//   afterEach(() => {
//     moxios.uninstall();
//   });

//   const store = mockStore({
//     isFetching: false,
//     isAuthed: false,
//     user: null,
//     error: ""
//   });

//   test("fetchUser", () => {
//     const response = {
//       data: {
//         name: "Elon Musk"
//       }
//     };

//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response
//       });
//     });

//     return store.dispatch(actions.fetchUser()).then(() => {
//       const actionz = store.getActions();
//       expect(actionz[0]).toEqual(actions.isFetching(true));
//       expect(actionz[1]).toEqual(actions.authUser(response));
//     });
//   });

//   test("fetchUser failure", () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 500
//       });
//     });

//     return store.dispatch(actions.fetchUser()).then(() => {
//       const actionz = store.getActions();
//       expect(actionz[0]).toEqual(actions.isFetching(true));
//       expect(actionz[1]).toEqual(actions.isFetching(false));
//     });
//   });

//   test("logout", () => {
//     moxios.wait(() => {
//       const request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200
//       });
//     });

//     return store.dispatch(actions.logout()).then(() => {
//       const actionz = store.getActions();
//       expect(actionz[0]).toEqual(actions.unauthUser());
//     });
//   });
// });
