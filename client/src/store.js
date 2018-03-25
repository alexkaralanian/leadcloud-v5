import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// REDUCERS
import authReducer from "./reducers/auth-reducer";

// MIDDLEWARE
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import createHistory from "history/createBrowserHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";

// ROUTER HISTORY
export const history = createHistory();

// COMBINE REDUCERS
const rootReducer = combineReducers({
  authReducer,
  emailReducer,
  router: routerReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, routerMiddleware(history), createLogger())
  )
);

export default store;
