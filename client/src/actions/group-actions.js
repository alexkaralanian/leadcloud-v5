import axios from "axios";
import * as types from "../types";

/* ------------   ACTION CREATORS     ------------------ */

export const setGroups = groups => ({
  type: types.SET_GROUPS,
  payload: groups
});

// ADMINISTRATIVE...

export const isFetching = bool => ({
  type: types.IS_FETCHING,
  isFetching: bool
});

export const setError = error => ({
  type: types.SET_ERROR,
  error
});

export const clearError = () => ({
  type: types.CLEAR_ERROR
});

/* ------------       DISPATCHERS     ------------------ */

export const fetchGroups = () => async dispatch => {
  dispatch(isFetching(true));
  try {
    const res = await axios.get("/api/groups/");

    dispatch(setGroups(res.data));
    dispatch(isFetching(false));
  } catch (err) {
    console.error("Fetching groups unsuccessful", err);
    dispatch(isFetching(false));
  }
};
