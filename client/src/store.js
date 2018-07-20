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
import contactReducer from "./reducers/contact-reducer";
import listingReducer from "./reducers/listing-reducer";
import groupReducer from "./reducers/group-reducer";
import groupContactsReducer from "./reducers/group-contacts-reducer";
import campaignReducer from "./reducers/campaign-reducer";
import formReducer from "./reducers/form-reducer";
import queryReducer from "./reducers/query-reducer";
import commonReducer from "./reducers/common-reducer";

// ROUTER HISTORY
export const history = createHistory();

// COMBINE REDUCERS
const rootReducer = combineReducers({
  authReducer,
  emailReducer,
  contactReducer,
  listingReducer,
  groupReducer,
  groupContactsReducer,
  campaignReducer,
  queryReducer,
  commonReducer,
  router: routerReducer,
  form: formReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, routerMiddleware(history), createLogger())
  )
);

export default store;
