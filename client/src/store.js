import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// MIDDLEWARE
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import createHistory from "history/createBrowserHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";

// REDUCERS
import authReducer from "./reducers/auth-reducer";
import emailReducer from "./reducers/email-reducer";
import contactReducer from "./reducers/contact-reducer";
import listingReducer from "./reducers/listing-reducer";
import formReducer from "./reducers/form-reducer";

// ROUTER HISTORY
export const history = createHistory();

// COMBINE REDUCERS
const rootReducer = combineReducers({
  authReducer,
  emailReducer,
  contactReducer,
  listingReducer,
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
