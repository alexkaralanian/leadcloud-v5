import { createStore, applyMiddleware, combineReducers } from "redux";

// MIDDLEWARE
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import createHistory from "history/createBrowserHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";

// REDUCERS
import authReducer from "./reducers/auth-reducer";
import emailReducer from "./reducers/email-reducer";

import contacts from "./reducers/contacts";
import contact from "./reducers/contact";
import contactGroups from "./reducers/contact-groups";
import contactEmails from "./reducers/contact-emails";

import listings from "./reducers/listings";
import listing from "./reducers/listing";
import listingContacts from "./reducers/listing-contacts";
import listingContactsSearch from "./reducers/listing-contacts-search";
import listingEmails from "./reducers/listing-emails";

import groupReducer from "./reducers/group-reducer";
import groupContactsReducer from "./reducers/group-contacts";
import groupContactsSearch from "./reducers/group-contacts-search";

import campaignReducer from "./reducers/campaign-reducer";
import formReducer from "./reducers/form-reducer";
import queryReducer from "./reducers/query-reducer";
import modalReducer from "./reducers/modal-reducer";
import navReducer from "./reducers/nav-reducer";
import commonReducer from "./reducers/common-reducer";

// ROUTER HISTORY
export const history = createHistory();

// COMBINE REDUCERS
const rootReducer = combineReducers({
  authReducer,
  emailReducer,
  contacts,
  contact,
  contactEmails,
  contactGroups,
  listings,
  listing,
  listingContacts,
  listingContactsSearch,
  listingEmails,
  groupReducer,
  groupContactsReducer,
  groupContactsSearch,
  campaignReducer,
  queryReducer,
  modalReducer,
  navReducer,
  commonReducer,
  router: routerReducer,
  form: formReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, routerMiddleware(history), createLogger()))
);

export default store;
