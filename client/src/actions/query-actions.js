import axios from "axios";
import store from "../store";
import * as types from "../types";

export const resetQuery = () => ({
  type: types.RESET_QUERY
});

export const setQuery = query => ({
  type: types.SET_QUERY,
  payload: query
});

export const setOffset = offset => ({
  type: types.SET_OFFSET,
  payload: offset
});

export const isLoading = bool => ({
  type: types.IS_LOADING,
  payload: bool
});

export const fetchComponent = (
  componentName, // array, ie contacts
  componentArray, // array, ie contacts
  setFunction, // function, ie setContacts
  id, // number
  subComponent // string, ie groups
) => async dispatch => {
  const state = store.getState();

  const limit = state.queryReducer.limit;
  const offset = state.queryReducer.offset;
  const query = state.queryReducer.query;
  const newOffset = offset + limit;

  try {
    dispatch(isLoading(true));

    const res = id
      ? await axios.get(
          `/api/${componentName}/${id}/${subComponent}/?limit=${limit}&offset=${offset}&query=${query}`
        )
      : await axios.get(
          `/api/${componentName}/?limit=${limit}&offset=${offset}&query=${query}`
        );

    dispatch(setFunction(componentArray.concat(res.data)));
    dispatch(setOffset(newOffset));
    dispatch(isLoading(false));
  } catch (err) {
    dispatch(isLoading(false));
    console.error(`Fetching ${componentName} unsuccessful`, err);
  }
};
