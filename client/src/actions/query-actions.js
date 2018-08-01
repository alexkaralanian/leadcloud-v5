import axios from "axios";
import store from "../store";
import * as types from "../types";

export const setQuery = query => ({
  type: types.SET_QUERY,
  payload: query
});

export const setOffset = offset => ({
  type: types.SET_OFFSET,
  payload: offset
});

export const setCount = count => ({
  type: types.SET_COUNT,
  payload: count
});

export const isLoading = bool => ({
  type: types.IS_LOADING,
  payload: bool
});

export const fetchComponent = (
  componentName, // string, ie "contacts"
  componentArray, // array, ie []
  setFunction, // function, ie setContacts()
  id, // number || null
  subComponent // string, ie "groups" || null
) => async dispatch => {
  const state = store.getState();

  const count = state.queryReducer.count;
  const limit = state.queryReducer.limit;
  const offset = state.queryReducer.offset;
  const query = state.queryReducer.query;
  const newOffset = offset + limit;

  // query only gets set when component search function is invoked, is an empty string
  // no query / fetchAll is default return state from db

  try {
    dispatch(isLoading(true));
    const res = id
      ? await axios.get(
          `/api/${componentName}/${id}/${subComponent}/?limit=${limit}&offset=${offset}&query=${query}`
        )
      : await axios.get(
          `/api/${componentName}/?limit=${limit}&offset=${offset}&query=${query}`
        );

    console.log("THE RES", res.data);
    dispatch(setFunction(componentArray.concat(res.data.rows)));
    dispatch(setCount(res.data.count));
    dispatch(setOffset(newOffset));
    dispatch(isLoading(false));
  } catch (err) {
    dispatch(isLoading(false));
    console.error(
      id
        ? `Fetching ${componentName} ${subComponent} unsuccessful`
        : `Fetching ${componentName} unsuccessfsul`,
      err
    );
  }
};
